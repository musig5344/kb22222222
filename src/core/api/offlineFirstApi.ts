/**
 * Offline-First API Client for KB StarBanking
 * 
 * This client implements an offline-first strategy where:
 * 1. Data is served from cache first for immediate response
 * 2. Network requests happen in background to update cache
 * 3. Conflicts are resolved based on configured strategies
 * 4. Failed requests are queued for retry when online
 */

import { offlineStorage } from '../storage/offlineStorage';
import { offlineSyncManager } from '../storage/offlineSyncManager';

export interface ApiConfig {
  baseUrl: string;
  timeout: number;
  retryAttempts: number;
  retryDelay: number;
  offlineTimeout: number;
}

export interface ApiResponse<T = any> {
  data: T;
  cached: boolean;
  timestamp: number;
  source: 'network' | 'cache' | 'offline';
  nextSync?: number;
}

export interface ApiError {
  code: string;
  message: string;
  details?: any;
  retryable: boolean;
}

class NetworkStatus {
  private _isOnline = navigator.onLine;
  private listeners: Array<(online: boolean) => void> = [];

  constructor() {
    window.addEventListener('online', () => {
      this._isOnline = true;
      this.notifyListeners(true);
    });

    window.addEventListener('offline', () => {
      this._isOnline = false;
      this.notifyListeners(false);
    });
  }

  get isOnline(): boolean {
    return this._isOnline;
  }

  addListener(callback: (online: boolean) => void): void {
    this.listeners.push(callback);
  }

  private notifyListeners(online: boolean): void {
    this.listeners.forEach(callback => callback(online));
  }
}

export class OfflineFirstApiClient {
  private config: ApiConfig;
  private networkStatus = new NetworkStatus();
  private requestQueue: Map<string, Promise<any>> = new Map();

  constructor(config: Partial<ApiConfig> = {}) {
    this.config = {
      baseUrl: process.env.REACT_APP_API_BASE_URL || '/api',
      timeout: 30000,
      retryAttempts: 3,
      retryDelay: 1000,
      offlineTimeout: 5000,
      ...config,
    };

    // Initialize offline storage
    this.initializeStorage();
  }

  private async initializeStorage(): Promise<void> {
    try {
      await offlineStorage.initialize();
    } catch (error) {
      console.error('[OfflineFirstApi] Storage initialization failed:', error);
    }
  }

  // Account API methods
  async getAccounts(): Promise<ApiResponse<any[]>> {
    const cacheKey = 'accounts';
    
    try {
      // Always try to serve from cache first for immediate response
      const cachedAccounts = await offlineStorage.getAllAccounts();
      const cacheResponse: ApiResponse<any[]> = {
        data: cachedAccounts,
        cached: true,
        timestamp: Date.now(),
        source: 'cache',
      };

      // If we have cached data and we're offline, return it
      if (!this.networkStatus.isOnline && cachedAccounts.length > 0) {
        return cacheResponse;
      }

      // Try to update from network in background
      if (this.networkStatus.isOnline) {
        this.updateAccountsFromNetwork().catch(error => {
          console.warn('[OfflineFirstApi] Background account update failed:', error);
        });
      }

      // Return cached data immediately
      if (cachedAccounts.length > 0) {
        return cacheResponse;
      }

      // No cached data, try network if online
      if (this.networkStatus.isOnline) {
        return await this.fetchAccountsFromNetwork();
      }

      // Completely offline with no cache
      throw new Error('No account data available offline');

    } catch (error) {
      console.error('[OfflineFirstApi] getAccounts failed:', error);
      throw this.createApiError('ACCOUNTS_FETCH_FAILED', error);
    }
  }

  async getAccount(accountId: string): Promise<ApiResponse<any>> {
    try {
      // Try cache first
      const cachedAccount = await offlineStorage.getAccount(accountId);
      
      if (cachedAccount) {
        const cacheResponse: ApiResponse<any> = {
          data: cachedAccount,
          cached: true,
          timestamp: Date.now(),
          source: 'cache',
        };

        // Update from network in background if online
        if (this.networkStatus.isOnline) {
          this.updateAccountFromNetwork(accountId).catch(error => {
            console.warn('[OfflineFirstApi] Background account update failed:', error);
          });
        }

        return cacheResponse;
      }

      // No cache, try network if online
      if (this.networkStatus.isOnline) {
        return await this.fetchAccountFromNetwork(accountId);
      }

      throw new Error(`Account ${accountId} not available offline`);

    } catch (error) {
      console.error('[OfflineFirstApi] getAccount failed:', error);
      throw this.createApiError('ACCOUNT_FETCH_FAILED', error);
    }
  }

  async getTransactions(accountId: string, limit: number = 50): Promise<ApiResponse<any[]>> {
    try {
      // Get cached transactions
      const cachedTransactions = await offlineStorage.getTransactionsByAccount(accountId, limit);
      
      const cacheResponse: ApiResponse<any[]> = {
        data: cachedTransactions,
        cached: true,
        timestamp: Date.now(),
        source: 'cache',
      };

      // If offline, return cached data
      if (!this.networkStatus.isOnline) {
        return cacheResponse;
      }

      // Update from network in background
      this.updateTransactionsFromNetwork(accountId, limit).catch(error => {
        console.warn('[OfflineFirstApi] Background transaction update failed:', error);
      });

      // Return cached data immediately if available
      if (cachedTransactions.length > 0) {
        return cacheResponse;
      }

      // No cached data, try network
      return await this.fetchTransactionsFromNetwork(accountId, limit);

    } catch (error) {
      console.error('[OfflineFirstApi] getTransactions failed:', error);
      throw this.createApiError('TRANSACTIONS_FETCH_FAILED', error);
    }
  }

  // Transfer methods (write operations)
  async prepareTransfer(transferData: any): Promise<ApiResponse<any>> {
    try {
      if (this.networkStatus.isOnline) {
        // Online: Try network first
        return await this.sendTransferPreparation(transferData);
      } else {
        // Offline: Queue for later processing
        const actionId = await offlineSyncManager.queueTransfer(transferData);
        
        return {
          data: {
            transferId: actionId,
            status: 'queued',
            message: 'Transfer queued for processing when online',
          },
          cached: false,
          timestamp: Date.now(),
          source: 'offline',
        };
      }
    } catch (error) {
      // Network failed, queue the transfer
      const actionId = await offlineSyncManager.queueTransfer(transferData);
      
      return {
        data: {
          transferId: actionId,
          status: 'queued',
          message: 'Transfer queued due to network error',
        },
        cached: false,
        timestamp: Date.now(),
        source: 'offline',
      };
    }
  }

  async executeTransfer(transferId: string, confirmationData: any): Promise<ApiResponse<any>> {
    try {
      if (!this.networkStatus.isOnline) {
        throw new Error('Transfer execution requires internet connection');
      }

      return await this.sendTransferExecution(transferId, confirmationData);

    } catch (error) {
      console.error('[OfflineFirstApi] executeTransfer failed:', error);
      throw this.createApiError('TRANSFER_EXECUTION_FAILED', error);
    }
  }

  // Bill payment methods
  async queueBillPayment(billData: any): Promise<ApiResponse<any>> {
    try {
      if (this.networkStatus.isOnline) {
        // Try to process immediately
        return await this.sendBillPayment(billData);
      } else {
        // Queue for later processing
        const actionId = await offlineSyncManager.queueBillPayment(billData);
        
        return {
          data: {
            paymentId: actionId,
            status: 'queued',
            message: 'Bill payment queued for processing when online',
          },
          cached: false,
          timestamp: Date.now(),
          source: 'offline',
        };
      }
    } catch (error) {
      // Network failed, queue the payment
      const actionId = await offlineSyncManager.queueBillPayment(billData);
      
      return {
        data: {
          paymentId: actionId,
          status: 'queued',
          message: 'Bill payment queued due to network error',
        },
        cached: false,
        timestamp: Date.now(),
        source: 'offline',
      };
    }
  }

  // Network request methods
  private async fetchAccountsFromNetwork(): Promise<ApiResponse<any[]>> {
    const response = await this.makeNetworkRequest('/accounts');
    
    // Store in cache
    for (const account of response.data) {
      await offlineStorage.storeAccount(account);
    }

    return {
      data: response.data,
      cached: false,
      timestamp: Date.now(),
      source: 'network',
    };
  }

  private async fetchAccountFromNetwork(accountId: string): Promise<ApiResponse<any>> {
    const response = await this.makeNetworkRequest(`/accounts/${accountId}`);
    
    // Store in cache
    await offlineStorage.storeAccount(response.data);

    return {
      data: response.data,
      cached: false,
      timestamp: Date.now(),
      source: 'network',
    };
  }

  private async fetchTransactionsFromNetwork(accountId: string, limit: number): Promise<ApiResponse<any[]>> {
    const response = await this.makeNetworkRequest(
      `/accounts/${accountId}/transactions?limit=${limit}`
    );
    
    // Store in cache
    for (const transaction of response.data) {
      await offlineStorage.storeTransaction(transaction);
    }

    return {
      data: response.data,
      cached: false,
      timestamp: Date.now(),
      source: 'network',
    };
  }

  private async sendTransferPreparation(transferData: any): Promise<ApiResponse<any>> {
    const response = await this.makeNetworkRequest('/transfer/prepare', {
      method: 'POST',
      body: JSON.stringify(transferData),
    });

    return {
      data: response.data,
      cached: false,
      timestamp: Date.now(),
      source: 'network',
    };
  }

  private async sendTransferExecution(transferId: string, confirmationData: any): Promise<ApiResponse<any>> {
    const response = await this.makeNetworkRequest(`/transfer/${transferId}/execute`, {
      method: 'POST',
      body: JSON.stringify(confirmationData),
    });

    return {
      data: response.data,
      cached: false,
      timestamp: Date.now(),
      source: 'network',
    };
  }

  private async sendBillPayment(billData: any): Promise<ApiResponse<any>> {
    const response = await this.makeNetworkRequest('/bills/pay', {
      method: 'POST',
      body: JSON.stringify(billData),
    });

    return {
      data: response.data,
      cached: false,
      timestamp: Date.now(),
      source: 'network',
    };
  }

  // Background update methods
  private async updateAccountsFromNetwork(): Promise<void> {
    try {
      const response = await this.makeNetworkRequest('/accounts');
      
      for (const account of response.data) {
        await offlineStorage.storeAccount(account);
      }
      
    } catch (error) {
      console.error('[OfflineFirstApi] Background accounts update failed:', error);
    }
  }

  private async updateAccountFromNetwork(accountId: string): Promise<void> {
    try {
      const response = await this.makeNetworkRequest(`/accounts/${accountId}`);
      await offlineStorage.storeAccount(response.data);
      
    } catch (error) {
      console.error('[OfflineFirstApi] Background account update failed:', error);
    }
  }

  private async updateTransactionsFromNetwork(accountId: string, limit: number): Promise<void> {
    try {
      const response = await this.makeNetworkRequest(
        `/accounts/${accountId}/transactions?limit=${limit}`
      );
      
      for (const transaction of response.data) {
        await offlineStorage.storeTransaction(transaction);
      }
      
    } catch (error) {
      console.error('[OfflineFirstApi] Background transactions update failed:', error);
    }
  }

  // Core network request method
  private async makeNetworkRequest(endpoint: string, options: RequestInit = {}): Promise<any> {
    const url = `${this.config.baseUrl}${endpoint}`;
    
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), this.config.timeout);

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
          ...options.headers,
        },
        signal: controller.signal,
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return { data, status: response.status };

    } finally {
      clearTimeout(timeout);
    }
  }

  private createApiError(code: string, originalError: any): ApiError {
    return {
      code,
      message: originalError.message || 'An unknown error occurred',
      details: originalError,
      retryable: this.isRetryableError(originalError),
    };
  }

  private isRetryableError(error: any): boolean {
    // Network errors are generally retryable
    if (error.name === 'TypeError' || error.name === 'NetworkError') {
      return true;
    }

    // 5xx server errors are retryable
    if (error.status >= 500) {
      return true;
    }

    // 408 Request Timeout is retryable
    if (error.status === 408) {
      return true;
    }

    return false;
  }

  // Utility methods
  async getOfflineStatus(): Promise<{
    pendingTransfers: number;
    pendingBillPayments: number;
    lastSync: number | null;
    cacheSize: number;
  }> {
    const [pendingTransfers, pendingBillPayments, stats] = await Promise.all([
      offlineSyncManager.getPendingTransfersCount(),
      offlineSyncManager.getPendingBillPaymentsCount(),
      offlineStorage.getStorageStats(),
    ]);

    const globalSync = await offlineStorage.getSyncMetadata('global');

    return {
      pendingTransfers,
      pendingBillPayments,
      lastSync: globalSync?.lastSyncTimestamp || null,
      cacheSize: stats.totalSize,
    };
  }

  async forceSyncNow(): Promise<void> {
    if (!this.networkStatus.isOnline) {
      throw new Error('Cannot sync while offline');
    }

    await offlineSyncManager.forceSyncNow();
  }

  async clearOfflineData(): Promise<void> {
    await offlineStorage.reset();
  }
}

// Singleton instance
export const offlineFirstApi = new OfflineFirstApiClient();