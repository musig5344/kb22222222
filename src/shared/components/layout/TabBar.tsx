import React from 'react';
import styled from 'styled-components';
import { NavLink, useLocation } from 'react-router-dom';
import { tokens } from '../../../styles/tokens';
import { 
  universalNavigation, 
  universalButton,
  responsiveSizes, 
  responsiveSpacing,
  responsiveTypography,
  breakpoints
} from '../../../styles/universal-responsive';
import { 
  androidOptimizedNavigation, 
  androidOptimizedButton 
} from '../../../styles/android-webview-optimizations';
// Import tab icons - 원본 KB 스타뱅킹 탭바 아이콘들
import iconShop from '../../../assets/images/icons/icon_tab_shop.png';
import iconAssets from '../../../assets/images/icons/icon_tab_assets.png';
import iconWallet from '../../../assets/images/icons/icon_tab_wallet.png';
import iconGift from '../../../assets/images/icons/icon_tab_gift.png';
import iconMenu from '../../../assets/images/icons/icon_tab_menu.png';
const TabBarContainer = styled.nav.attrs({
  role: 'navigation',
  'aria-label': '주요 메뉴',
  className: 'bottom-fixed'
})`
  ${universalNavigation}
  background-color: ${tokens.colors.background.primary};
  border-top: 1px solid ${tokens.colors.border.secondary};
  box-shadow: ${tokens.shadows.navigationTop};
  
  /* Android optimizations for mobile */
  @media (max-width: ${breakpoints.tablet}px) {
    ${androidOptimizedNavigation}
  }
`;
const TabItem = styled(NavLink)<{ $isMain?: boolean }>`
  ${universalButton}
  flex-direction: column;
  flex: 1;
  height: 100%;
  gap: ${responsiveSpacing.xs};
  text-decoration: none;
  border-radius: ${tokens.borderRadius.medium};
  
  /* Android optimizations for mobile */
  @media (max-width: ${breakpoints.tablet}px) {
    ${androidOptimizedButton}
  }
  
  &:hover {
    background-color: ${tokens.colors.action.hover};
  }
`;
const IconWrapper = styled.div<{ $isMain?: boolean; $active?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${props => props.$isMain ? responsiveSizes.touchTarget.recommended : responsiveSizes.icon.large};
  height: ${props => props.$isMain ? responsiveSizes.touchTarget.recommended : responsiveSizes.icon.large};
  position: relative;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  ${props => props.$isMain && props.$active && `
    background: linear-gradient(135deg, #FFD338 0%, #FFCC00 100%);
    border-radius: 50%;
    box-shadow: 0 4px 12px rgba(255, 211, 56, 0.6);
    transform: scale(1.08);
  `}
  ${props => props.$isMain && !props.$active && `
    background: #F0F0F0;
    border-radius: 50%;
    border: 1px solid #E0E0E0;
  `}
`;
const TabIcon = styled.img<{ $active: boolean; $isMain?: boolean }>`
  width: ${props => props.$isMain ? responsiveSizes.icon.medium : responsiveSizes.icon.medium};
  height: ${props => props.$isMain ? responsiveSizes.icon.medium : responsiveSizes.icon.medium};
  object-fit: contain;
  transition: all 0.2s ease;
  opacity: 1;
  filter: ${props => {
    if (props.$isMain && props.$active) {
      return 'brightness(0) invert(1) drop-shadow(0 1px 2px rgba(0,0,0,0.2))';
    }
    if (props.$active) {
      return 'brightness(0) saturate(1.2) contrast(1.3)';
    }
    return 'grayscale(100%) brightness(0.4) contrast(1.2)';
  }};
`;
const TabLabel = styled.span<{ $active: boolean; $isMain?: boolean }>`
  ${responsiveTypography.labelSmall}
  font-weight: ${props => props.$active ? '700' : '600'};
  margin-top: ${responsiveSpacing.xs};
  font-family: 'KBFGText', sans-serif;
  color: ${props => {
    if (props.$active && props.$isMain) return '#FF9500';
    if (props.$active) return '#000000';
    return '#666666';
  }};
  transition: all 0.2s ease;
  text-shadow: ${props => props.$active ? '0 0.5px 2px rgba(0,0,0,0.15)' : 'none'};
`;
// 활성 탭 인디케이터 (선택적 창작 요소)
const ActiveIndicator = styled.div<{ $show: boolean }>`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%) ${props => props.$show ? 'scaleX(1)' : 'scaleX(0)'};
  width: 70%;
  height: 3px;
  background: linear-gradient(90deg, #FFD338 0%, #FFCC00 100%);
  border-radius: 0 0 3px 3px;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: ${props => props.$show ? 1 : 0};
  box-shadow: 0 1px 4px rgba(255, 211, 56, 0.5);
`;
const TABS = [
  { path: '/shop', label: '상품', iconSrc: iconShop },
  { path: '/assets', label: '자산', iconSrc: iconAssets },
  { path: '/wallet', label: '지갑', iconSrc: iconWallet, isMain: true },
  { path: '/benefits', label: '혜택', iconSrc: iconGift },
  { path: '/menu', label: '메뉴', iconSrc: iconMenu },
];
const TabBar: React.FC = () => {
  const location = useLocation();
  return (
    <TabBarContainer>
      {TABS.map((tab) => {
        const isActive = location.pathname === tab.path || 
                        (tab.path === '/wallet' && (location.pathname === '/dashboard' || location.pathname === '/'));
        return (
          <TabItem 
            to={tab.path} 
            key={tab.path} 
            $isMain={tab.isMain}
            aria-label={`${tab.label} 페이지로 이동`}
            role="tab"
            aria-current={isActive ? 'page' : undefined}
          >
            <ActiveIndicator $show={isActive && !tab.isMain} />
            <IconWrapper $isMain={tab.isMain} $active={isActive}>
              <TabIcon 
                src={tab.iconSrc} 
                alt={tab.label} 
                $active={isActive}
                $isMain={tab.isMain}
              />
            </IconWrapper>
            <TabLabel $active={isActive} $isMain={tab.isMain && isActive}>
              {tab.label}
            </TabLabel>
          </TabItem>
        );
      })}
    </TabBarContainer>
  );
};
export default TabBar;