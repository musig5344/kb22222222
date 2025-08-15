import React from 'react';
import styled from 'styled-components';
import { formatCurrency } from '../../../utils/textFormatter';
import { DatabaseAccount } from '../../../lib/supabase';

// mainstart.jpg에 정확히 매칭하는 스타일링
const AccountContainer = styled.div`
  background: #ffffff;
  padding: 20px 24px;
  border-bottom: 8px solid #f5f6f8;
`;

const AccountHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
`;

const AccountLeft = styled.div`
  flex: 1;
`;

const AccountTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
`;

const AccountName = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: #333333;
  letter-spacing: -0.3px;
`;

const EditIcon = styled.span`
  font-size: 16px;
  color: #666666;
  cursor: pointer;
`;

const AccountNumberRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const AccountNumber = styled.span`
  font-size: 16px;
  color: #666666;
  letter-spacing: -0.2px;
`;

const DropdownIcon = styled.span`
  font-size: 14px;
  color: #666666;
  cursor: pointer;
`;

const SettingsIcon = styled.div`
  width: 24px;
  height: 24px;
  cursor: pointer;
  color: #666666;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BalanceSection = styled.div`
  text-align: right;
  margin: 12px 0;
`;

const MainBalance = styled.div`
  font-size: 32px;
  font-weight: 700;
  color: #000000;
  letter-spacing: -0.8px;
  margin-bottom: 4px;
`;

const SubBalance = styled.div`
  font-size: 14px;
  color: #666666;
  letter-spacing: -0.2px;
`;

const ActionButton = styled.button`
  width: 100%;
  height: 48px;
  background-color: #f0f1f3;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  color: #333333;
  cursor: pointer;
  letter-spacing: -0.3px;
  
  &:hover {
    background-color: #e8e9eb;
  }
  
  &:active {
    background-color: #dfe0e2;
  }
`;

interface AccountInfoSectionProps {
  account: DatabaseAccount;
  showBalance: boolean;
  onToggleBalance: () => void;
}

/**
 * 계좌 정보 섹션 컴포넌트 (mainstart.jpg 정확한 매칭)
 * - KB국민ONE통장 + 편집 아이콘
 * - 계좌번호 + 드롭다운
 * - 설정 아이콘 우측 상단
 * - 큰 잔액 표시 + 작은 출금가능금액
 * - ATM/창구출금 회색 버튼
 */
const AccountInfoSection: React.FC<AccountInfoSectionProps> = ({
  account,
  showBalance,
  onToggleBalance
}) => {
  return (
    <AccountContainer>
      <AccountHeader>
        <AccountLeft>
          <AccountTitle>
            <AccountName>{account.account_name}</AccountName>
            <EditIcon>✏️</EditIcon>
          </AccountTitle>
          <AccountNumberRow>
            <AccountNumber>{account.account_number}</AccountNumber>
            <DropdownIcon>▼</DropdownIcon>
          </AccountNumberRow>
        </AccountLeft>
        <SettingsIcon>⚙️</SettingsIcon>
      </AccountHeader>
      
      <BalanceSection>
        <MainBalance>
          {showBalance ? formatCurrency(account.balance) : '•••••••'}원
        </MainBalance>
        <SubBalance>
          출금가능금액 {showBalance ? formatCurrency(account.balance) : '•••••••'}원
        </SubBalance>
      </BalanceSection>
      
      <ActionButton>ATM/창구출금</ActionButton>
    </AccountContainer>
  );
};

export default AccountInfoSection;