-- KB스타뱅킹 클론 - 보안 검증 및 테스트 스크립트
-- 이 스크립트는 RLS 정책이 올바르게 작동하는지 검증합니다.

-- ===============================
-- 1. RLS 활성화 상태 검증
-- ===============================

-- 모든 테이블의 RLS 상태 확인
SELECT 
    schemaname,
    tablename,
    rowsecurity as "RLS 활성화",
    forcerowsecurity as "강제 RLS"
FROM pg_tables 
WHERE schemaname = 'public'
AND tablename IN (
    'users', 'users_profile', 'accounts', 'cards', 
    'transactions', 'transfer_history', 'notifications', 
    'admin_users', 'audit_logs', 'login_history'
)
ORDER BY tablename;

-- ===============================
-- 2. RLS 정책 목록 검증
-- ===============================

-- 각 테이블별 정책 현황
SELECT 
    schemaname,
    tablename,
    policyname as "정책명",
    permissive as "허용형",
    roles as "적용 역할",
    cmd as "명령어",
    qual as "조건"
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname;

-- ===============================
-- 3. 보안 함수 존재 여부 검증
-- ===============================

-- 필수 보안 함수들이 생성되었는지 확인
SELECT 
    routine_name as "함수명",
    routine_type as "유형",
    security_type as "보안 유형"
FROM information_schema.routines
WHERE routine_schema = 'public'
AND routine_name IN (
    'get_current_user_id',
    'is_admin',
    'is_super_admin',
    'owns_account',
    'mask_sensitive_data',
    'audit_log_trigger',
    'validate_transaction',
    'create_transaction_notification'
)
ORDER BY routine_name;

-- ===============================
-- 4. 트리거 존재 여부 검증
-- ===============================

-- 감사 및 검증 트리거 확인
SELECT 
    trigger_name as "트리거명",
    event_object_table as "테이블명",
    action_timing as "실행 시점",
    event_manipulation as "이벤트"
FROM information_schema.triggers
WHERE trigger_schema = 'public'
AND trigger_name IN (
    'audit_users',
    'audit_accounts', 
    'audit_transactions',
    'audit_cards',
    'audit_admin_users',
    'validate_transaction_trigger',
    'transaction_notification_trigger',
    'update_users_updated_at',
    'update_accounts_updated_at'
)
ORDER BY trigger_name;

-- ===============================
-- 5. 인덱스 최적화 검증
-- ===============================

-- RLS 성능을 위한 주요 인덱스 확인
SELECT 
    schemaname,
    tablename,
    indexname,
    indexdef
FROM pg_indexes
WHERE schemaname = 'public'
AND indexname IN (
    'idx_accounts_user_id',
    'idx_transactions_account_date',
    'idx_notifications_user_id_created',
    'idx_cards_user_id',
    'idx_audit_logs_user_id_created',
    'idx_login_history_user_id'
)
ORDER BY tablename, indexname;

-- ===============================
-- 6. 마스킹 뷰 검증
-- ===============================

-- 민감정보 마스킹 뷰 존재 확인
SELECT 
    table_name as "뷰명",
    view_definition as "뷰 정의"
FROM information_schema.views
WHERE table_schema = 'public'
AND table_name IN ('users_masked', 'accounts_masked', 'cards_masked')
ORDER BY table_name;

-- ===============================
-- 7. 테스트 데이터 생성 (보안 테스트용)
-- ===============================

-- 테스트용 사용자 생성 (실제 운영시에는 제거)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM users WHERE email = 'test.user1@example.com') THEN
        INSERT INTO users (id, email, name, phone, password_hash, status) VALUES
        ('test0001-0001-0001-0001-000000000001', 'test.user1@example.com', '테스트사용자1', '010-1111-1111', 'test_hash', 'active'),
        ('test0002-0002-0002-0002-000000000002', 'test.user2@example.com', '테스트사용자2', '010-2222-2222', 'test_hash', 'active');
    END IF;
END $$;

-- 테스트용 계좌 생성
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM accounts WHERE account_number = '110-123-TEST01') THEN
        INSERT INTO accounts (id, user_id, account_number, account_name, account_type, balance, is_primary) VALUES
        ('acct0001-0001-0001-0001-000000000001', 'test0001-0001-0001-0001-000000000001', '110-123-TEST01', '테스트계좌1', '보통예금', 1000000, true),
        ('acct0002-0002-0002-0002-000000000002', 'test0002-0002-0002-0002-000000000002', '110-123-TEST02', '테스트계좌2', '보통예금', 2000000, true);
    END IF;
END $$;

-- ===============================
-- 8. RLS 보안 테스트 함수
-- ===============================

-- 다른 사용자 데이터 접근 테스트 함수
CREATE OR REPLACE FUNCTION test_rls_isolation()
RETURNS TABLE(
    test_name TEXT,
    result BOOLEAN,
    description TEXT
) AS $$
BEGIN
    -- 테스트 1: 다른 사용자의 계좌 조회 시도
    RETURN QUERY
    SELECT 
        'account_isolation_test'::TEXT as test_name,
        (COUNT(*) = 0)::BOOLEAN as result,
        '다른 사용자 계좌 접근 차단 테스트'::TEXT as description
    FROM accounts
    WHERE user_id != auth.uid()
    AND auth.uid() IS NOT NULL;
    
    -- 테스트 2: 자신의 계좌만 조회되는지 확인
    RETURN QUERY
    SELECT 
        'own_account_access_test'::TEXT as test_name,
        (COUNT(*) > 0)::BOOLEAN as result,
        '본인 계좌 접근 허용 테스트'::TEXT as description
    FROM accounts
    WHERE user_id = auth.uid()
    AND auth.uid() IS NOT NULL;
    
    -- 테스트 3: 거래내역 격리 테스트
    RETURN QUERY
    SELECT 
        'transaction_isolation_test'::TEXT as test_name,
        (COUNT(*) = 0)::BOOLEAN as result,
        '다른 사용자 거래내역 접근 차단 테스트'::TEXT as description
    FROM transactions t
    JOIN accounts a ON t.account_id = a.id
    WHERE a.user_id != auth.uid()
    AND auth.uid() IS NOT NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ===============================
-- 9. 관리자 권한 테스트 함수
-- ===============================

CREATE OR REPLACE FUNCTION test_admin_permissions()
RETURNS TABLE(
    test_name TEXT,
    result BOOLEAN,
    description TEXT
) AS $$
BEGIN
    -- 관리자 여부 확인 테스트
    RETURN QUERY
    SELECT 
        'admin_check_test'::TEXT as test_name,
        is_admin() as result,
        '관리자 권한 확인 테스트'::TEXT as description;
    
    -- 슈퍼 관리자 여부 확인 테스트  
    RETURN QUERY
    SELECT 
        'super_admin_check_test'::TEXT as test_name,
        is_super_admin() as result,
        '슈퍼 관리자 권한 확인 테스트'::TEXT as description;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ===============================
-- 10. 민감정보 마스킹 테스트 함수
-- ===============================

CREATE OR REPLACE FUNCTION test_data_masking()
RETURNS TABLE(
    test_name TEXT,
    original_value TEXT,
    masked_value TEXT,
    result BOOLEAN
) AS $$
BEGIN
    -- 전화번호 마스킹 테스트
    RETURN QUERY
    SELECT 
        'phone_masking_test'::TEXT as test_name,
        '010-1234-5678'::TEXT as original_value,
        mask_sensitive_data('phone', '010-1234-5678') as masked_value,
        (mask_sensitive_data('phone', '010-1234-5678') = '010-****-5678')::BOOLEAN as result;
    
    -- 카드번호 마스킹 테스트
    RETURN QUERY
    SELECT 
        'card_masking_test'::TEXT as test_name,
        '1234-5678-9012-3456'::TEXT as original_value,
        mask_sensitive_data('card_number', '1234-5678-9012-3456') as masked_value,
        (mask_sensitive_data('card_number', '1234-5678-9012-3456') = '1234-****-****-3456')::BOOLEAN as result;
    
    -- 계좌번호 마스킹 테스트
    RETURN QUERY
    SELECT 
        'account_masking_test'::TEXT as test_name,
        '110-123-456789'::TEXT as original_value,
        mask_sensitive_data('account_number', '110-123-456789') as masked_value,
        (mask_sensitive_data('account_number', '110-123-456789') = '110-12-******')::BOOLEAN as result;
END;
$$ LANGUAGE plpgsql;

-- ===============================
-- 11. 거래 검증 테스트 함수
-- ===============================

CREATE OR REPLACE FUNCTION test_transaction_validation()
RETURNS TABLE(
    test_name TEXT,
    result BOOLEAN,
    description TEXT
) AS $$
DECLARE
    test_account_id UUID;
    insufficient_funds_error BOOLEAN := FALSE;
    negative_amount_error BOOLEAN := FALSE;
BEGIN
    -- 테스트용 계좌 ID 가져오기
    SELECT id INTO test_account_id 
    FROM accounts 
    WHERE account_number = '110-123-TEST01' 
    LIMIT 1;
    
    IF test_account_id IS NULL THEN
        RETURN QUERY
        SELECT 
            'no_test_account'::TEXT as test_name,
            FALSE::BOOLEAN as result,
            '테스트 계좌가 존재하지 않습니다'::TEXT as description;
        RETURN;
    END IF;
    
    -- 테스트 1: 잔액 부족 시 거래 거부
    BEGIN
        PERFORM process_transaction(
            test_account_id,
            '출금',
            999999999,
            '잔액 부족 테스트'
        );
    EXCEPTION
        WHEN others THEN
            insufficient_funds_error := TRUE;
    END;
    
    RETURN QUERY
    SELECT 
        'insufficient_funds_test'::TEXT as test_name,
        insufficient_funds_error as result,
        '잔액 부족 시 거래 거부 테스트'::TEXT as description;
    
    -- 테스트 2: 음수 금액 거래 거부
    BEGIN
        PERFORM process_transaction(
            test_account_id,
            '입금',
            -100,
            '음수 금액 테스트'
        );
    EXCEPTION
        WHEN others THEN
            negative_amount_error := TRUE;
    END;
    
    RETURN QUERY
    SELECT 
        'negative_amount_test'::TEXT as test_name,
        negative_amount_error as result,
        '음수 금액 거래 거부 테스트'::TEXT as description;
END;
$$ LANGUAGE plpgsql;

-- ===============================
-- 12. 종합 보안 테스트 실행 함수
-- ===============================

CREATE OR REPLACE FUNCTION run_comprehensive_security_tests()
RETURNS TABLE(
    category TEXT,
    test_name TEXT,
    result BOOLEAN,
    description TEXT
) AS $$
BEGIN
    -- RLS 격리 테스트 실행
    RETURN QUERY
    SELECT 
        'RLS_ISOLATION'::TEXT as category,
        t.test_name,
        t.result,
        t.description
    FROM test_rls_isolation() t;
    
    -- 관리자 권한 테스트 실행
    RETURN QUERY
    SELECT 
        'ADMIN_PERMISSIONS'::TEXT as category,
        t.test_name,
        t.result,
        t.description
    FROM test_admin_permissions() t;
    
    -- 데이터 마스킹 테스트 실행
    RETURN QUERY
    SELECT 
        'DATA_MASKING'::TEXT as category,
        t.test_name,
        t.result,
        CASE 
            WHEN t.result THEN '마스킹 성공: ' || t.masked_value
            ELSE '마스킹 실패: ' || t.masked_value
        END as description
    FROM test_data_masking() t;
    
    -- 거래 검증 테스트 실행
    RETURN QUERY
    SELECT 
        'TRANSACTION_VALIDATION'::TEXT as category,
        t.test_name,
        t.result,
        t.description
    FROM test_transaction_validation() t;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ===============================
-- 13. 보안 현황 리포트 함수
-- ===============================

CREATE OR REPLACE FUNCTION generate_security_report()
RETURNS TABLE(
    section TEXT,
    item TEXT,
    status TEXT,
    details TEXT
) AS $$
BEGIN
    -- RLS 활성화 현황
    RETURN QUERY
    SELECT 
        'RLS_STATUS'::TEXT as section,
        t.tablename as item,
        CASE 
            WHEN t.rowsecurity THEN 'ENABLED'
            ELSE 'DISABLED'
        END as status,
        CASE 
            WHEN t.forcerowsecurity THEN 'FORCED'
            ELSE 'NORMAL'
        END as details
    FROM pg_tables t
    WHERE t.schemaname = 'public'
    AND t.tablename IN (
        'users', 'users_profile', 'accounts', 'cards', 
        'transactions', 'transfer_history', 'notifications', 
        'admin_users', 'audit_logs', 'login_history'
    );
    
    -- 정책 개수 현황
    RETURN QUERY
    SELECT 
        'POLICY_COUNT'::TEXT as section,
        p.tablename as item,
        COUNT(*)::TEXT as status,
        STRING_AGG(p.policyname, ', ') as details
    FROM pg_policies p
    WHERE p.schemaname = 'public'
    GROUP BY p.tablename;
    
    -- 보안 함수 현황
    RETURN QUERY
    SELECT 
        'SECURITY_FUNCTIONS'::TEXT as section,
        r.routine_name as item,
        'AVAILABLE'::TEXT as status,
        r.security_type as details
    FROM information_schema.routines r
    WHERE r.routine_schema = 'public'
    AND r.routine_name IN (
        'get_current_user_id', 'is_admin', 'is_super_admin',
        'owns_account', 'mask_sensitive_data'
    );
    
    -- 감사 트리거 현황
    RETURN QUERY
    SELECT 
        'AUDIT_TRIGGERS'::TEXT as section,
        t.trigger_name as item,
        'ACTIVE'::TEXT as status,
        t.event_object_table || ' (' || t.event_manipulation || ')' as details
    FROM information_schema.triggers t
    WHERE t.trigger_schema = 'public'
    AND t.trigger_name LIKE 'audit_%';
END;
$$ LANGUAGE plpgsql;

-- ===============================
-- 14. 테스트 실행 가이드
-- ===============================

/*
보안 테스트 실행 방법:

1. 전체 보안 현황 확인:
   SELECT * FROM generate_security_report();

2. 종합 보안 테스트 실행:
   SELECT * FROM run_comprehensive_security_tests();

3. 개별 테스트 실행:
   SELECT * FROM test_rls_isolation();
   SELECT * FROM test_admin_permissions();
   SELECT * FROM test_data_masking();
   SELECT * FROM test_transaction_validation();

4. 특정 사용자로 로그인하여 테스트:
   -- Supabase Auth를 통해 특정 사용자로 로그인 후 테스트 실행

5. 관리자 권한 테스트:
   -- admin_users 테이블의 사용자로 로그인하여 권한 테스트

주의사항:
- 테스트는 개발/스테이징 환경에서만 실행
- 프로덕션 환경에서는 테스트 데이터 생성 부분 제거
- 테스트 완료 후 테스트 데이터 정리 권장
*/

-- ===============================
-- 15. 테스트 데이터 정리 함수
-- ===============================

CREATE OR REPLACE FUNCTION cleanup_test_data()
RETURNS TEXT AS $$
BEGIN
    -- 테스트 거래내역 삭제
    DELETE FROM transactions 
    WHERE account_id IN (
        SELECT id FROM accounts 
        WHERE account_number LIKE '110-123-TEST%'
    );
    
    -- 테스트 계좌 삭제
    DELETE FROM accounts 
    WHERE account_number LIKE '110-123-TEST%';
    
    -- 테스트 사용자 삭제
    DELETE FROM users 
    WHERE email LIKE '%@example.com' 
    AND email LIKE 'test.%';
    
    RETURN '테스트 데이터 정리 완료';
END;
$$ LANGUAGE plpgsql;

-- 끝