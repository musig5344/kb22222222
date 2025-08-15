import styled from 'styled-components';
import { tokens } from '../../../styles/tokens';
import * as Typography from '../../../shared/components/ui/Typography';
import { PageContainer } from '../../../shared/components/layout/MobileContainer';
import { mobileMediaQueries, responsiveContent } from '../../../styles/responsive';

/* === 메인 컨테이너 === */
export const AccountPageContainer = styled(PageContainer)`
  background-color: ${tokens.colors.background.primary};
`;

export const MainContent = styled.main`
  ${responsiveContent}
  flex: 1;
  padding-bottom: 60px;
`;

/* === 헤더 (디자인 시스템 적용) === */
export const AccountHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${tokens.sizes.header.paddingVertical} ${tokens.sizes.header.paddingHorizontal};
  height: ${tokens.sizes.header.height};
  background-color: ${tokens.colors.background.primary};
  border-bottom: 1px solid ${tokens.colors.border.primary};
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: ${tokens.app.maxWidth};
  z-index: ${tokens.zIndex.header};
  @media (min-width: 431px) {
    box-shadow: ${tokens.shadows.elevation2};
  }
  ${mobileMediaQueries.small} {
    padding: ${tokens.spacing[2]} ${tokens.spacing[4]};
  }
  ${mobileMediaQueries.medium} {
    padding: ${tokens.spacing[2]} ${tokens.spacing[5]};
  }
`;

export const HeaderButton = styled.button`
  background: none;
  border: none;
  padding: ${tokens.spacing[2]};
  cursor: pointer;
  width: ${tokens.sizes.header.height};
  height: ${tokens.sizes.header.height};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${tokens.borderRadius.medium};
  color: ${tokens.colors.text.black};
  transition: background-color ${tokens.animation.duration.fast} ${tokens.animation.easing.easeInOut};
  img {
    width: 24px;
    height: 24px;
    object-fit: contain;
    filter: brightness(0);
  }
  &:active {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

export const HeaderTitle = styled(Typography.Title)`
  flex: 1;
  margin: 0;
  text-align: center;
  font-size: 18px;
`;

export const HeaderRightButtons = styled.div`
  display: flex;
  gap: ${tokens.spacing[2]};
`;

/* === 계좌 정보 섹션 (디자인 시스템 적용) === */
export const AccountInfoSection = styled.div`
  background-color: ${tokens.colors.background.primary};
  padding: ${tokens.spacing[3]} ${tokens.sizes.page.paddingHorizontal} ${tokens.sizes.page.paddingHorizontal};
  margin-top: ${tokens.sizes.header.height};
  border-bottom: 1px solid ${tokens.colors.divider.light};
  display: flex;
  flex-direction: column;
  gap: ${tokens.spacing[1]};
`;

export const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${tokens.spacing[1]};
`;

export const MiddleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${tokens.spacing[2]};
`;

export const BottomRow = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: ${tokens.spacing[5]};
`;

export const LeftSection = styled.div`
  display: flex;
  align-items: center;
`;

export const RightSection = styled.div`
  display: flex;
  align-items: center;
`;

export const AccountName = styled(Typography.Body)`
  color: ${tokens.colors.text.secondary};
  display: flex;
  align-items: center;
  gap: ${tokens.spacing[1]};
`;

export const EditIcon = styled.button`
  background: none;
  border: none;
  color: ${tokens.colors.text.tertiary};
  font-size: ${tokens.typography.fontSize.bodyMedium};
  cursor: pointer;
  padding: 2px;
`;

export const SettingsIcon = styled.button`
  background: none;
  border: none;
  color: ${tokens.colors.text.tertiary};
  font-size: ${tokens.typography.fontSize.bodyLarge};
  cursor: pointer;
  padding: 2px;
`;

export const BalanceSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 2px;
`;

export const AccountNumber = styled(Typography.Caption)`
  color: ${tokens.colors.text.secondary};
  letter-spacing: 0.2px;
`;

export const LargeBalance = styled(Typography.Title)`
  font-size: 32px;
  font-weight: bold;
  color: ${tokens.colors.text.primary};
`;

export const AvailableBalance = styled(Typography.Caption)`
  color: ${tokens.colors.text.tertiary};
  text-align: right;
`;

export const ATMButton = styled.button`
  background-color: ${tokens.colors.background.tertiary};
  border: none;
  border-radius: ${tokens.borderRadius.large};
  padding: ${tokens.spacing[3]} 0;
  font-size: ${tokens.typography.fontSize.bodyMedium};
  color: ${tokens.colors.text.primary};
  cursor: pointer;
  margin-top: ${tokens.spacing[4]};
  width: 100%;
  font-weight: ${tokens.typography.fontWeight.medium};
  letter-spacing: -0.3px;
  transition: all ${tokens.animation.duration.normal} ${tokens.animation.easing.easeInOut};
  &:hover {
    background-color: ${tokens.colors.divider.medium};
  }
  &:active {
    background-color: ${tokens.colors.divider.strong};
  }
`;

/* === 필터 섹션 (디자인 시스템 적용) === */
export const FilterSection = styled.div`
  background-color: ${tokens.colors.background.primary};
  padding: ${tokens.spacing[4]} ${tokens.sizes.page.paddingHorizontal};
  border-bottom: 1px solid ${tokens.colors.border.primary};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SearchIcon = styled.button`
  background: none;
  border: none;
  padding: ${tokens.spacing[2]};
  cursor: pointer;
  color: ${tokens.colors.text.secondary};
  &::before {
    content: '🔍';
    font-size: ${tokens.typography.fontSize.bodyLarge};
  }
`;

export const FilterOptions = styled.div`
  display: flex;
  align-items: center;
  gap: ${tokens.spacing[3]};
`;

export const FilterButton = styled.button`
  background: none;
  border: none;
  font-size: ${tokens.typography.fontSize.bodyMedium};
  color: ${tokens.colors.text.secondary};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: ${tokens.spacing[1]};
  &::after {
    content: '▼';
    font-size: ${tokens.typography.fontSize.labelSmall};
  }
`;

export const ToggleSwitch = styled.div<{ enabled: boolean }>`
  width: 48px;
  height: 24px;
  background: ${props => props.enabled ? tokens.colors.text.primary : tokens.colors.border.tertiary};
  border-radius: ${tokens.borderRadius.pill};
  position: relative;
  cursor: pointer;
  transition: all ${tokens.animation.duration.normal} ${tokens.animation.easing.easeInOut};
  &::after {
    content: '';
    position: absolute;
    top: 2px;
    left: ${props => props.enabled ? '26px' : '2px'};
    width: 20px;
    height: 20px;
    background: ${tokens.colors.background.primary};
    border-radius: ${tokens.borderRadius.round};
    transition: all ${tokens.animation.duration.normal} ${tokens.animation.easing.easeInOut};
  }
`;

/* === 날짜 범위 표시 (디자인 시스템 적용) === */
export const DateRangeSection = styled.div`
  background-color: ${tokens.colors.background.primary};
  padding: ${tokens.spacing[4]} ${tokens.sizes.page.paddingHorizontal};
  border-bottom: 1px solid ${tokens.colors.border.primary};
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const DateRangeText = styled(Typography.Caption)`
  color: ${tokens.colors.text.secondary};
`;

/* === 날짜별 거래내역 섹션 (디자인 시스템 적용) === */
export const TransactionSection = styled.div`
  background-color: ${tokens.colors.background.primary};
  padding: ${tokens.spacing[4]} ${tokens.sizes.page.paddingHorizontal} 40px;
  position: relative;
  ${mobileMediaQueries.small} {
    padding: ${tokens.spacing[4]};
  }
  ${mobileMediaQueries.medium} {
    padding: ${tokens.spacing[5]};
  }
`;

export const DateHeader = styled(Typography.Caption)`
  color: ${tokens.colors.text.tertiary};
  font-weight: 500;
  margin: ${tokens.spacing[5]} 0 ${tokens.spacing[4]} 0;
  padding-bottom: ${tokens.spacing[2]};
  display: flex;
  align-items: center;
  &:first-child {
    margin-top: 0;
    margin-bottom: ${tokens.spacing[4]};
  }
`;

export const TransactionList = styled.div`
  display: flex;
  flex-direction: column;
`;

export const TransactionItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: ${tokens.spacing[3]} 0;
  border-bottom: 1px solid ${tokens.colors.divider.light};
  &:last-child {
    border-bottom: none;
  }
  ${mobileMediaQueries.small} {
    padding: ${tokens.spacing[3]} 0;
    flex-direction: column;
    align-items: flex-start;
    gap: ${tokens.spacing[1]};
  }
`;

export const TransactionLeft = styled.div`
  flex: 1;
`;

export const TransactionTime = styled(Typography.Caption)`
  color: ${tokens.colors.text.tertiary};
  margin-bottom: 3px;
`;

export const TransactionDesc = styled(Typography.Body)`
  font-weight: 500;
  margin-top: 1px;
`;

export const TransactionRight = styled.div`
  text-align: right;
`;

export const TransactionAmount = styled.div`
  font-weight: 600;
  font-size: 14px;
  margin-bottom: 2px;
  text-align: right;
`;

export const TransactionBalance = styled(Typography.Caption)`
  color: ${tokens.colors.text.tertiary};
  text-align: right;
`;

/* === 스크롤 투 탑 버튼 (디자인 시스템 적용) === */
export const ScrollToTopButton = styled.button`
  position: fixed;
  bottom: 90px;
  right: 50%;
  transform: translateX(calc(215px - 24px));
  width: 44px;
  height: 44px;
  background-color: rgba(255, 255, 255, 0.95);
  border: 1px solid ${tokens.colors.border.primary};
  border-radius: ${tokens.borderRadius.round};
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${tokens.shadows.elevation2};
  cursor: pointer;
  transition: all ${tokens.animation.duration.normal} ${tokens.animation.easing.easeInOut};
  backdrop-filter: blur(8px);
  @media (max-width: 430px) {
    right: 24px;
    transform: none;
  }
  img {
    width: 18px;
    height: 18px;
    object-fit: contain;
    opacity: 0.7;
  }
  &:hover {
    background-color: ${tokens.colors.background.secondary};
    transform: translateY(-2px) translateX(calc(215px - 24px));
    @media (max-width: 430px) {
      transform: translateY(-2px);
    }
    box-shadow: ${tokens.shadows.elevation3};
  }
  &:active {
    transform: translateY(0) translateX(calc(215px - 24px));
    @media (max-width: 430px) {
      transform: translateY(0);
    }
    box-shadow: ${tokens.shadows.elevation1};
  }
`;