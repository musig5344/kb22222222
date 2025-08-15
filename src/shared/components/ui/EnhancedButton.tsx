import React from 'react';
import styled, { keyframes } from 'styled-components';
import { tokens } from '../../../styles/tokens';
import { kbButtonStyle } from '../../../styles/KBMicroDetails';

/**
 * 향상된 KB 스타일 버튼 컴포넌트
 * - 부드러운 터치 애니메이션
 * - 리플 효과
 * - 성능 최적화된 GPU 가속
 */

interface EnhancedButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'danger';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
}

// 버튼 크기별 스타일
const buttonSizes = {
  small: {
    height: '34px',
    padding: '0 12px',
    fontSize: '13px',
  },
  medium: {
    height: '44px',
    padding: '0 20px',
    fontSize: '15px',
  },
  large: {
    height: '52px',
    padding: '0 24px',
    fontSize: '16px',
  },
};

// 버튼 변형별 스타일
const buttonVariants = {
  primary: {
    background: `linear-gradient(135deg, ${tokens.colors.brand.primary} 0%, #FFCC00 100%)`,
    color: '#000000',
    border: 'none',
    shadow: '0 2px 8px rgba(255, 211, 56, 0.3)',
    hoverShadow: '0 4px 16px rgba(255, 211, 56, 0.4)',
  },
  secondary: {
    background: tokens.colors.background.secondary,
    color: tokens.colors.text.primary,
    border: `1px solid ${tokens.colors.border.primary}`,
    shadow: '0 1px 4px rgba(0, 0, 0, 0.1)',
    hoverShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
  },
  tertiary: {
    background: 'transparent',
    color: tokens.colors.brand.primary,
    border: 'none',
    shadow: 'none',
    hoverShadow: 'none',
  },
  danger: {
    background: '#FF3B30',
    color: '#FFFFFF',
    border: 'none',
    shadow: '0 2px 8px rgba(255, 59, 48, 0.3)',
    hoverShadow: '0 4px 16px rgba(255, 59, 48, 0.4)',
  },
};

// 리플 효과 애니메이션
const rippleEffect = keyframes`
  from {
    transform: translate(-50%, -50%) scale(0);
    opacity: 0.6;
  }
  to {
    transform: translate(-50%, -50%) scale(2);
    opacity: 0;
  }
`;

// 로딩 스피너 애니메이션
const loadingSpinner = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const StyledButton = styled.button<EnhancedButtonProps>`
  ${kbButtonStyle}
  
  /* 기본 스타일 */
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: ${tokens.borderRadius.medium};
  font-family: ${tokens.typography.fontFamily.medium};
  font-weight: ${tokens.typography.fontWeight.semibold};
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  
  /* GPU 가속 활성화 */
  transform: translateZ(0);
  will-change: transform, box-shadow, background-color;
  
  /* 크기 스타일 */
  ${({ size = 'medium' }) => {
    const sizeStyle = buttonSizes[size];
    return `
      height: ${sizeStyle.height};
      padding: ${sizeStyle.padding};
      font-size: ${sizeStyle.fontSize};
    `;
  }}
  
  /* 전체 너비 */
  ${({ fullWidth }) => fullWidth && `
    width: 100%;
  `}
  
  /* 변형별 스타일 */
  ${({ variant = 'primary' }) => {
    const variantStyle = buttonVariants[variant];
    return `
      background: ${variantStyle.background};
      color: ${variantStyle.color};
      border: ${variantStyle.border};
      box-shadow: ${variantStyle.shadow};
      
      &:hover:not(:disabled) {
        box-shadow: ${variantStyle.hoverShadow};
        transform: translateY(-1px) translateZ(0);
      }
    `;
  }}
  
  /* 액티브 상태 */
  &:active:not(:disabled) {
    transform: translateY(0) scale(0.98) translateZ(0);
    transition: all 0.1s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  /* 비활성화 상태 */
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    box-shadow: none;
    transform: none;
  }
  
  /* 포커스 상태 */
  &:focus-visible {
    outline: 2px solid ${tokens.colors.brand.primary};
    outline-offset: 2px;
  }
`;

const ButtonContent = styled.span<{ $loading?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${({ $loading }) => $loading ? 0 : 1};
  transition: opacity 0.2s ease;
`;

const LoadingSpinner = styled.div`
  position: absolute;
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: ${loadingSpinner} 0.8s linear infinite;
`;

const RippleContainer = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  border-radius: inherit;
  pointer-events: none;
`;

const Ripple = styled.span<{ $x: number; $y: number; $active: boolean }>`
  position: absolute;
  width: 20px;
  height: 20px;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 50%;
  top: ${({ $y }) => $y}px;
  left: ${({ $x }) => $x}px;
  transform: translate(-50%, -50%) scale(0);
  animation: ${({ $active }) => $active ? rippleEffect : 'none'} 0.6s ease-out;
`;

export const EnhancedButton: React.FC<EnhancedButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  loading = false,
  fullWidth = false,
  onClick,
  ...props
}) => {
  const [ripples, setRipples] = React.useState<Array<{ id: number; x: number; y: number; active: boolean }>>([]);
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (loading || props.disabled) return;

    // 리플 효과 생성
    const button = buttonRef.current;
    if (button) {
      const rect = button.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      
      const newRipple = {
        id: Date.now(),
        x,
        y,
        active: true,
      };
      
      setRipples(prev => [...prev, newRipple]);
      
      // 애니메이션 완료 후 리플 제거
      setTimeout(() => {
        setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
      }, 600);
    }

    onClick?.(event);
  };

  return (
    <StyledButton
      ref={buttonRef}
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      onClick={handleClick}
      {...props}
    >
      <ButtonContent $loading={loading}>
        {children}
      </ButtonContent>
      
      {loading && <LoadingSpinner />}
      
      <RippleContainer>
        {ripples.map(ripple => (
          <Ripple
            key={ripple.id}
            $x={ripple.x}
            $y={ripple.y}
            $active={ripple.active}
          />
        ))}
      </RippleContainer>
    </StyledButton>
  );
};

export default EnhancedButton;