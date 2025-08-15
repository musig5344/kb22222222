import React, { memo, useMemo } from 'react';
import styled from 'styled-components';
import { Transaction } from '../../../services/api';
import { formatCurrency } from '../../../utils/textFormatter';
import { listItemFadeIn, staggerDelay, respectMotionPreference } from '../../../styles/animations';
const ItemContainer = styled.div<{ $animationIndex?: number }>`
  padding: 18px 24px;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
  transition: background-color 0.2s ease;
  animation: ${listItemFadeIn} 0.4s ease-out forwards;
  ${props => props.$animationIndex && staggerDelay(props.$animationIndex, 0.05)}
  opacity: 0;
  transform: translate3d(0, 20px, 0);
  ${respectMotionPreference}
  &:hover {
    background-color: rgba(0, 0, 0, 0.02);
  }
  &:last-child {
    border-bottom: none;
  }
`;
const ItemContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;
const ItemInfo = styled.div`
  flex: 1;
`;
const Description = styled.div`
  font-size: 17px;
  font-weight: 500;
  color: #000000;
  line-height: 1.4;
  letter-spacing: -0.3px;
`;
const DateTime = styled.div`
  font-size: 14px;
  color: #666666;
  line-height: 1.3;
  letter-spacing: -0.2px;
  margin-bottom: 4px;
`;
const AmountSection = styled.div`
  text-align: right;
  flex-shrink: 0;
  margin-left: 16px;
`;
const Amount = styled.div<{ $isPositive: boolean }>`
  font-size: 18px;
  font-weight: 600;
  color: ${props => props.$isPositive ? '#4285F4' : '#E74C3C'};
  margin-bottom: 6px;
  white-space: nowrap;
  letter-spacing: -0.5px;
`;
const Balance = styled.div`
  font-size: 13px;
  color: #666666;
  white-space: nowrap;
  letter-spacing: -0.2px;
`;
interface TransactionItemProps {
  transaction: Transaction;
  showBalance?: boolean;
  onClick?: (transaction: Transaction) => void;
  dateFormat?: 'full' | 'time' | 'date';
  animationIndex?: number;
}
export const TransactionItem: React.FC<TransactionItemProps> = memo(({
  transaction,
  showBalance = true,
  onClick,
  dateFormat = 'full',
  animationIndex = 0
}) => {
  const formattedDate = useMemo(() => {
    const date = new Date(transaction.transaction_date);
    // KB StarBanking exact format: 2025.05.20 16:29:53
    return date.toLocaleString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    }).replace(/\. /g, '.').replace(/, /g, ' ');
  }, [transaction.transaction_date, dateFormat]);
  // Determine if transaction is positive (입금) or negative (출금/이체)
  // Use both type and amount to determine color
  const isPositive = transaction.transaction_type === '입금' || transaction.amount > 0;
  
  // For display purposes, show proper Korean transaction type
  const typeText = transaction.transaction_type === '이체' ? '출금' : 
                   transaction.transaction_type === '입금' ? '입금' : 
                   transaction.amount > 0 ? '입금' : '출금';

  return (
    <ItemContainer $animationIndex={animationIndex} onClick={() => onClick?.(transaction)}>
      <ItemContent>
        <ItemInfo>
          <DateTime>{formattedDate}</DateTime>
          <Description>{transaction.description}</Description>
        </ItemInfo>
        <AmountSection>
          <Amount $isPositive={isPositive}>
            {typeText} {formatCurrency(Math.abs(transaction.amount))}원
          </Amount>
          {showBalance && (
            <Balance>잔액 {formatCurrency(transaction.balance_after)}원</Balance>
          )}
        </AmountSection>
      </ItemContent>
    </ItemContainer>
  );
});
export default TransactionItem;