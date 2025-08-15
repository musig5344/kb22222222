import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface BackNavigationHandlerProps {
  children: React.ReactNode;
}

export const BackNavigationHandler: React.FC<BackNavigationHandlerProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      const currentPath = location.pathname;
      
      // 백버튼 네비게이션 로직
      switch (currentPath) {
        case '/account':
        case '/transfer':
        case '/transactions':
        case '/comprehensive-account':
          // 서브 페이지에서는 지갑(메인 대시보드)으로 이동
          navigate('/wallet', { replace: true });
          break;
          
        case '/account/:accountId':
        case '/account/:accountId/transactions':
          // 계좌 상세에서는 계좌 목록으로
          navigate('/account', { replace: true });
          break;
          
        case '/transfer/picture':
          // 사진 이체에서는 일반 이체로
          navigate('/transfer', { replace: true });
          break;
          
        case '/wallet':
        case '/shop':
        case '/assets':
        case '/benefits':
        case '/menu':
          // 메인 탭들에서는 히스토리 기본 동작 (앱 종료나 이전 페이지)
          break;
          
        default:
          // 기타 페이지에서는 지갑으로
          navigate('/wallet', { replace: true });
          break;
      }
    };

    // 브라우저 백버튼 이벤트 리스너 등록
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [navigate, location.pathname]);

  return <>{children}</>;
};

export default BackNavigationHandler;