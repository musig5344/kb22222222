import styled, { keyframes } from 'styled-components';
import { tokens } from '../../../styles/tokens';

/**
 * KB 스타뱅킹 공통 모달/다이얼로그 컴포넌트
 * 중복된 모달 스타일을 통합
 */

// 모달 오버레이 (배경)
export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 16px;
`;

// 모달 컨테이너 (카드)
export const ModalContainer = styled.div<{ $maxWidth?: string }>`
  background: white;
  border-radius: ${tokens.borderRadius.xl};
  box-shadow: ${tokens.shadows.modal};
  max-width: ${props => props.$maxWidth || '90%'};
  width: 100%;
  max-height: 90vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

// 모달 헤더
export const ModalHeader = styled.div`
  padding: ${tokens.spacing[6]} ${tokens.spacing[6]} ${tokens.spacing[4]};
  border-bottom: 1px solid ${tokens.colors.border.light};
`;

// 모달 제목
export const ModalTitle = styled.h2`
  font-size: ${tokens.typography.fontSize.xl};
  font-weight: ${tokens.typography.fontWeight.semibold};
  color: ${tokens.colors.text.primary};
  margin: 0;
  text-align: center;
`;

// 모달 콘텐츠
export const ModalContent = styled.div`
  padding: ${tokens.spacing[6]};
  overflow-y: auto;
  flex: 1;
`;

// 모달 푸터 (버튼 영역)
export const ModalFooter = styled.div`
  padding: ${tokens.spacing[4]} ${tokens.spacing[6]} ${tokens.spacing[6]};
  border-top: 1px solid ${tokens.colors.border.light};
  display: flex;
  gap: ${tokens.spacing[3]};
`;

// 모달 버튼
export const ModalButton = styled.button<{ $primary?: boolean; $fullWidth?: boolean }>`
  flex: ${props => props.$fullWidth ? '1' : '0 0 auto'};
  padding: ${tokens.spacing[4]} ${tokens.spacing[6]};
  border: ${props => props.$primary ? 'none' : `1px solid ${tokens.colors.border.primary}`};
  border-radius: ${tokens.borderRadius.button};
  background: ${props => props.$primary ? tokens.colors.brand.primary : tokens.colors.white};
  color: ${props => props.$primary ? tokens.colors.text.primary : tokens.colors.text.secondary};
  font-size: ${tokens.typography.fontSize.lg};
  font-weight: ${tokens.typography.fontWeight.medium};
  cursor: pointer;
  transition: all ${tokens.animation.duration.fast} ${tokens.animation.easing.easeOut};
  
  &:hover {
    background: ${props => props.$primary ? tokens.colors.brand.primaryDark : tokens.colors.background.secondary};
  }
  
  &:active {
    transform: scale(0.98);
  }
`;

// Material Design 스타일 카드 (KB 앱 스타일)
export const MaterialCardView = styled.div`
  background: white;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  padding: 24px;
  margin: 16px;
  max-width: 400px;
  width: 100%;
  animation: slideUp 0.3s ease-out;
  
  @keyframes slideUp {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

// 다이얼로그 레이아웃
export const DialogContentLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

// 바텀시트 컨테이너
export const BottomSheetContainer = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: ${tokens.colors.white};
  border-radius: ${tokens.borderRadius.xl} ${tokens.borderRadius.xl} 0 0;
  box-shadow: ${tokens.shadows.modal};
  transform: translateY(${props => props.$isOpen ? '0' : '100%'});
  transition: transform ${tokens.animation.duration.normal} ${tokens.animation.easing.easeOut};
  z-index: 1001;
  max-height: 90vh;
  overflow: hidden;
`;

// 바텀시트 핸들
export const BottomSheetHandle = styled.div`
  width: 40px;
  height: 4px;
  background: ${tokens.colors.border.secondary};
  border-radius: ${tokens.borderRadius.full};
  margin: ${tokens.spacing[3]} auto;
`;

// 성공 체크 아이콘 애니메이션
const checkAnimation = keyframes`
  0% {
    stroke-dashoffset: 100;
  }
  100% {
    stroke-dashoffset: 0;
  }
`;

export const AnimatedCheckIcon = styled.svg`
  width: 40px;
  height: 40px;
  
  path {
    stroke: ${tokens.colors.text.primary};
    stroke-width: 3;
    stroke-linecap: round;
    stroke-linejoin: round;
    fill: none;
    stroke-dasharray: 100;
    stroke-dashoffset: 100;
    animation: ${checkAnimation} 0.6s ease-out forwards;
    animation-delay: 0.2s;
  }
`;

// 스크롤 가능한 컨테이너
export const ScrollableContent = styled.div<{ $maxHeight?: string }>`
  max-height: ${props => props.$maxHeight || '300px'};
  overflow-y: auto;
  padding-right: ${tokens.spacing[2]};
  
  &::-webkit-scrollbar {
    width: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: ${tokens.colors.background.secondary};
    border-radius: ${tokens.borderRadius.full};
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${tokens.colors.border.secondary};
    border-radius: ${tokens.borderRadius.full};
  }
`;