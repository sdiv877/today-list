import { Card, makeStyles } from '@material-ui/core';
import React from 'react';

import WelcomeText from '../WelcomeText';
import NameField from '../WelcomeName';

const useStyles = makeStyles(() => ({
    card: {
        paddingTop: 4,
        paddingBottom: 12,
    },
  }));

const WelcomeHeaderContainer: React.VoidFunctionComponent = () => {
    const classes = useStyles();

    return (
        <div className="WelcomeHeaderContainer">
            <Card className={classes.card}>
                <WelcomeText />
                <NameField />
            </Card>
        </div>);
}

export default WelcomeHeaderContainer;