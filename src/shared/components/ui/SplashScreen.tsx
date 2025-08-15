import React from 'react';
import styled, { keyframes } from 'styled-components';
import splashBackground from '../../../assets/images/splash_background.png';
import { universalAppContainer } from '../../../styles/universal-responsive';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const SplashContainer = styled.div`
  ${universalAppContainer}
  
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
  /* splash_background.png 이미지 사용 */
  background-image: url(${splashBackground});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  
  /* 부드러운 페이드인 애니메이션 */
  animation: ${fadeIn} 0.8s ease-in;
  
  /* Ensure background scales properly on all screen sizes */
  @media (max-width: 360px) {
    background-size: contain;
    background-color: #FFD338; /* KB yellow as fallback */
  }
  
  /* Large screen optimization */
  @media (min-width: 769px) {
    box-shadow: 0 0 24px rgba(0, 0, 0, 0.12);
  }
`;

export const SplashScreen: React.FC = () => {
  return (
    <SplashContainer />
  );
};