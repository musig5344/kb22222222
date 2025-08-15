import styled from 'styled-components';
import { tokens } from '../../../styles/tokens';

/**
 * KB 스타뱅킹 공통 버튼 컴포넌트
 * 중복된 버튼 스타일을 통합
 */

// 헤더 버튼 (뒤로가기, 홈, 메뉴 등)
export const HeaderButton = styled.button`
  background: none;
  border: none;
  padding: ${tokens.spacing[2]};
  cursor: pointer;
  width: ${tokens.sizes.header.height};
  height: ${tokens.sizes.header.height};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${tokens.borderRadius.medium};
  color: ${tokens.colors.text.primary};
  
  &:active {
    background-color: rgba(0, 0, 0, 0.1);
  }
  
  img {
    width: 24px;
    height: 24px;
    object-fit: contain;
  }
`;

// KB 노란색 주 버튼
export const PrimaryButton = styled.button<{ $fullWidth?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${tokens.colors.brand.primary};
  border: none;
  border-radius: ${tokens.borderRadius.button};
  padding: ${tokens.spacing[4]} ${tokens.spacing[6]};
  color: ${tokens.colors.text.primary};
  font-size: ${tokens.typography.fontSize.lg};
  font-weight: ${tokens.typography.fontWeight.semibold};
  cursor: pointer;
  transition: all ${tokens.animation.duration.normal} ${tokens.animation.easing.easeOut};
  box-shadow: ${tokens.shadows.button};
  width: ${props => props.$fullWidth ? '100%' : 'auto'};
  
  &:hover {
    background: ${tokens.colors.brand.primaryDark};
    transform: translateY(-2px);
    box-shadow: ${tokens.shadows.lg};
  }
  
  &:active {
    transform: translateY(0) scale(0.98);
    box-shadow: ${tokens.shadows.sm};
  }
  
  &:disabled {
    background: ${tokens.colors.border.secondary};
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

// 보조 버튼 (테두리만 있는 버튼)
export const SecondaryButton = styled.button<{ $fullWidth?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${tokens.colors.white};
  border: 1px solid ${tokens.colors.border.primary};
  border-radius: ${tokens.borderRadius.button};
  padding: ${tokens.spacing[4]} ${tokens.spacing[6]};
  color: ${tokens.colors.text.secondary};
  font-size: ${tokens.typography.fontSize.lg};
  font-weight: ${tokens.typography.fontWeight.medium};
  cursor: pointer;
  transition: all ${tokens.animation.duration.normal} ${tokens.animation.easing.easeOut};
  width: ${props => props.$fullWidth ? '100%' : 'auto'};
  
  &:hover {
    background: ${tokens.colors.background.secondary};
    border-color: ${tokens.colors.text.secondary};
  }
  
  &:active {
    transform: scale(0.98);
  }
  
  &:disabled {
    background: ${tokens.colors.background.secondary};
    color: ${tokens.colors.text.tertiary};
    cursor: not-allowed;
    transform: none;
  }
`;

// 작은 액션 버튼 (아이콘 + 텍스트)
export const ActionButton = styled.button<{ $primary?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${tokens.spacing[3]} ${tokens.spacing[4]};
  border: ${props => props.$primary ? 'none' : `1px solid ${tokens.colors.border.primary}`};
  border-radius: ${tokens.borderRadius.medium};
  background: ${props => props.$primary ? tokens.colors.brand.primary : tokens.colors.white};
  color: ${props => props.$primary ? tokens.colors.text.primary : tokens.colors.text.secondary};
  font-size: ${tokens.typography.fontSize.sm};
  font-weight: ${tokens.typography.fontWeight.medium};
  cursor: pointer;
  transition: all ${tokens.animation.duration.fast} ${tokens.animation.easing.easeOut};
  
  &:active {
    transform: scale(0.95);
    background: ${props => props.$primary ? tokens.colors.brand.primaryDark : tokens.colors.background.secondary};
  }
`;

// 필터/옵션 버튼
export const FilterButton = styled.button<{ $active?: boolean }>`
  padding: ${tokens.spacing[2]} ${tokens.spacing[3]};
  border: 1px solid ${props => props.$active ? tokens.colors.brand.primary : tokens.colors.border.primary};
  border-radius: ${tokens.borderRadius.full};
  background: ${props => props.$active ? tokens.colors.brand.primary : tokens.colors.white};
  color: ${props => props.$active ? tokens.colors.white : tokens.colors.text.secondary};
  font-size: ${tokens.typography.fontSize.sm};
  font-weight: ${tokens.typography.fontWeight.medium};
  cursor: pointer;
  transition: all ${tokens.animation.duration.fast} ${tokens.animation.easing.easeOut};
  white-space: nowrap;
  
  &:hover {
    border-color: ${tokens.colors.brand.primary};
    background: ${props => props.$active ? tokens.colors.brand.primaryDark : tokens.colors.brand.primaryAlpha10};
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

// 텍스트만 있는 버튼 (링크 스타일)
export const TextButton = styled.button`
  background: none;
  border: none;
  padding: ${tokens.spacing[2]};
  color: ${tokens.colors.text.link};
  font-size: ${tokens.typography.fontSize.base};
  font-weight: ${tokens.typography.fontWeight.regular};
  cursor: pointer;
  text-decoration: underline;
  transition: color ${tokens.animation.duration.fast} ${tokens.animation.easing.easeOut};
  
  &:hover {
    color: ${tokens.colors.brand.primary};
  }
  
  &:active {
    opacity: 0.7;
  }
`;

// 플로팅 액션 버튼
export const FloatingActionButton = styled.button`
  position: fixed;
  bottom: calc(${tokens.sizes.navigation.height} + ${tokens.spacing[6]});
  right: ${tokens.spacing[6]};
  width: 56px;
  height: 56px;
  border-radius: ${tokens.borderRadius.full};
  background: ${tokens.colors.brand.primary};
  border: none;
  box-shadow: ${tokens.shadows.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all ${tokens.animation.duration.normal} ${tokens.animation.easing.easeOut};
  z-index: 100;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${tokens.shadows.xl};
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: ${tokens.shadows.md};
  }
  
  img {
    width: 24px;
    height: 24px;
  }
`;