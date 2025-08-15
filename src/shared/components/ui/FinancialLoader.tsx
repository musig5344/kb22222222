import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useLoadingAnimation } from '../../../hooks/useLoadingAnimation';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const LoaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #ffffff;
  animation: ${fadeIn} 0.3s ease;
`;

const LoadingImage = styled.img`
  width: 100px;
  height: 100px;
  margin-bottom: 24px;
`;

const LoadingText = styled.p`
  color: #666666;
  font-size: 14px;
  margin: 0;
`;

interface FinancialLoaderProps {
  message?: string;
}

export const FinancialLoader: React.FC<FinancialLoaderProps> = ({ message = '잠시만 기다려주세요' }) => {
  const { currentFrame } = useLoadingAnimation({ type: 'type1', frameRate: 60 });

  return (
    <LoaderContainer>
      <LoadingImage src={currentFrame} alt="로딩 중" />
      <LoadingText>{message}</LoadingText>
    </LoaderContainer>
  );
};