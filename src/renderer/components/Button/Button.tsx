import React from 'react';

import { StyledButton, StyledLabel } from './Button.styles';

interface Props {
  background?: string;
  foreground?: string;
  type?: 'contained' | 'outlined';
  primary?: boolean;
  secondary?: boolean;
  danger?: boolean;
  success?: boolean;
  dark?: boolean;
  warning?: boolean;
  light?: boolean;
  children?: any;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  style?: any;
}

export const Button = ({
  background,
  foreground,
  type,
  onClick,
  children,
  style,

  primary,
  secondary,
  danger,
  success,
  warning,
  light,
  dark,
}: Props) => (
  <StyledButton
    className="button"
    background={background}
    foreground={foreground}
    type={type}
    onClick={onClick}
    style={style}
    primary={primary}
    secondary={secondary}
    danger={danger}
    success={success}
    warning={warning}
    light={light}
    dark={dark}
  >
    <StyledLabel>{children}</StyledLabel>
  </StyledButton>
);
