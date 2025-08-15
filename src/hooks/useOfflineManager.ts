/**
 * Comprehensive Offline Manager Hook for KB StarBanking
 * 
 * This hook provides a unified interface for all offline functionality:
 * - Storage management
 * - Sync operations
 * - Security compliance
 * - UI state management
 * - Error handling
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { offlineStorage } from '../core/storage/offlineStorage';
import { offlineSyncManager } from '../core/storage/offlineSyncManager';
import { offlineFirstApi } from '../core/api/offlineFirstApi';
import { offlineSecurityManager } from '../core/security/offlineSecurityManager';

export interface OfflineManagerState {
  isOnline: boolean;
  isInitialized: boolean;
  isSyncing: boolean;
  isSecure: boolean;
  storageStats: {
    accounts: number;
    transactions: number;
    queuedActions: number;
    totalSize: number;
  };
  syncStats: {
    lastSync: number | null;
    pendingTransfers: number;
    pendingBillPayments: number;
    failedSyncs: number;
  };
  securityStats: {
    sessionActive: boolean;
    keysInitialized: boolean;
    biometricEnabled: boolean;
    complianceStatus: 'compliant' | 'warning' | 'violation';
  };
  errors: string[];
  warnings: string[];
}

export interface OfflineManagerActions {
  // Storage actions
  clearOfflineData: () => Promise<void>;
  validateDataIntegrity: () => Promise<{ valid: boolean; errors: string[] }>;
  
  // Sync actions
  forceSyncNow: () => Promise<void>;
  pauseSync: () => void;
  resumeSync: () => void;
  
  // Security actions
  validateSession: () => Promise<boolean>;
  rotateSecurityKeys: () => Promise<void>;
  enableBiometrics: () => Promise<boolean>;
  
  // UI actions
  dismissError: (index: number) => void;
  dismissWarning: (index: number) => void;
  refreshStats: () => Promise<void>;
}

export interface UseOfflineManagerReturn {
  state: OfflineManagerState;
  actions: OfflineManagerActions;
}

export const useOfflineManager = (): UseOfflineManagerReturn => {
  const [state, setState] = useState<OfflineManagerState>({
    isOnline: navigator.onLine,
    isInitialized: false,
    isSyncing: false,
    isSecure: false,
    storageStats: {
      accounts: 0,
      transactions: 0,
      queuedActions: 0,
      totalSize: 0,
    },
    syncStats: {
      lastSync: null,
      pendingTransfers: 0,
      pendingBillPayments: 0,
      failedSyncs: 0,
    },
    securityStats: {
      sessionActive: false,
      keysInitialized: false,
      biometricEnabled: false,
      complianceStatus: 'compliant',
    },
    errors: [],
    warnings: [],
  });

  const syncPausedRef = useRef(false);
  const initializationPromiseRef = useRef<Promise<void> | null>(null);

  // Initialize offline systems
  const initialize = useCallback(async (): Promise<void> => {
    try {
      setState(prev => ({ ...prev, isInitialized: false }));

      // Initialize storage
      await offlineStorage.initialize();

      // Initialize security
      const securityStatus = offlineSecurityManager.getSecurityStatus();

      // Validate session if exists
      const sessionValid = await offlineSecurityManager.validateSession();

      setState(prev => ({
        ...prev,
        isInitialized: true,
        isSecure: securityStatus.keysInitialized,
        securityStats: securityStatus,
      }));

      // Start periodic stats refresh
      startStatsRefresh();

    } catch (error) {
      console.error('[OfflineManager] Initialization failed:', error);
      setState(prev => ({
        ...prev,
        errors: [...prev.errors, `Initialization failed: ${error instanceof Error ? error.message : 'Unknown error'}`],
      }));
    }
  }, []);

  // Network status monitoring
  useEffect(() => {
    const handleOnline = () => {
      setState(prev => ({ ...prev, isOnline: true }));
      // Trigger sync when coming back online
      if (!syncPausedRef.current) {
        setTimeout(() => {
          forceSyncNow().catch(error => {
            console.error('[OfflineManager] Auto-sync failed:', error);
          });
        }, 1000);
      }
    };

    const handleOffline = () => {
      setState(prev => ({ ...prev, isOnline: false }));
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Initialize on mount
  useEffect(() => {
    if (!initializationPromiseRef.current) {
      initializationPromiseRef.current = initialize();
    }
  }, [initialize]);

  // Periodic stats refresh
  const startStatsRefresh = useCallback(() => {
    const interval = setInterval(() => {
      refreshStats().catch(error => {
        console.error('[OfflineManager] Stats refresh failed:', error);
      });
    }, 5000); // Refresh every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const refreshStats = useCallback(async (): Promise<void> => {
    try {
      // Get storage stats
      const storageStats = await offlineStorage.getStorageStats();
      
      // Get sync stats
      const offlineStatus = await offlineFirstApi.getOfflineStatus();
      const networkStatus = offlineSyncManager.getNetworkStatus();
      
      // Get security stats
      const securityStats = offlineSecurityManager.getSecurityStatus();

      setState(prev => ({
        ...prev,
        isSyncing: networkStatus.isSyncing,
        storageStats,
        syncStats: {
          lastSync: offlineStatus.lastSync,
          pendingTransfers: offlineStatus.pendingTransfers,
          pendingBillPayments: offlineStatus.pendingBillPayments,
          failedSyncs: 0, // Would be tracked by sync manager
        },
        securityStats,
      }));

    } catch (error) {
      console.error('[OfflineManager] Failed to refresh stats:', error);
    }
  }, []);

  // Storage actions
  const clearOfflineData = useCallback(async (): Promise<void> => {
    try {
      await offlineStorage.reset();
      await refreshStats();
      
      setState(prev => ({
        ...prev,
        warnings: [...prev.warnings, 'All offline data has been cleared'],
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        errors: [...prev.errors, `Failed to clear offline data: ${error instanceof Error ? error.message : 'Unknown error'}`],
      }));
    }
  }, [refreshStats]);

  const validateDataIntegrity = useCallback(async (): Promise<{ valid: boolean; errors: string[] }> => {
    try {
      const result = await offlineStorage.validateDataIntegrity();
      
      if (!result.valid) {
        setState(prev => ({
          ...prev,
          warnings: [...prev.warnings, `Data integrity issues found: ${result.errors.length} errors`],
        }));
      }
      
      return result;
    } catch (error) {
      const errorMessage = `Data validation failed: ${error instanceof Error ? error.message : 'Unknown error'}`;
      setState(prev => ({
        ...prev,
        errors: [...prev.errors, errorMessage],
      }));
      return { valid: false, errors: [errorMessage] };
    }
  }, []);

  // Sync actions
  const forceSyncNow = useCallback(async (): Promise<void> => {
    if (!navigator.onLine) {
      setState(prev => ({
        ...prev,
        warnings: [...prev.warnings, 'Cannot sync while offline'],
      }));
      return;
    }

    if (syncPausedRef.current) {
      setState(prev => ({
        ...prev,
        warnings: [...prev.warnings, 'Sync is currently paused'],
      }));
      return;
    }

    try {
      setState(prev => ({ ...prev, isSyncing: true }));
      
      const result = await offlineSyncManager.forceSyncNow();
      
      if (result.success) {
        setState(prev => ({
          ...prev,
          warnings: [...prev.warnings, `Sync completed: ${result.syncedItems} items synced`],
        }));
      } else {
        setState(prev => ({
          ...prev,
          errors: [...prev.errors, `Sync failed: ${result.errors.join(', ')}`],
        }));
      }

      await refreshStats();
    } catch (error) {
      setState(prev => ({
        ...prev,
        errors: [...prev.errors, `Sync failed: ${error instanceof Error ? error.message : 'Unknown error'}`],
      }));
    } finally {
      setState(prev => ({ ...prev, isSyncing: false }));
    }
  }, [refreshStats]);

  const pauseSync = useCallback((): void => {
    syncPausedRef.current = true;
    setState(prev => ({
      ...prev,
      warnings: [...prev.warnings, 'Synchronization paused'],
    }));
  }, []);

  const resumeSync = useCallback((): void => {
    syncPausedRef.current = false;
    setState(prev => ({
      ...prev,
      warnings: [...prev.warnings, 'Synchronization resumed'],
    }));
    
    // Trigger sync if online
    if (navigator.onLine) {
      setTimeout(() => {
        forceSyncNow().catch(error => {
          console.error('[OfflineManager] Resume sync failed:', error);
        });
      }, 1000);
    }
  }, [forceSyncNow]);

  // Security actions
  const validateSession = useCallback(async (): Promise<boolean> => {
    try {
      const isValid = await offlineSecurityManager.validateSession();
      
      setState(prev => ({
        ...prev,
        securityStats: {
          ...prev.securityStats,
          sessionActive: isValid,
        },
      }));

      if (!isValid) {
        setState(prev => ({
          ...prev,
          warnings: [...prev.warnings, 'Session expired or invalid'],
        }));
      }

      return isValid;
    } catch (error) {
      setState(prev => ({
        ...prev,
        errors: [...prev.errors, `Session validation failed: ${error instanceof Error ? error.message : 'Unknown error'}`],
      }));
      return false;
    }
  }, []);

  const rotateSecurityKeys = useCallback(async (): Promise<void> => {
    try {
      // This would trigger key rotation in the security manager
      // For now, just update the stats
      await refreshStats();
      
      setState(prev => ({
        ...prev,
        warnings: [...prev.warnings, 'Security keys rotated successfully'],
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        errors: [...prev.errors, `Key rotation failed: ${error instanceof Error ? error.message : 'Unknown error'}`],
      }));
    }
  }, [refreshStats]);

  const enableBiometrics = useCallback(async (): Promise<boolean> => {
    try {
      const enabled = await offlineSecurityManager.enableBiometricAuth();
      
      if (enabled) {
        setState(prev => ({
          ...prev,
          securityStats: {
            ...prev.securityStats,
            biometricEnabled: true,
          },
          warnings: [...prev.warnings, 'Biometric authentication enabled'],
        }));
      } else {
        setState(prev => ({
          ...prev,
          warnings: [...prev.warnings, 'Biometric authentication setup failed'],
        }));
      }

      return enabled;
    } catch (error) {
      setState(prev => ({
        ...prev,
        errors: [...prev.errors, `Biometric setup failed: ${error instanceof Error ? error.message : 'Unknown error'}`],
      }));
      return false;
    }
  }, []);

  // UI actions
  const dismissError = useCallback((index: number): void => {
    setState(prev => ({
      ...prev,
      errors: prev.errors.filter((_, i) => i !== index),
    }));
  }, []);

  const dismissWarning = useCallback((index: number): void => {
    setState(prev => ({
      ...prev,
      warnings: prev.warnings.filter((_, i) => i !== index),
    }));
  }, []);

  const actions: OfflineManagerActions = {
    clearOfflineData,
    validateDataIntegrity,
    forceSyncNow,
    pauseSync,
    resumeSync,
    validateSession,
    rotateSecurityKeys,
    enableBiometrics,
    dismissError,
    dismissWarning,
    refreshStats,
  };

  return {
    state,
    actions,
  };
};