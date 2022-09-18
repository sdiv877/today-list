import React from 'react';
import { Card, makeStyles } from '@material-ui/core';

import WelcomeNameField from '../pickers/WelcomeNameField';
import WelcomeText from '../text/WelcomeText';

import '../../styles/fadeIn.css';

const useStyles = makeStyles(() => ({
  card: {
    paddingTop: 4,
    paddingBottom: 12
  }
}));

const CurrentTasksContainer: React.VoidFunctionComponent = () => {
  const classes = useStyles();

  return (
    <div className="CurrentTasksContainer">
      <Card className={classes.card}>
        <WelcomeText />
        <div className="fadeIn">
          <WelcomeNameField />
        </div>
      </Card>
    </div>
  );
};

export default CurrentTasksContainer;
