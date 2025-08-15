# 🏗️ Component Architecture Documentation

## 📋 Overview

This document outlines the component architecture, design patterns, and structural decisions made in the KB StarBanking Clone project, with special focus on the recent standardization efforts and pixel-perfect implementations.

## 🎯 Architecture Principles

### 1. **Consistency First**
- Standardized header pattern across all pages
- Unified styling approach using design tokens
- Consistent component interfaces and prop patterns

### 2. **Pixel-Perfect Accuracy**
- 1:1 visual matching with original KB StarBanking app
- Exact color reproduction using hex values
- Precise typography and spacing measurements

### 3. **Modern React Patterns**
- Functional components with hooks
- TypeScript for type safety
- Styled Components for CSS-in-JS
- Performance optimization through memoization

### 4. **Mobile-First Responsive Design**
- Touch-optimized interfaces
- Responsive breakpoints
- Progressive enhancement for larger screens

## 🧱 Component Hierarchy

### Application Structure
```
App
├── Router
│   ├── AuthRoutes
│   │   ├── LoginScreen
│   │   ├── IdPasswordLoginPage
│   │   ├── FindIdPage
│   │   └── ResetPasswordPage
│   │
│   ├── ProtectedRoutes
│   │   ├── DashboardPage
│   │   ├── ComprehensiveAccountPage
│   │   ├── AccountTransactionPage
│   │   ├── AccountInquiryPage
│   │   └── TransferPage
│   │
│   └── SharedComponents
│       ├── Headers (Standardized)
│       ├── Navigation (TabBar)
│       ├── Modals
│       └── UI Components
```

### Header System Architecture
```
Standardized Header Pattern
├── Container (Header)
│   ├── BackButton
│   │   └── Arrow Text (←)
│   ├── HeaderTitle
│   │   └── Page Title Text
│   └── Spacer
│       └── Empty Div (48px width)
```

### Transaction Page Architecture
```
AccountTransactionPage
├── Standardized Header
├── AccountInfoSection
│   ├── AccountHeader
│   │   ├── AccountLeft
│   │   │   ├── AccountTitle (Name + Edit Icon)
│   │   │   └── AccountNumber (Number + Dropdown)
│   │   └── SettingsIcon
│   ├── BalanceSection
│   │   ├── MainBalance (32px font)
│   │   └── SubBalance (출금가능금액)
│   └── ActionButton (ATM/창구출금)
├── SearchFilterSection
│   ├── SearchRow
│   │   ├── SearchLeft (🔍 + Filter Text)
│   │   └── ToggleSection (잔액표기 + Switch)
│   └── DateRangeRow
└── TransactionList
    └── TransactionGroup(s)
        └── TransactionItem(s)
```

## 🎨 Design System Architecture

### Color Token System
```typescript
// Design Tokens Hierarchy
tokens.colors
├── brand
│   ├── primary: '#FFBF00'         // KB Main Yellow
│   ├── light: '#FFD338'           // Light variant
│   ├── pressed: '#FF9F00'         // Pressed state
│   └── extraLight: '#FFF9E6'      // Background tint
│
├── transaction
│   ├── withdrawal: '#E74C3C'      // 출금 amounts
│   ├── deposit: '#4285F4'         // 입금 amounts
│   └── balance: '#666666'         // 잔액 text
│
├── text
│   ├── primary: '#26282c'         // Headers & primary
│   ├── secondary: '#666666'       // Secondary info
│   └── tertiary: '#999999'        // Disabled/inactive
│
├── background
│   ├── white: '#ffffff'           // Main background
│   ├── gray: '#f8f9fa'           // Section background
│   └── light: '#f5f6f8'          // Subtle background
│
└── border
    ├── light: '#ebeef0'          // Subtle borders
    ├── medium: '#d1d5db'         // Medium borders
    └── heavy: '#9ca3af'          // Strong borders
```

### Typography System
```typescript
// Typography Hierarchy
typography
├── header
│   ├── fontSize: '18px'
│   ├── fontWeight: 600
│   └── color: '#26282c'
│
├── body
│   ├── fontSize: '16px'
│   ├── fontWeight: 400
│   └── color: '#333333'
│
├── caption
│   ├── fontSize: '14px'
│   ├── fontWeight: 400
│   └── color: '#666666'
│
└── transaction
    ├── amount
    │   ├── fontSize: '18px'
    │   ├── fontWeight: 600
    │   └── letterSpacing: '-0.5px'
    │
    ├── description
    │   ├── fontSize: '17px'
    │   ├── fontWeight: 500
    │   └── letterSpacing: '-0.3px'
    │
    └── date
        ├── fontSize: '14px'
        ├── color: '#666666'
        └── letterSpacing: '-0.2px'
```

### Spacing System
```typescript
// Consistent Spacing Scale
spacing
├── xs: '4px'      // Micro spacing
├── sm: '8px'      // Small gaps
├── md: '16px'     // Standard spacing
├── lg: '24px'     // Large sections
└── xl: '32px'     // Major sections

// Component-Specific Spacing
component.spacing
├── header.height: '48px'
├── container.padding: '24px'
├── transaction.padding: '18px 24px'  // Optimized
├── month.header.padding: '16px 24px' // Optimized
└── button.minHeight: '44px'          // Touch target
```

## 🔧 Component Patterns

### 1. Standardized Header Pattern

#### Interface Definition
```typescript
interface StandardHeaderProps {
  title: string;
  onBack?: () => void;
  showBackButton?: boolean;
}
```

#### Implementation Pattern
```typescript
const StandardHeader: React.FC<StandardHeaderProps> = ({ 
  title, 
  onBack = () => navigate(-1),
  showBackButton = true 
}) => (
  <Header>
    {showBackButton && (
      <BackButton onClick={onBack}>
        <span style={{ fontSize: '18px', transform: 'rotate(180deg)' }}>→</span>
      </BackButton>
    )}
    <HeaderTitle>{title}</HeaderTitle>
    <div style={{ width: 48 }}></div>
  </Header>
);
```

#### Styled Components
```typescript
export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 24px;
  height: 48px;
  background-color: ${tokens.colors.background.white};
  border-bottom: 1px solid ${tokens.colors.border.light};
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
`;

export const BackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  
  &:active {
    opacity: 0.7;
  }
`;

export const HeaderTitle = styled.h1`
  font-size: 18px;
  font-weight: 600;
  color: ${tokens.colors.text.primary};
  margin: 0;
`;
```

### 2. Transaction Component Pattern

#### Transaction Item Architecture
```typescript
interface TransactionItemProps {
  transaction: Transaction;
  showBalance?: boolean;
  onClick?: (transaction: Transaction) => void;
  dateFormat?: 'full' | 'time' | 'date';
  animationIndex?: number;
}

const TransactionItem: React.FC<TransactionItemProps> = ({
  transaction,
  showBalance = true,
  onClick,
  dateFormat = 'full',
  animationIndex
}) => {
  // Type and color determination logic
  const isPositive = transaction.transaction_type === '입금' || transaction.amount > 0;
  const typeText = determineTransactionType(transaction);
  
  return (
    <ItemContainer $animationIndex={animationIndex} onClick={() => onClick?.(transaction)}>
      <ItemContent>
        <ItemInfo>
          <DateTime>{formatTransactionDate(transaction.transaction_date, dateFormat)}</DateTime>
          <Description>{transaction.description}</Description>
        </ItemInfo>
        <AmountSection>
          <Amount $isPositive={isPositive}>
            {typeText} {formatCurrency(Math.abs(transaction.amount))}원
          </Amount>
          {showBalance && (
            <Balance>잔액 {formatCurrency(transaction.balance_after)}원</Balance>
          )}
        </AmountSection>
      </ItemContent>
    </ItemContainer>
  );
};
```

#### Color Logic Pattern
```typescript
// Centralized transaction type and color logic
const determineTransactionType = (transaction: Transaction): string => {
  if (transaction.transaction_type === '이체') return '출금';
  if (transaction.transaction_type === '입금') return '입금';
  return transaction.amount > 0 ? '입금' : '출금';
};

const getTransactionColor = (transaction: Transaction): string => {
  const isPositive = transaction.transaction_type === '입금' || transaction.amount > 0;
  return isPositive ? tokens.colors.transaction.deposit : tokens.colors.transaction.withdrawal;
};
```

### 3. Modal Component Pattern

#### Base Modal Structure
```typescript
interface BaseModalProps {
  show: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

const BaseModal: React.FC<BaseModalProps> = ({ show, onClose, title, children }) => {
  if (!show) return null;

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        {title && (
          <ModalHeader>
            <ModalTitle>{title}</ModalTitle>
            <CloseButton onClick={onClose}>×</CloseButton>
          </ModalHeader>
        )}
        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </ModalOverlay>
  );
};
```

### 4. Form Component Pattern

#### Input Component
```typescript
interface InputFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: 'text' | 'password' | 'number';
  placeholder?: string;
  error?: string;
  required?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  error,
  required = false
}) => (
  <FieldContainer>
    <Label $required={required}>{label}</Label>
    <Input
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      $hasError={!!error}
    />
    {error && <ErrorMessage>{error}</ErrorMessage>}
  </FieldContainer>
);
```

## 🔄 State Management Architecture

### 1. Local State Pattern
```typescript
// Component-level state for UI interactions
const useComponentState = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<DataType[]>([]);

  const reset = useCallback(() => {
    setLoading(false);
    setError(null);
    setData([]);
  }, []);

  return { loading, error, data, setLoading, setError, setData, reset };
};
```

### 2. Context Pattern for Global State
```typescript
// AuthContext pattern
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
```

### 3. Custom Hooks Pattern
```typescript
// Reusable business logic hooks
const useTransactions = (options: UseTransactionsOptions) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);

  const loadTransactions = useCallback(async (filters?: TransactionFilter) => {
    try {
      setLoading(true);
      const result = await transactionService.getTransactions(filters);
      setTransactions(result.data);
      setPagination(result.pagination);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, []);

  const loadMore = useCallback(async () => {
    if (!pagination?.has_next || loading) return;
    
    try {
      const result = await transactionService.getTransactions({
        page: pagination.current_page + 1
      });
      setTransactions(prev => [...prev, ...result.data]);
      setPagination(result.pagination);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load more');
    }
  }, [pagination, loading]);

  return {
    transactions,
    loading,
    error,
    pagination,
    loadTransactions,
    loadMore,
    refresh: () => loadTransactions()
  };
};
```

## 📁 File Organization Strategy

### Feature-Based Structure
```
src/features/transactions/
├── AccountTransactionPage.tsx           # Main page component
├── AccountTransactionPage.styles.ts     # Page-specific styles
├── components/                          # Feature components
│   ├── AccountInfoSection.tsx
│   ├── AccountInfoSection.styles.ts
│   ├── SearchFilterSection.tsx
│   ├── SearchFilterSection.styles.ts
│   ├── TransactionItem.tsx
│   ├── TransactionGroup.tsx
│   └── modals/
│       ├── TransactionDetailModal.tsx
│       └── TransactionFilterModal.tsx
├── hooks/                               # Feature-specific hooks
│   ├── useTransactions.ts
│   ├── useTransactionFilters.ts
│   └── useTransactionExport.ts
├── utils/                               # Feature utilities
│   ├── transactionUtils.ts
│   └── dateFormatters.ts
└── types/                               # Feature type definitions
    ├── transaction.types.ts
    └── filter.types.ts
```

### Shared Components Structure
```
src/shared/components/
├── layout/                              # Layout components
│   ├── Header/
│   │   ├── StandardHeader.tsx
│   │   ├── LoginHeader.tsx
│   │   └── Header.styles.ts
│   ├── TabBar/
│   └── Navigation/
├── ui/                                  # Generic UI components
│   ├── Button/
│   ├── Input/
│   ├── Modal/
│   ├── Loading/
│   └── Icons/
└── forms/                               # Form components
    ├── FormField/
    ├── Validation/
    └── Formatters/
```

## 🎯 Performance Architecture

### 1. Component Optimization Strategy
```typescript
// Memoization pattern for expensive components
export const TransactionList = React.memo<TransactionListProps>(({ 
  transactions, 
  showBalance, 
  onTransactionClick 
}) => {
  const groupedTransactions = useMemo(() => 
    groupTransactionsByMonth(transactions), 
    [transactions]
  );

  return (
    <List>
      {Object.entries(groupedTransactions).map(([month, monthTransactions]) => (
        <TransactionGroup
          key={month}
          title={month}
          transactions={monthTransactions}
          showBalance={showBalance}
          onTransactionClick={onTransactionClick}
        />
      ))}
    </List>
  );
}, (prevProps, nextProps) => {
  return (
    prevProps.transactions.length === nextProps.transactions.length &&
    prevProps.showBalance === nextProps.showBalance &&
    prevProps.onTransactionClick === nextProps.onTransactionClick
  );
});
```

### 2. Lazy Loading Strategy
```typescript
// Route-based code splitting
const TransactionPage = lazy(() => 
  import('./features/transactions/AccountTransactionPage')
);

// Component-based code splitting for heavy features
const TransactionDetailModal = lazy(() => 
  import('./components/TransactionDetailModal')
);

// Usage with suspense
<Suspense fallback={<PageSkeleton />}>
  <TransactionPage />
</Suspense>
```

### 3. Virtual Scrolling Architecture
```typescript
// For large transaction lists
interface VirtualScrollProps {
  items: any[];
  itemHeight: number;
  containerHeight: number;
  renderItem: (item: any, index: number) => React.ReactNode;
}

const VirtualScrollList: React.FC<VirtualScrollProps> = ({
  items,
  itemHeight,
  containerHeight,
  renderItem
}) => {
  const [scrollTop, setScrollTop] = useState(0);
  
  const startIndex = Math.floor(scrollTop / itemHeight);
  const endIndex = Math.min(
    startIndex + Math.ceil(containerHeight / itemHeight) + 1,
    items.length
  );
  
  const visibleItems = items.slice(startIndex, endIndex);
  
  return (
    <ScrollContainer
      style={{ height: containerHeight }}
      onScroll={e => setScrollTop(e.currentTarget.scrollTop)}
    >
      <div style={{ height: items.length * itemHeight, position: 'relative' }}>
        <div style={{ transform: `translateY(${startIndex * itemHeight}px)` }}>
          {visibleItems.map((item, index) => 
            renderItem(item, startIndex + index)
          )}
        </div>
      </div>
    </ScrollContainer>
  );
};
```

## 🧪 Testing Architecture

### 1. Component Testing Strategy
```typescript
// Unit test structure for components
describe('TransactionItem', () => {
  const mockTransaction: Transaction = {
    id: '1',
    amount: 10000,
    transaction_type: '출금',
    description: 'Test Transaction',
    transaction_date: '2025-01-01T00:00:00Z',
    balance_after: 100000
  };

  it('displays withdrawal amount in red', () => {
    render(<TransactionItem transaction={mockTransaction} />);
    const amount = screen.getByText(/출금 10,000원/);
    expect(amount).toHaveStyle('color: #E74C3C');
  });

  it('toggles balance visibility', () => {
    const { rerender } = render(
      <TransactionItem transaction={mockTransaction} showBalance={true} />
    );
    expect(screen.getByText(/잔액 100,000원/)).toBeInTheDocument();

    rerender(<TransactionItem transaction={mockTransaction} showBalance={false} />);
    expect(screen.queryByText(/잔액/)).not.toBeInTheDocument();
  });
});
```

### 2. Integration Testing Approach
```typescript
// Page-level integration tests
describe('AccountTransactionPage Integration', () => {
  beforeEach(() => {
    // Mock API responses
    jest.spyOn(transactionService, 'getTransactions').mockResolvedValue({
      data: mockTransactions,
      pagination: mockPagination
    });
  });

  it('loads and displays transaction data', async () => {
    render(<AccountTransactionPage />, { wrapper: TestWrapper });
    
    await waitFor(() => {
      expect(screen.getByText('거래내역조회')).toBeInTheDocument();
    });
    
    await waitFor(() => {
      expect(screen.getByText(/출금 10,000원/)).toBeInTheDocument();
    });
  });
});
```

### 3. Visual Regression Testing
```typescript
// Screenshot testing for pixel-perfect validation
describe('Visual Regression Tests', () => {
  it('matches transaction page layout', async () => {
    const page = await browser.newPage();
    await page.goto('http://localhost:3000/transactions');
    
    const screenshot = await page.screenshot({
      fullPage: true,
      clip: { x: 0, y: 0, width: 375, height: 812 } // iPhone X dimensions
    });
    
    expect(screenshot).toMatchImageSnapshot({
      threshold: 0.01, // 99% accuracy requirement
      customDiffConfig: {
        threshold: 0.01
      }
    });
  });
});
```

## 🔧 Build and Deployment Architecture

### 1. Build Optimization
```typescript
// Webpack configuration for optimal bundles
const webpackConfig = {
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        },
        common: {
          name: 'common',
          minChunks: 2,
          chunks: 'all'
        }
      }
    }
  }
};
```

### 2. Asset Optimization
```typescript
// Image optimization strategy
const imageOptimization = {
  webp: true,
  quality: 85,
  progressive: true,
  lazy: true
};

// Icon sprite generation
const iconSprite = {
  src: 'src/assets/icons/*.svg',
  dest: 'public/sprites/icons.svg',
  prefix: 'icon-'
};
```

### 3. Environment Configuration
```typescript
// Environment-specific configurations
interface EnvironmentConfig {
  development: {
    apiUrl: 'http://localhost:3001/api';
    debug: true;
    hotReload: true;
  };
  staging: {
    apiUrl: 'https://staging-api.kb-clone.com';
    debug: false;
    analytics: true;
  };
  production: {
    apiUrl: 'https://api.kb-clone.com';
    debug: false;
    analytics: true;
    compression: true;
  };
}
```

## 📊 Monitoring and Analytics Architecture

### 1. Performance Monitoring
```typescript
// Core Web Vitals tracking
const performanceMonitoring = {
  lcp: true, // Largest Contentful Paint
  fid: true, // First Input Delay
  cls: true, // Cumulative Layout Shift
  ttfb: true // Time to First Byte
};

// Custom performance metrics
const customMetrics = {
  transactionLoadTime: 'measure transaction list rendering',
  headerRenderTime: 'measure header component rendering',
  pageTransitionTime: 'measure page navigation speed'
};
```

### 2. Error Tracking
```typescript
// Error boundary with reporting
class ErrorBoundary extends React.Component {
  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Report to monitoring service
    errorTracker.captureException(error, {
      tags: {
        component: 'TransactionPage',
        feature: 'transaction-history'
      },
      extra: errorInfo
    });
  }
}
```

---

This architecture documentation provides a comprehensive overview of the component structure, design patterns, and technical decisions that drive the KB StarBanking Clone project. It serves as a reference for maintaining consistency and quality as the project evolves.

*Last updated: 2025-08-15*