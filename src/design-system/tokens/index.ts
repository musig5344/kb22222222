/**
 * KB StarBanking 디자인 토큰 시스템
 * 원본 XML 분석 기반 정밀한 디자인 토큰
 */
// 색상 토큰 (design-system/colors/original-colors.md 기반)
export const colors = {
  // 브랜드 컬러 (실제 KB 스타뱅킹 앱에서 추출)
  brand: {
    primary: '#FFBF00',      // KB 메인 노란색 (실제 앱 색상)
    light: '#FFD338',        // 밝은 노란색
    pressed: '#FF9F00',      // 눌림 상태 (더 진한 노란색)
    variant: '#FFD338',      // KB 옐로우 변형 (호환성 유지)
    dark: '#FF9F00',         // 진한 옐로우
    extraLight: '#FFF9E6',   // 연한 옐로우
    primaryDark: '#FF9F00',  // 어두운 primary
    primaryLight: '#FFF9E6', // 밝은 primary
  },
  // 텍스트 컬러 (실제 KB 스타뱅킹 앱에서 추출)
  text: {
    primary: '#000000',      // 주요 텍스트 (순수 검정)
    secondary: '#666666',    // 보조 텍스트 (중간 회색)
    tertiary: '#9CA3AF',     // 삼차 텍스트 (연한 회색)
    hint: '#9CA3AF',         // 입력 힌트
    quaternary: '#9CA3AF',   // 연한 회색
    link: '#4285F4',         // 링크 텍스트 (파란색)
    error: '#FF6B6B',        // 오류 텍스트 (빨간색)
    success: '#22C55E',      // 성공 텍스트
    warning: '#F59E0B',      // 경고 텍스트
    disabled: 'rgba(0, 0, 0, 0.38)', // 비활성화
    white: '#FFFFFF',        // 흰색 텍스트
    black: '#000000',        // 순수 검정
  },
  // 배경 컬러 (원본 XML 기반)
  background: {
    primary: '#FFFFFF',      // 주 배경 (White)
    secondary: '#F7F7F8',    // RGB_f7f7f8 (보조 배경)
    tertiary: '#F5F5F5',     // 삼차 배경
    surface: '#FFFFFF',      // 서피스
    surfaceVariant: '#F8F9FA', // 변형 서피스
    surfaceDark: '#EBEEF0',  // 어두운 서피스
    overlay: 'rgba(0, 0, 0, 0.5)', // 모달 오버레이
    overlayLight: 'rgba(0, 0, 0, 0.3)', // 연한 오버레이
    scrim: 'rgba(0, 0, 0, 0.4)', // 스크림
    widget: 'rgba(38, 40, 44, 0.6)', // 위젯 배경
  },
  // 경계선 컬러 (원본 XML 기반)
  border: {
    primary: '#EBEEF0',      // RGB_ebeef0 (주 경계선)
    secondary: '#DDE1E4',    // 보조 경계선
    tertiary: '#C6CBD0',     // RGB_c6cbd0 (구분선)
    light: '#F0F0F0',        // 연한 경계선
    focused: '#FFD338',      // 포커스 상태 (KB Yellow)
    active: '#FFD338',       // 활성 상태
    error: '#FF5858',        // 오류 상태
    disabled: 'rgba(38, 40, 44, 0.12)', // 비활성화
  },
  // 구분선 컬러
  divider: {
    light: '#F5F5F5',
    medium: '#E8E8E8',
    strong: '#CCCCCC',
  },
  // 기능별 컬러 (실제 KB 스타뱅킹 앱에서 추출)
  functional: {
    income: '#4285F4',       // 입금 - 파란색 (실제 앱 색상)
    expense: '#FF6B6B',      // 출금 - 빨간색 (실제 앱 색상)
    neutral: '#666666',      // 중립 (회색)
    success: '#22C55E',      // 성공
    warning: '#F59E0B',      // 경고
    error: '#FF6B6B',        // 에러 (출금과 동일)
    info: '#4285F4',         // 정보 (입금과 동일)
  },
  // 액션 색상
  action: {
    hover: 'rgba(0, 0, 0, 0.05)',
    pressed: 'rgba(0, 0, 0, 0.1)',
    disabled: 'rgba(0, 0, 0, 0.26)',
  },
  // 배경 오버레이
  backdrop: {
    light: 'rgba(0, 0, 0, 0.2)',
    medium: 'rgba(0, 0, 0, 0.4)',
    dark: 'rgba(0, 0, 0, 0.6)',
  },
  // 성공/에러/경고 색상
  success: {
    base: '#22C55E',
    dark: '#16A34A',
    light: '#D9F9E5',
  },
  // 추가 색상 (기존 컴포넌트에서 사용되는 누락된 색상들)
  white: '#FFFFFF',
  black: '#000000',
  kbBlack: '#000000',
  lightGray: '#F7F7F8',
  // 배경 색상 추가
  backgroundGray1: '#F7F7F8',
  backgroundGray2: '#F5F5F5',
  // 다이얼로그 및 오버레이 (원본 참조)
  dimmedBackground: 'rgba(0, 0, 0, 0.75)',
  dialogBackground: 'rgba(0, 0, 0, 0.4)',
  headerBackground: '#FFFFFF',
  loadingBackground: 'rgba(0, 0, 0, 0.7)',
  // 다이얼로그 패딩
  dialogPadding: '24px',     // abc_dialog_padding_material
  dialogPaddingTop: '18px',  // abc_dialog_padding_top_material
  alertButtonHeight: '48px', // abc_alert_dialog_button_height
  // 토스트 관련
  toastBackground: 'rgba(230, 105, 110, 0.76)',
  toastText: '#FFFFFF',
  toastBackgroundDark: 'rgba(230, 105, 110, 0.76)',
  toastTextDark: '#FFFFFF',
  // 상태별 배경색
  successBackground: 'rgba(34, 197, 94, 0.1)',
  successText: '#22C55E',
  warningBackground: 'rgba(245, 158, 11, 0.1)',
  warningText: '#F59E0B',
  warningLight: 'rgba(245, 158, 11, 0.1)',
  warning: '#F59E0B',
  errorBackground: 'rgba(239, 68, 68, 0.1)',
  errorText: '#EF4444',
  errorLight: 'rgba(239, 68, 68, 0.1)',
  error: '#EF4444',
  // 추가 컬러
  accentBlue: '#287EFF',
  errorRed: '#EF4444',
  // 버튼 관련 색상
  buttonGrayNormal: '#F8F9FA',
  buttonGrayPressed: '#E5E7EB',
  buttonYellowNormal: '#FFBF00',
  buttonYellowPressed: '#FF9F00',
  // 다크 테마 지원
  dark: {
    bottomSheetBackground: '#26282C',
    text: '#EBEEF0',
    inputFieldHint: '#6E747A',
    toastBackground: 'rgba(230, 105, 110, 0.76)',
    dimBackground: 'rgba(0, 0, 0, 0.75)',
  },
  // 그림자 관련
  shadows: {
    low: '0 1px 3px rgba(0, 0, 0, 0.12)',
    medium: '0 3px 6px rgba(0, 0, 0, 0.16)',
    high: '0 6px 12px rgba(0, 0, 0, 0.18)',
  },
} as const;
// 타이포그래피 토큰
export const typography = {
  // 폰트 패밀리
  fontFamily: {
    base: `-apple-system, BlinkMacSystemFont, 'Malgun Gothic', '맑은 고딕', 'Segoe UI', sans-serif`,
    light: `'font_kbfg_text_l', -apple-system, BlinkMacSystemFont, sans-serif`,
    medium: `'font_kbfg_text_m', -apple-system, BlinkMacSystemFont, sans-serif`,
    bold: `'font_kbfg_text_b', -apple-system, BlinkMacSystemFont, sans-serif`,
    monospace: `'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace`,
    // 추가 KB 폰트 패밀리
    kbfgTextLight: `'font_kbfg_text_l', -apple-system, BlinkMacSystemFont, sans-serif`,
    kbfgTextMedium: `'font_kbfg_text_m', -apple-system, BlinkMacSystemFont, sans-serif`,
    kbfgTextBold: `'font_kbfg_text_b', -apple-system, BlinkMacSystemFont, sans-serif`,
    robotoMedium: `'Roboto', -apple-system, BlinkMacSystemFont, sans-serif`,
  },
  // 폰트 가중치
  fontWeight: {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },
  // 텍스트 크기 (스크린샷 분석 기반 정확한 KB 스타뱅킹 크기)
  fontSize: {
    // 핵심 텍스트 크기 (스크린샷에서 추출)
    headerTitle: '18px',     // 헤더 타이틀 (거래내역조회, KB국민은행)
    bodyText: '14px',        // 본문 텍스트 (거래 상대방, 설명 텍스트)
    smallText: '12px',       // 작은 텍스트 (잔액, 날짜/시간)
    buttonText: '16px',      // 버튼 텍스트 (간편하게 인증서 발급하기)
    
    // 기존 호환성 유지를 위한 매핑
    displayLarge: '24px',    // 스플래시, 인트로
    displayMedium: '20px',   // 대형 디스플레이
    displaySmall: '18px',    // 소형 디스플레이
    headlineLarge: '18px',   // 페이지 주제목 (headerTitle과 동일)
    headlineMedium: '16px',  // 중간 헤드라인
    headlineSmall: '16px',   // 소형 헤드라인
    titleLarge: '18px',      // 섹션 제목, 헤더 (headerTitle과 동일)
    titleMedium: '16px',     // 중간 타이틀
    titleSmall: '14px',      // 소형 타이틀 (bodyText와 동일)
    bodyLarge: '16px',       // 큰 본문 (buttonText와 동일)
    bodyMedium: '14px',      // 기본 본문 (bodyText와 동일)
    bodySmall: '12px',       // 작은 본문 (smallText와 동일)
    labelLarge: '14px',      // 큰 라벨
    labelMedium: '12px',     // 중간 라벨 (smallText와 동일)
    labelSmall: '12px',      // 작은 라벨 (smallText와 동일)
    
    // 거래내역 관련
    transactionTitle: '14px',   // 거래 상대방
    transactionAmount: '14px',  // 거래 금액
    transactionDate: '12px',    // 거래 날짜
    transactionBalance: '12px', // 잔액
  },
  // 줄 간격
  lineHeight: {
    display: 1.1,
    headline: 1.2,
    title: 1.3,
    body: 1.4,
    label: 1.2,
    compact: 1.1,
    comfortable: 1.6,
    loose: 1.8,
  },
  // 글자 간격
  letterSpacing: {
    display: '-1.0px',
    headline: '-0.8px',
    titleLarge: '-0.3px',
    titleMedium: '-0.2px',
    titleSmall: '-0.1px',
    body: '0px',
    bodyTight: '-0.1px',
    label: '-0.1px',
    tight: '-0.2px',
    korean: {
      title: '-0.5px',
      body: '-0.2px',
      label: '-0.1px',
    },
  },
  // 스타일 세트 (컴포넌트에서 사용) - 85% 스케일
  styles: {
    keypadButton: {
      fontSize: '15px',     // 18px * 0.85
      fontWeight: '500',
    },
  },
} as const;
// 간격 토큰 (KB 스타뱅킹 원본 앱 기준 정확한 간격)
export const spacing = {
  // 기본 간격 (실제 KB 앱에서 관찰된 간격)
  0: '0px',
  1: '4px',      // micro
  2: '8px',      // small (카드 내부 요소 간격)
  3: '12px',     // compact (카드 내 여백)
  4: '16px',     // medium (카드 간격, 기본 요소 간격)
  5: '20px',     // medium-large (페이지 여백)
  6: '24px',     // large (섹션 간격)
  8: '32px',     // xl (큰 섹션 간격)
  10: '40px',    // extra
  12: '48px',    // xxl
  16: '64px',    // maximum
  
  // 의미적 간격 (스크린샷 분석 기반)
  micro: '4px',     // 작은 요소 간격
  small: '8px',     // 리스트 아이템 내부 간격
  medium: '16px',   // 카드 간격, 기본 요소 간격
  large: '20px',    // 페이지 좌우 여백
  xl: '24px',       // 섹션 간격
  xxl: '32px',      // 큰 섹션 간격
  
  // KB 앱 특화 간격
  cardGap: '16px',        // 카드 간격
  pageMargin: '20px',     // 페이지 여백
  elementGap: '8px',      // 요소 간격
  sectionGap: '24px',     // 섹션 간격
  listItemPadding: '12px', // 리스트 아이템 내부 패딩
  buttonHeight: '48px',   // 버튼 높이
} as const;
// 컴포넌트 크기 토큰
export const sizes = {
  // 헤더 (원본 KB스타뱅킹 앱 기준 85% 스케일)
  header: {
    height: '41px',          // 48px * 0.85
    heightLarge: '48px',     // 56px * 0.85
    heightCompact: '37px',   // 44px * 0.85
    paddingHorizontal: '17px', // 20px * 0.85
    paddingVertical: '10px',  // 12px * 0.85
    titleMargin: '3px',      // 4px * 0.85
    iconSpacing: '14px',     // 16px * 0.85
  },
  // 버튼 (스크린샷 분석 기반 정확한 KB 스타뱅킹 크기)
  button: {
    heightSmall: '36px',     // 작은 버튼
    heightMedium: '44px',    // 중간 버튼 (최소 터치 영역)
    heightLarge: '48px',     // 기본 버튼 높이 (스크린샷 기준)
    heightXL: '56px',        // 큰 버튼
    large: '48px',           // 기본 대형 버튼
    paddingHorizontalSmall: '12px',  // 작은 버튼 패딩
    paddingHorizontalMedium: '16px', // 중간 버튼 패딩
    paddingHorizontalLarge: '24px',  // 큰 버튼 패딩
    paddingVertical: '12px', // 버튼 상하 패딩
    spacingHorizontal: '12px', // 버튼 간 수평 간격
    spacingVertical: '16px', // 버튼 간 수직 간격
    minWidth: '120px',       // 최소 버튼 너비
    borderRadius: '8px',     // 버튼 모서리 반경 (스크린샷 기준)
  },
  // 입력 필드 (원본 KB스타뱅킹 앱 기준 85% 스케일)
  input: {
    heightSmall: '27px',     // 32px * 0.85
    heightMedium: '34px',    // 40px * 0.85
    heightLarge: '41px',     // 48px * 0.85
    paddingHorizontal: '14px', // 16px * 0.85
    paddingVertical: '7px',  // 8px * 0.85
    spacingVertical: '14px', // 16px * 0.85
    labelSpacing: '3px',     // 4px * 0.85
    helperSpacing: '3px',    // 4px * 0.85
  },
  // 카드 (원본 KB스타뱅킹 앱 기준 85% 스케일)
  card: {
    paddingSmall: '10px',      // 12px * 0.85
    paddingMedium: '14px',     // 16px * 0.85
    paddingLarge: '20px',      // 24px * 0.85
    paddingXL: '27px',         // 32px * 0.85
    spacingVertical: '14px',   // 16px * 0.85
    spacingHorizontal: '14px', // 16px * 0.85
    titleSpacing: '7px',       // 8px * 0.85
    contentSpacing: '10px',    // 12px * 0.85
    actionSpacing: '14px',     // 16px * 0.85
  },
  // 리스트 (원본 XML 직접 참조)
  list: {
    itemHeightSmall: '48px', // abc_list_item_height_small_material
    itemHeightMedium: '64px', // abc_list_item_height_material
    itemHeightLarge: '80px', // abc_list_item_height_large_material
    // 85% 스케일 (호환성)
    itemHeight: '40px',        // 47px * 0.85
    itemHeight85Small: '34px',   // 40px * 0.85
    itemHeight85Large: '48px',   // 56px * 0.85
    itemPaddingHorizontal: '14px', // 16px * 0.85
    itemPaddingVertical: '10px',   // 12px * 0.85
    itemSpacing: '1px',
  },
  // 페이지 (원본 KB스타뱅킹 앱 기준 85% 스케일)
  page: {
    paddingHorizontal: '20px',     // 24px * 0.85
    paddingVertical: '14px',       // 16px * 0.85
    paddingHorizontalMobile: '14px', // 16px * 0.85
    paddingVerticalMobile: '10px',  // 12px * 0.85
    contentSpacing: '27px',        // 32px * 0.85
  },
  // 섹션 (원본 KB스타뱅킹 앱 기준 85% 스케일)
  section: {
    spacingSmall: '14px',   // 16px * 0.85
    spacingMedium: '20px',  // 24px * 0.85
    spacingLarge: '27px',   // 32px * 0.85
    spacingXL: '41px',      // 48px * 0.85
    padding: '17px',        // 20px * 0.85
    titleSpacing: '10px',   // 12px * 0.85
  },
  // 거래내역 (원본 KB스타뱅킹 앱 기준 85% 스케일)
  transaction: {
    sectionPadding: '20px',  // 24px * 0.85
    dateSpacing: '17px',     // 20px * 0.85
    itemPadding: '10px',     // 12px * 0.85
    itemSpacing: '1px',
    timeSpacing: '3px',      // 유지
    amountSpacing: '2px',    // 유지
  },
  // 계좌 정보 (원본 KB스타뱅킹 앱 기준 85% 스케일)
  account: {
    infoPadding: '10px 20px 20px', // 12px 24px 24px * 0.85
    nameSpacing: '5px',            // 6px * 0.85
    numberSpacing: '3px',          // 4px * 0.85
    balanceSpacing: '17px',        // 20px * 0.85
  },
  // 아이콘 (원본 KB스타뱅킹 앱 기준 85% 스케일)
  icon: {
    small: '14px',   // 16px * 0.85
    medium: '20px',  // 24px * 0.85
    large: '27px',   // 32px * 0.85
    tabBar: '17px',  // 20px * 0.85
  },
  // 아바타 (원본 KB스타뱅킹 앱 기준 85% 스케일)
  avatar: {
    small: '20px',   // 24px * 0.85
    medium: '31px',  // 36px * 0.85
    large: '41px',   // 48px * 0.85
  },
  // 터치 타겟 (모바일 표준 기준)
  touch: {
    minimum: '44px',     // 모바일 접근성 최소 기준
    comfortable: '48px', // 편안한 터치 영역 (KB 버튼 기본 높이)
  },
  // 네비게이션 (원본 KB스타뱅킹 앱 기준 85% 스케일)
  navigation: {
    height: '44px',  // 52px * 0.85 = 실제 앱 크기
    iconSize: '17px', // 20px * 0.85
  },
  // 차원 정보 (dimensions) - 85% 스케일
  height: {
    header: '41px',           // 48px * 0.85
    zeroMenu: '34px',         // 40px * 0.85
    keypadButton: '48px',     // 56px * 0.85
    bottomSheetButton: '41px', // 48px * 0.85
  },
  // 테두리 반경
  borderRadius: {
    small: '4px',
    medium: '8px',
    large: '12px',
    round: '50%',
    loginTab: '8px',
    toast: '8px',
    dialog: '8px',
  },
  // 고도 (elevation)
  elevation: {
    dialog: '0 4px 12px rgba(0, 0, 0, 0.15)',
  },
  // 바텀시트 관련 (원본 XML 기반)
  bottomSheet: {
    cornerRadius: '16px',    // bottom_sheet_corner_radius
    topPadding: '30px',      // bottom_sheet_top_padding
    elevation: '10px',       // fragment_login_bottom_sheet_elevation
    marginHorizontal: '24px', // fragment_login_bottom_sheet_margin_start/end
    tabHeight: '38px',       // tabLayout height
    slideBarRadius: '4px',   // fragment_login_bottom_sheet_slide_bar_radius
  },
  // Amount Bottom Sheet 관련
  amountBottomSheet: {
    shortcutButtonGap: '8px',
  },
} as const;
// 테두리 반경 토큰 (design-system/dimensions/original-dimensions.md 기반)
export const borderRadius = {
  none: '0px',
  small: '2px',            // cardview_default_radius
  medium: '4px',           // abc_control_corner_material
  large: '8px',            // 일반 컨테이너
  xl: '12px',              // fragment_login_main_tab_rounded
  xxl: '16px',             // bottom_sheet_corner_radius
  round: '50%',            // 원형
  pill: '999px',           // 완전 둥근 모서리
  // 추가 제안
  bottomSheet: '16px',     // bottom_sheet_corner_radius
  slideBar: '4px',         // fragment_login_bottom_sheet_slide_bar_radius
} as const;
// 그림자 토큰 (Material Design 기준)
export const shadows = {
  none: 'none',
  elevation1: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
  elevation2: '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
  elevation3: '0 6px 12px rgba(0, 0, 0, 0.18), 0 6px 20px rgba(0, 0, 0, 0.19)',
  elevation4: '0 8px 16px rgba(0, 0, 0, 0.20), 0 8px 25px rgba(0, 0, 0, 0.22)',
  elevation5: '0 12px 24px rgba(0, 0, 0, 0.22), 0 12px 28px rgba(0, 0, 0, 0.25)',
  elevation6: '0 16px 32px rgba(0, 0, 0, 0.24), 0 16px 36px rgba(0, 0, 0, 0.28)',
  navigationTop: '0 -2px 8px rgba(0, 0, 0, 0.1)',
} as const;
// Z-인덱스 토큰
export const zIndex = {
  base: 0,
  dropdown: 10,
  sticky: 20,
  fixed: 30,
  modalBackdrop: 40,
  modal: 50,
  popover: 60,
  tooltip: 70,
  toast: 80,
  header: 100,
  tabbar: 100,
} as const;
// 애니메이션 토큰
export const animation = {
  // 지속시간
  duration: {
    instant: '0ms',
    fast: '150ms',
    normal: '300ms',
    slow: '500ms',
    slower: '750ms',
    slowest: '1000ms',
  },
  // 이징
  easing: {
    linear: 'linear',
    easeIn: 'cubic-bezier(0.4, 0.0, 1, 1)',
    easeOut: 'cubic-bezier(0.0, 0.0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },
} as const;
// 브레이크포인트 토큰
export const breakpoints = {
  small: '360px',     // 소형 모바일
  medium: '430px',    // 표준 모바일
  large: '768px',     // 태블릿
  xl: '1024px',       // 데스크톱
} as const;
// 앱 설정 토큰 (원본 KB스타뱅킹 앱 기준 85% 스케일)
export const app = {
  maxWidth: '366px',          // 430px * 0.85
  minTouchTarget: '37px',     // 44px * 0.85
  touchTargetSpacing: '7px',  // 8px * 0.85
  focusOutlineWidth: '2px',   // 유지
  focusOutlineOffset: '2px',  // 유지
  zIndex: {
    backdrop: 40,
    modal: 50,
    navigation: 100,
    sticky: 20,
  },
} as const;
// dimensions 객체 생성 (컴포넌트에서 사용)
export const dimensions = {
  ...sizes,
} as const;
// 모든 토큰을 하나로 내보내기
export const tokens = {
  colors,
  typography,
  spacing,
  sizes,
  dimensions,
  borderRadius,
  shadows,
  zIndex,
  animation,
  breakpoints,
  app,
} as const;
export default tokens;