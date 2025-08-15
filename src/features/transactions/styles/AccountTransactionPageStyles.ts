import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { tokens } from '../../../styles/tokens';
import { responsiveContainer } from '../../../styles/responsive';
export const Container = styled.div`
  ${responsiveContainer}
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  height: 100%;
  background-color: #f5f6f8;
`;
export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  height: 64px;
  background-color: ${tokens.colors.white};
  border-bottom: 1px solid #ebeef0;
`;
export const BackButton = styled.button`
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  img {
    width: 24px;
    height: 24px;
    object-fit: contain;
  }
  &:active {
    opacity: 0.7;
  }
`;
export const HeaderTitle = styled.h1`
  font-size: 20px;
  font-weight: 600;
  color: #333333;
  margin: 0;
  flex: 1;
  text-align: center;
  letter-spacing: -0.5px;
`;
export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;
export const HomeButton = styled(Link)`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 20px;
    height: 20px;
    object-fit: contain;
  }
  &:active {
    opacity: 0.7;
  }
`;
export const MenuButton = styled.button`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  img {
    width: 20px;
    height: 20px;
    object-fit: contain;
  }
  &:active {
    opacity: 0.7;
  }
`;
export const AccountSection = styled.div`
  background-color: ${tokens.colors.white};
  border-bottom: 1px solid #ebeef0;
`;
export const AccountDropdown = styled.div`
  padding: 16px 20px;
  border-bottom: 1px solid #f5f6f8;
  background: #fbfbfb;
  cursor: pointer;
  &:active {
    background-color: #f5f6f8;
  }
`;
export const AccountInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
export const AccountDetails = styled.div`
  flex: 1;
`;
export const AccountLabel = styled.div`
  font-size: 14px;
  color: #666666;
  margin-bottom: 4px;
`;
export const AccountNumber = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #333333;
  letter-spacing: -0.3px;
`;
export const AccountTypeBadge = styled.span`
  display: inline-block;
  padding: 3px 8px;
  background-color: #f5f6f8;
  color: #666666;
  font-size: 12px;
  border-radius: 4px;
  margin-left: 8px;
`;
export const DropdownIcon = styled.img`
  width: 20px;
  height: 20px;
  transform: ${props => props.isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
  transition: transform 0.2s ease;
`;
export const BalanceSection = styled.div`
  padding: 20px;
  background-color: ${tokens.colors.white};
`;
export const BalanceHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
`;
export const BalanceLabel = styled.div`
  font-size: 14px;
  color: #666666;
`;
export const BalanceToggle = styled.button`
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  img {
    width: 20px;
    height: 20px;
  }
  &:active {
    opacity: 0.7;
  }
`;
export const BalanceAmount = styled.div`
  font-size: 28px;
  font-weight: 700;
  color: #333333;
  letter-spacing: -0.5px;
  &.hidden {
    color: #999999;
  }
`;
export const TransactionSection = styled.div`
  flex: 1;
  overflow-y: auto;
  background-color: #f5f6f8;
`;
export const FilterBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 20px;
  background-color: ${tokens.colors.white};
  border-bottom: 1px solid #ebeef0;
`;
export const DateRangeDisplay = styled.div`
  font-size: 14px;
  color: #666666;
  display: flex;
  align-items: center;
  gap: 4px;
  &::before {
    content: '';
    width: 14px;
    height: 14px;
    background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIHZpZXdCb3g9IjAgMCAxNCAxNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEwLjUgMkgxMS42NjY3QzEyLjQwMyAyIDEzIDIuNTk3IDEzIDMuMzMzMzNWMTEuNjY2N0MxMyAxMi40MDMgMTIuNDAzIDEzIDExLjY2NjcgMTNIMi4zMzMzM0MxLjU5NyAxMyAxIDEyLjQwMyAxIDExLjY2NjdWMy4zMzMzM0MxIDIuNTk3IDEuNTk3IDIgMi4zMzMzMyAySDMuNVYxSDQuNVYySDkuNVYxSDEwLjVWMloiIHN0cm9rZT0iIzY2NjY2NiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+CjxwYXRoIGQ9Ik0xIDUuNUgxMyIgc3Ryb2tlPSIjNjY2NjY2IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+');
    background-size: contain;
  }
`;
export const FilterButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background-color: ${props => props.isFiltered ? '#4B5EFF' : '#f5f6f8'};
  color: ${props => props.isFiltered ? '#ffffff' : '#666666'};
  border: none;
  border-radius: 20px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  img {
    width: 16px;
    height: 16px;
    ${props => props.isFiltered && 'filter: brightness(0) invert(1);'}
  }
  &:active {
    transform: scale(0.95);
  }
`;
export const NoTransactions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 20px;
  text-align: center;
`;
export const NoTransactionsIcon = styled.div`
  width: 80px;
  height: 80px;
  background-color: #f5f6f8;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  &::after {
    content: '📋';
    font-size: 40px;
  }
`;
export const NoTransactionsText = styled.div`
  font-size: 16px;
  color: #999999;
  line-height: 1.5;
`;
export const LoadMoreTrigger = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;
export const LoadingSpinner = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid #e0e0e0;
  border-top-color: #4B5EFF;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;