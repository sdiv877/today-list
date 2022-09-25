import React, { FC } from 'react';
import { Button } from '@material-ui/core';

export type SwitchGraphOperation = 'prev' | 'next';

// Props types
interface SwitchGraphButtonProps {
  operation: SwitchGraphOperation;
  setSelectedYear: (operation: SwitchGraphOperation) => void;
  disabled: boolean;
}

const SwitchGraphButton: FC<SwitchGraphButtonProps> = (props): JSX.Element => {
  function handleClick(): void {
    props.setSelectedYear(props.operation);
  }

  return (
    <Button
      variant="outlined"
      style={{ marginLeft: '6px' }}
      disabled={props.disabled}
      onClick={handleClick}
    >
      {props.operation}
    </Button>
  );
};

export default SwitchGraphButton;
