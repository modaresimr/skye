import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dialog } from '@headlessui/react';
import React, { useState } from 'react';
import { FC } from 'react';
import styled from 'styled-components';

export const StyledCard = styled.div`
  border-radius: 12px;
  padding: 1.8rem;
  height: 130px;
  background-image: linear-gradient(90deg, #000000 0%, #161616 100%);
  border: 1px solid #2b2b2b;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 4px 0 rgba(15, 15, 15, 0.5);
`;

export const StyledTitle = styled.h1`
  font-size: 0.9rem;
  font-weight: 600;
  margin: 0;
`;

export const StyledSubtitle = styled.h2`
  font-weight: 400;
  font-size: 0.8rem;
  opacity: 0.8;
  margin-bottom: 0;
  margin-top: 5px;
`;

export const StyledIcon = styled(FontAwesomeIcon)`
  margin-top: auto;
  margin-right: auto;
  font-size: 1rem;
`;

const StyledModalBody = styled.div`
  display: inline-block;
  align-items: bottom;
  background: ${({ theme }) => theme.backgroundColor};
  width: 400px;
  z-index: 11;
  padding: 2rem;
  border-radius: 13px;
  h2 {
    margin: 0;
    margin-bottom: 0.5rem;
    font-size: 1.2rem;
  }
  p {
    margin: 0;
    font-size: 0.9rem;
    margin-bottom: 1rem;
  }
`;

const StyledModal = styled.div`
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
`;

const StyledModalOverlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  z-index: 10;
  background: rgba(49, 49, 49, 0.5);
`;

const StyledSpan = styled.span`
  display: hidden;
`;
const Modal: FC<{
  open: boolean;
  onClose: () => void;
}> = ({ open, onClose, children }) => {
  return (
    <Dialog
      as="div"
      style={{
        position: 'fixed',
        zIndex: 10,
        inset: 0,
        overflowY: 'auto',
      }}
      open={open}
      onClose={() => onClose()}
    >
      <StyledModal>
        <StyledModalOverlay onClick={() => onClose()}>
          <Dialog.Overlay />
        </StyledModalOverlay>
        <StyledSpan aria-hidden="true">&#8203;</StyledSpan>

        <StyledModalBody>{children}</StyledModalBody>
      </StyledModal>
    </Dialog>
  );
};

const Card: FC<{
  title: string;
  subtitle?: string;
  icon?: IconProp;
}> = ({ title, subtitle, icon, children }) => {
  const [opened, setOpened] = useState(false);
  return (
    <StyledCard onClick={() => setOpened(true)}>
      {children && (
        <Modal open={opened} onClose={() => setOpened(false)}>
          {children}
        </Modal>
      )}
      <StyledTitle>{title}</StyledTitle>
      {subtitle && <StyledSubtitle>{subtitle}</StyledSubtitle>}
      {icon && <StyledIcon icon={icon} />}
    </StyledCard>
  );
};

export default Card;
