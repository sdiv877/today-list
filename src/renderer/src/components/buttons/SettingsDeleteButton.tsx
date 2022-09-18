import React, { FC } from "react";
import { Button } from "@material-ui/core";

interface SettingsDeleteButtonProps {
  show: boolean;
  setShow: (show: boolean) => void;
}

const SettingsDeleteButton: FC<SettingsDeleteButtonProps> = (
  props
): JSX.Element => {
  function handleClick() {
    props.setShow(true);
  }

  return (
    <div>
      <Button
        variant="outlined"
        style={{ color: "crimson", borderColor: "crimson", fontWeight: "bold" }}
        onClick={handleClick}
      >
        Delete all data
      </Button>
    </div>
  );
};

export default SettingsDeleteButton;
