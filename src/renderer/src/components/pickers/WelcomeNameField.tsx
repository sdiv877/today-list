import React from 'react';
import { Typography, makeStyles } from '@material-ui/core';
import '@fontsource/montserrat/500.css';

import { LOG } from '../../../../common/utils/debug';

const useStyles = makeStyles(() => ({
  root: {
    fontSize: 40,
    fontFamily: 'Montserrat',
    paddingTop: 0,
    paddingBottom: 0,
    textAlign: 'center'
  }
}));

const WelcomeNameField: React.VoidFunctionComponent = () => {
  const [username, setUsername] = React.useState('');
  const classes = useStyles();

  React.useEffect(() => {
    LOG('WelcomeNameField useEffect() called');
    window.api.settings.get().then( (userDataRes) => {
        LOG('User data response received from main: ' + JSON.stringify(userDataRes));
        setUsername(userDataRes.username);
    })
  }, []);

  if (username === '') {
    return null;
  } else {
    return (
      <div className="WelcomeNameField">
        <Typography className={classes.root}>{username}</Typography>
      </div>
    );
  }
};

export default WelcomeNameField;
