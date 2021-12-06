import React from 'react';

import { StyledSwitch, Thumb } from './Switch.styles';

interface Props {
  color?: string;
  clickable?: boolean;
  toggled?: boolean;
  dense?: boolean;
  onToggle?: (value: boolean) => void;
}

const Switch = ({ color, clickable, toggled, onToggle, dense }: Props) => {
  return (
    <StyledSwitch
      toggled={toggled}
      color={color}
      clickable={clickable}
      dense={dense}
      onClick={() => onToggle(!toggled)}
    >
      <Thumb dense={dense} activated={toggled} color={color} />
    </StyledSwitch>
  );
};

export default Switch;
