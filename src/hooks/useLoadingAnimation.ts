import { useState, useEffect } from 'react';

// KB 스타뱅킹 로딩 이미지들을 한 곳에서 import
import loading_1_01 from '../assets/images/loading/loading_1_01.png';
import loading_1_02 from '../assets/images/loading/loading_1_02.png';
import loading_1_03 from '../assets/images/loading/loading_1_03.png';
import loading_1_04 from '../assets/images/loading/loading_1_04.png';
import loading_1_05 from '../assets/images/loading/loading_1_05.png';
import loading_1_06 from '../assets/images/loading/loading_1_06.png';
import loading_1_07 from '../assets/images/loading/loading_1_07.png';
import loading_1_08 from '../assets/images/loading/loading_1_08.png';
import loading_1_09 from '../assets/images/loading/loading_1_09.png';
import loading_1_10 from '../assets/images/loading/loading_1_10.png';
import loading_1_11 from '../assets/images/loading/loading_1_11.png';
import loading_1_12 from '../assets/images/loading/loading_1_12.png';
import loading_1_13 from '../assets/images/loading/loading_1_13.png';
import loading_1_14 from '../assets/images/loading/loading_1_14.png';
import loading_1_15 from '../assets/images/loading/loading_1_15.png';
import loading_1_16 from '../assets/images/loading/loading_1_16.png';
import loading_1_17 from '../assets/images/loading/loading_1_17.png';

import loading_2_01 from '../assets/images/loading/loading_2_01.png';
import loading_2_02 from '../assets/images/loading/loading_2_02.png';
import loading_2_03 from '../assets/images/loading/loading_2_03.png';
import loading_2_04 from '../assets/images/loading/loading_2_04.png';
import loading_2_05 from '../assets/images/loading/loading_2_05.png';
import loading_2_06 from '../assets/images/loading/loading_2_06.png';
import loading_2_07 from '../assets/images/loading/loading_2_07.png';
import loading_2_08 from '../assets/images/loading/loading_2_08.png';
import loading_2_09 from '../assets/images/loading/loading_2_09.png';
import loading_2_10 from '../assets/images/loading/loading_2_10.png';
import loading_2_11 from '../assets/images/loading/loading_2_11.png';
import loading_2_16 from '../assets/images/loading/loading_2_16.png';

// 로딩 이미지 배열 정의 - 고정된 경로 사용
export const LOADING_FRAMES = {
  type1: [
    loading_1_01, loading_1_02, loading_1_03, loading_1_04, loading_1_05,
    loading_1_06, loading_1_07, loading_1_08, loading_1_09, loading_1_10,
    loading_1_11, loading_1_12, loading_1_13, loading_1_14, loading_1_15,
    loading_1_16, loading_1_17
  ],
  type2: [
    loading_2_01, loading_2_02, loading_2_03, loading_2_04, loading_2_05,
    loading_2_06, loading_2_07, loading_2_08, loading_2_09, loading_2_10,
    loading_2_11, loading_2_16
  ],
  type3: [
    loading_2_01, loading_2_02, loading_2_03, loading_2_04, loading_2_05,
    loading_2_06, loading_2_07, loading_2_08, loading_2_09, loading_2_10,
    loading_2_11, loading_2_16
  ]
} as const;

export type LoadingAnimationType = keyof typeof LOADING_FRAMES;

interface UseLoadingAnimationOptions {
  type?: LoadingAnimationType;
  frameRate?: number; // milliseconds per frame
  autoStart?: boolean;
}

/**
 * KB 스타뱅킹 통합 로딩 애니메이션 훅
 * 모든 로딩 컴포넌트에서 공통으로 사용
 */
export const useLoadingAnimation = (options: UseLoadingAnimationOptions = {}) => {
  const {
    type = 'type1',
    frameRate = 60, // 60ms per frame for smooth animation
    autoStart = true
  } = options;

  const [currentFrame, setCurrentFrame] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoStart);

  const frames = LOADING_FRAMES[type];

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentFrame(prev => (prev + 1) % frames.length);
    }, frameRate);

    return () => clearInterval(interval);
  }, [frames.length, frameRate, isPlaying]);

  return {
    currentFrame: frames[currentFrame],
    frameIndex: currentFrame,
    totalFrames: frames.length,
    isPlaying,
    play: () => setIsPlaying(true),
    pause: () => setIsPlaying(false),
    reset: () => setCurrentFrame(0)
  };
};