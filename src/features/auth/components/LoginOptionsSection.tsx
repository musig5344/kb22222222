import React from 'react';
import LoginFingerprintIcon from '../../../assets/images/icons/login_fingerprint_icon.png';
import LoginLookIcon from '../../../assets/images/icons/login_look_icon.png';
import styled from 'styled-components';
import {
  LoginOptionsContainer,
  LoginOptionButton,
  IconImage,
  IconContainer,
  LoginOptionText
} from './LoginScreen.styles';

const BiometricContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;                 /* Remove gap, use precise margins */
  padding: 0;
  margin-bottom: 48px;    /* Exact spacing from original */
`;

const IconsRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 80px;              /* Precise spacing from original */
  padding: 0 40px;        /* Side padding for touch targets */
`;

const BiometricButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;          /* Larger touch target */
  margin: 0;
  border-radius: 20px;    /* Rounded touch area */
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  min-width: 100px;       /* Minimum touch target */
  min-height: 100px;
  position: relative;
  
  /* Touch feedback */
  &:hover {
    transform: scale(1.05);
    background-color: rgba(255, 191, 0, 0.1);
  }
  
  &:active {
    transform: scale(0.98);
    background-color: rgba(255, 191, 0, 0.2);
  }
  
  /* Focus state for accessibility */
  &:focus {
    outline: 3px solid rgba(255, 191, 0, 0.5);
    outline-offset: 2px;
  }
`;

const CenteredText = styled.div`
  text-align: center;
  font-family: 'KBFGText', -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 16px;
  font-weight: 500;
  color: #333;
  line-height: 1.4;
  margin-top: 8px;
`;

interface LoginOptionsSectionProps {
  onBiometricAuth: (type: 'fingerprint' | 'pattern') => void;
}

export const LoginOptionsSection: React.FC<LoginOptionsSectionProps> = ({
  onBiometricAuth
}) => {
  return (
    <BiometricContainer role="group" aria-label="생체 인증 방법 선택">
      <IconsRow>
        <BiometricButton 
          onClick={() => onBiometricAuth('fingerprint')}
          aria-label="지문 인증으로 로그인"
          type="button"
        >
          <IconContainer role="img" aria-hidden="true">
            <IconImage 
              src={LoginFingerprintIcon} 
              alt="" 
              aria-hidden="true"
            />
          </IconContainer>
        </BiometricButton>
        
        <BiometricButton 
          onClick={() => onBiometricAuth('pattern')}
          aria-label="패턴 인증으로 로그인"
          type="button"
        >
          <IconContainer role="img" aria-hidden="true">
            <IconImage 
              src={LoginLookIcon} 
              alt="" 
              aria-hidden="true"
            />
          </IconContainer>
        </BiometricButton>
      </IconsRow>
      
    </BiometricContainer>
  );
};