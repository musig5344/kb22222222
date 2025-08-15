import React from 'react';
import { ButtonProps } from './Button.types';
import { StyledButton, LoadingSpinner, IconWrapper, ButtonContent } from './Button.styles';
/**
 * KB StarBanking 통합 Button 컴포넌트
 * 
 * @example
 * ```tsx
 * // 기본 사용
 * <Button>확인</Button>
 * 
 * // 변형 및 크기
 * <Button variant="secondary" size="large">취소</Button>
 * 
 * // 아이콘과 함께
 * <Button leftIcon={<Icon />}>저장</Button>
 * 
 * // 로딩 상태
 * <Button loading>처리중...</Button>
 * ```
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({
  children,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  loading = false,
  pressed = false,
  leftIcon,
  rightIcon,
  ripple = true,
  disabled,
  className,
  ...props
}, ref) => {
  const isDisabled = disabled || loading;
  return (
    <StyledButton
      ref={ref}
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      loading={loading}
      pressed={pressed}
      disabled={isDisabled}
      leftIcon={leftIcon}
      rightIcon={rightIcon}
      ripple={ripple}
      className={className}
      aria-busy={loading}
      aria-pressed={pressed}
      {...props}
    >
      {loading && <LoadingSpinner aria-label="로딩 중" />}
      {!loading && leftIcon && <IconWrapper>{leftIcon}</IconWrapper>}
      {children && <ButtonContent>{children}</ButtonContent>}
      {!loading && rightIcon && <IconWrapper>{rightIcon}</IconWrapper>}
    </StyledButton>
  );
});
Button.displayName = 'Button';
/**
 * 미리 정의된 버튼 변형들
 */
export const PrimaryButton = React.forwardRef<
  HTMLButtonElement, 
  Omit<ButtonProps, 'variant'>
>((props, ref) => (
  <Button ref={ref} variant="primary" {...props} />
));
PrimaryButton.displayName = 'PrimaryButton';
export const SecondaryButton = React.forwardRef<
  HTMLButtonElement, 
  Omit<ButtonProps, 'variant'>
>((props, ref) => (
  <Button ref={ref} variant="secondary" {...props} />
));
SecondaryButton.displayName = 'SecondaryButton';
export const TextButton = React.forwardRef<
  HTMLButtonElement, 
  Omit<ButtonProps, 'variant'>
>((props, ref) => (
  <Button ref={ref} variant="text" {...props} />
));
TextButton.displayName = 'TextButton';
export const OutlineButton = React.forwardRef<
  HTMLButtonElement, 
  Omit<ButtonProps, 'variant'>
>((props, ref) => (
  <Button ref={ref} variant="outline" {...props} />
));
OutlineButton.displayName = 'OutlineButton';
export default Button;