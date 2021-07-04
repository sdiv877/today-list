import { Card, makeStyles } from '@material-ui/core';
import React from 'react';

import WelcomeText from './WelcomeText';
import NameField from './NameField';

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
            <Card variant="outlined" className={classes.card}>
                <WelcomeText />
                <NameField />
            </Card>
        </div>);
}

export default WelcomeHeaderContainer;