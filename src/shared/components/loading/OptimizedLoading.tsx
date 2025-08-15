import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { tokens } from '../../../styles/tokens';

// 로딩 이미지 import (Type 1 - 17개)
import loading_1_01 from '../../../assets/images/loading/loading_1_01.png';
import loading_1_02 from '../../../assets/images/loading/loading_1_02.png';
import loading_1_03 from '../../../assets/images/loading/loading_1_03.png';
import loading_1_04 from '../../../assets/images/loading/loading_1_04.png';
import loading_1_05 from '../../../assets/images/loading/loading_1_05.png';
import loading_1_06 from '../../../assets/images/loading/loading_1_06.png';
import loading_1_07 from '../../../assets/images/loading/loading_1_07.png';
import loading_1_08 from '../../../assets/images/loading/loading_1_08.png';
import loading_1_09 from '../../../assets/images/loading/loading_1_09.png';
import loading_1_10 from '../../../assets/images/loading/loading_1_10.png';
import loading_1_11 from '../../../assets/images/loading/loading_1_11.png';
import loading_1_12 from '../../../assets/images/loading/loading_1_12.png';
import loading_1_13 from '../../../assets/images/loading/loading_1_13.png';
import loading_1_14 from '../../../assets/images/loading/loading_1_14.png';
import loading_1_15 from '../../../assets/images/loading/loading_1_15.png';
import loading_1_16 from '../../../assets/images/loading/loading_1_16.png';
import loading_1_17 from '../../../assets/images/loading/loading_1_17.png';

// 로딩 이미지 import (Type 2 - 11개)
import loading_2_01 from '../../../assets/images/loading/loading_2_01.png';
import loading_2_02 from '../../../assets/images/loading/loading_2_02.png';
import loading_2_03 from '../../../assets/images/loading/loading_2_03.png';
import loading_2_04 from '../../../assets/images/loading/loading_2_04.png';
import loading_2_05 from '../../../assets/images/loading/loading_2_05.png';
import loading_2_06 from '../../../assets/images/loading/loading_2_06.png';
import loading_2_07 from '../../../assets/images/loading/loading_2_07.png';
import loading_2_08 from '../../../assets/images/loading/loading_2_08.png';
import loading_2_09 from '../../../assets/images/loading/loading_2_09.png';
import loading_2_10 from '../../../assets/images/loading/loading_2_10.png';
import loading_2_11 from '../../../assets/images/loading/loading_2_11.png';
import loading_2_16 from '../../../assets/images/loading/loading_2_16.png';

// 로딩 이미지 배열
const loadingImages1 = [
  loading_1_01, loading_1_02, loading_1_03, loading_1_04, loading_1_05,
  loading_1_06, loading_1_07, loading_1_08, loading_1_09, loading_1_10,
  loading_1_11, loading_1_12, loading_1_13, loading_1_14, loading_1_15,
  loading_1_16, loading_1_17
];

const loadingImages2 = [
  loading_2_01, loading_2_02, loading_2_03, loading_2_04, loading_2_05,
  loading_2_06, loading_2_07, loading_2_08, loading_2_09, loading_2_10,
  loading_2_11, loading_2_16
];

/**
 * 최적화된 로딩 컴포넌트
 * - KB 스타뱅킹 공식 로딩 애니메이션 이미지 사용
 * - loading_1: 기본 로딩 애니메이션
 * - loading_2: 대체 로딩 애니메이션
 */

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  width: 100%;
`;

const LoadingImageContainer = styled.div<{ $size: number }>`
  width: ${props => props.$size}px;
  height: ${props => props.$size}px;
  position: relative;
  margin-bottom: 16px;
`;

const LoadingImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const LoadingText = styled.p`
  margin-top: 16px;
  font-size: 14px;
  color: ${tokens.colors.textSecondary};
`;

interface OptimizedLoadingProps {
  text?: string;
  showLogo?: boolean;
  size?: 'small' | 'medium' | 'large';
  variant?: 'type1' | 'type2';
}

export const OptimizedLoading: React.FC<OptimizedLoadingProps> = ({
  text = '',
  showLogo = true,
  size = 'medium',
  variant = 'type1'
}) => {
  const [currentFrame, setCurrentFrame] = useState(0);
  const images = variant === 'type1' ? loadingImages1 : loadingImages2;
  
  const sizeMap = {
    small: 32,
    medium: 48,
    large: 64
  };
  
  const imageSize = sizeMap[size];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFrame(prev => (prev + 1) % images.length);
    }, 60); // 약 16.7fps
    
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <LoadingContainer>
      {showLogo && (
        <LoadingImageContainer $size={imageSize}>
          <LoadingImage 
            src={images[currentFrame]} 
            alt="Loading"
          />
        </LoadingImageContainer>
      )}
      <LoadingText>
        {text}...
      </LoadingText>
    </LoadingContainer>
  );
};

// 인라인 로딩 (작은 크기)
export const InlineLoading: React.FC<{ text?: string; variant?: 'type1' | 'type2' }> = ({ 
  text, 
  variant = 'type1' 
}) => {
  const [currentFrame, setCurrentFrame] = useState(0);
  const images = variant === 'type1' ? loadingImages1 : loadingImages2;
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFrame(prev => (prev + 1) % images.length);
    }, 60);
    
    return () => clearInterval(interval);
  }, [images.length]);
  
  return (
    <LoadingContainer style={{ minHeight: 'auto', flexDirection: 'row', gap: '8px' }}>
      <LoadingImageContainer $size={16}>
        <LoadingImage 
          src={images[currentFrame]} 
          alt="Loading"
        />
      </LoadingImageContainer>
      {text && <span style={{ fontSize: '14px', color: tokens.colors.textSecondary }}>{text}</span>}
    </LoadingContainer>
  );
};

// 페이지 전체 로딩
export const FullPageLoading: React.FC<{ variant?: 'type1' | 'type2' }> = ({ variant = 'type1' }) => (
  <div style={{
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    zIndex: 9999
  }}>
    <OptimizedLoading size="large" variant={variant} />
  </div>
);

export default OptimizedLoading;