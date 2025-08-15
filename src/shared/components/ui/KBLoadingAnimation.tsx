import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

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

// 로딩 이미지 배열
const loadingFrames = [
  loading_1_01, loading_1_02, loading_1_03, loading_1_04, loading_1_05,
  loading_1_06, loading_1_07, loading_1_08, loading_1_09, loading_1_10,
  loading_1_11, loading_1_12, loading_1_13, loading_1_14, loading_1_15,
  loading_1_16, loading_1_17
];

interface KBLoadingAnimationProps {
  size?: number;
  className?: string;
}

const AnimationContainer = styled.div<{ size: number }>`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const FrameImage = styled.img<{ size: number }>`
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  object-fit: contain;
  position: absolute;
  top: 0;
  left: 0;
`;

/**
 * KB 스타뱅킹 원본 17프레임 로딩 애니메이션
 * 60fps로 재생되는 정확한 프레임 애니메이션
 */
export const KBLoadingAnimation: React.FC<KBLoadingAnimationProps> = ({ 
  size = 60, 
  className 
}) => {
  const [currentFrame, setCurrentFrame] = useState(0);
  const frameDelay = 58.8; // 1000ms / 17 frames ≈ 58.8ms per frame for 60fps feel
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFrame(prev => (prev + 1) % loadingFrames.length);
    }, frameDelay);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <AnimationContainer size={size} className={className}>
      <FrameImage 
        src={loadingFrames[currentFrame]}
        alt={`Loading frame ${currentFrame + 1}`}
        size={size}
      />
    </AnimationContainer>
  );
};

/**
 * 사용 예시:
 * 
 * // 기본 크기 (60px)
 * <KBLoadingAnimation />
 * 
 * // 커스텀 크기
 * <KBLoadingAnimation size={80} />
 * 
 * // CSS 클래스 적용
 * <KBLoadingAnimation className="my-loading" size={100} />
 */
export default KBLoadingAnimation;