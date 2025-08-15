import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import { KBDesignSystem } from '../../styles/tokens/kb-design-system';
import { DashboardHeader } from '../../shared/components/layout/DashboardHeader';
import TabBar from '../../shared/components/layout/TabBar';
import { DashboardSkeleton } from '../../shared/components/ui/DashboardSkeleton';
import { KBMenuPage } from '../menu/components/KBMenuPage';
import { useAuth } from '../auth/AuthContext';
import { useAccountData } from '../../hooks/useAccountData';
import { ErrorNotification } from '../../shared/components/ui/ErrorNotification';
import SmoothLoadingTransition from '../../shared/components/animations/SmoothLoadingTransition';
import { 
  androidAppContainer,
  androidOptimizedScroll,
  androidOptimizedButton 
} from '../../styles/android-webview-optimizations';
import { 
  universalAppContainer,
  universalMainContent,
  responsiveSpacing,
  breakpoints
} from '../../styles/universal-responsive';
// 분리된 컴포넌트들 import
import MainBanner from './components/MainBanner';
import SimplifiedAccountSection from './components/SimplifiedAccountSection';
/**
 * KB 스타뱅킹 2025년 최신 버전 대시보드
 * - 마이크로 컴포넌트 아키텍처로 완전 리팩토링
 * - 원본 앱 기준 정확한 UI 구현
 * - 백엔드 실시간 데이터 연동
 * - KB 원본 에셋 사용
 * - 성능 최적화 및 코드 품질 향상
 */
// 메인 컨테이너 - Universal Responsive System
const DashboardContainer = styled.div`
  ${universalAppContainer}
  background: ${KBDesignSystem.colors.background.gray100};
  
  /* Android WebView optimizations for mobile only */
  @media (max-width: ${breakpoints.tablet}px) {
    ${androidAppContainer}
    transform: translateZ(0);
    will-change: scroll-position;
  }
`;

// 메인 콘텐츠 영역 - Universal Responsive System
const MainContent = styled.div`
  ${universalMainContent}
  /* Remove horizontal padding to let components control their own spacing */
  padding-left: 0;
  padding-right: 0;
  
  /* Precise top spacing to match reference screenshot */
  padding-top: 56px; /* Exact header height */
  
  /* Android WebView optimizations for mobile only */
  @media (max-width: ${breakpoints.tablet}px) {
    ${androidOptimizedScroll}
    overscroll-behavior: none;
    touch-action: pan-y;
  }
`;
interface DashboardPageProps {}
export const DashboardPage: React.FC<DashboardPageProps> = () => {
  const { isInitialized } = useAuth();
  const { accounts, isLoading: isLoadingAccounts, error: accountError, refetch: refetchAccounts } = useAccountData();
  const [showMenu, setShowMenu] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // 통합 로딩 상태
  const isLoading = useMemo(() => {
    return !isInitialized || isLoadingAccounts;
  }, [isInitialized, isLoadingAccounts]);
  // 에러 표시 통합 (안정화됨)
  React.useEffect(() => {
    if (accountError && accountError !== error) {
      setError(accountError);
    }
  }, [accountError]); // error 의존성 제거로 무한 루프 방지
  // 배너 클릭 핸들러
  const handleBannerClick = () => {
    // KB카드 관련 액션
  };
  if (isLoading) {
    return (
      <DashboardContainer>
        <DashboardHeader onMenuClick={() => setShowMenu(true)} />
        <DashboardSkeleton />
        <TabBar />
      </DashboardContainer>
    );
  }
  if (showMenu) {
    return <KBMenuPage onClose={() => setShowMenu(false)} />;
  }
  return (
    <DashboardContainer>
      <ErrorNotification 
        error={error || accountError} 
        onRetry={accountError ? refetchAccounts : undefined}
        onDismiss={() => setError(null)}
      />
      <DashboardHeader onMenuClick={() => setShowMenu(true)} />
      <MainContent>
        {/* 메인 배너 - 상단 여백 없음 */}
        <MainBanner onBannerClick={handleBannerClick} />
        {/* 단순화된 계좌 섹션 - 배너와의 간격 최소화 */}
        <SimplifiedAccountSection />
      </MainContent>
      <TabBar />
    </DashboardContainer>
  );
};
export default DashboardPage;