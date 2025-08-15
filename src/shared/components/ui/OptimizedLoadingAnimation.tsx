import React from 'react';
import styled, { keyframes } from 'styled-components';

// KB 스타뱅킹 로딩 애니메이션을 CSS로 구현
const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const pulse = keyframes`
  0%, 100% {
    opacity: 0.3;
    transform: scale(0.8);
  }
  50% {
    opacity: 1;
    transform: scale(1);
  }
`;

const wave = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const LoadingContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.95);
  z-index: 9999;
`;

const LoadingWrapper = styled.div`
  text-align: center;
`;

// 타입 1: 회전하는 원형 로더
const CircularLoader = styled.div`
  width: 60px;
  height: 60px;
  margin: 0 auto 20px;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 50%;
    border: 3px solid #f0f0f0;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 50%;
    border: 3px solid transparent;
    border-top-color: #FFB800;
    animation: ${rotate} 1s linear infinite;
  }
`;

// 타입 2: 점 3개 로더
const DotsLoader = styled.div`
  display: flex;
  gap: 8px;
  justify-content: center;
  margin: 0 auto 20px;
`;

const Dot = styled.div<{ delay: number }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #FFB800;
  animation: ${pulse} 1.4s ease-in-out ${props => props.delay}s infinite;
`;

// 타입 3: 별 모양 로더 (KB 로고 스타일)
const StarLoader = styled.div`
  width: 60px;
  height: 60px;
  margin: 0 auto 20px;
  position: relative;
  
  &::before {
    content: '★';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 40px;
    color: #FFB800;
    animation: ${rotate} 2s linear infinite;
  }
`;

// 타입 4: 막대 웨이브 로더
const BarsLoader = styled.div`
  display: flex;
  gap: 4px;
  justify-content: center;
  align-items: flex-end;
  height: 40px;
  margin: 0 auto 20px;
`;

const Bar = styled.div<{ delay: number }>`
  width: 6px;
  height: 30px;
  background-color: #FFB800;
  animation: ${wave} 1s ease-in-out ${props => props.delay}s infinite;
`;

const LoadingText = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0;
`;

interface OptimizedLoadingAnimationProps {
  type?: 'circular' | 'dots' | 'star' | 'bars';
  text?: string;
  overlay?: boolean;
}

export const OptimizedLoadingAnimation: React.FC<OptimizedLoadingAnimationProps> = ({
  type = 'circular',
  text = '',
  overlay = true
}) => {
  const renderLoader = () => {
    switch (type) {
      case 'dots':
        return (
          <DotsLoader>
            <Dot delay={0} />
            <Dot delay={0.2} />
            <Dot delay={0.4} />
          </DotsLoader>
        );
      case 'star':
        return <StarLoader />;
      case 'bars':
        return (
          <BarsLoader>
            <Bar delay={0} />
            <Bar delay={0.1} />
            <Bar delay={0.2} />
            <Bar delay={0.3} />
            <Bar delay={0.4} />
          </BarsLoader>
        );
      case 'circular':
      default:
        return <CircularLoader />;
    }
  };

  const content = (
    <LoadingWrapper>
      {renderLoader()}
      {text && <LoadingText>{text}</LoadingText>}
    </LoadingWrapper>
  );

  if (overlay) {
    return <LoadingContainer>{content}</LoadingContainer>;
  }

  return content;
};

// 인라인 로딩 스피너 (작은 크기)
const InlineSpinner = styled.span`
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid #f0f0f0;
  border-top-color: #FFB800;
  border-radius: 50%;
  animation: ${rotate} 0.8s linear infinite;
  vertical-align: middle;
  margin: 0 8px;
`;

export const InlineLoading: React.FC<{ text?: string }> = ({ text = '' }) => {
  return (
    <span>
      <InlineSpinner />
      {text && text}
    </span>
  );
};

// 스켈레톤 로더
const shimmer = keyframes`
  0% {
    background-position: -200% center;
  }
  100% {
    background-position: 200% center;
  }
`;

const SkeletonBase = styled.div`
  background: linear-gradient(
    90deg,
    #f0f0f0 25%,
    #e0e0e0 50%,
    #f0f0f0 75%
  );
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite;
  border-radius: 4px;
`;

export const SkeletonLine = styled(SkeletonBase)<{ width?: string; height?: string }>`
  width: ${props => props.width || '100%'};
  height: ${props => props.height || '20px'};
  margin-bottom: 8px;
`;

export const SkeletonCard = styled(SkeletonBase)`
  width: 100%;
  height: 120px;
  margin-bottom: 16px;
  border-radius: 8px;
`;

export const SkeletonCircle = styled(SkeletonBase)<{ size?: string }>`
  width: ${props => props.size || '40px'};
  height: ${props => props.size || '40px'};
  border-radius: 50%;
`;