import { css } from 'styled-components';

/**
 * Safe Area 처리를 위한 스타일
 * iOS의 노치, Android의 시스템 네비게이션 바 영역 대응
 */
export const safeAreaInsets = css`
  /* iOS Safe Area */
  padding-top: env(safe-area-inset-top);
  padding-bottom: env(safe-area-inset-bottom);
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);
  
  /* Android 시스템 네비게이션 바 대응 */
  padding-bottom: max(env(safe-area-inset-bottom), 48px);
`;

export const safeAreaTop = css`
  padding-top: env(safe-area-inset-top);
  padding-top: constant(safe-area-inset-top); /* iOS 11.0 */
`;

export const safeAreaBottom = css`
  padding-bottom: env(safe-area-inset-bottom);
  padding-bottom: constant(safe-area-inset-bottom); /* iOS 11.0 */
  
  /* Android 시스템 네비게이션 바 높이 고려 */
  @supports not (padding-bottom: env(safe-area-inset-bottom)) {
    padding-bottom: 48px; /* Android 기본 네비게이션 바 높이 */
  }
`;

export const safeAreaContainer = css`
  /* 전체 화면 사용하되 Safe Area 확보 */
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  
  /* Safe Area Insets */
  padding-top: env(safe-area-inset-top, 0);
  padding-bottom: env(safe-area-inset-bottom, 0);
  padding-left: env(safe-area-inset-left, 0);
  padding-right: env(safe-area-inset-right, 0);
  
  /* 컨텐츠 스크롤 영역 */
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
`;

/**
 * 하단 고정 요소용 Safe Area
 * 탭바, 버튼 등이 시스템 UI에 가려지지 않도록
 */
export const bottomFixedElement = css`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding-bottom: env(safe-area-inset-bottom, 0);
  padding-bottom: constant(safe-area-inset-bottom);
  
  /* Android 대응 */
  @supports not (padding-bottom: env(safe-area-inset-bottom)) {
    padding-bottom: 48px;
  }
  
  /* 제스처 네비게이션 사용 시 추가 여백 */
  @media (min-height: 700px) {
    padding-bottom: max(env(safe-area-inset-bottom, 0), 20px);
  }
`;

/**
 * 상단 고정 헤더용 Safe Area
 */
export const topFixedElement = css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding-top: env(safe-area-inset-top, 0);
  padding-top: constant(safe-area-inset-top);
  
  /* Android 상태바 높이 고려 */
  @supports not (padding-top: env(safe-area-inset-top)) {
    padding-top: 24px; /* Android 기본 상태바 높이 */
  }
`;