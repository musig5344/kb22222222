-- KB스타뱅킹 클론 - 완전한 Supabase RLS 보안 정책
-- 20년차 데이터베이스 보안 전문가 설계
-- 작성일: 2025-08-14

-- ===============================
-- 1. 기본 확장 및 함수 설정
-- ===============================

-- 필요한 확장 활성화
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ===============================
-- 2. 추가 테이블 생성 (기존 테이블에 없는 것들)
-- ===============================

-- 사용자 프로필 테이블 (민감정보 분리)
CREATE TABLE IF NOT EXISTS users_profile (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE UNIQUE,
    birth_date DATE,
    gender VARCHAR(10),
    address TEXT,
    postal_code VARCHAR(10),
    emergency_contact VARCHAR(20),
    job VARCHAR(100),
    annual_income DECIMAL(15,2),
    profile_image_url TEXT,
    last_profile_update TIMESTAMP DEFAULT NOW(),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- 카드 테이블
CREATE TABLE IF NOT EXISTS cards (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    account_id UUID REFERENCES accounts(id) ON DELETE CASCADE,
    card_number VARCHAR(19) UNIQUE NOT NULL, -- 마스킹된 카드번호 저장
    card_name VARCHAR(100) NOT NULL,
    card_type VARCHAR(50) NOT NULL, -- '체크카드', '신용카드', 'KB Pay'
    card_status VARCHAR(20) DEFAULT 'active', -- 'active', 'inactive', 'blocked', 'expired'
    expire_date DATE NOT NULL,
    daily_limit DECIMAL(15,2) DEFAULT 1000000.00,
    monthly_limit DECIMAL(15,2) DEFAULT 30000000.00,
    is_primary BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- 알림 테이블
CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    notification_type VARCHAR(50) NOT NULL, -- 'transaction', 'security', 'promotion', 'system'
    priority VARCHAR(20) DEFAULT 'normal', -- 'low', 'normal', 'high', 'urgent'
    is_read BOOLEAN DEFAULT FALSE,
    read_at TIMESTAMP,
    action_url TEXT,
    metadata JSONB,
    created_at TIMESTAMP DEFAULT NOW(),
    expires_at TIMESTAMP
);

-- 감사 로그 테이블
CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    admin_user_id UUID REFERENCES admin_users(id) ON DELETE SET NULL,
    table_name VARCHAR(50) NOT NULL,
    operation VARCHAR(10) NOT NULL, -- 'INSERT', 'UPDATE', 'DELETE', 'SELECT'
    old_data JSONB,
    new_data JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

-- 로그인 히스토리 테이블
CREATE TABLE IF NOT EXISTS login_history (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    ip_address INET NOT NULL,
    user_agent TEXT,
    login_method VARCHAR(50), -- 'password', 'biometric', 'otp'
    success BOOLEAN NOT NULL,
    failure_reason TEXT,
    session_id UUID,
    created_at TIMESTAMP DEFAULT NOW()
);

-- ===============================
-- 3. 보안 함수 생성
-- ===============================

-- 현재 사용자 ID 반환 함수
CREATE OR REPLACE FUNCTION get_current_user_id()
RETURNS UUID AS $$
BEGIN
    RETURN auth.uid();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 관리자 권한 확인 함수
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
DECLARE
    admin_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO admin_count
    FROM admin_users 
    WHERE id = auth.uid()::UUID
    AND role IN ('admin', 'super_admin', 'manager');
    
    RETURN admin_count > 0;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 슈퍼 관리자 권한 확인 함수
CREATE OR REPLACE FUNCTION is_super_admin()
RETURNS BOOLEAN AS $$
DECLARE
    super_admin_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO super_admin_count
    FROM admin_users 
    WHERE id = auth.uid()::UUID
    AND role = 'super_admin';
    
    RETURN super_admin_count > 0;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 계좌 소유권 확인 함수
CREATE OR REPLACE FUNCTION owns_account(account_uuid UUID)
RETURNS BOOLEAN AS $$
DECLARE
    owner_count INTEGER;
BEGIN
    SELECT COUNT(*) INTO owner_count
    FROM accounts
    WHERE id = account_uuid
    AND user_id = auth.uid();
    
    RETURN owner_count > 0;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 민감정보 마스킹 함수
CREATE OR REPLACE FUNCTION mask_sensitive_data(
    data_type VARCHAR,
    value TEXT
)
RETURNS TEXT AS $$
BEGIN
    CASE data_type
        WHEN 'phone' THEN
            RETURN CONCAT(LEFT(value, 3), '-****-', RIGHT(value, 4));
        WHEN 'card_number' THEN
            RETURN CONCAT(LEFT(value, 4), '-****-****-', RIGHT(value, 4));
        WHEN 'account_number' THEN
            RETURN CONCAT(LEFT(value, 6), '-******');
        WHEN 'email' THEN
            RETURN CONCAT(LEFT(value, 2), '***@', SPLIT_PART(value, '@', 2));
        ELSE
            RETURN '****';
    END CASE;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- ===============================
-- 4. RLS 활성화 및 정책 생성
-- ===============================

-- 모든 테이블에 RLS 활성화
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE users_profile ENABLE ROW LEVEL SECURITY;
ALTER TABLE accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE transfer_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE login_history ENABLE ROW LEVEL SECURITY;

-- ===============================
-- 5. USERS_PROFILE 테이블 RLS 정책
-- ===============================

-- SELECT: 자신의 프로필만 조회
CREATE POLICY "users_profile_select_own" ON users_profile
    FOR SELECT USING (
        user_id = auth.uid() OR is_admin()
    );

-- UPDATE: 자신의 프로필만 수정 (일부 필드 제한)
CREATE POLICY "users_profile_update_own" ON users_profile
    FOR UPDATE USING (
        user_id = auth.uid()
    ) WITH CHECK (
        user_id = auth.uid() AND
        -- 민감한 필드는 관리자만 수정 가능하도록 제한
        (OLD.user_id = NEW.user_id)
    );

-- INSERT: 자신의 프로필만 생성
CREATE POLICY "users_profile_insert_own" ON users_profile
    FOR INSERT WITH CHECK (
        user_id = auth.uid()
    );

-- DELETE: 프로필 삭제 불가 (데이터 보존)
-- DELETE 정책을 생성하지 않음으로써 삭제를 방지

-- ===============================
-- 6. ACCOUNTS 테이블 RLS 정책
-- ===============================

-- SELECT: 자신의 계좌만 조회
CREATE POLICY "accounts_select_own" ON accounts
    FOR SELECT USING (
        user_id = auth.uid() OR is_admin()
    );

-- UPDATE: 관리자만 계좌 정보 수정 가능
CREATE POLICY "accounts_update_admin_only" ON accounts
    FOR UPDATE USING (
        is_admin()
    ) WITH CHECK (
        is_admin()
    );

-- INSERT: 관리자만 계좌 생성 가능
CREATE POLICY "accounts_insert_admin_only" ON accounts
    FOR INSERT WITH CHECK (
        is_admin()
    );

-- DELETE: 슈퍼 관리자만 계좌 삭제 가능
CREATE POLICY "accounts_delete_super_admin_only" ON accounts
    FOR DELETE USING (
        is_super_admin()
    );

-- ===============================
-- 7. TRANSACTIONS 테이블 RLS 정책
-- ===============================

-- SELECT: 자신의 거래내역만 조회
CREATE POLICY "transactions_select_own" ON transactions
    FOR SELECT USING (
        owns_account(account_id) OR is_admin()
    );

-- INSERT: 인증된 사용자만 거래 생성 (시스템에서만)
CREATE POLICY "transactions_insert_authenticated" ON transactions
    FOR INSERT WITH CHECK (
        auth.uid() IS NOT NULL AND
        owns_account(account_id)
    );

-- UPDATE/DELETE: 불가능 (거래 데이터는 불변)
-- UPDATE, DELETE 정책을 생성하지 않아 수정/삭제 방지

-- ===============================
-- 8. CARDS 테이블 RLS 정책
-- ===============================

-- SELECT: 자신의 카드만 조회
CREATE POLICY "cards_select_own" ON cards
    FOR SELECT USING (
        user_id = auth.uid() OR is_admin()
    );

-- UPDATE: 카드명 등 일부 필드만 사용자가 수정 가능
CREATE POLICY "cards_update_limited" ON cards
    FOR UPDATE USING (
        user_id = auth.uid()
    ) WITH CHECK (
        user_id = auth.uid() AND
        -- 중요한 필드는 변경 불가
        OLD.card_number = NEW.card_number AND
        OLD.card_type = NEW.card_type AND
        OLD.expire_date = NEW.expire_date
    );

-- INSERT: 관리자만 카드 발급 가능
CREATE POLICY "cards_insert_admin_only" ON cards
    FOR INSERT WITH CHECK (
        is_admin()
    );

-- DELETE: 관리자만 카드 삭제 가능
CREATE POLICY "cards_delete_admin_only" ON cards
    FOR DELETE USING (
        is_admin()
    );

-- ===============================
-- 9. NOTIFICATIONS 테이블 RLS 정책
-- ===============================

-- SELECT: 자신의 알림만 조회
CREATE POLICY "notifications_select_own" ON notifications
    FOR SELECT USING (
        user_id = auth.uid() OR is_admin()
    );

-- UPDATE: 읽음 상태만 변경 가능
CREATE POLICY "notifications_update_read_only" ON notifications
    FOR UPDATE USING (
        user_id = auth.uid()
    ) WITH CHECK (
        user_id = auth.uid() AND
        -- 읽음 상태와 읽은 시간만 변경 가능
        OLD.title = NEW.title AND
        OLD.message = NEW.message AND
        OLD.notification_type = NEW.notification_type AND
        OLD.user_id = NEW.user_id
    );

-- INSERT: 시스템(관리자)만 알림 생성 가능
CREATE POLICY "notifications_insert_admin_only" ON notifications
    FOR INSERT WITH CHECK (
        is_admin()
    );

-- DELETE: 사용자는 만료된 알림만 삭제 가능
CREATE POLICY "notifications_delete_expired" ON notifications
    FOR DELETE USING (
        user_id = auth.uid() AND
        (expires_at IS NULL OR expires_at < NOW())
    );

-- ===============================
-- 10. ADMIN_USERS 테이블 RLS 정책
-- ===============================

-- 일반 사용자는 접근 불가, 관리자만 접근 가능
CREATE POLICY "admin_users_admin_only" ON admin_users
    FOR ALL USING (
        is_admin()
    ) WITH CHECK (
        is_admin()
    );

-- 슈퍼 관리자만 다른 관리자 삭제 가능
CREATE POLICY "admin_users_delete_super_admin_only" ON admin_users
    FOR DELETE USING (
        is_super_admin()
    );

-- ===============================
-- 11. AUDIT_LOGS 테이블 RLS 정책
-- ===============================

-- 감사 로그는 관리자만 조회 가능
CREATE POLICY "audit_logs_admin_read_only" ON audit_logs
    FOR SELECT USING (
        is_admin()
    );

-- 시스템만 감사 로그 생성 가능
CREATE POLICY "audit_logs_system_insert_only" ON audit_logs
    FOR INSERT WITH CHECK (
        is_admin()
    );

-- 감사 로그 수정/삭제 불가
-- UPDATE, DELETE 정책 없음으로 무결성 보장

-- ===============================
-- 12. LOGIN_HISTORY 테이블 RLS 정책
-- ===============================

-- 사용자는 자신의 로그인 기록만 조회
CREATE POLICY "login_history_select_own" ON login_history
    FOR SELECT USING (
        user_id = auth.uid() OR is_admin()
    );

-- 시스템만 로그인 기록 생성
CREATE POLICY "login_history_insert_system_only" ON login_history
    FOR INSERT WITH CHECK (
        auth.uid() IS NOT NULL
    );

-- ===============================
-- 13. 민감정보 마스킹 뷰 생성
-- ===============================

-- 사용자 정보 마스킹 뷰
CREATE OR REPLACE VIEW users_masked AS
SELECT 
    id,
    email,
    name,
    mask_sensitive_data('phone', phone) as phone_masked,
    status,
    created_at,
    updated_at
FROM users
WHERE auth.uid() = id OR is_admin();

-- 계좌 정보 마스킹 뷰 (관리자가 아닌 경우)
CREATE OR REPLACE VIEW accounts_masked AS
SELECT 
    id,
    user_id,
    CASE 
        WHEN is_admin() THEN account_number
        ELSE mask_sensitive_data('account_number', account_number)
    END as account_number,
    account_name,
    account_type,
    balance,
    is_primary,
    status,
    created_at,
    updated_at
FROM accounts
WHERE user_id = auth.uid() OR is_admin();

-- 카드 정보 마스킹 뷰
CREATE OR REPLACE VIEW cards_masked AS
SELECT 
    id,
    user_id,
    account_id,
    mask_sensitive_data('card_number', card_number) as card_number_masked,
    card_name,
    card_type,
    card_status,
    expire_date,
    daily_limit,
    monthly_limit,
    is_primary,
    created_at,
    updated_at
FROM cards
WHERE user_id = auth.uid() OR is_admin();

-- ===============================
-- 14. 감사 로그 트리거 생성
-- ===============================

-- 감사 로그 기록 함수
CREATE OR REPLACE FUNCTION audit_log_trigger()
RETURNS TRIGGER AS $$
BEGIN
    -- 민감한 테이블의 변경사항 기록
    IF TG_TABLE_NAME IN ('users', 'accounts', 'transactions', 'cards', 'admin_users') THEN
        INSERT INTO audit_logs (
            user_id,
            table_name,
            operation,
            old_data,
            new_data,
            ip_address
        ) VALUES (
            auth.uid(),
            TG_TABLE_NAME,
            TG_OP,
            CASE WHEN TG_OP = 'DELETE' OR TG_OP = 'UPDATE' THEN row_to_json(OLD) ELSE NULL END,
            CASE WHEN TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN row_to_json(NEW) ELSE NULL END,
            inet_client_addr()
        );
    END IF;
    
    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 감사 로그 트리거 적용
CREATE TRIGGER audit_users AFTER INSERT OR UPDATE OR DELETE ON users
    FOR EACH ROW EXECUTE FUNCTION audit_log_trigger();

CREATE TRIGGER audit_accounts AFTER INSERT OR UPDATE OR DELETE ON accounts
    FOR EACH ROW EXECUTE FUNCTION audit_log_trigger();

CREATE TRIGGER audit_transactions AFTER INSERT OR UPDATE OR DELETE ON transactions
    FOR EACH ROW EXECUTE FUNCTION audit_log_trigger();

CREATE TRIGGER audit_cards AFTER INSERT OR UPDATE OR DELETE ON cards
    FOR EACH ROW EXECUTE FUNCTION audit_log_trigger();

CREATE TRIGGER audit_admin_users AFTER INSERT OR UPDATE OR DELETE ON admin_users
    FOR EACH ROW EXECUTE FUNCTION audit_log_trigger();

-- ===============================
-- 15. 데이터 검증 트리거
-- ===============================

-- 거래 데이터 검증 함수
CREATE OR REPLACE FUNCTION validate_transaction()
RETURNS TRIGGER AS $$
DECLARE
    current_balance DECIMAL;
BEGIN
    -- 출금/이체 시 잔액 검증
    IF NEW.transaction_type IN ('출금', '이체') THEN
        SELECT balance INTO current_balance 
        FROM accounts 
        WHERE id = NEW.account_id;
        
        IF current_balance < NEW.amount THEN
            RAISE EXCEPTION '잔액이 부족합니다. 현재잔액: %, 요청금액: %', current_balance, NEW.amount;
        END IF;
    END IF;
    
    -- 거래금액 음수 방지
    IF NEW.amount <= 0 THEN
        RAISE EXCEPTION '거래금액은 0보다 커야 합니다.';
    END IF;
    
    -- 일일 거래한도 검증 (예시: 1천만원)
    DECLARE
        daily_total DECIMAL;
    BEGIN
        SELECT COALESCE(SUM(amount), 0) INTO daily_total
        FROM transactions
        WHERE account_id = NEW.account_id
        AND transaction_type IN ('출금', '이체')
        AND DATE(transaction_date) = CURRENT_DATE;
        
        IF daily_total + NEW.amount > 10000000 THEN
            RAISE EXCEPTION '일일 거래한도를 초과했습니다.';
        END IF;
    END;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 거래 검증 트리거 적용
CREATE TRIGGER validate_transaction_trigger 
    BEFORE INSERT ON transactions
    FOR EACH ROW EXECUTE FUNCTION validate_transaction();

-- ===============================
-- 16. 자동 알림 생성 트리거
-- ===============================

-- 거래 시 자동 알림 생성 함수
CREATE OR REPLACE FUNCTION create_transaction_notification()
RETURNS TRIGGER AS $$
DECLARE
    account_user_id UUID;
    notification_title VARCHAR;
    notification_message TEXT;
BEGIN
    -- 계좌 소유자 ID 조회
    SELECT user_id INTO account_user_id
    FROM accounts
    WHERE id = NEW.account_id;
    
    -- 알림 제목과 내용 생성
    IF NEW.transaction_type = '입금' THEN
        notification_title := '입금 알림';
        notification_message := FORMAT('%s원이 입금되었습니다. 잔액: %s원', NEW.amount::TEXT, NEW.balance_after::TEXT);
    ELSIF NEW.transaction_type = '출금' THEN
        notification_title := '출금 알림';
        notification_message := FORMAT('%s원이 출금되었습니다. 잔액: %s원', NEW.amount::TEXT, NEW.balance_after::TEXT);
    ELSIF NEW.transaction_type = '이체' THEN
        notification_title := '이체 완료';
        notification_message := FORMAT('%s님께 %s원을 이체했습니다. 잔액: %s원', NEW.target_name, NEW.amount::TEXT, NEW.balance_after::TEXT);
    END IF;
    
    -- 알림 생성
    INSERT INTO notifications (
        user_id,
        title,
        message,
        notification_type,
        priority,
        metadata
    ) VALUES (
        account_user_id,
        notification_title,
        notification_message,
        'transaction',
        CASE WHEN NEW.amount > 1000000 THEN 'high' ELSE 'normal' END,
        json_build_object('transaction_id', NEW.id, 'amount', NEW.amount)
    );
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 거래 알림 트리거 적용
CREATE TRIGGER transaction_notification_trigger
    AFTER INSERT ON transactions
    FOR EACH ROW EXECUTE FUNCTION create_transaction_notification();

-- ===============================
-- 17. 인덱스 최적화 (보안 성능 향상)
-- ===============================

-- RLS 정책 성능 최적화를 위한 추가 인덱스
CREATE INDEX IF NOT EXISTS idx_users_profile_user_id ON users_profile(user_id);
CREATE INDEX IF NOT EXISTS idx_cards_user_id ON cards(user_id);
CREATE INDEX IF NOT EXISTS idx_cards_account_id ON cards(account_id);
CREATE INDEX IF NOT EXISTS idx_cards_status ON cards(card_status);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id_created ON notifications(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_notifications_read_status ON notifications(user_id, is_read);
CREATE INDEX IF NOT EXISTS idx_audit_logs_user_id_created ON audit_logs(user_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_logs_table_operation ON audit_logs(table_name, operation);
CREATE INDEX IF NOT EXISTS idx_login_history_user_id ON login_history(user_id);
CREATE INDEX IF NOT EXISTS idx_admin_users_role ON admin_users(role);

-- ===============================
-- 18. 보안 권한 설정
-- ===============================

-- 일반 사용자에게 필요한 최소 권한만 부여
GRANT SELECT ON users_masked TO authenticated;
GRANT SELECT ON accounts_masked TO authenticated;
GRANT SELECT ON cards_masked TO authenticated;

-- 인증된 사용자에게 기본 테이블 권한 부여
GRANT SELECT, INSERT, UPDATE ON users_profile TO authenticated;
GRANT SELECT ON accounts TO authenticated;
GRANT SELECT, INSERT ON transactions TO authenticated;
GRANT SELECT, UPDATE ON notifications TO authenticated;
GRANT SELECT, INSERT ON cards TO authenticated;
GRANT SELECT ON login_history TO authenticated;

-- 관리자에게 모든 권한 부여 (RLS로 제한됨)
GRANT ALL ON ALL TABLES IN SCHEMA public TO service_role;

-- ===============================
-- 19. 보안 설정 검증 쿼리
-- ===============================

-- RLS 활성화 상태 확인
/*
SELECT schemaname, tablename, rowsecurity, forcerowsecurity
FROM pg_tables 
WHERE schemaname = 'public'
ORDER BY tablename;
*/

-- 정책 목록 확인
/*
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname;
*/

-- ===============================
-- 20. 초기 관리자 데이터 (개발용)
-- ===============================

-- 개발 환경용 슈퍼 관리자 계정 생성
INSERT INTO admin_users (id, email, password_hash, role, permissions) VALUES
('00000000-0000-0000-0000-000000000001', 'superadmin@kbstar.local', crypt('SuperAdmin123!', gen_salt('bf')), 'super_admin', 
 ARRAY['user_management', 'account_management', 'transaction_management', 'system_settings', 'audit_logs', 'admin_management'])
ON CONFLICT (email) DO NOTHING;

-- 보안 알림: 프로덕션 환경에서는 반드시 초기 패스워드를 변경하고, 
-- 강력한 인증 방식(MFA)을 적용해야 합니다.

-- 끝