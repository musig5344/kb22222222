import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { KBDesignSystem } from '../../../styles/tokens/kb-design-system';
import { KBCard, KBButton } from '../../../components/kb-native';
import { Account } from '../../../services/api';
import { formatCurrency as formatCurrencyUtil } from '../../../utils/textFormatter';
import kbLogo from '../../../assets/images/icon_poup_kb_logo.png';
import { fadeInUp, staggerDelay, respectMotionPreference, smoothTransition } from '../../../styles/animations';
import { KBLoading } from '../../../shared/components/ui/UnifiedLoading';
import { 
  androidAppContainer,
  androidOptimizedScroll,
  androidOptimizedButton 
} from '../../../styles/android-webview-optimizations';
import { 
  universalCard,
  responsiveTypography,
  responsiveSizes,
  responsiveSpacing,
  breakpoints
} from '../../../styles/universal-responsive';
/**
 * KB 스타뱅킹 계좌 섹션 컴포넌트
 * - 원본 앱과 100% 동일한 레이아웃 및 스타일링
 * - 반응형 폰트 크기 시스템 (잔액 자릿수에 따른 동적 조정)
 * - 고성능 최적화 (React.memo, useMemo 활용)
 */
const AccountBannerSection = styled.section`
  background: ${KBDesignSystem.colors.background.white};
  padding: 0;
  
  /* Android WebView optimizations for mobile only */
  @media (max-width: ${breakpoints.tablet}px) {
    ${androidAppContainer}
    transform: translateZ(0);
    will-change: scroll-position;
  }
`;

const AccountBannerWrapper = styled.div`
  background: ${KBDesignSystem.colors.background.gray100};
  padding: ${responsiveSpacing.containerPadding};
  position: relative;
`;

const AccountBanner = styled.div`
  ${universalCard}
  margin: 0; /* Override universal card margin */
  background: ${KBDesignSystem.colors.background.white};
  box-shadow: ${KBDesignSystem.shadows.card};
  position: relative;
  min-height: calc(${responsiveSizes.touchTarget.recommended} * 4);
  overflow: hidden;
  
  /* 미세한 border highlight */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: ${responsiveSizes.card.borderRadius};
    border: 1px solid rgba(255, 255, 255, 0.8);
    pointer-events: none;
  }
`;
const KBLogoCircle = styled.div`
  width: ${responsiveSizes.icon.xlarge};
  height: ${responsiveSizes.icon.xlarge};
  background: ${KBDesignSystem.colors.background.white};
  border-radius: ${KBDesignSystem.borderRadius.full};
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  box-shadow: ${KBDesignSystem.shadows.sm};
  transition: all ${KBDesignSystem.animation.duration.normal} ${KBDesignSystem.animation.easing.easeOut};
  position: relative;
  
  /* 내부 하이라이트 */
  &::before {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    right: 2px;
    height: 16px;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.4) 0%, transparent 100%);
    border-radius: 50%;
  }
  
  img {
    width: ${responsiveSizes.icon.large};
    height: ${responsiveSizes.icon.large};
    object-fit: contain;
    position: relative;
    z-index: 1;
  }
`;
const AccountRow = styled.div<{ $animationIndex?: number }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  cursor: pointer;
  transition: all ${KBDesignSystem.animation.duration.normal} ${KBDesignSystem.animation.easing.easeOut};
  padding: ${responsiveSpacing.lg};
  margin: -${responsiveSpacing.xs};
  border-radius: ${responsiveSizes.card.borderRadius};
  min-height: calc(${responsiveSizes.touchTarget.recommended} * 2.2);
  position: relative;
  
  /* Touch optimizations for all devices */
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  min-width: ${responsiveSizes.touchTarget.minimum};
  
  /* 스태거 애니메이션 */
  animation: ${fadeInUp} 0.5s ease-out forwards;
  ${props => props.$animationIndex && staggerDelay(props.$animationIndex, 0.1)}
  opacity: 0;
  transform: translate3d(0, 30px, 0);
  ${respectMotionPreference}
  ${smoothTransition}
  
  &:first-child {
    margin-bottom: ${responsiveSpacing.lg};
  }
  
  &:hover {
    background-color: ${KBDesignSystem.colors.primary.yellowAlpha10};
    transform: translate3d(0, -2px, 0);
    /* KB 로고 회전 효과 */
    ${KBLogoCircle} {
      transform: rotate(5deg);
    }
  }
  
  &:active {
    transform: translate3d(0, 0, 0);
    transition: all ${KBDesignSystem.animation.duration.fast} ${KBDesignSystem.animation.easing.easeOut};
  }
`;
const AccountLeft = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${responsiveSpacing.md};
  width: 100%;
`;

const AccountInfo = styled.div`
  text-align: left;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: ${responsiveSpacing.xs};
`;

const AccountName = styled.div`
  ${responsiveTypography.titleMedium}
  color: ${KBDesignSystem.colors.text.primary};
`;

const AccountNumber = styled.div`
  ${responsiveTypography.bodySmall}
  color: ${KBDesignSystem.colors.text.secondary};
  font-family: ${KBDesignSystem.typography.fontFamily.mono};
  letter-spacing: 0.5px;
  white-space: nowrap;
`;
const AccountBalance = styled.div`
  position: absolute;
  bottom: ${responsiveSpacing.lg};
  right: ${responsiveSpacing.lg};
  text-align: right;
`;
const BalanceAmount = styled.div<{ $amount: number }>`
  ${responsiveTypography.numberLarge}
  color: ${KBDesignSystem.colors.text.primary};
  display: flex;
  align-items: baseline;
  justify-content: flex-end;
  max-width: 100%;
  word-break: keep-all;
`;

const BalanceWon = styled.span<{ $amount: number }>`
  ${responsiveTypography.titleSmall}
  margin-left: ${responsiveSpacing.xs};
  color: ${KBDesignSystem.colors.text.primary};
`;
const TotalAccountButton = styled.button`
  width: 100%;
  height: ${responsiveSizes.button.heightMedium};
  min-height: ${responsiveSizes.touchTarget.minimum};
  
  display: flex;
  align-items: center;
  justify-content: center;
  
  background: ${KBDesignSystem.colors.background.gray200};
  border: none;
  border-radius: ${responsiveSizes.button.borderRadius};
  padding: 0 ${responsiveSizes.button.paddingHorizontal};
  
  ${responsiveTypography.labelLarge}
  color: ${KBDesignSystem.colors.text.secondary};
  
  margin-top: ${responsiveSpacing.md};
  cursor: pointer;
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
  
  transition: all ${KBDesignSystem.animation.duration.normal} ${KBDesignSystem.animation.easing.easeOut};
  
  /* Android WebView optimizations for mobile only */
  @media (max-width: ${breakpoints.tablet}px) {
    ${androidOptimizedButton}
    will-change: transform;
    backface-visibility: hidden;
  }
  
  /* 버튼 하이라이트 효과 */
  &::before {
    content: '';
    position: absolute;
    top: 1px;
    left: 1px;
    right: 1px;
    height: 50%;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.2) 0%, transparent 100%);
    border-radius: ${responsiveSizes.button.borderRadius};
  }
  
  &:hover {
    background: ${KBDesignSystem.colors.primary.yellowDark};
    transform: translateY(-2px);
    box-shadow: ${KBDesignSystem.shadows.lg};
  }
  
  &:active {
    transform: translateY(0) scale(0.98);
    box-shadow: ${KBDesignSystem.shadows.sm};
    transition: all ${KBDesignSystem.animation.duration.fast} ${KBDesignSystem.animation.easing.easeOut};
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }
`;
const AccountPagination = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: ${responsiveSpacing.md};
  padding: 0 ${responsiveSpacing.containerPadding};
`;

const PaginationText = styled.div`
  ${responsiveTypography.labelMedium}
  color: ${KBDesignSystem.colors.text.secondary};
`;

const ViewAllButton = styled.button`
  background: none;
  border: none;
  ${responsiveTypography.labelMedium}
  color: ${KBDesignSystem.colors.text.secondary};
  
  padding: ${responsiveSpacing.sm} ${responsiveSpacing.md};
  border-radius: ${responsiveSizes.button.borderRadius};
  cursor: pointer;
  
  min-height: ${responsiveSizes.touchTarget.minimum};
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  
  transition: all ${KBDesignSystem.animation.duration.fast} ease;
  
  /* Android WebView optimizations for mobile only */
  @media (max-width: ${breakpoints.tablet}px) {
    ${androidOptimizedButton}
  }
  
  &:hover {
    background: ${KBDesignSystem.colors.background.gray100};
  }
`;
interface AccountSectionProps {
  accounts: Account[];
  className?: string;
}
export const AccountSection: React.FC<AccountSectionProps> = React.memo(({ 
  accounts, 
  className 
}) => {
  const navigate = useNavigate();
  const [isTransferLoading, setIsTransferLoading] = useState(false);
  
  // 최대 2개 계좌만 표시 (성능 최적화)
  const displayedAccounts = useMemo(() => {
    return accounts.slice(0, 2);
  }, [accounts]);
  // 잔액 포맷팅 함수 (메모이제이션)
  const formatCurrency = useMemo(() => {
    return (amount: number) => {
      if (!amount || amount < 0) return '0';
      return formatCurrencyUtil(amount);
    };
  }, []);

  // 이체 버튼 클릭 핸들러 - 실제 KB 스타뱅킹과 유사한 로딩 경험
  const handleTransferClick = () => {
    setIsTransferLoading(true);
    // 자연스러운 로딩 시간 (실제 뱅킹 앱과 유사)
    setTimeout(() => {
      navigate('/transfer');
      setIsTransferLoading(false);
    }, 1200);
  };
  return (
    <>
      {isTransferLoading && (
        <KBLoading 
          isVisible={true} 
          type="fullscreen" 
          variant="type1" 
          size="large" 
          message="이체 서비스를 준비하고 있습니다"
        />
      )}
      <AccountBannerSection className={className}>
        <AccountBannerWrapper>
          <AccountBanner>
          {displayedAccounts.map((account, index) => (
            <AccountRow 
              key={account.id} 
              $animationIndex={index}
              as={Link}
              to={`/account/${account.id}`}
            >
              <AccountLeft>
                <KBLogoCircle>
                  <img src={kbLogo} alt="KB" />
                </KBLogoCircle>
                <AccountInfo>
                  <AccountName>{account.account_name}</AccountName>
                  <AccountNumber>{account.account_number}</AccountNumber>
                </AccountInfo>
              </AccountLeft>
              <AccountBalance>
                <BalanceAmount $amount={account.balance}>
                  {formatCurrency(account.balance)}
                  <BalanceWon $amount={account.balance}>원</BalanceWon>
                </BalanceAmount>
              </AccountBalance>
            </AccountRow>
          ))}
          <TotalAccountButton>
            총금계좌등록
          </TotalAccountButton>
        </AccountBanner>
        <AccountPagination>
          <PaginationText>1 / 3</PaginationText>
          <ViewAllButton onClick={() => navigate('/account')}>
            전체계좌 보기
          </ViewAllButton>
        </AccountPagination>
      </AccountBannerWrapper>
    </AccountBannerSection>
    </>
  );
});
AccountSection.displayName = 'AccountSection';
export default AccountSection;