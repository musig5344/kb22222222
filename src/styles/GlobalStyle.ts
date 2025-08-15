import { createGlobalStyle } from 'styled-components';
import KBFGTextLightOTF from '../assets/fonts/kbfg_text_l.otf';
import KBFGTextMediumOTF from '../assets/fonts/kbfg_text_m.otf';
import KBFGTextBoldOTF from '../assets/fonts/kbfg_text_b.otf';
import { tokens } from './tokens';
import { kbFontOptimization, kbSmoothScroll, kbTimings } from './KBMicroDetails';
import { 
  androidWebViewGlobalStyles,
  androidFontOptimization,
  androidImageOptimization 
} from './android-webview-optimizations';
import { 
  responsiveSizes, 
  responsiveSpacing, 
  breakpoints,
  responsiveSafeArea 
} from './universal-responsive';
const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'KBFGText';
    src: url(${KBFGTextLightOTF}) format('opentype');
    font-weight: 300;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'KBFGText';
    src: url(${KBFGTextMediumOTF}) format('opentype');
    font-weight: 500;
    font-style: normal;
    font-display: swap;
  }
  @font-face {
    font-family: 'KBFGText';
    src: url(${KBFGTextBoldOTF}) format('opentype');
    font-weight: 700;
    font-style: normal;
    font-display: swap;
  }
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    font-family: 'KBFGText', ${tokens.typography.fontFamily.base};
    font-weight: ${tokens.typography.fontWeight.medium};
    ${kbFontOptimization}
    background-color: ${tokens.colors.background.tertiary}; /* PC에서 보일 배경색 */
    color: ${tokens.colors.text.primary};
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100vh;
    overflow-x: hidden;
    ${kbSmoothScroll}
    
    /* PC에서는 중앙 정렬로 모바일 시뮬레이션 */
    @media (min-width: 769px) {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    
    /* 모바일에서는 전체 화면 */
    @media (max-width: 768px) {
      display: block;
    }
  }
  #root {
    width: 100%;
    max-width: 100vw;
    height: 100%;
    min-height: 100vh;
    min-height: 100dvh; /* 동적 뷰포트 높이 지원 */
    background-color: ${tokens.colors.background.primary};
    position: relative;
    overflow-x: hidden;
    
    /* iOS Safari 주소창 대응 */
    min-height: -webkit-fill-available;
  }
  /* 디자인 토큰은 tokens.ts에서 관리되므로 별도 CSS 파일 임포트 제거 */
  /* 접근성 개선 */
  :focus-visible {
    outline: ${tokens.app.focusOutlineWidth} solid ${tokens.colors.brand.primary};
    outline-offset: ${tokens.app.focusOutlineOffset};
  }
  /* 스크롤바 숨김 - 모든 브라우저 지원 */
  * {
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE and Edge */
  }
  
  ::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
    width: 0;
    height: 0;
  }
  /* 터치 하이라이트 제거 */
  * {
    -webkit-tap-highlight-color: transparent;
  }
  /* 버튼 기본 스타일 */
  button {
    font-family: inherit;
    font-weight: inherit;
    cursor: pointer;
    user-select: none;
  }
  /* 링크 기본 스타일 */
  a {
    color: inherit;
    text-decoration: none;
  }
  /* 입력 필드 기본 스타일 */
  input, textarea, select {
    font-family: inherit;
    font-weight: inherit;
    ${kbFontOptimization}
  }
  
  /* KB 특유의 전역 애니메이션 설정 */
  * {
    /* 모든 요소에 부드러운 트랜지션 기본값 */
    transition-property: opacity, transform, box-shadow, background-color, border-color;
    transition-duration: ${kbTimings.fast};
    transition-timing-function: ${kbTimings.easeOut};
  }
  
  /* 숫자 요소에 특별한 처리 */
  .number, [data-type="number"] {
    font-variant-numeric: tabular-nums;
    letter-spacing: -0.5px;
  }
  
  /* 페이지 전환 애니메이션 - 향상된 iOS 스타일 */
  .page-transition-enter {
    opacity: 0.8;
    transform: translateX(100%);
  }
  
  .page-transition-enter-active {
    opacity: 1;
    transform: translateX(0);
    transition: all ${kbTimings.normal} ${kbTimings.easeOut};
  }
  
  .page-transition-exit {
    opacity: 1;
    transform: translateX(0);
  }
  
  .page-transition-exit-active {
    opacity: 0.6;
    transform: translateX(-30%);
    transition: all ${kbTimings.normal} ${kbTimings.easeIn};
  }

  /* 뒤로가기 전환 애니메이션 */
  .page-transition-backward-enter {
    opacity: 0.8;
    transform: translateX(-100%);
  }
  
  .page-transition-backward-enter-active {
    opacity: 1;
    transform: translateX(0);
    transition: all ${kbTimings.normal} ${kbTimings.easeOut};
  }
  
  .page-transition-backward-exit {
    opacity: 1;
    transform: translateX(0);
  }
  
  .page-transition-backward-exit-active {
    opacity: 0.6;
    transform: translateX(30%);
    transition: all ${kbTimings.normal} ${kbTimings.easeIn};
  }
  
  /* 모달 애니메이션 */
  .modal-enter {
    opacity: 0;
    transform: scale(0.95);
  }
  
  .modal-enter-active {
    opacity: 1;
    transform: scale(1);
    transition: all ${kbTimings.fast} ${kbTimings.easeOut};
  }
  
  /* 터치 가능 영역 최소 크기 보장 - Universal responsive system */
  button, a, [role="button"], [role="link"] {
    min-height: ${responsiveSizes.touchTarget.minimum}; /* 모바일 접근성 최소 기준 */
    min-width: ${responsiveSizes.touchTarget.minimum};
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: ${responsiveSpacing.sm}; /* 아이콘과 텍스트 간격 */
  }
  
  /* KB 스타뱅킹 기본 버튼 스타일 - Universal responsive */
  button {
    border-radius: ${responsiveSizes.button.borderRadius}; /* Responsive border radius */
    font-weight: ${tokens.typography.fontWeight.medium};
    letter-spacing: -0.01em;
  }
  
  /* 이미지 로딩 최적화 */
  img {
    display: block;
    max-width: 100%;
    height: auto;
  }
  
  /* 텍스트 선택 스타일 */
  ::selection {
    background-color: rgba(255, 211, 56, 0.3);
    color: ${tokens.colors.text.primary};
  }

  /* Android WebView 전용 최적화 - 모바일에서만 적용 */
  @media (max-width: ${breakpoints.tablet}px) {
    ${androidWebViewGlobalStyles}
    ${androidFontOptimization}
    ${androidImageOptimization}
  }
  
  /* Safe Area 처리 - 모바일 기기의 시스템 UI 대응 */
  .safe-area-top {
    padding-top: env(safe-area-inset-top, 0);
    padding-top: constant(safe-area-inset-top); /* iOS 11.0 */
  }
  
  .safe-area-bottom {
    padding-bottom: env(safe-area-inset-bottom, 0);
    padding-bottom: constant(safe-area-inset-bottom); /* iOS 11.0 */
    
    /* Android 시스템 네비게이션 바 대응 */
    @supports not (padding-bottom: env(safe-area-inset-bottom)) {
      padding-bottom: 48px;
    }
  }
  
  /* 하단 고정 요소 (탭바, 버튼 등) */
  .bottom-fixed {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding-bottom: env(safe-area-inset-bottom, 0);
    padding-bottom: constant(safe-area-inset-bottom);
    
    /* Android 제스처 네비게이션 대응 */
    @media (min-height: 700px) {
      padding-bottom: max(env(safe-area-inset-bottom, 0), 20px);
    }
  }
  
  /* 상단 고정 헤더 */
  .top-fixed {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    padding-top: env(safe-area-inset-top, 0);
    padding-top: constant(safe-area-inset-top);
    
    /* Android 상태바 높이 고려 */
    @supports not (padding-top: env(safe-area-inset-top)) {
      padding-top: 24px;
    }
  }
  
  /* 메인 컨테이너 Safe Area */
  #root > div {
    /* iOS 및 Android 시스템 UI 영역 회피 */
    padding-top: env(safe-area-inset-top, 0);
    padding-bottom: env(safe-area-inset-bottom, 0);
    padding-left: env(safe-area-inset-left, 0);
    padding-right: env(safe-area-inset-right, 0);
  }
  
  /* KB 스타뱅킹 레이아웃 클래스 - Universal responsive */
  .kb-page-container {
    padding: 0 ${responsiveSpacing.containerPadding}; /* 반응형 좌우 여백 */
  }
  
  .kb-card-container {
    gap: ${responsiveSpacing.cardGap}; /* 반응형 카드 간격 */
    padding: ${responsiveSpacing.listItemPadding}; /* 반응형 카드 내부 패딩 */
  }
  
  .kb-element-group {
    gap: ${responsiveSpacing.md}; /* 반응형 요소 간격 */
  }
  
  .kb-section {
    margin-bottom: ${responsiveSpacing.section}; /* 반응형 섹션 간격 */
  }
  
  /* 거래내역 리스트 스타일 - Universal responsive */
  .kb-transaction-list {
    .transaction-item {
      padding: ${responsiveSpacing.listItemPadding} ${responsiveSpacing.containerPadding};
      border-bottom: 1px solid ${tokens.colors.border.primary};
      min-height: ${responsiveSizes.touchTarget.minimum}; /* 터치 최적화 */
    }
    
    .transaction-item:last-child {
      border-bottom: none;
    }
  }
`;
export default GlobalStyle; 