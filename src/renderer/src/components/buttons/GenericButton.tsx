import React, { FC } from 'react';
import { Button } from '@material-ui/core';

// Props types
interface GenericButtonProps {
  label: string;
  style: React.CSSProperties;
  variant: "text" | "outlined" | "contained";
  disabled: boolean;
  className?: string;
  onClick: () => void;
}

const GenericButton: FC<GenericButtonProps> = (props): JSX.Element => {
  return (
    <div className={props.className ?? "GenericButton"}>
      <Button
        style={props.style}
        variant={props.variant}
        disabled={props.disabled}
        onClick={props.onClick}
      >
        {props.label}
      </Button>
    </div>
  );
};

export default GenericButton;
