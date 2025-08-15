import styled, { keyframes, css } from 'styled-components';
import { KBDesignSystem } from '../../../styles/tokens/kb-design-system';
import {
  androidAppContainer,
  androidOptimizedButton,
  androidOptimizedAnimation,
  androidOptimizedScroll
} from '../../../styles/android-webview-optimizations';
import {
  universalAppContainer,
  universalHeader,
  universalMainContent,
  universalButton,
  responsiveTypography,
  responsiveSpacing,
  responsiveSizes,
  breakpoints
} from '../../../styles/universal-responsive';

// 스크린 리더 전용 스타일
export const GlobalStyles = `
  .sr-only {
    position: absolute !important;
    width: 1px !important;
    height: 1px !important;
    padding: 0 !important;
    margin: -1px !important;
    overflow: hidden !important;
    clip: rect(0, 0, 0, 0) !important;
    white-space: nowrap !important;
    border: 0 !important;
  }
  .sr-only:focus {
    position: static !important;
    width: auto !important;
    height: auto !important;
    padding: 0.5rem !important;
    margin: 0 !important;
    overflow: visible !important;
    clip: auto !important;
    white-space: normal !important;
    background-color: ${KBDesignSystem.colors.primary.yellow} !important;
    color: ${KBDesignSystem.colors.text.primary} !important;
    border: 2px solid ${KBDesignSystem.colors.text.primary} !important;
    border-radius: ${KBDesignSystem.borderRadius.xs} !important;
  }
`;

// 애니메이션 정의
export const slideUp = keyframes`
  from {
    transform: translateY(100%);
  }
  to {
    transform: translateY(0);
  }
`;

export const slideDown = keyframes`
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(100%);
  }
`;

// 1. CoordinatorLayout - Universal responsive design
export const CoordinatorLayout = styled.div`
  ${universalAppContainer}
  
  background: linear-gradient(180deg, ${KBDesignSystem.colors.background.gray100} 0%, ${KBDesignSystem.colors.background.white} 10%);
  display: flex;
  flex-direction: column;
  
  /* Android WebView optimizations for mobile */
  @media (max-width: ${breakpoints.tablet}px) {
    touch-action: pan-y;
    overscroll-behavior: none;
  }
  
  /* Accessibility support */
  @media (prefers-contrast: high) {
    background-color: ${KBDesignSystem.colors.background.white};
    border: 2px solid ${KBDesignSystem.colors.text.primary};
  }
  
  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
  
  @media (prefers-color-scheme: dark) {
    background-color: #1A1A1A;
    color: ${KBDesignSystem.colors.text.inverse};
  }
`;

// 2. BackSurfaceView
export const BackSurfaceView = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${KBDesignSystem.colors.overlay.black50};
  opacity: ${props => props.$isOpen ? 1 : 0};
  transition: opacity ${KBDesignSystem.animation.duration.normal} ${KBDesignSystem.animation.easing.easeOut};
  z-index: ${KBDesignSystem.zIndex.modalBackdrop};
  pointer-events: ${props => props.$isOpen ? 'auto' : 'none'};
`;

// 3. ContentLayout - Android WebView 최적화
export const ContentLayout = styled.div`
  ${androidOptimizedScroll}
  flex: 1;
  background: linear-gradient(180deg, ${KBDesignSystem.colors.background.gray100} 0%, ${KBDesignSystem.colors.background.white} 15%);
  display: flex;
  flex-direction: column;
  position: relative;
  
  /* Android WebView 성능 최적화 */
  transform: translateZ(0);
  will-change: scroll-position;
`;

// 4. NewLoginMainContainer - Universal responsive design
export const NewLoginMainContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: ${responsiveSpacing.page} 0 ${responsiveSpacing.section} 0;
  background-color: ${KBDesignSystem.colors.background.white}; 
  min-height: 0;        
  position: relative;
  
  /* Touch optimizations */
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  
  /* Performance optimizations */
  transform: translateZ(0);
  will-change: transform;
`;

// 5. LoginOptionText
export const LoginOptionText = styled.span`
  font-family: ${KBDesignSystem.typography.fontFamily.primary};
  font-size: ${KBDesignSystem.typography.fontSize.base};
  font-weight: ${KBDesignSystem.typography.fontWeight.bold};
  color: ${KBDesignSystem.colors.text.primary};
  margin-top: ${KBDesignSystem.spacing.xs};
  letter-spacing: ${KBDesignSystem.typography.letterSpacing.tight};
`;

// 6. TitleSection
export const TitleSection = styled.div`
  text-align: center;
  margin-bottom: ${responsiveSpacing.section};
  padding: 0 ${responsiveSpacing.containerPadding};
  position: relative;
  z-index: 1;
`;

// 7. MainTitle
export const MainTitle = styled.h1`
  ${responsiveTypography.displayMedium}
  font-family: ${KBDesignSystem.typography.fontFamily.primary};
  color: ${KBDesignSystem.colors.text.primary};
  margin-bottom: ${responsiveSpacing.lg};
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`;

// 8. SubTitle
export const SubTitle = styled.p`
  ${responsiveTypography.bodyLarge}
  font-family: ${KBDesignSystem.typography.fontFamily.primary};
  color: #666666;
  margin: 0;
  text-align: center;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
`;

// 9. LoginOptionsContainer
export const LoginOptionsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: ${responsiveSpacing.section};
  margin: ${responsiveSpacing.section} 0 ${responsiveSpacing.page} 0;
  padding: 0 ${responsiveSpacing.containerPadding};
  position: relative;
  z-index: 2;
`;

// 10. LoginOptionButton - Universal responsive design
export const LoginOptionButton = styled.button`
  ${universalButton}
  background: none;
  border: none;
  flex-direction: column;
  gap: ${responsiveSpacing.md};
  padding: ${responsiveSpacing.lg};
  border-radius: ${responsiveSizes.card.borderRadius};
  min-width: ${responsiveSizes.touchTarget.recommended};
  min-height: ${responsiveSizes.touchTarget.recommended};
  position: relative;
  overflow: hidden;
  
  /* Android WebView 터치 최적화 */
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  /* 미묘한 배경 그라데이션 */
  background: radial-gradient(circle at center, rgba(255,255,255,0.05) 0%, transparent 70%);
  /* 실시간 리플 효과 */
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: radial-gradient(circle, rgba(255,211,56,0.3) 0%, transparent 70%);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: all 0.6s ease;
    z-index: 0;
  }
  &:hover {
    background: radial-gradient(circle at center, rgba(255,211,56,0.12) 0%, rgba(255,211,56,0.04) 70%);
    transform: translateY(-4px) scale(1.03);
    box-shadow: 
      0 8px 32px rgba(255, 211, 56, 0.25),
      0 4px 16px rgba(0, 0, 0, 0.1);
  }
  &:hover::before {
    width: 100px;
    height: 100px;
    opacity: 0.6;
  }
  &:active {
    transform: translateY(-2px) scale(1.01);
    background: radial-gradient(circle at center, rgba(255,211,56,0.18) 0%, rgba(255,211,56,0.06) 70%);
  }
  &:active::before {
    width: 120px;
    height: 120px;
    opacity: 0.8;
    transition: all 0.15s ease;
  }
  &:focus {
    outline: 4px solid rgba(255, 211, 56, 0.7);
    outline-offset: 4px;
    box-shadow: 
      0 0 0 2px rgba(255, 255, 255, 1),
      0 0 20px rgba(255, 211, 56, 0.3);
  }
`;

// 11. IconImage
export const IconImage = styled.img`
  width: ${responsiveSizes.icon.large};
  height: ${responsiveSizes.icon.large};
  object-fit: contain;
  filter: brightness(0.8) contrast(1.2);
  transition: all 0.3s ease;
  user-select: none;
  -webkit-user-drag: none;
  pointer-events: none;
`;

// 12. IconContainer
export const IconContainer = styled.div`
  width: ${responsiveSizes.icon.xlarge};
  height: ${responsiveSizes.icon.xlarge};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;   
  background: 
    linear-gradient(135deg, #ffffff 0%, #f8f8f8 100%);
  box-shadow: 
    0 4px 12px rgba(0, 0, 0, 0.08),
    0 2px 6px rgba(0, 0, 0, 0.06),
    inset 0 1px 2px rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(0, 0, 0, 0.05);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  z-index: 1;
  
  /* Subtle inner highlight */
  &::before {
    content: '';
    position: absolute;
    top: 12%;
    left: 12%;
    width: 30%;
    height: 30%;
    background: radial-gradient(circle, rgba(255,255,255,0.6) 0%, transparent 70%);
    border-radius: 50%;
    opacity: 0.7;
  }
`;

// 13. Divider
export const Divider = styled.div`
  width: 2px;           
  height: 64px;         /* 컨테이너 크기에 맞춘 증가 */
  background: linear-gradient(to bottom, 
    rgba(200, 200, 200, 0.2) 0%,
    rgba(180, 180, 180, 0.8) 20%,
    rgba(160, 160, 160, 1) 50%,
    rgba(180, 180, 180, 0.8) 80%,
    rgba(200, 200, 200, 0.2) 100%
  ); /* 정교한 그라데이션 */
  border-radius: 1px;
  margin: 0 12px;       /* 좌우 여백 증가 */
  position: relative;
  /* 미묘한 반짝이 효과 */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    width: 1px;
    height: 100%;
    background: linear-gradient(to bottom, 
      transparent 0%,
      rgba(255, 255, 255, 0.6) 30%,
      rgba(255, 255, 255, 0.8) 50%,
      rgba(255, 255, 255, 0.6) 70%,
      transparent 100%
    );
    transform: translateX(-50%);
  }
  /* 미묘한 애니메이션 */
  &::after {
    content: '';
    position: absolute;
    top: -10px;
    left: 50%;
    width: 4px;
    height: 4px;
    background: radial-gradient(circle, rgba(255,211,56,0.6) 0%, transparent 70%);
    border-radius: 50%;
    transform: translateX(-50%);
    animation: dividerPulse 3s ease-in-out infinite;
  }
  @keyframes dividerPulse {
    0%, 100% { 
      opacity: 0;
      transform: translateX(-50%) translateY(0px);
    }
    50% { 
      opacity: 1;
      transform: translateX(-50%) translateY(10px);
    }
  }
`;

// 14. YellowButton - Universal responsive design
export const YellowButton = styled.button`
  ${universalButton}
  width: calc(100% - ${responsiveSpacing.containerPadding} * 2);
  max-width: 320px;
  height: ${responsiveSizes.button.heightLarge};
  background: linear-gradient(135deg, #FFBF00 0%, #FFA800 100%);
  border: none;
  border-radius: ${responsiveSizes.card.borderRadius};
  font-family: ${KBDesignSystem.typography.fontFamily.primary};
  ${responsiveTypography.labelLarge}
  font-weight: 600;
  color: #000000;
  box-shadow: 
    0 3px 8px rgba(255, 191, 0, 0.25),
    0 1px 3px rgba(0, 0, 0, 0.12);
  margin: 0 ${responsiveSpacing.containerPadding} ${responsiveSpacing.section} ${responsiveSpacing.containerPadding};
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  
  /* Subtle shine effect */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
    transition: left 0.5s ease;
  }
  
  &:hover {
    background: linear-gradient(135deg, #FFA800 0%, #FF9000 100%);
    transform: translateY(-1px);
    box-shadow: 
      0 5px 15px rgba(255, 191, 0, 0.35),
      0 2px 6px rgba(0, 0, 0, 0.15);
  }
  
  &:hover::before {
    left: 100%;
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: 
      0 2px 6px rgba(255, 191, 0, 0.2),
      0 1px 3px rgba(0, 0, 0, 0.1);
  }
  
  &:focus {
    outline: 3px solid rgba(255, 191, 0, 0.4);
    outline-offset: 2px;
  }
`;

// 15. BottomLinkContainer
export const BottomLinkContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;             /* Precise spacing from original */
  margin-top: 0;        /* Remove top margin for precise spacing */
  padding: 0 24px;      /* Side padding to match design */
  position: relative;
  z-index: 1;
`;

// 16. BottomLink - Android WebView 최적화
export const BottomLink = styled.button`
  ${androidOptimizedButton}
  background: none;
  border: none;
  font-family: ${KBDesignSystem.typography.fontFamily.primary};
  font-size: 14px;         /* Exact size from original */
  color: #999999;          /* Precise gray from original */
  cursor: pointer;
  padding: 12px 16px;      /* Precise padding from original */
  border-radius: 8px;
  transition: all 0.2s ease;
  min-height: 44px;        /* Minimum touch target */
  font-weight: 400;        /* Regular weight */
  position: relative;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  user-select: none;
  
  /* Android WebView 터치 최적화 */
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  
  &:hover {
    color: #666666;
    background-color: rgba(0, 0, 0, 0.05);
  }
  
  &:active {
    opacity: 0.8;
    transform: scale(0.98);
  }
  
  &:focus {
    outline: 2px solid rgba(255, 191, 0, 0.4);
    outline-offset: 2px;
  }
`;

// 17. LinkDivider
export const LinkDivider = styled.span`
  color: #CCCCCC;         /* Precise divider color from original */
  font-size: 14px;        /* Match link font size */
  user-select: none;
  font-weight: 300;       /* Lighter weight for subtle appearance */
  margin: 0 4px;          /* Minimal spacing around divider */
  opacity: 0.8;
  line-height: 1;
`;

// 18. Footer
export const Footer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px 24px 48px 24px;  /* Precise padding from original */
  background: ${KBDesignSystem.colors.background.white};
  margin-top: auto;
  gap: 16px;              /* Exact spacing between footer elements */
  border-top: none;       /* No border in original */
`;

// 19. OtherLoginButton - Android WebView 최적화
export const OtherLoginButton = styled.button`
  ${androidOptimizedButton}
  background: transparent;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;             /* Precise spacing from original */
  padding: 16px 24px;   /* Exact padding from original */
  margin: 0;
  font-family: ${KBDesignSystem.typography.fontFamily.primary};
  font-weight: 400;     /* Regular weight as in original */
  font-size: 16px;      /* Exact size from original */
  color: #333333;       /* Precise color from original */
  cursor: pointer;
  border-radius: 12px;
  transition: all 0.2s ease;
  min-height: 48px;
  position: relative;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  
  /* Android WebView 터치 최적화 */
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  
  &:hover {
    color: #000000;
    background-color: rgba(0, 0, 0, 0.05);
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0);
    background-color: rgba(0, 0, 0, 0.1);
  }
  
  &:focus {
    outline: 2px solid rgba(255, 191, 0, 0.4);
    outline-offset: 2px;
  }
`;

// 20. SimplePayButton - Android WebView 최적화
export const SimplePayButton = styled.button`
  ${androidOptimizedButton}
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;             /* Precise spacing from original */
  width: 100%;          /* Full width within container */
  max-width: 280px;     /* Maximum width constraint */
  height: 52px;         /* Exact height from original */
  background: #FFFFFF;  /* Pure white background */
  border: 1px solid #E5E5E5; /* Subtle border from original */
  border-radius: 26px;  /* Half of height for perfect rounded look */
  font-family: ${KBDesignSystem.typography.fontFamily.primary};
  font-size: 15px;      /* Exact size from original */
  font-weight: 500;     /* Medium weight for clarity */
  color: #333333;       /* Precise text color from original */
  box-shadow: 
    0 2px 8px rgba(0, 0, 0, 0.08),
    0 1px 4px rgba(0, 0, 0, 0.04);
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  
  /* Android WebView 터치 최적화 */
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: 
      0 4px 12px rgba(0, 0, 0, 0.12),
      0 2px 6px rgba(0, 0, 0, 0.08);
    border-color: #D0D0D0;
    background-color: #FAFAFA;
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: 
      0 1px 4px rgba(0, 0, 0, 0.06),
      0 1px 2px rgba(0, 0, 0, 0.04);
  }
  
  &:focus {
    outline: 2px solid rgba(255, 191, 0, 0.4);
    outline-offset: 2px;
  }
`;

// 21. SimplePayIconImg
export const SimplePayIconImg = styled.img`
  width: 20px;          /* Exact size from original */
  height: 20px;
  object-fit: contain;
  user-select: none;
  -webkit-user-drag: none;
  pointer-events: none;
`;

// 22. ArrowIconStyled
export const ArrowIconStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease;
  opacity: 0.7;         /* Subtle arrow as in original */
  
  ${OtherLoginButton}:hover & {
    transform: translateX(2px);
    opacity: 1;
  }
`;

// 23. BottomSheetLayout
export const BottomSheetLayout = styled.div<{ $isOpen: boolean; $isClosing: boolean }>`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${KBDesignSystem.colors.background.white};
  border-radius: ${KBDesignSystem.borderRadius.modal} ${KBDesignSystem.borderRadius.modal} 0 0;
  box-shadow: ${KBDesignSystem.shadows.bottomSheet};
  z-index: ${KBDesignSystem.zIndex.modal};
  max-height: 80vh;
  overflow: hidden;
  ${({ $isOpen, $isClosing }) => {
    if ($isOpen && !$isClosing) return css`animation: ${slideUp} ${KBDesignSystem.animation.duration.normal} ${KBDesignSystem.animation.easing.decelerate} forwards;`;
    if ($isClosing) return css`animation: ${slideDown} ${KBDesignSystem.animation.duration.normal} ${KBDesignSystem.animation.easing.accelerate} forwards;`;
    return css`transform: translateY(100%);`;
  }}
`;

// 24. SlideBar
export const SlideBar = styled.div`
  width: 52px;
  height: 4px;
  background-color: ${KBDesignSystem.colors.border.medium};
  border-radius: ${KBDesignSystem.borderRadius.xs};
  margin: ${KBDesignSystem.spacing.sm} auto;
`;

// 25. TabLayout
export const TabLayout = styled.div`
  background-color: ${KBDesignSystem.colors.background.gray200};
  padding: 3px;
  margin: ${KBDesignSystem.spacing.xxxl} ${KBDesignSystem.spacing.xl} 0 ${KBDesignSystem.spacing.xl};
  height: 38px;
  border-radius: 19px;
  display: flex;
  align-items: center;
  position: relative;
`;

// 26. TabButton - Android WebView 최적화
export const TabButton = styled.button<{ $active: boolean }>`
  ${androidOptimizedButton}
  flex: 1;
  height: 32px;
  background-color: transparent;
  border: none;
  border-radius: ${KBDesignSystem.borderRadius.button};
  font-family: ${KBDesignSystem.typography.fontFamily.primary};
  font-weight: ${KBDesignSystem.typography.fontWeight.medium};
  font-size: ${KBDesignSystem.typography.fontSize.xs};
  color: ${props => props.$active ? KBDesignSystem.colors.text.primary : KBDesignSystem.colors.text.secondary};
  cursor: pointer;
  z-index: 2;
  transition: color ${KBDesignSystem.animation.duration.fast} ${KBDesignSystem.animation.easing.easeOut};
  
  /* Android WebView 터치 최적화 */
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
`;

// 27. ActiveTabIndicator
export const ActiveTabIndicator = styled.div<{ $activeIndex: number; $tabCount: number }>`
  position: absolute;
  top: 3px;
  left: ${props => `calc(${props.$activeIndex * (100 / props.$tabCount)}% + 3px)`};
  width: ${props => `calc(${100 / props.$tabCount}% - 6px)`};
  height: 32px;
  background-color: #FFFFFF; /* 흰색 탭 인디케이터 */
  border-radius: 16px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  transition: left 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  z-index: 1;
`;

// 28. ViewPagerContainer
export const ViewPagerContainer = styled.div`
  padding: ${KBDesignSystem.spacing.xl};
  min-height: 300px;
  background-color: ${KBDesignSystem.colors.background.white};
`;