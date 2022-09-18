import React, { FC } from "react";
import { Button } from "@material-ui/core";

import "../../styles/SettingsSaveButton.css";

// Props types
interface SettingsSaveButtonProps {
  buttonColour: string;
  submitUserData: () => void;
  disabled: boolean;
  setDisabled: (disabled: boolean) => void;
}

const SettingsSaveButton: FC<SettingsSaveButtonProps> = (
  props
): JSX.Element => {
  function handleClick(): void {
    props.submitUserData();
    props.setDisabled(true);
  }

  return (
    <div className="settingsSaveButton">
      <Button
        style={{ backgroundColor: props.buttonColour, color: "white" }}
        variant="contained"
        disabled={props.disabled}
        onClick={handleClick}
      >
        Save
      </Button>
    </div>
  );
};

export default SettingsSaveButton;
