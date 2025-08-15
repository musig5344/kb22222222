import React, { useState, useRef, useCallback, useEffect } from 'react';
import styled from 'styled-components';
import { Touchable } from './Touchable';
import { 
  hapticFeedback, 
  TOUCH_CONSTANTS,
  useScrollLock,
  normalizeTouch,
  getSwipeDirection,
  calculateVelocity,
  calculateDistance,
} from '../../utils/touchOptimization';
import { useSpring } from '../../utils/SpringAnimation';
import { tokens } from '../../../styles/tokens';

// PIN Pad Component
interface PinPadProps {
  onComplete: (pin: string) => void;
  pinLength?: number;
  shuffleKeys?: boolean;
  hapticEnabled?: boolean;
}

const PinPadContainer = styled.div`
  width: 100%;
  max-width: 320px;
  margin: 0 auto;
`;

const PinDisplay = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-bottom: 32px;
`;

const PinDot = styled.div<{ $filled: boolean }>`
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background-color: ${props => props.$filled ? tokens.colors.primary : tokens.colors.border.primary};
  transition: background-color 200ms ease-out, transform 100ms ease-out;
  transform: ${props => props.$filled ? 'scale(1.2)' : 'scale(1)'};
`;

const PinKeyboard = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
`;

const PinKey = styled(Touchable)`
  width: 80px;
  height: 80px;
  border-radius: 40px;
  background-color: ${tokens.colors.background.secondary};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: bold;
  color: ${tokens.colors.text.primary};
  
  &:active {
    background-color: ${tokens.colors.border.primary};
  }
`;

const DeleteKey = styled(PinKey)`
  background-color: transparent;
  font-size: 20px;
`;

export const SecurePinPad: React.FC<PinPadProps> = ({
  onComplete,
  pinLength = 6,
  shuffleKeys = true,
  hapticEnabled = true,
}) => {
  const [pin, setPin] = useState('');
  const [keys, setKeys] = useState<string[]>([]);

  useEffect(() => {
    // Generate shuffled or ordered keys
    const numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
    if (shuffleKeys) {
      setKeys([...numbers].sort(() => Math.random() - 0.5));
    } else {
      setKeys(numbers);
    }
  }, [shuffleKeys]);

  const handleKeyPress = useCallback((key: string) => {
    if (pin.length < pinLength) {
      const newPin = pin + key;
      setPin(newPin);
      
      if (hapticEnabled) {
        hapticFeedback.light();
      }
      
      if (newPin.length === pinLength) {
        setTimeout(() => {
          onComplete(newPin);
          if (hapticEnabled) {
            hapticFeedback.success();
          }
        }, 100);
      }
    }
  }, [pin, pinLength, onComplete, hapticEnabled]);

  const handleDelete = useCallback(() => {
    if (pin.length > 0) {
      setPin(pin.slice(0, -1));
      if (hapticEnabled) {
        hapticFeedback.light();
      }
    }
  }, [pin, hapticEnabled]);

  const keyboardLayout = [
    ...keys.slice(0, 9).map((key, index) => ({ key, position: index })),
    { key: '', position: 9 }, // Empty cell
    { key: keys[9], position: 10 }, // '0'
    { key: 'delete', position: 11 },
  ];

  return (
    <PinPadContainer>
      <PinDisplay>
        {Array.from({ length: pinLength }).map((_, index) => (
          <PinDot key={index} $filled={index < pin.length} />
        ))}
      </PinDisplay>
      
      <PinKeyboard>
        {keyboardLayout.map(({ key, position }) => {
          if (key === '') {
            return <div key={position} />;
          }
          
          if (key === 'delete') {
            return (
              <DeleteKey
                key={position}
                onPress={handleDelete}
                activeOpacity={0.7}
                ripple={false}
              >
                ←
              </DeleteKey>
            );
          }
          
          return (
            <PinKey
              key={position}
              onPress={() => handleKeyPress(key)}
              activeOpacity={0.8}
            >
              {key}
            </PinKey>
          );
        })}
      </PinKeyboard>
    </PinPadContainer>
  );
};

// Swipeable Account Card
interface SwipeableAccountCardProps {
  accounts: Array<{ id: string; name: string; balance: number }>;
  onAccountChange?: (accountId: string) => void;
  children: (account: any) => React.ReactNode;
}

const SwipeableContainer = styled.div`
  position: relative;
  width: 100%;
  overflow: hidden;
  touch-action: pan-y;
`;

const SwipeableTrack = styled.div<{ $translateX: number }>`
  display: flex;
  transform: translateX(${props => props.$translateX}px);
  will-change: transform;
`;

const AccountCardWrapper = styled.div`
  width: 100%;
  flex-shrink: 0;
  padding: 0 16px;
`;

const PageIndicator = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 16px;
`;

const PageDot = styled.div<{ $active: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: ${props => props.$active ? tokens.colors.primary : tokens.colors.border.primary};
  transition: background-color 200ms ease-out;
`;

export const SwipeableAccountCard: React.FC<SwipeableAccountCardProps> = ({
  accounts,
  onAccountChange,
  children,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef<{ x: number; timestamp: number } | null>(null);
  const { lock: lockScroll, unlock: unlockScroll } = useScrollLock();

  const handleSwipe = useCallback((direction: 'left' | 'right') => {
    if (direction === 'left' && currentIndex < accounts.length - 1) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      setTranslateX(-newIndex * (containerRef.current?.offsetWidth || 0));
      onAccountChange?.(accounts[newIndex].id);
      hapticFeedback.light();
    } else if (direction === 'right' && currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      setTranslateX(-newIndex * (containerRef.current?.offsetWidth || 0));
      onAccountChange?.(accounts[newIndex].id);
      hapticFeedback.light();
    }
  }, [currentIndex, accounts, onAccountChange]);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = normalizeTouch(e.nativeEvent);
    touchStartRef.current = { x: touch.x, timestamp: touch.timestamp };
    lockScroll();
  }, [lockScroll]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!touchStartRef.current || !containerRef.current) return;

    const touch = normalizeTouch(e.nativeEvent);
    const deltaX = touch.x - touchStartRef.current.x;
    const containerWidth = containerRef.current.offsetWidth;
    
    // Apply resistance at boundaries
    let resistance = 1;
    if ((currentIndex === 0 && deltaX > 0) || 
        (currentIndex === accounts.length - 1 && deltaX < 0)) {
      resistance = 0.3;
    }
    
    setTranslateX(-currentIndex * containerWidth + deltaX * resistance);
  }, [currentIndex, accounts.length]);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (!touchStartRef.current || !containerRef.current) return;

    const touch = normalizeTouch(e.nativeEvent);
    const deltaX = touch.x - touchStartRef.current.x;
    const velocity = calculateVelocity(
      { ...touchStartRef.current, y: 0, identifier: 0 },
      touch
    );

    // Determine if swipe occurred
    if (Math.abs(deltaX) > TOUCH_CONSTANTS.SWIPE_THRESHOLD || 
        Math.abs(velocity.x) > TOUCH_CONSTANTS.SWIPE_VELOCITY_THRESHOLD) {
      const direction = deltaX > 0 ? 'right' : 'left';
      handleSwipe(direction);
    } else {
      // Snap back to current position
      setTranslateX(-currentIndex * containerRef.current.offsetWidth);
    }

    touchStartRef.current = null;
    unlockScroll();
  }, [currentIndex, handleSwipe, unlockScroll]);

  return (
    <>
      <SwipeableContainer
        ref={containerRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <SwipeableTrack $translateX={translateX}>
          {accounts.map((account) => (
            <AccountCardWrapper key={account.id}>
              {children(account)}
            </AccountCardWrapper>
          ))}
        </SwipeableTrack>
      </SwipeableContainer>
      
      <PageIndicator>
        {accounts.map((_, index) => (
          <PageDot key={index} $active={index === currentIndex} />
        ))}
      </PageIndicator>
    </>
  );
};

// Pull to Refresh Component
interface PullToRefreshProps {
  onRefresh: () => Promise<void>;
  children: React.ReactNode;
  threshold?: number;
}

const PullToRefreshContainer = styled.div<{ $pulling: boolean }>`
  position: relative;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior-y: contain;
`;

const RefreshIndicator = styled.div<{ $translateY: number; $isRefreshing: boolean }>`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, ${props => props.$translateY}px);
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${props => props.$translateY > 0 ? 1 : 0};
  transition: opacity 200ms ease-out;
`;

const RefreshSpinner = styled.div<{ $rotation: number; $isRefreshing: boolean }>`
  width: 24px;
  height: 24px;
  border: 2px solid ${tokens.colors.border.primary};
  border-top-color: ${tokens.colors.primary};
  border-radius: 50%;
  transform: rotate(${props => props.$rotation}deg);
  ${props => props.$isRefreshing && `
    animation: spin 1s linear infinite;
  `}
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

export const PullToRefresh: React.FC<PullToRefreshProps> = ({
  onRefresh,
  children,
  threshold = 80,
}) => {
  const [pullDistance, setPullDistance] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const startYRef = useRef<number | null>(null);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (containerRef.current?.scrollTop === 0) {
      const touch = e.touches[0];
      startYRef.current = touch.clientY;
    }
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!startYRef.current || !containerRef.current || isRefreshing) return;
    
    const touch = e.touches[0];
    const deltaY = touch.clientY - startYRef.current;
    
    if (deltaY > 0 && containerRef.current.scrollTop === 0) {
      e.preventDefault();
      
      // Apply resistance
      const resistance = 1 - Math.min(deltaY / (threshold * 3), 0.7);
      setPullDistance(deltaY * resistance);
      
      if (deltaY > threshold) {
        hapticFeedback.light();
      }
    }
  }, [threshold, isRefreshing]);

  const handleTouchEnd = useCallback(async () => {
    if (!startYRef.current) return;
    
    if (pullDistance > threshold && !isRefreshing) {
      setIsRefreshing(true);
      hapticFeedback.medium();
      
      try {
        await onRefresh();
      } finally {
        setIsRefreshing(false);
        setPullDistance(0);
      }
    } else {
      setPullDistance(0);
    }
    
    startYRef.current = null;
  }, [pullDistance, threshold, isRefreshing, onRefresh]);

  return (
    <PullToRefreshContainer
      ref={containerRef}
      $pulling={pullDistance > 0}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <RefreshIndicator
        $translateY={pullDistance - 50}
        $isRefreshing={isRefreshing}
      >
        <RefreshSpinner
          $rotation={pullDistance * 2}
          $isRefreshing={isRefreshing}
        />
      </RefreshIndicator>
      
      <div style={{ transform: `translateY(${pullDistance}px)` }}>
        {children}
      </div>
    </PullToRefreshContainer>
  );
};

// Touch-optimized Number Input
interface TouchNumberInputProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  format?: (value: number) => string;
}

const NumberInputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  user-select: none;
`;

const NumberDisplay = styled.div`
  min-width: 120px;
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  color: ${tokens.colors.text.primary};
`;

const StepButton = styled(Touchable)`
  width: 48px;
  height: 48px;
  border-radius: 24px;
  background-color: ${tokens.colors.primary};
  color: white;
  font-size: 20px;
  font-weight: bold;
`;

export const TouchNumberInput: React.FC<TouchNumberInputProps> = ({
  value,
  onChange,
  min = 0,
  max = Infinity,
  step = 1,
  format = (v) => v.toLocaleString(),
}) => {
  const handleIncrement = useCallback(() => {
    const newValue = Math.min(value + step, max);
    if (newValue !== value) {
      onChange(newValue);
    }
  }, [value, step, max, onChange]);

  const handleDecrement = useCallback(() => {
    const newValue = Math.max(value - step, min);
    if (newValue !== value) {
      onChange(newValue);
    }
  }, [value, step, min, onChange]);

  return (
    <NumberInputContainer>
      <StepButton
        onPress={handleDecrement}
        disabled={value <= min}
        activeOpacity={0.8}
      >
        −
      </StepButton>
      
      <NumberDisplay>{format(value)}</NumberDisplay>
      
      <StepButton
        onPress={handleIncrement}
        disabled={value >= max}
        activeOpacity={0.8}
      >
        +
      </StepButton>
    </NumberInputContainer>
  );
};