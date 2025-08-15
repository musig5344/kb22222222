import React, { useEffect, useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../../features/auth/AuthContext';
import { PageLoader } from './PageLoader';
const ProtectedRoute: React.FC = () => {
  const authContext = useAuth();
  const location = useLocation();
  const [isInitialCheck, setIsInitialCheck] = useState(true);
  useEffect(() => {
    // 초기 체크 완료 후 플래그 설정
    const timer = setTimeout(() => {
      setIsInitialCheck(false);
    }, 100);
    return () => clearTimeout(timer);
  }, []);
  // 초기 로딩이거나 인증 확인 중일 때만 로더 표시
  if (isInitialCheck && authContext.loading) {
    return <PageLoader />;
  }
  // 인증 상태 확인 - AuthContext만 사용
  const isAuthenticated = authContext.isLoggedIn && !!authContext.session;
  if (!isAuthenticated) {
    if (process.env.NODE_ENV === 'development') {
      console.log('Authentication check failed:', {
        isLoggedIn: authContext.isLoggedIn,
        hasSession: !!authContext.session,
        hasUser: !!authContext.user,
        attemptedPath: location.pathname
      });
    }
    // 로그인 페이지로 리다이렉트하면서 원래 경로 저장
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  if (process.env.NODE_ENV === 'development') {
    console.log('User authenticated:', {
      userId: authContext.user?.id,
      userEmail: authContext.user?.email,
      currentPath: location.pathname
    });
  }
  return <Outlet />;
};
export default ProtectedRoute; 