import React, { FC } from "react";

import { Fab, makeStyles } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";

// Props types
interface AddTasksFabProps {
  setShow: (show: boolean) => void;
  buttonColour: string;
}

const useStyles = makeStyles(() => ({
  root: {
    margin: 0,
    top: "auto",
    right: "5vmin",
    bottom: "10vmin",
    left: "auto",
    position: "fixed",
  },
}));

const AddTasksFab: FC<AddTasksFabProps> = (props): JSX.Element => {
  const classes = useStyles();

  return (
    <Fab
      color="primary"
      aria-label="add"
      className={classes.root}
      style={{ backgroundColor: props.buttonColour }}
      onClick={() => {
        props.setShow(true);
      }}
    >
      <AddIcon />
    </Fab>
  );
};

export default AddTasksFab;
