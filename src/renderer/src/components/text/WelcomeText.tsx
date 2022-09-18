import React from 'react';
import { Typography, makeStyles } from '@material-ui/core';
import '@fontsource/montserrat/500.css';

const useStyles = makeStyles(() => ({
  root: {
    fontFamily: 'Montserrat',
    fontSize: 40,
    textAlign: 'center'
  }
}));

const WelcomeText: React.VoidFunctionComponent = () => {
  const classes = useStyles();

  return (
    <div className="WelcomeText">
      <Typography className={classes.root}>Welcome back</Typography>
    </div>
  );
};

export default WelcomeText;
