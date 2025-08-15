# Universal Responsive Design System Guide

## Overview

This guide explains how to use the Universal Responsive Design System for the KB StarBanking clone app. This system ensures **every page and component** has consistent responsive behavior across **all screen resolutions** (320px to 768px+) without any layout breaks.

## Key Benefits

- ✅ **Zero Layout Breaks**: No page will have responsive issues while others work properly
- ✅ **Consistent Scaling**: Uniform proportions from small mobile to large screens
- ✅ **Touch Optimized**: Optimal touch targets (44px minimum) at all resolutions
- ✅ **KB Design Compliance**: Maintains KB design system proportions at every screen size
- ✅ **Fluid Typography**: Text scales smoothly and remains readable
- ✅ **Performance Optimized**: Uses modern CSS techniques for smooth scaling

## Quick Start

### 1. Import the Responsive Utilities

```typescript
// For comprehensive utilities
import responsive from '../styles/responsive-utils';

// For specific components
import { 
  quickAppContainer, 
  quickButton, 
  text, 
  spacing 
} from '../styles/responsive-utils';

// For direct access to the core system
import { 
  universalAppContainer,
  responsiveTypography,
  responsiveSpacing 
} from '../styles/universal-responsive';
```

### 2. Apply to Your Components

```typescript
import styled from 'styled-components';
import responsive from '../styles/responsive-utils';

// App Container
const AppContainer = styled.div`
  ${responsive.container}
`;

// Header
const Header = styled.header`
  ${responsive.header}
`;

// Button
const Button = styled.button`
  ${responsive.button}
`;

// Text
const Title = styled.h1`
  ${responsive.text.title}
`;

// Spacing
const Section = styled.section`
  padding: ${responsive.spacing.section} ${responsive.spacing.container};
`;
```

## Core Components

### 1. App Container
For main app containers that need full responsive behavior:

```typescript
const AppContainer = styled.div`
  ${responsive.container}
  // Handles:
  // - Viewport scaling
  // - Safe area insets
  // - Desktop centering
  // - Mobile optimizations
`;
```

### 2. Headers
For page headers and navigation:

```typescript
const PageHeader = styled.header`
  ${responsive.header}
  // Handles:
  // - Responsive height and padding
  // - Desktop centering
  // - Safe area support
`;
```

### 3. Main Content
For main content areas:

```typescript
const MainContent = styled.main`
  ${responsive.content}
  // Handles:
  // - Proper spacing from header/nav
  // - Scroll behavior
  // - Safe area padding
`;
```

### 4. Navigation/Tab Bar
For bottom navigation:

```typescript
const TabBar = styled.nav`
  ${responsive.navigation}
  // Handles:
  // - Fixed positioning
  // - Safe area support
  // - Desktop centering
`;
```

## Typography System

### Available Text Styles

```typescript
// Display text (large headers)
const MainTitle = styled.h1`
  ${responsive.text.display}
`;

// Regular titles
const SectionTitle = styled.h2`
  ${responsive.text.title}
`;

// Subtitles
const Subtitle = styled.h3`
  ${responsive.text.subtitle}
`;

// Body text
const BodyText = styled.p`
  ${responsive.text.body}
`;

// Captions
const Caption = styled.span`
  ${responsive.text.caption}
`;

// Numbers (with tabular-nums)
const BalanceAmount = styled.span`
  ${responsive.text.numberLarge}
`;
```

### Custom Font Sizes

```typescript
// Create custom responsive font size
const CustomText = styled.span`
  font-size: ${responsive.getResponsiveFont(14, 18)};
  // Scales from 14px to 18px across screen sizes
`;
```

## Spacing System

### Predefined Spacing

```typescript
const Container = styled.div`
  // Micro spacing
  gap: ${responsive.spacing.xs};        // 2-4px
  margin: ${responsive.spacing.sm};     // 4-6px
  padding: ${responsive.spacing.md};    // 8-12px
  
  // Component spacing
  margin-bottom: ${responsive.spacing.lg};        // 12-16px
  padding: ${responsive.spacing.xl};              // 16-20px
  
  // Layout spacing
  padding: ${responsive.spacing.component};       // 16-24px
  margin-bottom: ${responsive.spacing.section};   // 24-32px
  padding: ${responsive.spacing.page};            // 32-48px
  
  // Container padding
  padding: 0 ${responsive.spacing.container};     // 16-24px
`;
```

### Custom Spacing

```typescript
const CustomContainer = styled.div`
  margin: ${responsive.getResponsiveGap(16, 24)};
  // Scales from 16px to 24px
`;
```

## Component Sizing

### Buttons

```typescript
const SmallButton = styled.button`
  ${responsive.button}
  height: ${responsive.sizes.button.heightSmall};
`;

const LargeButton = styled.button`
  ${responsive.button}
  height: ${responsive.sizes.button.heightLarge};
`;
```

### Input Fields

```typescript
const InputField = styled.input`
  ${responsive.input}
  // Automatically gets responsive height and padding
`;
```

### Touch Targets

```typescript
const TouchButton = styled.button`
  min-height: ${responsive.sizes.touchTarget.minimum}; // Always 44px
  height: ${responsive.sizes.touchTarget.recommended}; // Responsive 44-48px
`;
```

## Grid System

### Quick Grid Layouts

```typescript
// Two column grid
const TwoColumnGrid = styled.div`
  ${responsive.grid.twoColumn}
`;

// Three column grid (responsive)
const ThreeColumnGrid = styled.div`
  ${responsive.grid.threeColumn}
  // Becomes 2 columns on small screens
`;

// Four column grid (responsive)
const FourColumnGrid = styled.div`
  ${responsive.grid.fourColumn}
  // Becomes 3 columns on medium screens
  // Becomes 2 columns on small screens
`;
```

## Flexbox Utilities

```typescript
const FlexContainer = styled.div`
  ${responsive.flex.center}         // Center everything
  ${responsive.flex.spaceBetween}   // Space between items
  ${responsive.flex.column}         // Flex column
`;
```

## Common Patterns

### 1. Responsive List Items

```typescript
import { responsiveListItem } from '../styles/responsive-utils';

const TransactionItem = styled.div`
  ${responsiveListItem}
  // Handles:
  // - Touch-friendly padding
  // - Minimum touch target height
  // - Border bottom
`;
```

### 2. Responsive Forms

```typescript
import { responsiveForm } from '../styles/responsive-utils';

const FormContainer = styled.form`
  ${responsiveForm}
  // Handles:
  // - Input and button styling
  // - Consistent spacing
  // - Responsive layout
`;
```

### 3. Responsive Modals

```typescript
import { responsiveModal, responsiveBottomSheet } from '../styles/responsive-utils';

const ModalOverlay = styled.div`
  ${responsiveModal}
`;

const BottomSheetContent = styled.div`
  ${responsiveBottomSheet}
`;
```

### 4. Responsive Cards

```typescript
const Card = styled.div`
  ${responsive.card}
  // Handles:
  // - Responsive padding and margin
  // - Border radius
  // - Box shadow
`;
```

## Breakpoints

The system uses these breakpoints:

```typescript
const breakpoints = {
  xxs: 320,    // iPhone SE (1st gen)
  xs: 360,     // Standard Android
  sm: 375,     // iPhone mini
  md: 390,     // iPhone 12/13/14
  lg: 414,     // iPhone Plus
  xl: 430,     // iPhone Pro Max
  xxl: 480,    // Large phones
  tablet: 768, // Tablet boundary
};
```

### Custom Breakpoint Values

```typescript
const ResponsiveComponent = styled.div`
  ${responsive.applyBreakpoints({
    xxs: '16px',
    sm: '20px',
    lg: '24px',
  })}
`;
```

## Advanced Usage

### 1. Creating Custom Responsive Values

```typescript
// Fluid scaling between two values
const customPadding = responsive.createResponsiveValue(16, 32);

// Viewport-based scaling
const vwBasedSize = responsive.createVwValue(24, 20, 28);

// Component with custom responsive behavior
const CustomComponent = styled.div`
  padding: ${customPadding};
  font-size: ${vwBasedSize};
`;
```

### 2. Making Existing Components Responsive

```typescript
import { makeResponsive } from '../styles/responsive-utils';

const ExistingComponent = styled.div`
  // Your existing styles
  color: blue;
  background: white;
`;

const ResponsiveComponent = styled(ExistingComponent)`
  ${makeResponsive}
`;
```

### 3. Safe Area Support

```typescript
import { responsiveSafeArea } from '../styles/responsive-utils';

const SafeAreaContainer = styled.div`
  ${responsiveSafeArea}
  // Automatically handles device safe areas
`;
```

## Best Practices

### 1. Always Use the System
```typescript
// ❌ Don't use fixed sizes
const BadComponent = styled.div`
  width: 320px;
  padding: 16px;
  font-size: 14px;
`;

// ✅ Use responsive system
const GoodComponent = styled.div`
  ${responsive.container}
  padding: ${responsive.spacing.lg};
  ${responsive.text.body}
`;
```

### 2. Test Across Screen Sizes
Always test your components on:
- 320px (smallest mobile)
- 375px (standard mobile)
- 414px (large mobile)
- 768px+ (desktop view)

### 3. Maintain Touch Targets
```typescript
// ❌ Too small for touch
const BadButton = styled.button`
  height: 32px;
  width: 32px;
`;

// ✅ Proper touch target
const GoodButton = styled.button`
  ${responsive.button}
  min-height: ${responsive.sizes.touchTarget.minimum};
`;
```

### 4. Use Semantic Spacing
```typescript
// ❌ Random spacing values
margin: 13px 7px 19px 11px;

// ✅ Consistent system spacing
margin: ${responsive.spacing.lg} ${responsive.spacing.container};
```

## Debugging

### 1. Enable Debug Mode
The system includes a debug indicator in development mode that shows the current breakpoint in the top-right corner.

### 2. Check Browser DevTools
Use Chrome DevTools device simulation to test different screen sizes.

### 3. Common Issues

**Issue**: Text too small on small screens
**Solution**: Use `responsive.text.*` instead of fixed font sizes

**Issue**: Touch targets too small
**Solution**: Ensure minimum height of `responsive.sizes.touchTarget.minimum`

**Issue**: Layout breaks on specific screen size
**Solution**: Test with the specific breakpoint values and adjust using `responsive.applyBreakpoints()`

## Migration Guide

### From Fixed Sizes to Responsive

```typescript
// Before
const OldComponent = styled.div`
  width: 100%;
  max-width: 430px;
  padding: 20px;
  font-size: 16px;
  margin: 0 auto;
`;

// After
const NewComponent = styled.div`
  ${responsive.container}
  padding: ${responsive.spacing.lg};
  ${responsive.text.body}
`;
```

### From Media Queries to Responsive System

```typescript
// Before
const OldComponent = styled.div`
  font-size: 14px;
  
  @media (min-width: 375px) {
    font-size: 16px;
  }
  
  @media (min-width: 414px) {
    font-size: 18px;
  }
`;

// After
const NewComponent = styled.div`
  ${responsive.text.body}
  // Automatically scales smoothly across all screen sizes
`;
```

## Examples

### Complete Page Example

```typescript
import styled from 'styled-components';
import responsive from '../styles/responsive-utils';

const PageContainer = styled.div`
  ${responsive.container}
`;

const Header = styled.header`
  ${responsive.header}
  background-color: ${responsive.kbColors.background.primary};
`;

const Title = styled.h1`
  ${responsive.text.title}
  margin: 0;
  text-align: center;
`;

const MainContent = styled.main`
  ${responsive.content}
`;

const Section = styled.section`
  padding: ${responsive.spacing.section} ${responsive.spacing.container};
`;

const CardGrid = styled.div`
  ${responsive.grid.twoColumn}
  gap: ${responsive.spacing.component};
`;

const Card = styled.div`
  ${responsive.card}
`;

const ActionButton = styled.button`
  ${responsive.button}
  background-color: ${responsive.kbColors.primary};
  width: 100%;
`;
```

This system ensures that every component you create will have consistent, smooth responsive behavior across all screen sizes without any layout breaks or scaling issues.