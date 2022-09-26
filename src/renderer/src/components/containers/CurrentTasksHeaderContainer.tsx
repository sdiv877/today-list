import React from 'react';
import { Card, Typography, makeStyles } from '@material-ui/core';

import { UserSettingsContext } from '../../providers/UserSettingsProvider';

import '../../styles/fadeIn.css';

const useStyles = makeStyles(() => ({
  card: {
    paddingTop: 4,
    paddingBottom: 12
  },
  text: {
    fontFamily: 'Montserrat',
    fontSize: 40,
    textAlign: 'center'
  }
}));

const CurrentTasksContainer: React.VoidFunctionComponent = () => {
  const classes = useStyles();
  const userSettingsContext = React.useContext(UserSettingsContext);

  return (
    <div className="CurrentTasksHeaderContainer">
      <Card className={classes.card}>
        <Typography className={classes.text}>
          Welcome back
        </Typography>
        <div className="fadeIn WelcomeNameField">
          <Typography className={classes.text}>
            {userSettingsContext.username}
          </Typography>
        </div>
      </Card>
    </div>
  );
};

export default CurrentTasksContainer;
