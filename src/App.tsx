import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import styled from 'styled-components';
import GlobalStyle from './styles/GlobalStyle';
import { theme } from './styles/theme';
import { LoginScreen } from './features/auth/components/LoginScreen';
import { SplashScreen } from './shared/components/ui/SplashScreen';
import { LazyLoadErrorBoundary } from '@shared/components/ui/LazyLoadErrorBoundary';
import { AuthProvider } from '@features/auth/AuthContext';
import { lazyWithRetry } from '@utils/lazyWithRetry';
import ProtectedRoute from '@shared/components/ui/ProtectedRoute';
import { QueryProvider } from '@app/providers/QueryProvider';
import { KBLoading } from '@shared/components/ui/UnifiedLoading';
import PageTransitionWrapper from './shared/components/animations/PageTransitionWrapper';
import { androidAppContainer } from './styles/android-webview-optimizations';
import { universalAppContainer } from './styles/universal-responsive';
import { LoadingProvider } from './shared/contexts/LoadingContext';
import { NotificationProvider } from './shared/contexts/NotificationContext';
import BackNavigationHandler from './shared/components/navigation/BackNavigationHandler';

// 중요 페이지들을 미리 로드하기 위한 prefetch 함수
const prefetchImportantPages = () => {
  // 로그인 후 자주 사용되는 페이지들 미리 로드
  import('./features/dashboard/DashboardPage');
  import('./features/accounts/AccountPage');
  import('./features/transfers/TransferPage');
};

// 로그인 관련 페이지
const IdPasswordLoginPage = lazyWithRetry(() => import('./features/auth/IdPasswordLoginPage'));

// 메인 탭바 페이지들 (원본 KB 스타뱅킹 앱 구조)
const ShopPage = lazyWithRetry(() => import('./pages/ShopPage')); // 상품
const AssetsPage = lazyWithRetry(() => import('./pages/AssetsPage')); // 자산  
const WalletPage = lazyWithRetry(() => import('./features/dashboard/DashboardPage')); // 지갑 (메인 대시보드)
const BenefitsPage = lazyWithRetry(() => import('./pages/BenefitsPage')); // 혜택
const KBMenuPage = lazyWithRetry(() => import('./features/menu/components/KBMenuPage').then(module => ({ default: module.KBMenuPage }))); // 메뉴

// 서브 페이지들
const AccountPage = lazyWithRetry(() => import('./features/accounts/AccountPage'));
const AccountDetailPage = lazyWithRetry(() => import('./features/accounts/AccountDetailPage'));
const ComprehensiveAccountPage = lazyWithRetry(() => import('./features/accounts/ComprehensiveAccountPage'));
const TransferPage = lazyWithRetry(() => import('./features/transfers/TransferPage'));
const TransferPicturePage = lazyWithRetry(() => import('./features/transfers/TransferPicturePage'));
const TransactionHistoryPage = lazyWithRetry(() => import('./features/transactions/TransactionHistoryPage'));
const AccountTransactionPage = lazyWithRetry(() => import('./features/transactions/AccountTransactionPage'));
// Universal responsive app container
const AppContainer = styled.div`
  ${universalAppContainer}
  background-color: #FFFFFF;
  
  /* Android APK specific optimizations for mobile */
  @media (max-width: 768px) {
    ${androidAppContainer}
  }
`;

// MainContent 컴포넌트 제거 - 로딩은 LoadingContext에서 관리
function App() {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  // 페이지 로딩 상태는 로컬 상태로 관리 (필요시 AuthContext로 이전 가능)
  useEffect(() => {
    // 1초 후 스플래시 화면 제거
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
      // 스플래시 화면 후 중요 페이지들 미리 로드
      prefetchImportantPages();
    }, 1000);
    return () => clearTimeout(timer);
  }, []);
  if (isInitialLoading) {
    return (
      <ThemeProvider theme={theme as any}>
        <GlobalStyle />
        <SplashScreen />
      </ThemeProvider>
    );
  }
  return (
    <QueryProvider>
      <ThemeProvider theme={theme as any}>
        <GlobalStyle />
        <LoadingProvider>
          <NotificationProvider>
            <AuthProvider>
              <AppContainer>
                {/* PageLoader는 필요시 개별 페이지에서 관리 */}
                <Router>
                  <BackNavigationHandler>
                    <LazyLoadErrorBoundary>
                      <PageTransitionWrapper>
                      <Routes>
                    {/* 로그인 페이지 */}
                    <Route path="/" element={<LoginScreen />} />
                    <Route path="/login" element={<LoginScreen />} />
                    <Route path="/login/id" element={
                      <Suspense fallback={<KBLoading isVisible={true} type="fullscreen" variant="type2" message="로그인 페이지를 불러오고 있습니다" />}>
                        <IdPasswordLoginPage />
                      </Suspense>
                    } />
                    
                    {/* 보호된 라우트들 */}
                    <Route element={<ProtectedRoute />}>
                      {/* 메인 탭바 페이지들 (원본 앱 순서: 상품/자산/지갑/혜택/메뉴) */}
                      <Route path="/shop" element={
                        <Suspense fallback={<KBLoading isVisible={true} type="fullscreen" variant="type2" />}>
                          <ShopPage />
                        </Suspense>
                      } />
                      <Route path="/assets" element={
                        <Suspense fallback={<KBLoading isVisible={true} type="fullscreen" variant="type2" />}>
                          <AssetsPage />
                        </Suspense>
                      } />
                      <Route path="/wallet" element={
                        <Suspense fallback={<KBLoading isVisible={true} type="fullscreen" variant="type2" size="large" />}>
                          <WalletPage />
                        </Suspense>
                      } />
                      {/* 호환성을 위한 /dashboard 경로 리다이렉트 */}
                      <Route path="/dashboard" element={
                        <Suspense fallback={<KBLoading isVisible={true} type="fullscreen" variant="type2" size="large" />}>
                          <WalletPage />
                        </Suspense>
                      } />
                      <Route path="/benefits" element={
                        <Suspense fallback={<KBLoading isVisible={true} type="fullscreen" variant="type2" />}>
                          <BenefitsPage />
                        </Suspense>
                      } />
                      <Route path="/menu" element={
                        <Suspense fallback={<KBLoading isVisible={true} type="fullscreen" variant="type2" />}>
                          <KBMenuPage />
                        </Suspense>
                      } />
                      
                      {/* 계좌 관련 서브 페이지들 */}
                      <Route path="/account" element={
                        <Suspense fallback={<KBLoading isVisible={true} type="fullscreen" variant="type2" />}>
                          <AccountPage />
                        </Suspense>
                      } />
                      <Route path="/account/:accountId" element={
                        <Suspense fallback={<KBLoading isVisible={true} type="fullscreen" variant="type2" />}>
                          <AccountDetailPage />
                        </Suspense>
                      } />
                      <Route path="/account/:accountId/transactions" element={
                        <Suspense fallback={<KBLoading isVisible={true} type="fullscreen" variant="type2" />}>
                          <AccountTransactionPage />
                        </Suspense>
                      } />
                      <Route path="/comprehensive-account" element={
                        <Suspense fallback={<KBLoading isVisible={true} type="fullscreen" variant="type2" />}>
                          <ComprehensiveAccountPage />
                        </Suspense>
                      } />
                      
                      {/* 이체 관련 페이지들 */}
                      <Route path="/transfer" element={
                        <Suspense fallback={<KBLoading isVisible={true} type="fullscreen" variant="type2" message="이체 서비스를 준비하고 있습니다" />}>
                          <TransferPage />
                        </Suspense>
                      } />
                      <Route path="/transfer/picture" element={
                        <Suspense fallback={<KBLoading isVisible={true} type="fullscreen" variant="type2" />}>
                          <TransferPicturePage />
                        </Suspense>
                      } />
                      
                      {/* 거래내역 */}
                      <Route path="/transactions" element={
                        <Suspense fallback={<KBLoading isVisible={true} type="fullscreen" variant="type2" />}>
                          <TransactionHistoryPage />
                        </Suspense>
                      } />
                      </Route>
                      </Routes>
                    </PageTransitionWrapper>
                  </LazyLoadErrorBoundary>
                </BackNavigationHandler>
              </Router>
            </AppContainer>
          </AuthProvider>
        </NotificationProvider>
      </LoadingProvider>
    </ThemeProvider>
  </QueryProvider>
  );
}
export default App;