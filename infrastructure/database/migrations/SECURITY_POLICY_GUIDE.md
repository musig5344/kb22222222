# KB스타뱅킹 클론 - Supabase RLS 보안 정책 가이드

> **작성자**: 20년차 데이터베이스 보안 시니어 전문가  
> **작성일**: 2025-08-14  
> **버전**: 1.0

## 📋 목차

1. [보안 정책 개요](#보안-정책-개요)
2. [핵심 보안 원칙](#핵심-보안-원칙)
3. [테이블별 RLS 정책 상세](#테이블별-rls-정책-상세)
4. [보안 함수 및 유틸리티](#보안-함수-및-유틸리티)
5. [감사 및 모니터링](#감사-및-모니터링)
6. [성능 최적화](#성능-최적화)
7. [보안 검증 및 테스트](#보안-검증-및-테스트)
8. [운영 가이드라인](#운영-가이드라인)

## 🔐 보안 정책 개요

이 문서는 KB스타뱅킹 클론 프로젝트의 Supabase Row Level Security(RLS) 정책을 설명합니다. 금융 서비스에 적합한 엄격한 보안 기준을 적용하여 다음과 같은 요구사항을 만족합니다:

### 주요 보안 요구사항

- ✅ **데이터 격리**: 사용자는 자신의 데이터만 접근
- ✅ **관리자 권한 분리**: 역할별 차등 권한 적용  
- ✅ **거래 데이터 불변성**: 거래 내역 수정/삭제 방지
- ✅ **민감정보 마스킹**: PII 데이터 보호
- ✅ **감사 로그**: 모든 민감한 작업 추적
- ✅ **실시간 모니터링**: 보안 이벤트 감지

## 🛡️ 핵심 보안 원칙

### 1. 최소 권한 원칙 (Principle of Least Privilege)
- 사용자에게는 업무 수행에 필요한 최소한의 권한만 부여
- 관리자 권한도 역할별로 세분화하여 적용

### 2. 방어 심층화 (Defense in Depth)
- RLS + 애플리케이션 레벨 + 네트워크 보안의 다층 방어
- 각 계층에서 독립적인 보안 검증 수행

### 3. 데이터 불변성 (Data Immutability)
- 거래 데이터는 생성 후 수정/삭제 불가
- 감사 로그는 완전한 불변성 보장

### 4. 투명성 (Transparency)
- 모든 중요한 작업은 감사 로그에 기록
- 사용자에게 자신의 데이터 접근 내역 제공

## 📊 테이블별 RLS 정책 상세

### 1. users_profile 테이블

**보안 목표**: 개인정보 보호, 민감정보 접근 제어

| 작업 | 정책명 | 조건 | 제한사항 |
|------|--------|------|-----------|
| SELECT | `users_profile_select_own` | 본인 또는 관리자 | - |
| UPDATE | `users_profile_update_own` | 본인만 | user_id 변경 불가 |
| INSERT | `users_profile_insert_own` | 본인만 | - |
| DELETE | - | **불가능** | 데이터 보존 정책 |

**구현 예시**:
```sql
-- SELECT 정책
CREATE POLICY "users_profile_select_own" ON users_profile
    FOR SELECT USING (
        user_id = auth.uid() OR is_admin()
    );
```

### 2. accounts 테이블

**보안 목표**: 계좌 정보 보호, 관리자 전용 관리

| 작업 | 정책명 | 조건 | 제한사항 |
|------|--------|------|-----------|
| SELECT | `accounts_select_own` | 본인 또는 관리자 | - |
| UPDATE | `accounts_update_admin_only` | 관리자만 | - |
| INSERT | `accounts_insert_admin_only` | 관리자만 | - |
| DELETE | `accounts_delete_super_admin_only` | 슈퍼관리자만 | - |

**보안 특징**:
- 일반 사용자는 계좌 조회만 가능
- 계좌 생성/수정은 관리자 권한 필수
- 계좌 삭제는 슈퍼관리자만 가능

### 3. transactions 테이블

**보안 목표**: 거래 내역 불변성, 접근 제어

| 작업 | 정책명 | 조건 | 제한사항 |
|------|--------|------|-----------|
| SELECT | `transactions_select_own` | 본인 계좌 거래만 | - |
| INSERT | `transactions_insert_authenticated` | 인증된 사용자 + 계좌 소유권 | - |
| UPDATE | - | **불가능** | 거래 데이터 불변성 |
| DELETE | - | **불가능** | 거래 데이터 불변성 |

**핵심 보안 기능**:
```sql
-- 거래 검증 트리거
CREATE TRIGGER validate_transaction_trigger 
    BEFORE INSERT ON transactions
    FOR EACH ROW EXECUTE FUNCTION validate_transaction();
```

### 4. cards 테이블

**보안 목표**: 카드 정보 보호, 제한적 수정 허용

| 작업 | 정책명 | 조건 | 제한사항 |
|------|--------|------|-----------|
| SELECT | `cards_select_own` | 본인 또는 관리자 | 카드번호 마스킹 |
| UPDATE | `cards_update_limited` | 본인만 | 중요 필드 수정 불가 |
| INSERT | `cards_insert_admin_only` | 관리자만 | - |
| DELETE | `cards_delete_admin_only` | 관리자만 | - |

**수정 제한 필드**:
- `card_number`: 변경 불가
- `card_type`: 변경 불가  
- `expire_date`: 변경 불가

### 5. notifications 테이블

**보안 목표**: 알림 개인화, 읽음 상태 관리

| 작업 | 정책명 | 조건 | 제한사항 |
|------|--------|------|-----------|
| SELECT | `notifications_select_own` | 본인 또는 관리자 | - |
| UPDATE | `notifications_update_read_only` | 본인만 | 읽음 상태만 변경 |
| INSERT | `notifications_insert_admin_only` | 관리자만 | - |
| DELETE | `notifications_delete_expired` | 본인 + 만료된 알림만 | - |

### 6. admin_users 테이블

**보안 목표**: 관리자 권한 격리, 접근 제어

| 작업 | 정책명 | 조건 | 제한사항 |
|------|--------|------|-----------|
| ALL | `admin_users_admin_only` | 관리자만 | 일반 사용자 접근 불가 |
| DELETE | `admin_users_delete_super_admin_only` | 슈퍼관리자만 | - |

## ⚙️ 보안 함수 및 유틸리티

### 1. 권한 확인 함수

```sql
-- 현재 사용자 ID 반환
CREATE OR REPLACE FUNCTION get_current_user_id()
RETURNS UUID AS $$
BEGIN
    RETURN auth.uid();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 관리자 권한 확인
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
```

### 2. 민감정보 마스킹 함수

```sql
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
```

### 3. 마스킹 뷰

```sql
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
```

## 📝 감사 및 모니터링

### 1. 감사 로그 시스템

모든 민감한 테이블의 변경사항을 자동으로 기록:

```sql
-- 감사 로그 트리거
CREATE TRIGGER audit_users AFTER INSERT OR UPDATE OR DELETE ON users
    FOR EACH ROW EXECUTE FUNCTION audit_log_trigger();
```

**기록되는 정보**:
- 작업 수행자 (user_id, admin_user_id)
- 작업 유형 (INSERT, UPDATE, DELETE, SELECT)
- 변경 전/후 데이터
- IP 주소 및 User-Agent
- 타임스탬프

### 2. 실시간 알림 시스템

거래 발생 시 자동 알림 생성:

```sql
-- 거래 알림 트리거
CREATE TRIGGER transaction_notification_trigger
    AFTER INSERT ON transactions
    FOR EACH ROW EXECUTE FUNCTION create_transaction_notification();
```

## ⚡ 성능 최적화

### 1. RLS 최적화 인덱스

```sql
-- 사용자별 데이터 접근 최적화
CREATE INDEX idx_accounts_user_id ON accounts(user_id);
CREATE INDEX idx_transactions_account_date ON transactions(account_id, transaction_date DESC);
CREATE INDEX idx_notifications_user_id_created ON notifications(user_id, created_at DESC);
```

### 2. 쿼리 성능 가이드라인

- **인덱스 활용**: WHERE 절에 user_id 조건 우선 배치
- **날짜 범위**: 거래 조회 시 적절한 날짜 범위 설정
- **페이징**: 대량 데이터 조회 시 LIMIT/OFFSET 사용

## 🧪 보안 검증 및 테스트

### 1. RLS 정책 검증 쿼리

```sql
-- RLS 활성화 상태 확인
SELECT schemaname, tablename, rowsecurity, forcerowsecurity
FROM pg_tables 
WHERE schemaname = 'public'
ORDER BY tablename;

-- 정책 목록 확인
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, policyname;
```

### 2. 보안 테스트 시나리오

1. **권한 분리 테스트**
   - 다른 사용자의 데이터 접근 시도
   - 관리자가 아닌 사용자의 관리 기능 접근 시도

2. **데이터 불변성 테스트**
   - 거래 데이터 수정/삭제 시도
   - 감사 로그 수정 시도

3. **민감정보 보호 테스트**
   - 마스킹되지 않은 데이터 접근 시도
   - SQL 인젝션 공격 시뮬레이션

## 🔧 운영 가이드라인

### 1. 보안 모니터링 체크리스트

- [ ] 매일 감사 로그 검토
- [ ] 비정상 접근 패턴 모니터링
- [ ] 관리자 계정 활동 추적
- [ ] 대량 거래 알림 확인

### 2. 정기 보안 검토

**월간**:
- [ ] 사용자 권한 재검토
- [ ] 비활성 계정 정리
- [ ] 보안 정책 준수 확인

**분기별**:
- [ ] 보안 정책 업데이트
- [ ] 침투 테스트 수행
- [ ] 성능 최적화 검토

### 3. 긴급 상황 대응

**보안 침해 감지 시**:
1. 해당 사용자 계정 즉시 비활성화
2. 감사 로그 분석 및 영향 범위 파악
3. 관련 거래 내역 동결
4. 보안팀 및 관련 부서 보고

### 4. 백업 및 복구

**백업 정책**:
- 감사 로그: 7년 보관
- 거래 데이터: 영구 보관
- 사용자 데이터: 5년 보관

**복구 절차**:
- 데이터 복구 시 감사 로그 필수 확인
- 복구 작업 전/후 무결성 검증

## ⚠️ 주의사항 및 제한사항

### 1. 개발 환경에서의 주의사항

- 프로덕션 데이터를 개발 환경에서 사용 금지
- 테스트용 데이터는 실제 개인정보 사용 금지
- 초기 관리자 계정 비밀번호 즉시 변경

### 2. 성능 고려사항

- RLS 정책이 복잡할수록 쿼리 성능 저하 가능
- 대량 데이터 처리 시 배치 작업 고려
- 인덱스 설계 시 RLS 조건 고려 필수

### 3. 확장성 고려사항

- 사용자 증가 시 파티셔닝 검토
- 감사 로그 아카이빙 정책 수립
- 캐시 전략 수립 (민감정보 캐시 금지)

## 📞 문의 및 지원

보안 정책 관련 문의사항이나 개선 제안이 있으시면 다음으로 연락주시기 바랍니다:

- **보안팀**: security@kbstar.local
- **DBA팀**: dba@kbstar.local
- **개발팀**: dev@kbstar.local

---

**최종 업데이트**: 2025-08-14  
**문서 버전**: 1.0  
**검토자**: 데이터베이스 보안 시니어 전문가