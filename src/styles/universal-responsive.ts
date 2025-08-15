/**
 * Universal Responsive Design System for KB StarBanking Clone
 * 
 * This system ensures EVERY page and component has consistent responsive behavior
 * across ALL screen resolutions without any layout breaks or disproportionate elements.
 * 
 * Key Features:
 * - Viewport-based fluid scaling for typography, spacing, and sizes
 * - Consistent proportions from 320px to 768px+ screens
 * - Touch-optimized targets for all screen sizes
 * - KB design system compliance at every resolution
 * - Zero layout breaks or content overflow
 */

import { css } from 'styled-components';

// ====== RESPONSIVE BREAKPOINTS ======
export const breakpoints = {
  // Mobile device ranges (covers 95% of devices)
  xxs: 320,    // iPhone SE (1st gen), oldest smartphones
  xs: 360,     // Standard Android phones
  sm: 375,     // iPhone mini, common Android
  md: 390,     // iPhone 12/13/14 standard
  lg: 414,     // iPhone Plus models, large Android
  xl: 430,     // iPhone Pro Max, Samsung Ultra
  xxl: 480,    // Large phones, small tablets
  tablet: 768, // Tablet boundary
} as const;

// ====== VIEWPORT-BASED SCALING FUNCTIONS ======

/**
 * Fluid scaling function using clamp() for responsive typography and spacing
 * Ensures smooth scaling across all screen sizes with min/max constraints
 */
const fluidScale = (
  minSize: number,
  maxSize: number,
  minViewport: number = breakpoints.xxs,
  maxViewport: number = breakpoints.xl
) => {
  const slope = (maxSize - minSize) / (maxViewport - minViewport);
  const intersection = minSize - slope * minViewport;
  
  return `clamp(${minSize}px, ${intersection}px + ${slope * 100}vw, ${maxSize}px)`;
};

/**
 * Viewport width scaling with fallbacks
 * Uses the 375px (iPhone standard) as the base reference
 */
const vwScale = (baseSize: number, minSize?: number, maxSize?: number) => {
  const vwSize = `${(baseSize / 375) * 100}vw`;
  
  if (minSize !== undefined && maxSize !== undefined) {
    return `clamp(${minSize}px, ${vwSize}, ${maxSize}px)`;
  } else if (minSize !== undefined) {
    return `max(${minSize}px, ${vwSize})`;
  } else if (maxSize !== undefined) {
    return `min(${vwSize}, ${maxSize}px)`;
  }
  
  return vwSize;
};

/**
 * Responsive value function for different breakpoints
 */
const responsiveValue = (values: {
  xxs?: string | number;
  xs?: string | number;
  sm?: string | number;
  md?: string | number;
  lg?: string | number;
  xl?: string | number;
  xxl?: string | number;
}) => {
  const baseValue = values.sm || values.xs || values.xxs;
  
  return css`
    ${typeof baseValue === 'number' ? `${baseValue}px` : baseValue};
    
    ${values.xxs && `@media (max-width: ${breakpoints.xs - 1}px) {
      ${typeof values.xxs === 'number' ? `${values.xxs}px` : values.xxs};
    }`}
    
    ${values.xs && `@media (min-width: ${breakpoints.xs}px) {
      ${typeof values.xs === 'number' ? `${values.xs}px` : values.xs};
    }`}
    
    ${values.sm && `@media (min-width: ${breakpoints.sm}px) {
      ${typeof values.sm === 'number' ? `${values.sm}px` : values.sm};
    }`}
    
    ${values.md && `@media (min-width: ${breakpoints.md}px) {
      ${typeof values.md === 'number' ? `${values.md}px` : values.md};
    }`}
    
    ${values.lg && `@media (min-width: ${breakpoints.lg}px) {
      ${typeof values.lg === 'number' ? `${values.lg}px` : values.lg};
    }`}
    
    ${values.xl && `@media (min-width: ${breakpoints.xl}px) {
      ${typeof values.xl === 'number' ? `${values.xl}px` : values.xl};
    }`}
    
    ${values.xxl && `@media (min-width: ${breakpoints.xxl}px) {
      ${typeof values.xxl === 'number' ? `${values.xxl}px` : values.xxl};
    }`}
  `;
};

// ====== RESPONSIVE TYPOGRAPHY SYSTEM ======
export const responsiveTypography = {
  // Display sizes for headers and main titles
  displayLarge: css`
    font-size: ${fluidScale(28, 36, breakpoints.xxs, breakpoints.xl)};
    line-height: ${fluidScale(32, 40, breakpoints.xxs, breakpoints.xl)};
    font-weight: 700;
    letter-spacing: -0.02em;
  `,
  
  displayMedium: css`
    font-size: ${fluidScale(24, 32, breakpoints.xxs, breakpoints.xl)};
    line-height: ${fluidScale(28, 36, breakpoints.xxs, breakpoints.xl)};
    font-weight: 700;
    letter-spacing: -0.01em;
  `,
  
  displaySmall: css`
    font-size: ${fluidScale(20, 28, breakpoints.xxs, breakpoints.xl)};
    line-height: ${fluidScale(24, 32, breakpoints.xxs, breakpoints.xl)};
    font-weight: 600;
    letter-spacing: -0.01em;
  `,
  
  // Title sizes for section headers
  titleLarge: css`
    font-size: ${fluidScale(18, 24, breakpoints.xxs, breakpoints.xl)};
    line-height: ${fluidScale(22, 28, breakpoints.xxs, breakpoints.xl)};
    font-weight: 600;
    letter-spacing: 0;
  `,
  
  titleMedium: css`
    font-size: ${fluidScale(16, 20, breakpoints.xxs, breakpoints.xl)};
    line-height: ${fluidScale(20, 24, breakpoints.xxs, breakpoints.xl)};
    font-weight: 600;
    letter-spacing: 0;
  `,
  
  titleSmall: css`
    font-size: ${fluidScale(14, 18, breakpoints.xxs, breakpoints.xl)};
    line-height: ${fluidScale(18, 22, breakpoints.xxs, breakpoints.xl)};
    font-weight: 500;
    letter-spacing: 0;
  `,
  
  // Body text sizes
  bodyLarge: css`
    font-size: ${fluidScale(16, 18, breakpoints.xxs, breakpoints.xl)};
    line-height: ${fluidScale(22, 26, breakpoints.xxs, breakpoints.xl)};
    font-weight: 400;
    letter-spacing: 0;
  `,
  
  bodyMedium: css`
    font-size: ${fluidScale(14, 16, breakpoints.xxs, breakpoints.xl)};
    line-height: ${fluidScale(20, 24, breakpoints.xxs, breakpoints.xl)};
    font-weight: 400;
    letter-spacing: 0;
  `,
  
  bodySmall: css`
    font-size: ${fluidScale(12, 14, breakpoints.xxs, breakpoints.xl)};
    line-height: ${fluidScale(16, 20, breakpoints.xxs, breakpoints.xl)};
    font-weight: 400;
    letter-spacing: 0;
  `,
  
  // Label and button text
  labelLarge: css`
    font-size: ${fluidScale(14, 16, breakpoints.xxs, breakpoints.xl)};
    line-height: ${fluidScale(18, 20, breakpoints.xxs, breakpoints.xl)};
    font-weight: 500;
    letter-spacing: 0;
  `,
  
  labelMedium: css`
    font-size: ${fluidScale(12, 14, breakpoints.xxs, breakpoints.xl)};
    line-height: ${fluidScale(16, 18, breakpoints.xxs, breakpoints.xl)};
    font-weight: 500;
    letter-spacing: 0;
  `,
  
  labelSmall: css`
    font-size: ${fluidScale(10, 12, breakpoints.xxs, breakpoints.xl)};
    line-height: ${fluidScale(14, 16, breakpoints.xxs, breakpoints.xl)};
    font-weight: 500;
    letter-spacing: 0;
  `,
  
  // Specialized number display (for amounts, balances)
  numberLarge: css`
    font-size: ${fluidScale(20, 28, breakpoints.xxs, breakpoints.xl)};
    line-height: ${fluidScale(24, 32, breakpoints.xxs, breakpoints.xl)};
    font-weight: 700;
    font-variant-numeric: tabular-nums;
    letter-spacing: -0.01em;
  `,
  
  numberMedium: css`
    font-size: ${fluidScale(16, 20, breakpoints.xxs, breakpoints.xl)};
    line-height: ${fluidScale(20, 24, breakpoints.xxs, breakpoints.xl)};
    font-weight: 600;
    font-variant-numeric: tabular-nums;
    letter-spacing: -0.01em;
  `,
  
  numberSmall: css`
    font-size: ${fluidScale(14, 16, breakpoints.xxs, breakpoints.xl)};
    line-height: ${fluidScale(18, 20, breakpoints.xxs, breakpoints.xl)};
    font-weight: 500;
    font-variant-numeric: tabular-nums;
    letter-spacing: 0;
  `,
};

// ====== RESPONSIVE SPACING SYSTEM ======
export const responsiveSpacing = {
  // Micro spacing
  xs: fluidScale(2, 4, breakpoints.xxs, breakpoints.xl),    // 2-4px
  sm: fluidScale(4, 6, breakpoints.xxs, breakpoints.xl),    // 4-6px
  md: fluidScale(8, 12, breakpoints.xxs, breakpoints.xl),   // 8-12px
  lg: fluidScale(12, 16, breakpoints.xxs, breakpoints.xl),  // 12-16px
  xl: fluidScale(16, 20, breakpoints.xxs, breakpoints.xl),  // 16-20px
  
  // Component spacing
  component: fluidScale(16, 24, breakpoints.xxs, breakpoints.xl),  // 16-24px
  section: fluidScale(24, 32, breakpoints.xxs, breakpoints.xl),    // 24-32px
  page: fluidScale(32, 48, breakpoints.xxs, breakpoints.xl),       // 32-48px
  
  // Layout spacing
  containerPadding: fluidScale(16, 24, breakpoints.xxs, breakpoints.xl), // Container padding
  cardGap: fluidScale(12, 16, breakpoints.xxs, breakpoints.xl),           // Card spacing
  listItemPadding: fluidScale(12, 16, breakpoints.xxs, breakpoints.xl),  // List item padding
};

// ====== RESPONSIVE COMPONENT SIZES ======
export const responsiveSizes = {
  // Button sizes
  button: {
    heightSmall: fluidScale(32, 36, breakpoints.xxs, breakpoints.xl),
    heightMedium: fluidScale(44, 48, breakpoints.xxs, breakpoints.xl),
    heightLarge: fluidScale(52, 56, breakpoints.xxs, breakpoints.xl),
    paddingHorizontal: fluidScale(16, 24, breakpoints.xxs, breakpoints.xl),
    borderRadius: fluidScale(6, 8, breakpoints.xxs, breakpoints.xl),
  },
  
  // Input fields
  input: {
    height: fluidScale(44, 48, breakpoints.xxs, breakpoints.xl),
    padding: fluidScale(12, 16, breakpoints.xxs, breakpoints.xl),
    borderRadius: fluidScale(6, 8, breakpoints.xxs, breakpoints.xl),
  },
  
  // Header and navigation
  header: {
    height: fluidScale(48, 56, breakpoints.xxs, breakpoints.xl),
    padding: fluidScale(16, 24, breakpoints.xxs, breakpoints.xl),
  },
  
  navigation: {
    height: fluidScale(60, 68, breakpoints.xxs, breakpoints.xl),
    iconSize: fluidScale(20, 24, breakpoints.xxs, breakpoints.xl),
  },
  
  // Icons
  icon: {
    small: fluidScale(16, 18, breakpoints.xxs, breakpoints.xl),
    medium: fluidScale(20, 24, breakpoints.xxs, breakpoints.xl),
    large: fluidScale(28, 32, breakpoints.xxs, breakpoints.xl),
    xlarge: fluidScale(36, 40, breakpoints.xxs, breakpoints.xl),
  },
  
  // Touch targets (minimum 44px for accessibility)
  touchTarget: {
    minimum: '44px', // Never goes below 44px for accessibility
    recommended: fluidScale(44, 48, breakpoints.xxs, breakpoints.xl),
  },
  
  // Card and containers
  card: {
    borderRadius: fluidScale(8, 12, breakpoints.xxs, breakpoints.xl),
    padding: fluidScale(16, 20, breakpoints.xxs, breakpoints.xl),
  },
};

// ====== UNIVERSAL RESPONSIVE MIXINS ======

/**
 * Universal app container that works on all screen sizes
 */
export const universalAppContainer = css`
  width: 100vw;
  max-width: 100vw;
  min-width: ${breakpoints.xxs}px;
  height: 100vh;
  height: 100dvh; /* Dynamic viewport height for mobile browsers */
  min-height: 100vh;
  min-height: 100dvh;
  min-height: -webkit-fill-available; /* iOS Safari compatibility */
  
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  position: relative;
  overflow-x: hidden;
  
  /* Safe area insets for notched devices */
  padding-top: env(safe-area-inset-top);
  padding-bottom: env(safe-area-inset-bottom);
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);
  
  /* Mobile optimizations */
  -webkit-overflow-scrolling: touch;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
  
  /* PC desktop simulation (optional) */
  @media (min-width: ${breakpoints.tablet + 1}px) {
    width: ${breakpoints.xl}px;
    max-width: ${breakpoints.xl}px;
    margin: 0 auto;
    box-shadow: 0 0 24px rgba(0, 0, 0, 0.12);
    border-radius: 0;
    /* Remove safe area padding on desktop */
    padding: 0;
  }
`;

/**
 * Universal header component
 */
export const universalHeader = css`
  width: 100%;
  height: ${responsiveSizes.header.height};
  min-height: ${responsiveSizes.header.height};
  
  display: flex;
  align-items: center;
  justify-content: space-between;
  
  padding: 0 ${responsiveSizes.header.padding};
  box-sizing: border-box;
  
  position: fixed;
  top: env(safe-area-inset-top, 0);
  left: 0;
  right: 0;
  z-index: 100;
  
  background-color: #FFFFFF;
  border-bottom: 1px solid #EBEEF0;
  
  /* Desktop centering */
  @media (min-width: ${breakpoints.tablet + 1}px) {
    left: 50%;
    transform: translateX(-50%);
    width: ${breakpoints.xl}px;
    max-width: ${breakpoints.xl}px;
  }
`;

/**
 * Universal main content area
 */
export const universalMainContent = css`
  width: 100%;
  min-height: calc(100vh - ${responsiveSizes.header.height} - ${responsiveSizes.navigation.height});
  
  padding-top: ${responsiveSizes.header.height};
  padding-bottom: calc(${responsiveSizes.navigation.height} + env(safe-area-inset-bottom));
  
  box-sizing: border-box;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
  
  /* Hide scrollbars */
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

/**
 * Universal navigation/tab bar
 */
export const universalNavigation = css`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  
  width: 100%;
  height: calc(${responsiveSizes.navigation.height} + env(safe-area-inset-bottom));
  
  background-color: #FFFFFF;
  border-top: 1px solid #EBEEF0;
  
  display: flex;
  justify-content: space-around;
  align-items: center;
  
  padding-bottom: env(safe-area-inset-bottom);
  box-sizing: border-box;
  
  z-index: 100;
  
  /* Desktop centering */
  @media (min-width: ${breakpoints.tablet + 1}px) {
    left: 50%;
    transform: translateX(-50%);
    width: ${breakpoints.xl}px;
    max-width: ${breakpoints.xl}px;
  }
`;

/**
 * Universal button styling
 */
export const universalButton = css`
  height: ${responsiveSizes.button.heightMedium};
  min-height: ${responsiveSizes.touchTarget.minimum};
  
  padding: 0 ${responsiveSizes.button.paddingHorizontal};
  border-radius: ${responsiveSizes.button.borderRadius};
  
  ${responsiveTypography.labelLarge}
  
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${responsiveSpacing.sm};
  
  border: none;
  cursor: pointer;
  
  transition: all 0.2s ease;
  touch-action: manipulation;
  -webkit-tap-highlight-color: transparent;
  
  &:active {
    transform: scale(0.98);
  }
`;

/**
 * Universal input field styling
 */
export const universalInput = css`
  width: 100%;
  height: ${responsiveSizes.input.height};
  min-height: ${responsiveSizes.touchTarget.minimum};
  
  padding: 0 ${responsiveSizes.input.padding};
  border: 1px solid #EBEEF0;
  border-radius: ${responsiveSizes.input.borderRadius};
  
  ${responsiveTypography.bodyMedium}
  background-color: #FFFFFF;
  
  box-sizing: border-box;
  
  &:focus {
    outline: none;
    border-color: #FFD338;
    box-shadow: 0 0 0 2px rgba(255, 211, 56, 0.2);
  }
  
  /* Mobile input optimizations */
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
`;

/**
 * Universal card component
 */
export const universalCard = css`
  width: 100%;
  margin: ${responsiveSpacing.sm} ${responsiveSpacing.containerPadding};
  padding: ${responsiveSizes.card.padding};
  
  border-radius: ${responsiveSizes.card.borderRadius};
  background-color: #FFFFFF;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  
  box-sizing: border-box;
`;

/**
 * Universal grid system
 */
export const universalGrid = {
  container: css`
    display: grid;
    gap: ${responsiveSpacing.component};
    padding: 0 ${responsiveSpacing.containerPadding};
    box-sizing: border-box;
  `,
  
  twoColumn: css`
    grid-template-columns: 1fr 1fr;
  `,
  
  threeColumn: css`
    grid-template-columns: repeat(3, 1fr);
    
    @media (max-width: ${breakpoints.xs}px) {
      grid-template-columns: repeat(2, 1fr);
    }
  `,
  
  fourColumn: css`
    grid-template-columns: repeat(4, 1fr);
    
    @media (max-width: ${breakpoints.sm}px) {
      grid-template-columns: repeat(3, 1fr);
    }
    
    @media (max-width: ${breakpoints.xs}px) {
      grid-template-columns: repeat(2, 1fr);
    }
  `,
};

/**
 * Responsive debug helper (development only)
 */
export const responsiveDebug = css`
  ${process.env.NODE_ENV === 'development' && css`
    position: relative;
    
    &::after {
      content: 'XXS';
      position: fixed;
      top: 10px;
      right: 10px;
      background: rgba(255, 0, 0, 0.8);
      color: white;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
      z-index: 9999;
      
      @media (min-width: ${breakpoints.xs}px) {
        content: 'XS';
        background: rgba(255, 165, 0, 0.8);
      }
      
      @media (min-width: ${breakpoints.sm}px) {
        content: 'SM';
        background: rgba(255, 255, 0, 0.8);
        color: black;
      }
      
      @media (min-width: ${breakpoints.md}px) {
        content: 'MD';
        background: rgba(0, 255, 0, 0.8);
      }
      
      @media (min-width: ${breakpoints.lg}px) {
        content: 'LG';
        background: rgba(0, 0, 255, 0.8);
      }
      
      @media (min-width: ${breakpoints.xl}px) {
        content: 'XL';
        background: rgba(128, 0, 128, 0.8);
      }
      
      @media (min-width: ${breakpoints.xxl}px) {
        content: 'XXL';
        background: rgba(255, 192, 203, 0.8);
        color: black;
      }
    }
  `}
`;

// ====== UTILITY FUNCTIONS ======

/**
 * Get responsive font size for custom values
 */
export const getResponsiveFontSize = (minSize: number, maxSize: number) => 
  fluidScale(minSize, maxSize, breakpoints.xxs, breakpoints.xl);

/**
 * Get responsive spacing for custom values
 */
export const getResponsiveSpacing = (minSize: number, maxSize: number) => 
  fluidScale(minSize, maxSize, breakpoints.xxs, breakpoints.xl);

/**
 * Get responsive size for custom values
 */
export const getResponsiveSize = (minSize: number, maxSize: number) => 
  fluidScale(minSize, maxSize, breakpoints.xxs, breakpoints.xl);

// Export all utilities
export {
  fluidScale,
  vwScale,
  responsiveValue,
};