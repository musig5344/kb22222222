// KB스타뱅킹 정확한 폰트 시스템 (완전 분석 결과 기반)
export const typography = {
  // KB 전용 폰트 패밀리
  fontFamily: {
    kbfgTextBold: 'KBFG-Text-Bold, "Noto Sans KR", sans-serif',    // kbfg_text_b.otf (fontWeight: 700)
    kbfgTextMedium: 'KBFG-Text-Medium, "Noto Sans KR", sans-serif', // kbfg_text_m.otf (fontWeight: 500)
    kbfgTextLight: 'KBFG-Text-Light, "Noto Sans KR", sans-serif',   // kbfg_text_l.otf (fontWeight: 400)
    robotoMedium: 'Roboto-Medium, Roboto, sans-serif',              // roboto_medium.ttf (fontWeight: 700)
    robotoRegular: 'Roboto-Regular, Roboto, sans-serif',            // roboto_regular.ttf (fontWeight: 400)
  },
  // 텍스트 크기 표준 (스크린샷 분석 기반 정확한 값)
  fontSize: {
    // 스크린샷 분석에서 추출한 핵심 크기
    headerTitle: '18px',     // 헤더 타이틀 (거래내역조회, KB국민은행)
    bodyText: '14px',        // 본문 텍스트 (거래 상대방, 설명 텍스트)
    smallText: '12px',       // 작은 텍스트 (잔액, 날짜/시간)
    buttonText: '16px',      // 버튼 텍스트 (간편하게 인증서 발급하기)
    
    // 기존 호환성 유지
    title: '18px',           // 헤더 타이틀과 동일
    subtitle: '16px',        // 서브타이틀
    body: '14px',            // 본문
    bodySmall: '12px',       // 작은 본문
    caption: '12px',         // 캡션
    small: '12px',           // 작은 텍스트
    tiny: '10px',            // 최소 텍스트
    
    // 특수 UI 텍스트
    dialogTitle: '18px',     // 다이얼로그 타이틀
    dialogButton: '16px',    // 다이얼로그 버튼
    toast: '14px',           // 토스트
    kbEditTextChar: '16px',  // KB EditText 문자 입력
    kbEditTextNumber: '18px', // KB EditText 숫자 입력
    bottomSheetAmount: '24px', // 바텀시트 금액 입력
    keypadButton: '20px',    // 키패드 버튼
    
    // 메뉴 관련
    tabText: '14px',         // 탭 텍스트
    menuText: '14px',        // 메뉴 텍스트
    subMenuText: '14px',     // 서브메뉴 텍스트
    recentMenuText: '12px',  // 최근 메뉴 텍스트
    searchMenuText: '14px',  // 검색 메뉴 텍스트
    
    // 거래내역 관련
    transactionTitle: '14px',   // 거래 상대방
    transactionAmount: '14px',  // 거래 금액
    transactionDate: '12px',    // 거래 날짜
    transactionBalance: '12px', // 잔액
  },
  // 텍스트 스타일 프리셋 (스크린샷 분석 기반)
  styles: {
    // 헤더 스타일
    headerTitle: {
      fontSize: '18px',
      fontFamily: 'KBFG-Text-Bold',
      color: '#000000',
      letterSpacing: '-0.02em',
      lineHeight: '22px',
    },
    // 본문 스타일
    bodyText: {
      fontSize: '14px',
      fontFamily: 'KBFG-Text-Medium',
      color: '#000000',
      letterSpacing: '-0.01em',
      lineHeight: '18px',
    },
    // 작은 텍스트 스타일
    smallText: {
      fontSize: '12px',
      fontFamily: 'KBFG-Text-Light',
      color: '#666666',
      letterSpacing: '0em',
      lineHeight: '16px',
    },
    // 버튼 스타일
    buttonText: {
      fontSize: '16px',
      fontFamily: 'KBFG-Text-Bold',
      color: '#000000',
      letterSpacing: '-0.01em',
    },
    // KBEditText 스타일
    kbEditTextChar: {
      fontSize: '16px',
      fontFamily: 'KBFG-Text-Bold',
      color: '#000000',
      letterSpacing: '-0.01em',
      paddingBottom: '8px',
    },
    kbEditTextNumber: {
      fontSize: '18px',
      fontFamily: 'Roboto-Medium',
      color: '#000000',
      letterSpacing: '-0.01em',
    },
    // 다이얼로그 스타일
    dialogTitle: {
      fontSize: '18px',
      fontFamily: 'KBFG-Text-Bold',
      color: '#000000',
      letterSpacing: '-0.02em',
      lineHeight: '22px',
    },
    dialogButton: {
      fontSize: '16px',
      fontFamily: 'KBFG-Text-Bold',
      color: '#000000',
    },
    // 거래내역 스타일
    transactionTitle: {
      fontSize: '14px',
      fontFamily: 'KBFG-Text-Medium',
      color: '#000000',
      letterSpacing: '-0.01em',
      lineHeight: '18px',
    },
    transactionAmount: {
      fontSize: '14px',
      fontFamily: 'KBFG-Text-Bold',
      color: '#FF6B6B', // 출금: 빨간색
      letterSpacing: '-0.01em',
      lineHeight: '18px',
    },
    transactionAmountIncome: {
      fontSize: '14px',
      fontFamily: 'KBFG-Text-Bold',
      color: '#4285F4', // 입금: 파란색
      letterSpacing: '-0.01em',
      lineHeight: '18px',
    },
    transactionDate: {
      fontSize: '12px',
      fontFamily: 'KBFG-Text-Light',
      color: '#666666',
      letterSpacing: '0em',
      lineHeight: '16px',
    },
    transactionBalance: {
      fontSize: '12px',
      fontFamily: 'KBFG-Text-Light',
      color: '#666666',
      letterSpacing: '0em',
      lineHeight: '16px',
    },
    // 토스트 스타일
    toast: {
      fontSize: '14px',
      fontFamily: 'KBFG-Text-Light',
      color: '#FFFFFF',
      lineHeight: '18px',
    },
    // 탭 스타일
    loginTab: {
      fontSize: '14px',
      fontFamily: 'KBFG-Text-Bold',
      letterSpacing: '-0.02em',
    },
    // 메뉴 스타일
    menuItem: {
      fontSize: '14px',
      fontFamily: 'KBFG-Text-Medium',
      color: '#000000',
      letterSpacing: '-0.01em',
    },
    subMenuItem: {
      fontSize: '14px',
      fontFamily: 'KBFG-Text-Light',
      color: '#666666',
    },
    // 바텀시트 스타일
    bottomSheetTitle: {
      fontSize: '18px',
      fontFamily: 'KBFG-Text-Bold',
      color: '#000000',
    },
    bottomSheetAmount: {
      fontSize: '24px',
      fontFamily: 'Roboto-Medium',
      color: '#000000',
    },
    // 키패드 스타일
    keypadButton: {
      fontSize: '20px',
      fontFamily: 'Roboto-Medium',
      color: '#000000',
    },
  },
  // 폰트 웨이트
  fontWeight: {
    light: 400,    // KBFG Text Light
    medium: 500,   // KBFG Text Medium  
    bold: 700,     // KBFG Text Bold
  },
  // 줄 간격
  lineHeight: {
    tight: '1.2',
    normal: '1.4', 
    loose: '1.6',
    dialogTitle: '4dp', // 다이얼로그 타이틀 추가 줄간격
    toast: '3dp',       // 토스트 줄간격
  },
  // 자간 (Letter Spacing)
  letterSpacing: {
    tight: '-0.02em',   // 탭, 다이얼로그 타이틀
    normal: '-0.01em',  // EditText
    none: '0em',
  },
};
// CSS-in-JS용 폰트 페이스 정의
export const fontFaces = `
  @font-face {
    font-family: 'KBFG-Text-Bold';
    src: url('./src/assets/fonts/kbfg_text_b.otf') format('opentype');
    font-weight: 700;
    font-style: normal;
  }
  @font-face {
    font-family: 'KBFG-Text-Medium';
    src: url('./src/assets/fonts/kbfg_text_m.otf') format('opentype');
    font-weight: 500;
    font-style: normal;
  }
  @font-face {
    font-family: 'KBFG-Text-Light';
    src: url('./src/assets/fonts/kbfg_text_l.otf') format('opentype');
    font-weight: 400;
    font-style: normal;
  }
`;
// 타입 정의
export type FontFamily = keyof typeof typography.fontFamily;
export type FontSize = keyof typeof typography.fontSize;
export type TextStyle = keyof typeof typography.styles;