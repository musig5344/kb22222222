import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { KBDesignSystem } from '../../../styles/tokens/kb-design-system';
import { 
  universalCard,
  responsiveTypography,
  responsiveSizes,
  responsiveSpacing,
  breakpoints
} from '../../../styles/universal-responsive';

/**
 * KB 스타뱅킹 단순화된 계좌 섹션 컴포넌트
 * - 원본 앱 스크린샷과 정확히 일치하는 단순한 레이아웃
 * - "종금계좌등록" 카드만 표시
 */
const AccountBannerSection = styled.section`
  background: ${KBDesignSystem.colors.background.white};
  /* Adjusted spacing to match reference screenshot */
  padding: 8px 0;
  
  /* Android WebView optimizations for mobile only */
  @media (max-width: ${breakpoints.tablet}px) {
    transform: translateZ(0);
    will-change: scroll-position;
  }
`;

const AccountBannerWrapper = styled.div`
  background: ${KBDesignSystem.colors.background.gray100};
  /* Precise padding matching reference screenshot */
  padding: 16px;
  position: relative;
`;

const AccountBanner = styled.div`
  ${universalCard}
  margin: 0; /* Override universal card margin */
  background: ${KBDesignSystem.colors.background.white};
  box-shadow: ${KBDesignSystem.shadows.card};
  position: relative;
  /* Exact height matching reference screenshot proportions */
  min-height: 120px;
  height: 120px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* Precise padding matching reference screenshot */
  padding: 24px;
  
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

const AccountRegistrationText = styled.div`
  /* Exact font size and styling matching reference screenshot */
  font-size: 16px;
  font-weight: 500;
  color: ${KBDesignSystem.colors.text.secondary};
  text-align: center;
  line-height: 1.4;
  letter-spacing: 0;
`;

const AccountPagination = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* Precise spacing matching reference screenshot */
  margin-top: 16px;
  padding: 0 16px;
`;

const PaginationText = styled.div`
  /* Exact font size matching reference screenshot */
  font-size: 14px;
  font-weight: 400;
  color: ${KBDesignSystem.colors.text.secondary};
  line-height: 1.4;
`;

const ViewAllButton = styled.button`
  background: none;
  border: none;
  /* Exact font size and styling matching reference screenshot */
  font-size: 14px;
  font-weight: 400;
  color: ${KBDesignSystem.colors.text.secondary};
  line-height: 1.4;
  
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  
  min-height: 32px;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  
  transition: all ${KBDesignSystem.animation.duration.fast} ease;
  
  /* Android WebView optimizations for mobile only */
  @media (max-width: ${breakpoints.tablet}px) {
    will-change: transform;
    backface-visibility: hidden;
  }
  
  &:hover {
    background: ${KBDesignSystem.colors.background.gray100};
  }
`;

interface SimplifiedAccountSectionProps {
  className?: string;
}

export const SimplifiedAccountSection: React.FC<SimplifiedAccountSectionProps> = ({ 
  className 
}) => {
  const navigate = useNavigate();

  return (
    <AccountBannerSection className={className}>
      <AccountBannerWrapper>
        <AccountBanner>
          <AccountRegistrationText>
            종금계좌등록
          </AccountRegistrationText>
        </AccountBanner>
        <AccountPagination>
          <PaginationText>1 / 3</PaginationText>
          <ViewAllButton onClick={() => navigate('/account')}>
            전체계좌 보기
          </ViewAllButton>
        </AccountPagination>
      </AccountBannerWrapper>
    </AccountBannerSection>
  );
};

export default SimplifiedAccountSection;