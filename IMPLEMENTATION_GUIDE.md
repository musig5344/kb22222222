# 🛠️ Implementation Guide

This guide provides step-by-step instructions for implementing key features and components in the KB StarBanking Clone project.

## 📋 Table of Contents

1. [Header Standardization](#header-standardization)
2. [Transaction Page Implementation](#transaction-page-implementation)
3. [Icon System Setup](#icon-system-setup)
4. [Styling System](#styling-system)
5. [Component Development](#component-development)
6. [Performance Optimization](#performance-optimization)

## 🎯 Header Standardization

### Implementation Pattern

All pages should follow the standardized header pattern established in `ComprehensiveAccountPage.tsx`:

#### Step 1: Import Required Components
```typescript
import { Header, BackButton, HeaderTitle } from './PageName.styles';
import { useNavigate } from 'react-router-dom';
```

#### Step 2: Implement Header Structure
```tsx
const PageName: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Header>
        <BackButton onClick={() => navigate(-1)}>
          <span style={{ fontSize: '18px', transform: 'rotate(180deg)' }}>→</span>
        </BackButton>
        <HeaderTitle>페이지 제목</HeaderTitle>
        <div style={{ width: 48 }}></div>
      </Header>
      {/* Page content */}
    </Container>
  );
};
```

#### Step 3: Define Header Styles
```typescript
export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 24px;
  height: 48px;
  background-color: ${tokens.colors.white};
  border-bottom: 1px solid #ebeef0;
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
  color: #26282c;
  margin: 0;
`;
```

### ❌ Do Not Use
```tsx
// Old pattern - DO NOT USE
<Header>
  <BackButton><img src={arrowIcon} /></BackButton>
  <HeaderTitle>Title</HeaderTitle>
  <HeaderRight>
    <HomeButton><img src={homeIcon} /></HomeButton>
    <MenuButton><img src={menuIcon} /></MenuButton>
  </HeaderRight>
</Header>
```

### ✅ Use This Instead
```tsx
// Standardized pattern - USE THIS
<Header>
  <BackButton>
    <span style={{ fontSize: '18px', transform: 'rotate(180deg)' }}>→</span>
  </BackButton>
  <HeaderTitle>Title</HeaderTitle>
  <div style={{ width: 48 }}></div>
</Header>
```

## 💳 Transaction Page Implementation

### Account Info Section

#### Component Structure
```tsx
// AccountInfoSection.tsx
interface AccountInfoSectionProps {
  account: DatabaseAccount;
  showBalance: boolean;
  onToggleBalance: () => void;
}

const AccountInfoSection: React.FC<AccountInfoSectionProps> = ({
  account,
  showBalance,
  onToggleBalance
}) => {
  return (
    <AccountContainer>
      <AccountHeader>
        <AccountLeft>
          <AccountTitle>
            <AccountName>{account.account_name}</AccountName>
            <EditIcon>✏️</EditIcon>
          </AccountTitle>
          <AccountNumberRow>
            <AccountNumber>{account.account_number}</AccountNumber>
            <DropdownIcon>▼</DropdownIcon>
          </AccountNumberRow>
        </AccountLeft>
        <SettingsIcon>⚙️</SettingsIcon>
      </AccountHeader>
      
      <BalanceSection>
        <MainBalance>
          {showBalance ? formatCurrency(account.balance) : '•••••••'}원
        </MainBalance>
        <SubBalance>
          출금가능금액 {showBalance ? formatCurrency(account.balance) : '•••••••'}원
        </SubBalance>
      </BalanceSection>
      
      <ActionButton>ATM/창구출금</ActionButton>
    </AccountContainer>
  );
};
```

#### Key Styles
```typescript
const AccountContainer = styled.div`
  background: #ffffff;
  padding: 20px 24px;
  border-bottom: 8px solid #f5f6f8;
`;

const MainBalance = styled.div`
  font-size: 32px;
  font-weight: 700;
  color: #000000;
  letter-spacing: -0.8px;
  margin-bottom: 4px;
`;

const ActionButton = styled.button`
  width: 100%;
  height: 48px;
  background-color: #f0f1f3;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  color: #333333;
  cursor: pointer;
  letter-spacing: -0.3px;
`;
```

### Search Filter Section

#### Component Implementation
```tsx
// SearchFilterSection.tsx
interface SearchFilterSectionProps {
  dateRange: string;
  showBalance: boolean;
  appliedFilters: FilterState;
  onToggleBalance: () => void;
  onFilterClick: () => void;
  getSearchPlaceholder: () => string;
}

const SearchFilterSection: React.FC<SearchFilterSectionProps> = ({
  dateRange,
  showBalance,
  appliedFilters,
  onToggleBalance,
  onFilterClick,
  getSearchPlaceholder
}) => {
  return (
    <SearchContainer>
      <SearchRow>
        <SearchLeft>
          <SearchIcon>🔍</SearchIcon>
          <FilterButton onClick={onFilterClick}>
            <span>{getSearchPlaceholder()}</span>
            <DropdownArrow>▼</DropdownArrow>
          </FilterButton>
        </SearchLeft>
        <ToggleSection>
          <ToggleLabel>잔액표기</ToggleLabel>
          <ToggleSwitch 
            $enabled={showBalance}
            onClick={onToggleBalance}
          />
        </ToggleSection>
      </SearchRow>
      <DateRangeRow>
        <DateRange>{dateRange}</DateRange>
      </DateRangeRow>
    </SearchContainer>
  );
};
```

#### Toggle Switch Styling
```typescript
const ToggleSwitch = styled.div<{ $enabled: boolean }>`
  width: 44px;
  height: 24px;
  background-color: ${props => props.$enabled ? '#34C759' : '#E0E0E0'};
  border-radius: 12px;
  position: relative;
  cursor: pointer;
  transition: background-color 0.3s ease;
  border: 1px solid ${props => props.$enabled ? '#34C759' : '#CCCCCC'};

  &::after {
    content: '';
    width: 20px;
    height: 20px;
    background-color: white;
    border-radius: 50%;
    position: absolute;
    top: 1px;
    left: ${props => props.$enabled ? '21px' : '1px'};
    transition: left 0.3s ease;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  }
`;
```

### Transaction Item Implementation

#### Color Logic
```typescript
// TransactionItem.tsx
const TransactionItem: React.FC<TransactionItemProps> = ({ transaction, showBalance }) => {
  // Determine transaction type and color
  const isPositive = transaction.transaction_type === '입금' || transaction.amount > 0;
  
  const typeText = transaction.transaction_type === '이체' ? '출금' : 
                   transaction.transaction_type === '입금' ? '입금' : 
                   transaction.amount > 0 ? '입금' : '출금';

  return (
    <ItemContainer>
      <ItemContent>
        <ItemInfo>
          <DateTime>{formattedDate}</DateTime>
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

#### Transaction Colors
```typescript
const Amount = styled.div<{ $isPositive: boolean }>`
  font-size: 18px;
  font-weight: 600;
  color: ${props => props.$isPositive ? '#4285F4' : '#E74C3C'};
  margin-bottom: 6px;
  white-space: nowrap;
  letter-spacing: -0.5px;
`;

const Balance = styled.div`
  font-size: 13px;
  color: #666666;
  white-space: nowrap;
  letter-spacing: -0.2px;
`;
```

## 🎨 Icon System Setup

### Asset Organization

#### Step 1: Set Up Public Assets
```bash
# Copy assets from src to public
cp -r src/assets public/
```

#### Step 2: Verify Structure
```
public/
└── assets/
    ├── images/
    │   ├── icons/
    │   │   ├── icon_home.png
    │   │   ├── icon_appbar_menu.png
    │   │   ├── icon_search_header.png
    │   │   └── ...
    │   ├── backgrounds/
    │   └── menu/
    └── fonts/
```

#### Step 3: Update Icon Components
```typescript
// CommonIcons.tsx
export const SearchIcon: React.FC<IconProps> = ({ 
  size = 24, 
  color = '#484B51', 
  className, 
  style, 
  onClick 
}) => (
  <img
    src="/assets/images/icons/icon_search_header.png"
    alt="검색"
    width={size}
    height={size}
    className={className}
    style={{ 
      cursor: onClick ? 'pointer' : undefined, 
      filter: color !== '#484B51' ? `brightness(0) saturate(100%) invert(32%)...` : undefined,
      ...style 
    }}
    onClick={onClick}
  />
);
```

### Icon Usage
```tsx
// Use in components
import { SearchIcon, MenuIcon, HomeIcon } from '@/assets/icons/CommonIcons';

<IconButton>
  <SearchIcon size={24} color="#666666" />
</IconButton>
```

## 🎨 Styling System

### Design Tokens
```typescript
// tokens.ts
export const tokens = {
  colors: {
    // KB Brand Colors
    brand: {
      primary: '#FFBF00',
      light: '#FFD338',
      pressed: '#FF9F00',
      variant: '#FFD338',
      dark: '#FF9F00',
      extraLight: '#FFF9E6'
    },
    
    // Transaction Colors
    transaction: {
      withdrawal: '#E74C3C',    // 출금
      deposit: '#4285F4',       // 입금
      balance: '#666666'        // 잔액
    },
    
    // Interface Colors
    text: {
      primary: '#26282c',
      secondary: '#666666',
      tertiary: '#999999'
    },
    
    background: {
      white: '#ffffff',
      gray: '#f8f9fa',
      light: '#f5f6f8'
    },
    
    border: {
      light: '#ebeef0',
      medium: '#d1d5db',
      heavy: '#9ca3af'
    }
  },
  
  typography: {
    header: {
      fontSize: '18px',
      fontWeight: 600,
      color: '#26282c'
    },
    
    body: {
      fontSize: '16px',
      fontWeight: 400,
      color: '#333333'
    },
    
    caption: {
      fontSize: '14px',
      fontWeight: 400,
      color: '#666666'
    }
  },
  
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px'
  }
};
```

### Responsive Utilities
```typescript
// responsive.ts
export const breakpoints = {
  mobile: '320px',
  tablet: '768px',
  desktop: '1024px'
};

export const mediaQueries = {
  mobile: `@media (max-width: ${breakpoints.tablet})`,
  tablet: `@media (min-width: ${breakpoints.tablet}) and (max-width: ${breakpoints.desktop})`,
  desktop: `@media (min-width: ${breakpoints.desktop})`
};

// Usage in styled components
const ResponsiveContainer = styled.div`
  padding: 16px;
  
  ${mediaQueries.tablet} {
    padding: 24px;
  }
  
  ${mediaQueries.desktop} {
    padding: 32px;
    max-width: 1200px;
    margin: 0 auto;
  }
`;
```

## 🧩 Component Development

### Component Template
```typescript
// ComponentName.tsx
import React from 'react';
import styled from 'styled-components';
import { tokens } from '@/styles/tokens';

interface ComponentNameProps {
  // Define props interface
  title: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}

// Styled components
const Container = styled.div<{ $variant: string }>`
  padding: ${tokens.spacing.md};
  background-color: ${props => 
    props.$variant === 'primary' ? tokens.colors.brand.primary : tokens.colors.background.gray
  };
  border-radius: 8px;
  cursor: ${props => props.onClick ? 'pointer' : 'default'};
  
  &:hover {
    opacity: ${props => props.onClick ? 0.8 : 1};
  }
`;

const Title = styled.h3`
  ${tokens.typography.header}
  margin: 0;
`;

// Component implementation
export const ComponentName: React.FC<ComponentNameProps> = ({
  title,
  onClick,
  variant = 'primary'
}) => {
  return (
    <Container $variant={variant} onClick={onClick}>
      <Title>{title}</Title>
    </Container>
  );
};

export default ComponentName;
```

### Component Usage
```tsx
// Using the component
import { ComponentName } from '@/components/ComponentName';

<ComponentName
  title="Sample Title"
  variant="primary"
  onClick={() => console.log('Clicked!')}
/>
```

### State Management Pattern
```typescript
// Custom hook for component state
const useComponentState = (initialValue: string) => {
  const [value, setValue] = useState(initialValue);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateValue = useCallback(async (newValue: string) => {
    try {
      setLoading(true);
      setError(null);
      // Async operation
      await new Promise(resolve => setTimeout(resolve, 1000));
      setValue(newValue);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    value,
    loading,
    error,
    updateValue
  };
};
```

## 🚀 Performance Optimization

### Memoization Strategies
```typescript
// React.memo for components
export const ExpensiveComponent = React.memo<ComponentProps>(({ data, onUpdate }) => {
  // Component implementation
}, (prevProps, nextProps) => {
  // Custom comparison logic
  return prevProps.data.id === nextProps.data.id;
});

// useMemo for expensive calculations
const ProcessedData = ({ rawData }: { rawData: DataType[] }) => {
  const processedData = useMemo(() => {
    return rawData
      .filter(item => item.active)
      .sort((a, b) => a.name.localeCompare(b.name))
      .map(item => ({
        ...item,
        displayName: `${item.name} (${item.type})`
      }));
  }, [rawData]);

  return <DataList data={processedData} />;
};

// useCallback for event handlers
const Component = () => {
  const [count, setCount] = useState(0);
  
  const handleIncrement = useCallback(() => {
    setCount(prev => prev + 1);
  }, []);

  return <Button onClick={handleIncrement}>Count: {count}</Button>;
};
```

### Code Splitting
```typescript
// Route-based code splitting
import { lazy, Suspense } from 'react';

const TransactionPage = lazy(() => import('@/features/transactions/AccountTransactionPage'));
const DashboardPage = lazy(() => import('@/features/dashboard/DashboardPage'));

// Usage in router
<Route 
  path="/transactions" 
  element={
    <Suspense fallback={<LoadingSpinner />}>
      <TransactionPage />
    </Suspense>
  } 
/>
```

### Bundle Optimization
```typescript
// Tree shaking friendly imports
import { formatCurrency } from '@/utils/textFormatter';
// Instead of: import * as utils from '@/utils';

// Dynamic imports for large libraries
const heavyLibrary = await import('heavy-library');
heavyLibrary.default.doSomething();
```

## 🧪 Testing Implementation

### Component Testing
```typescript
// ComponentName.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { ComponentName } from './ComponentName';

describe('ComponentName', () => {
  it('renders with title', () => {
    render(<ComponentName title="Test Title" />);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const mockClick = jest.fn();
    render(<ComponentName title="Test" onClick={mockClick} />);
    
    fireEvent.click(screen.getByText('Test'));
    expect(mockClick).toHaveBeenCalledTimes(1);
  });

  it('applies correct variant styling', () => {
    const { container } = render(<ComponentName title="Test" variant="secondary" />);
    const element = container.firstChild as HTMLElement;
    expect(element).toHaveStyle('background-color: #f8f9fa');
  });
});
```

### Integration Testing
```typescript
// TransactionPage.integration.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AccountTransactionPage } from './AccountTransactionPage';

const renderWithRouter = (component: React.ReactElement) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('AccountTransactionPage Integration', () => {
  it('loads and displays transactions', async () => {
    renderWithRouter(<AccountTransactionPage />);
    
    // Wait for data to load
    await waitFor(() => {
      expect(screen.getByText('거래내역조회')).toBeInTheDocument();
    });
    
    // Verify transaction items appear
    await waitFor(() => {
      expect(screen.getByText(/출금/)).toBeInTheDocument();
    });
  });
});
```

## 📊 Debugging Guide

### Common Issues and Solutions

#### 1. Icons Not Loading
```bash
# Check public assets structure
ls public/assets/images/icons/

# Copy missing assets
cp -r src/assets public/
```

#### 2. Header Layout Issues
```typescript
// Verify header structure matches standard
<Header>
  <BackButton>
    <span style={{ fontSize: '18px', transform: 'rotate(180deg)' }}>→</span>
  </BackButton>
  <HeaderTitle>Title</HeaderTitle>
  <div style={{ width: 48 }}></div>  {/* Must have spacer */}
</Header>
```

#### 3. Color Inconsistencies
```typescript
// Use design tokens instead of hardcoded colors
// ❌ Wrong
color: '#FF0000';

// ✅ Correct
color: ${tokens.colors.transaction.withdrawal};
```

#### 4. Spacing Issues
```typescript
// Use consistent spacing tokens
// ❌ Wrong
padding: 15px;

// ✅ Correct
padding: ${tokens.spacing.md};
```

## 🔧 Development Workflow

### 1. Setting Up New Feature
```bash
# Create feature directory
mkdir src/features/new-feature
mkdir src/features/new-feature/components
mkdir src/features/new-feature/hooks

# Create main page component
touch src/features/new-feature/NewFeaturePage.tsx
touch src/features/new-feature/NewFeaturePage.styles.ts
```

### 2. Component Development Checklist
- [ ] Create TypeScript interface for props
- [ ] Implement styled components with design tokens
- [ ] Add proper accessibility attributes
- [ ] Write unit tests
- [ ] Add to Storybook (if available)
- [ ] Update documentation

### 3. Code Review Checklist
- [ ] Follows standardized header pattern
- [ ] Uses design tokens consistently
- [ ] Includes proper TypeScript types
- [ ] Has responsive design considerations
- [ ] Includes error handling
- [ ] Performance optimized (memoization where needed)

---

This implementation guide serves as a comprehensive reference for maintaining consistency and quality across the KB StarBanking Clone project. Follow these patterns to ensure all components align with the established architecture and design system.

*Last updated: 2025-08-15*