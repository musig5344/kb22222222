/**
 * KB StarBanking PWA React Hooks
 * 
 * PWA 기능을 React 컴포넌트에서 쉽게 사용할 수 있는 훅들
 */
import { useState, useEffect, useCallback, useRef } from 'react';
import { 
  registerServiceWorker, 
  skipWaiting, 
  setupInstallPrompt,
  getNetworkStatus,
  setupPushNotifications,
  OfflineDataManager,
  AnalyticsManager,
  PWAInstallInfo,
  NetworkStatus
} from '../../utils/pwa';
/**
 * PWA 상태 인터페이스
 */
export interface PWAState {
  isOnline: boolean;
  isInstalled: boolean;
  isInstallable: boolean;
  isUpdateAvailable: boolean;
  isLoading: boolean;
  registration: ServiceWorkerRegistration | null;
}
/**
 * 메인 PWA 훅
 * PWA의 전반적인 상태와 기능을 관리합니다.
 */
export function usePWA() {
  const [state, setState] = useState<PWAState>({
    isOnline: navigator.onLine,
    isInstalled: false,
    isInstallable: false,
    isUpdateAvailable: false,
    isLoading: true,
    registration: null
  });
  const installPromptRef = useRef<PWAInstallInfo | null>(null);
  // 서비스 워커 초기화
  useEffect(() => {
    const initializePWA = async () => {
      try {
        // 서비스 워커 등록
        const registration = await registerServiceWorker();
        // 설치 프롬프트 설정
        const installPrompt = setupInstallPrompt();
        installPromptRef.current = installPrompt;
        setState(prev => ({
          ...prev,
          registration,
          isInstallable: installPrompt.isInstallable,
          isLoading: false
        }));
      } catch (error) {
        setState(prev => ({ ...prev, isLoading: false }));
      }
    };
    initializePWA();
  }, []);
  // PWA 이벤트 리스너 설정
  useEffect(() => {
    const handleUpdateAvailable = () => {
      setState(prev => ({ ...prev, isUpdateAvailable: true }));
    };
    const handleInstallable = () => {
      setState(prev => ({ ...prev, isInstallable: true }));
    };
    const handleInstalled = () => {
      setState(prev => ({ 
        ...prev, 
        isInstalled: true, 
        isInstallable: false 
      }));
    };
    // PWA 이벤트 리스너 등록
    window.addEventListener('pwa-update-available', handleUpdateAvailable);
    window.addEventListener('pwa-installable', handleInstallable);
    window.addEventListener('pwa-installed', handleInstalled);
    return () => {
      window.removeEventListener('pwa-update-available', handleUpdateAvailable);
      window.removeEventListener('pwa-installable', handleInstallable);
      window.removeEventListener('pwa-installed', handleInstalled);
    };
  }, []);
  // 네트워크 상태 모니터링
  useEffect(() => {
    const handleOnline = () => setState(prev => ({ ...prev, isOnline: true }));
    const handleOffline = () => setState(prev => ({ ...prev, isOnline: false }));
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  // 앱 업데이트 적용
  const updateApp = useCallback(async () => {
    try {
      await skipWaiting();
      window.location.reload();
    } catch (error) {
      throw error;
    }
  }, []);
  // 앱 설치
  const installApp = useCallback(async () => {
    if (!installPromptRef.current?.isInstallable) {
      throw new Error('앱 설치가 불가능합니다.');
    }
    try {
      await installPromptRef.current.installApp();
    } catch (error) {
      throw error;
    }
  }, []);
  return {
    ...state,
    updateApp,
    installApp,
    networkStatus: getNetworkStatus()
  };
}
/**
 * 오프라인 상태 훅
 * 네트워크 연결 상태를 세밀하게 관리합니다.
 */
export function useOnlineStatus() {
  const [networkStatus, setNetworkStatus] = useState<NetworkStatus>(getNetworkStatus());
  useEffect(() => {
    const updateNetworkStatus = () => {
      setNetworkStatus(getNetworkStatus());
    };
    const handleOnline = () => updateNetworkStatus();
    const handleOffline = () => updateNetworkStatus();
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    // 연결 상태 변경 감지 (지원되는 브라우저에서)
    const connection = (navigator as any).connection;
    if (connection) {
      connection.addEventListener('change', updateNetworkStatus);
    }
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      if (connection) {
        connection.removeEventListener('change', updateNetworkStatus);
      }
    };
  }, []);
  return networkStatus;
}
/**
 * 오프라인 데이터 관리 훅
 * 오프라인 상태에서의 데이터 캐시와 동기화를 관리합니다.
 */
export function useOfflineData() {
  const [isInitialized, setIsInitialized] = useState(false);
  const dataManagerRef = useRef<OfflineDataManager | null>(null);
  useEffect(() => {
    const initOfflineData = async () => {
      if (!dataManagerRef.current) {
        dataManagerRef.current = new OfflineDataManager();
        await dataManagerRef.current.init();
        setIsInitialized(true);
      }
    };
    initOfflineData();
  }, []);
  const saveAccounts = useCallback(async (accounts: Array<Record<string, unknown>>) => {
    if (!dataManagerRef.current) return;
    await dataManagerRef.current.saveAccounts(accounts);
  }, []);
  const getAccounts = useCallback(async (userId: string) => {
    if (!dataManagerRef.current) return [];
    return await dataManagerRef.current.getAccounts(userId);
  }, []);
  const saveTransactions = useCallback(async (transactions: Array<Record<string, unknown>>) => {
    if (!dataManagerRef.current) return;
    await dataManagerRef.current.saveTransactions(transactions);
  }, []);
  const getTransactions = useCallback(async (accountId: string, limit?: number) => {
    if (!dataManagerRef.current) return [];
    return await dataManagerRef.current.getTransactions(accountId, limit);
  }, []);
  const queueOfflineAction = useCallback(async (action: Record<string, unknown>) => {
    if (!dataManagerRef.current) return;
    await dataManagerRef.current.queueOfflineAction(action as any);
  }, []);
  return {
    isInitialized,
    saveAccounts,
    getAccounts,
    saveTransactions,
    getTransactions,
    queueOfflineAction
  };
}
/**
 * 푸시 알림 훅
 * 푸시 알림 구독과 권한 관리를 담당합니다.
 */
export function usePushNotifications() {
  const [permission, setPermission] = useState<NotificationPermission>(Notification.permission);
  const [subscription, setSubscription] = useState<PushSubscription | null>(null);
  const [isSupported, setIsSupported] = useState(false);
  useEffect(() => {
    // 푸시 알림 지원 여부 확인
    const supported = 'serviceWorker' in navigator && 
                     'PushManager' in window && 
                     'Notification' in window;
    setIsSupported(supported);
    if (!supported) {
      return;
    }
    // 기존 구독 확인
    navigator.serviceWorker.ready.then(async (registration) => {
      const existingSubscription = await registration.pushManager.getSubscription();
      setSubscription(existingSubscription);
    });
  }, []);
  const requestPermission = useCallback(async (): Promise<NotificationPermission> => {
    if (!isSupported) {
      throw new Error('푸시 알림이 지원되지 않는 브라우저입니다.');
    }
    const result = await Notification.requestPermission();
    setPermission(result);
    return result;
  }, [isSupported]);
  const subscribe = useCallback(async (publicVapidKey: string): Promise<PushSubscription | null> => {
    if (!isSupported) {
      throw new Error('푸시 알림이 지원되지 않는 브라우저입니다.');
    }
    if (permission !== 'granted') {
      const newPermission = await requestPermission();
      if (newPermission !== 'granted') {
        throw new Error('푸시 알림 권한이 거부되었습니다.');
      }
    }
    try {
      const registration = await navigator.serviceWorker.ready;
      const newSubscription = await setupPushNotifications(registration, publicVapidKey);
      setSubscription(newSubscription);
      return newSubscription;
    } catch (error) {
      throw error;
    }
  }, [permission, requestPermission, isSupported]);
  const unsubscribe = useCallback(async (): Promise<void> => {
    if (!subscription) {
      return;
    }
    try {
      await subscription.unsubscribe();
      setSubscription(null);
    } catch (error) {
      throw error;
    }
  }, [subscription]);
  const showNotification = useCallback(async (title: string, options?: NotificationOptions): Promise<void> => {
    if (!isSupported || permission !== 'granted') {
      throw new Error('알림을 표시할 수 없습니다.');
    }
    try {
      const registration = await navigator.serviceWorker.ready;
      await registration.showNotification(title, {
        icon: '/assets/images/kb_logo.png',
        badge: '/assets/images/kb_logo.png',
        ...options
      });
    } catch (error) {
      throw error;
    }
  }, [permission, isSupported]);
  return {
    isSupported,
    permission,
    subscription,
    requestPermission,
    subscribe,
    unsubscribe,
    showNotification
  };
}
/**
 * 앱 업데이트 훅
 * 앱 업데이트 상태와 업데이트 적용을 관리합니다.
 */
export function useAppUpdate() {
  const [isUpdateAvailable, setIsUpdateAvailable] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  useEffect(() => {
    const handleUpdateAvailable = () => {
      setIsUpdateAvailable(true);
    };
    window.addEventListener('pwa-update-available', handleUpdateAvailable);
    return () => {
      window.removeEventListener('pwa-update-available', handleUpdateAvailable);
    };
  }, []);
  const applyUpdate = useCallback(async () => {
    if (!isUpdateAvailable) {
      return;
    }
    setIsUpdating(true);
    try {
      await skipWaiting();
      // 페이지 새로고침으로 새 버전 적용
      window.location.reload();
    } catch (error) {
      setIsUpdating(false);
      throw error;
    }
  }, [isUpdateAvailable]);
  return {
    isUpdateAvailable,
    isUpdating,
    applyUpdate
  };
}
/**
 * 분석 및 성능 모니터링 훅
 */
export function useAnalytics() {
  const analyticsRef = useRef<AnalyticsManager | null>(null);
  useEffect(() => {
    if (!analyticsRef.current) {
      analyticsRef.current = new AnalyticsManager();
    }
    return () => {
      // 세션 종료 시 통계 전송
      if (analyticsRef.current) {
        const summary = analyticsRef.current.getSessionSummary();
      }
    };
  }, []);
  const trackPageView = useCallback((path: string) => {
    analyticsRef.current?.trackPageView(path);
  }, []);
  const trackEvent = useCallback((event: string, data?: any) => {
    analyticsRef.current?.trackEvent(event, data);
  }, []);
  return {
    trackPageView,
    trackEvent
  };
}
/**
 * 배경 동기화 훅
 * 오프라인에서 실행된 액션들을 온라인 복구 시 동기화합니다.
 */
export function useBackgroundSync() {
  const [isSyncing, setIsSyncing] = useState(false);
  const [pendingActions, setPendingActions] = useState<any[]>([]);
  useEffect(() => {
    // 서비스 워커에서 백그라운드 동기화 메시지 수신
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === 'BACKGROUND_SYNC_COMPLETE') {
        setIsSyncing(false);
        setPendingActions([]);
      }
    };
    navigator.serviceWorker?.addEventListener('message', handleMessage);
    return () => {
      navigator.serviceWorker?.removeEventListener('message', handleMessage);
    };
  }, []);
  const addToQueue = useCallback(async (action: any) => {
    setPendingActions(prev => [...prev, action]);
    // IndexedDB에 저장
    const offlineManager = new OfflineDataManager();
    await offlineManager.queueOfflineAction(action);
  }, []);
  const triggerSync = useCallback(async () => {
    if (!('serviceWorker' in navigator)) {
      return;
    }
    try {
      setIsSyncing(true);
      const registration = await navigator.serviceWorker.ready;
      // Check if sync is available
      if ('sync' in registration) {
        await (registration as any).sync.register('background-sync');
      } else {
        setIsSyncing(false);
      }
    } catch (error) {
      setIsSyncing(false);
    }
  }, []);
  return {
    isSyncing,
    pendingActions,
    addToQueue,
    triggerSync
  };
}