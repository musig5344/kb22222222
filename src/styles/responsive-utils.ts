/**
 * Responsive Design Utilities for KB StarBanking Clone
 * 
 * Easy-to-use utilities and helper functions for applying
 * consistent responsive design across all components.
 * 
 * Import these utilities in any component file to quickly
 * apply the universal responsive design system.
 */

import { css } from 'styled-components';
import {
  universalAppContainer,
  universalHeader,
  universalMainContent,
  universalNavigation,
  universalButton,
  universalInput,
  universalCard,
  universalGrid,
  responsiveTypography,
  responsiveSpacing,
  responsiveSizes,
  breakpoints,
  fluidScale,
  vwScale,
  responsiveValue,
  getResponsiveFontSize,
  getResponsiveSpacing,
  getResponsiveSize
} from './universal-responsive';

// ====== QUICK LAYOUT MIXINS ======

/**
 * Apply standard app container with responsive design
 * Use this for main app containers
 */
export const quickAppContainer = css`
  ${universalAppContainer}
`;

/**
 * Apply standard header with responsive design
 * Use this for page headers and navigation headers
 */
export const quickHeader = css`
  ${universalHeader}
`;

/**
 * Apply standard main content area with responsive design
 * Use this for main content sections
 */
export const quickMainContent = css`
  ${universalMainContent}
`;

/**
 * Apply standard navigation/tab bar with responsive design
 * Use this for bottom navigation and tab bars
 */
export const quickNavigation = css`
  ${universalNavigation}
`;

/**
 * Apply standard button styling with responsive design
 * Use this for all button components
 */
export const quickButton = css`
  ${universalButton}
`;

/**
 * Apply standard input field styling with responsive design
 * Use this for all input fields
 */
export const quickInput = css`
  ${universalInput}
`;

/**
 * Apply standard card styling with responsive design
 * Use this for card components and content containers
 */
export const quickCard = css`
  ${universalCard}
`;

// ====== RESPONSIVE TYPOGRAPHY SHORTCUTS ======

export const text = {
  display: responsiveTypography.display,
  title: responsiveTypography.title,
  subtitle: responsiveTypography.subtitle,
  body: responsiveTypography.body,
  caption: responsiveTypography.caption,
  numberLarge: responsiveTypography.numberLarge,
  numberMedium: responsiveTypography.numberMedium,
  numberSmall: responsiveTypography.numberSmall,
};

// ====== RESPONSIVE SPACING SHORTCUTS ======

export const spacing = {
  xs: responsiveSpacing.xs,
  sm: responsiveSpacing.sm,
  md: responsiveSpacing.md,
  lg: responsiveSpacing.lg,
  xl: responsiveSpacing.xl,
  component: responsiveSpacing.component,
  section: responsiveSpacing.section,
  page: responsiveSpacing.page,
  container: responsiveSpacing.containerPadding,
  card: responsiveSpacing.cardGap,
  listItem: responsiveSpacing.listItemPadding,
};

// ====== RESPONSIVE SIZES SHORTCUTS ======

export const sizes = {
  button: responsiveSizes.button,
  input: responsiveSizes.input,
  header: responsiveSizes.header,
  navigation: responsiveSizes.navigation,
  icon: responsiveSizes.icon,
  touchTarget: responsiveSizes.touchTarget,
  card: responsiveSizes.card,
};

// ====== GRID SYSTEM SHORTCUTS ======

export const grid = {
  container: universalGrid.container,
  twoColumn: css`
    ${universalGrid.container}
    ${universalGrid.twoColumn}
  `,
  threeColumn: css`
    ${universalGrid.container}
    ${universalGrid.threeColumn}
  `,
  fourColumn: css`
    ${universalGrid.container}
    ${universalGrid.fourColumn}
  `,
};

// ====== COMPONENT-SPECIFIC RESPONSIVE MIXINS ======

/**
 * Responsive transaction list item
 * Use this for transaction history items and similar list items
 */
export const responsiveListItem = css`
  padding: ${spacing.listItem} ${spacing.container};
  border-bottom: 1px solid #EBEEF0;
  
  &:last-child {
    border-bottom: none;
  }
  
  /* Touch-friendly spacing */
  min-height: ${sizes.touchTarget.minimum};
  display: flex;
  align-items: center;
`;

/**
 * Responsive modal/bottom sheet container
 * Use this for modal dialogs and bottom sheets
 */
export const responsiveModal = css`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  
  /* Desktop centering */
  @media (min-width: ${breakpoints.tablet + 1}px) {
    left: 50%;
    transform: translateX(-50%);
    width: ${breakpoints.xl}px;
    max-width: ${breakpoints.xl}px;
  }
`;

/**
 * Responsive bottom sheet content
 * Use this for bottom sheet content areas
 */
export const responsiveBottomSheet = css`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #FFFFFF;
  border-radius: ${sizes.card.borderRadius} ${sizes.card.borderRadius} 0 0;
  padding: ${spacing.lg} ${spacing.container};
  padding-bottom: calc(${spacing.lg} + env(safe-area-inset-bottom));
  max-height: 80vh;
  overflow-y: auto;
`;

/**
 * Responsive form container
 * Use this for form layouts
 */
export const responsiveForm = css`
  display: flex;
  flex-direction: column;
  gap: ${spacing.lg};
  padding: 0 ${spacing.container};
  
  /* Form inputs */
  input, select, textarea {
    ${quickInput}
  }
  
  /* Form buttons */
  button {
    ${quickButton}
  }
`;

/**
 * Responsive section container
 * Use this for main content sections
 */
export const responsiveSection = css`
  padding: ${spacing.section} ${spacing.container};
  
  &:not(:last-child) {
    border-bottom: 1px solid #F5F5F5;
  }
`;

/**
 * Responsive header with title
 * Use this for page headers with back button and title
 */
export const responsivePageHeader = css`
  ${quickHeader}
  background-color: #FFFFFF;
  border-bottom: 1px solid #EBEEF0;
  
  h1 {
    ${text.title}
    margin: 0;
    text-align: center;
    flex: 1;
  }
  
  button {
    ${quickButton}
    width: ${sizes.touchTarget.minimum};
    height: ${sizes.touchTarget.minimum};
    padding: 0;
    background: none;
    border: none;
  }
`;

// ====== UTILITY FUNCTIONS ======

/**
 * Create a responsive value that scales between two sizes
 * @param minSize - Minimum size (for smallest screens)
 * @param maxSize - Maximum size (for largest screens)
 * @param unit - CSS unit (default: 'px')
 */
export const createResponsiveValue = (
  minSize: number, 
  maxSize: number, 
  unit: string = 'px'
) => {
  return fluidScale(minSize, maxSize, breakpoints.xxs, breakpoints.xl) + (unit === 'px' ? '' : unit);
};

/**
 * Create a viewport-based responsive value
 * @param baseSize - Base size for 375px viewport
 * @param minSize - Minimum size (optional)
 * @param maxSize - Maximum size (optional)
 */
export const createVwValue = (
  baseSize: number, 
  minSize?: number, 
  maxSize?: number
) => {
  return vwScale(baseSize, minSize, maxSize);
};

/**
 * Apply responsive breakpoints
 * @param values - Object with breakpoint values
 */
export const applyBreakpoints = (values: {
  xxs?: string | number;
  xs?: string | number;
  sm?: string | number;
  md?: string | number;
  lg?: string | number;
  xl?: string | number;
  xxl?: string | number;
}) => {
  return responsiveValue(values);
};

/**
 * Get a consistent responsive font size
 * @param minSize - Minimum font size
 * @param maxSize - Maximum font size
 */
export const getResponsiveFont = (minSize: number, maxSize: number) => {
  return getResponsiveFontSize(minSize, maxSize);
};

/**
 * Get consistent responsive spacing
 * @param minSize - Minimum spacing
 * @param maxSize - Maximum spacing
 */
export const getResponsiveGap = (minSize: number, maxSize: number) => {
  return getResponsiveSpacing(minSize, maxSize);
};

/**
 * Get consistent responsive component size
 * @param minSize - Minimum size
 * @param maxSize - Maximum size
 */
export const getResponsiveDimension = (minSize: number, maxSize: number) => {
  return getResponsiveSize(minSize, maxSize);
};

// ====== COMPONENT HELPERS ======

/**
 * Make any component responsive by applying universal container
 */
export const makeResponsive = (component: any) => css`
  ${component}
  ${universalAppContainer}
`;

/**
 * Apply KB design system responsive colors
 */
export const kbColors = {
  primary: '#FFD338',
  primaryDark: '#FFCC00',
  primaryLight: '#FFF4CC',
  text: {
    primary: '#000000',
    secondary: '#666666',
    disabled: '#CCCCCC',
  },
  background: {
    primary: '#FFFFFF',
    secondary: '#F8F8F8',
    tertiary: '#F0F0F0',
  },
  border: {
    primary: '#EBEEF0',
    secondary: '#E0E0E0',
  },
};

/**
 * Apply responsive safe area padding
 * Use this for components that need to respect device safe areas
 */
export const responsiveSafeArea = css`
  padding-top: env(safe-area-inset-top);
  padding-bottom: env(safe-area-inset-bottom);
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);
  
  /* Fallbacks for older browsers */
  @supports not (padding-top: env(safe-area-inset-top)) {
    padding-top: 24px; /* Status bar height */
    padding-bottom: 20px; /* Home indicator area */
  }
`;

/**
 * Apply responsive container with max width
 * Use this for content that should be centered with max width
 */
export const responsiveContainer = css`
  width: 100%;
  max-width: ${breakpoints.xl}px;
  margin: 0 auto;
  padding: 0 ${spacing.container};
  box-sizing: border-box;
`;

/**
 * Apply responsive flexbox utilities
 */
export const flex = {
  center: css`
    display: flex;
    align-items: center;
    justify-content: center;
  `,
  centerVertical: css`
    display: flex;
    align-items: center;
  `,
  centerHorizontal: css`
    display: flex;
    justify-content: center;
  `,
  spaceBetween: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
  `,
  column: css`
    display: flex;
    flex-direction: column;
  `,
  row: css`
    display: flex;
    flex-direction: row;
  `,
  wrap: css`
    display: flex;
    flex-wrap: wrap;
  `,
};

// Export everything for easy access
export {
  // Core responsive system
  universalAppContainer,
  universalHeader,
  universalMainContent,
  universalNavigation,
  universalButton,
  universalInput,
  universalCard,
  universalGrid,
  
  // Typography
  responsiveTypography,
  
  // Spacing and sizes
  responsiveSpacing,
  responsiveSizes,
  
  // Breakpoints
  breakpoints,
  
  // Utility functions
  fluidScale,
  vwScale,
  responsiveValue,
  getResponsiveFontSize,
  getResponsiveSpacing,
  getResponsiveSize,
};

// Export default for convenient importing
export default {
  // Quick mixins
  container: quickAppContainer,
  header: quickHeader,
  content: quickMainContent,
  navigation: quickNavigation,
  button: quickButton,
  input: quickInput,
  card: quickCard,
  
  // Utilities
  text,
  spacing,
  sizes,
  grid,
  flex,
  kbColors,
  
  // Helpers
  createResponsiveValue,
  createVwValue,
  applyBreakpoints,
  getResponsiveFont,
  getResponsiveGap,
  getResponsiveDimension,
  makeResponsive,
  responsiveSafeArea,
  responsiveContainer,
};