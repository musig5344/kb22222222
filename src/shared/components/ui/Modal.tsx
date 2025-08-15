import React from 'react';
import styled from 'styled-components';
import { tokens } from '../../../styles/tokens';
import iconClose from '../../../assets/images/icons/icon_close.png';
const ModalOverlay = styled.div<{ show: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: ${props => props.show ? 'block' : 'none'};
  z-index: 999;
`;
const ModalContainer = styled.div<{ show: boolean; variant?: 'default' | 'bottom-sheet' }>`
  position: fixed;
  ${props => props.variant === 'bottom-sheet' ? `
    bottom: 0;
    left: 50%;
    transform: translateX(-50%) translateY(${props.show ? '0' : '100%'});
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
    width: 100%;
    max-width: 430px;
  ` : `
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 16px;
    max-width: 430px;
    width: 90%;
  `}
  background: ${tokens.colors.white};
  transition: transform 0.3s ease;
  z-index: 1000;
  padding: 16px;
  padding-bottom: ${props => props.variant === 'bottom-sheet' ? 'calc(16px + env(safe-area-inset-bottom))' : '16px'};
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.15);
  max-height: ${props => props.variant === 'bottom-sheet' ? '50vh' : '60vh'};
  overflow-y: auto;
  ${props => props.variant === 'bottom-sheet' && `
    &::before {
      content: '';
      position: absolute;
      top: 6px;
      left: 50%;
      transform: translateX(-50%);
      width: 32px;
      height: 3px;
      background-color: #e9ecef;
      border-radius: 2px;
    }
  `}
`;
const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;
const ModalTitle = styled.h3`
  font-size: 20px;
  font-weight: 700;
  margin: 0;
  color: #26282c;
  font-family: 'KBFGText', sans-serif;
`;
const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover {
    opacity: 0.7;
  }
`;

const CloseIcon = styled.img`
  width: 24px;
  height: 24px;
  object-fit: contain;
`;
const ModalBody = styled.div`
  margin-bottom: 24px;
`;
const ModalFooter = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`;
interface ModalProps {
  show: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  variant?: 'default' | 'bottom-sheet';
  footer?: React.ReactNode;
  showCloseButton?: boolean;
}
export const Modal: React.FC<ModalProps> = ({
  show,
  onClose,
  title,
  children,
  variant = 'default',
  footer,
  showCloseButton = true
}) => {
  return (
    <>
      <ModalOverlay show={show} onClick={onClose} />
      <ModalContainer show={show} variant={variant}>
        {(title || showCloseButton) && (
          <ModalHeader>
            {title && <ModalTitle>{title}</ModalTitle>}
            {showCloseButton && (
              <CloseButton onClick={onClose}>
                <CloseIcon src={iconClose} alt="닫기" />
              </CloseButton>
            )}
          </ModalHeader>
        )}
        <ModalBody>
          {children}
        </ModalBody>
        {footer && <ModalFooter>{footer}</ModalFooter>}
      </ModalContainer>
    </>
  );
};
export const BottomSheetModal: React.FC<Omit<ModalProps, 'variant'>> = (props) => {
  return <Modal {...props} variant="bottom-sheet" />;
};
export { ModalBody, ModalFooter, ModalHeader, ModalTitle, CloseButton };
export default Modal;