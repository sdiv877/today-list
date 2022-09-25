import React from 'react';
import { Card, Typography, makeStyles } from '@material-ui/core';

import { LOG } from '../../../../common/utils/debug';

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
  const [username, setUsername] = React.useState('');
  const classes = useStyles();

  React.useEffect(() => {
    LOG('CurrentTasksHeaderContainer useEffect() called');
    window.api.settings.get().then( (userDataRes) => {
        LOG('User data response received from main: ' + JSON.stringify(userDataRes));
        setUsername(userDataRes.username);
    })
  }, []);

  return (
    <div className="CurrentTasksHeaderContainer">
      <Card className={classes.card}>
        <Typography className={classes.text}>
          Welcome back
        </Typography>
        <div className="fadeIn WelcomeNameField">
          <Typography className={classes.text}>
            {username}
          </Typography>
        </div>
      </Card>
    </div>
  );
};

export default CurrentTasksContainer;
