import styled from 'styled-components';
import { tokens } from '../../../styles/tokens';
import { 
  universalAppContainer, 
  universalMainContent,
  responsiveSpacing,
  responsiveSizes,
  breakpoints
} from '../../../styles/universal-responsive';

/**
 * 모바일 컨테이너 - Universal responsive design
 * Consistent layout across all screen sizes with proper scaling
 */
export const MobileContainer = styled.div`
  ${universalAppContainer}
  background-color: ${tokens.colors.background.primary};
`;
/**
 * 페이지 컨테이너 - Universal responsive design with TabBar consideration
 */
export const PageContainer = styled.div`
  ${universalAppContainer}
  display: flex;
  flex-direction: column;
  background-color: ${tokens.colors.background.secondary};
`;
/**
 * 페이지 콘텐츠 - Universal responsive main content area
 */
export const PageContent = styled.main`
  ${universalMainContent}
`;
/**
 * 고정 하단 컨테이너 - Universal responsive design
 */
export const FixedBottomContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  background-color: ${tokens.colors.background.primary};
  border-top: 1px solid ${tokens.colors.border.primary};
  z-index: ${tokens.app.zIndex.sticky};
  
  /* Desktop centering */
  @media (min-width: ${breakpoints.tablet + 1}px) {
    left: 50%;
    transform: translateX(-50%);
    width: ${breakpoints.xl}px;
    max-width: ${breakpoints.xl}px;
  }
`;
/**
 * 고정 하단 버튼 영역 - Universal responsive design with TabBar consideration
 */
export const FixedBottomButtonArea = styled(FixedBottomContainer)`
  padding: ${responsiveSpacing.lg} ${responsiveSpacing.containerPadding};
  padding-bottom: calc(${responsiveSpacing.lg} + ${responsiveSizes.navigation.height} + env(safe-area-inset-bottom));
`;
/**
 * 전체화면 모달 컨테이너 - Universal responsive design
 */
export const FullScreenModalContainer = styled.div`
  ${universalAppContainer}
  position: fixed;
  top: 0;
  left: 0;
  background-color: ${tokens.colors.background.primary};
  z-index: ${tokens.app.zIndex.modal};
  overflow: hidden;
  
  /* Desktop centering and styling */
  @media (min-width: ${breakpoints.tablet + 1}px) {
    left: 50%;
    transform: translateX(-50%);
    width: ${breakpoints.xl}px;
    max-width: ${breakpoints.xl}px;
    box-shadow: ${tokens.shadows.elevation6};
  }
`;