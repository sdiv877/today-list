import { Card, makeStyles } from '@material-ui/core';
import React from 'react';

import WelcomeText from '../text/WelcomeText';
import WelcomeNameField from '../pickers/WelcomeNameField';

const useStyles = makeStyles(() => ({
    card: {
        paddingTop: 4,
        paddingBottom: 12,
    },
}));

const CurrentTasksContainer: React.VoidFunctionComponent = () => {
    const classes = useStyles();

    return (
        <div className="CurrentTasksContainer">
            <Card className={classes.card}>
                <WelcomeText />
                <WelcomeNameField />
            </Card>
        </div>);
}

export default CurrentTasksContainer;