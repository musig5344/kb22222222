/**
 * 안정화된 콜백 훅
 * 무한 루프를 방지하고 성능을 최적화하기 위한 유틸리티 훅
 */

import { useCallback, useRef } from 'react';

/**
 * 함수의 참조를 안정화하여 무한 루프를 방지
 * useCallback과 달리 의존성 배열 없이 최신 값을 참조
 */
export const useStableCallback = <T extends (...args: any[]) => any>(fn: T): T => {
  const fnRef = useRef<T>(fn);
  fnRef.current = fn;

  return useCallback(((...args: any[]) => {
    return fnRef.current(...args);
  }) as T, []);
};

/**
 * 디바운싱된 함수 생성
 * 연속적인 호출을 방지하여 성능 최적화
 */
export const useDebouncedCallback = <T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): T => {
  const timeoutRef = useRef<NodeJS.Timeout>();
  const fnRef = useRef<T>(fn);
  fnRef.current = fn;

  return useCallback(((...args: any[]) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      fnRef.current(...args);
    }, delay);
  }) as T, [delay]);
};

/**
 * 쓰로틀링된 함수 생성
 * 일정 시간 간격으로만 함수 실행을 허용
 */
export const useThrottledCallback = <T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): T => {
  const lastCallRef = useRef<number>(0);
  const fnRef = useRef<T>(fn);
  fnRef.current = fn;

  return useCallback(((...args: any[]) => {
    const now = Date.now();
    if (now - lastCallRef.current >= delay) {
      lastCallRef.current = now;
      return fnRef.current(...args);
    }
  }) as T, [delay]);
};

export default useStableCallback;