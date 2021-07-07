import React, { FC } from 'react';
import { Grid, Card, Divider, makeStyles } from '@material-ui/core';

import { getIcon, handleTaskField } from '../utils/TaskDisplayHelpers'
import { getTaskCardDateString } from '../utils/dates';

import Task from '../models/Task'

import '../styles/TaskCard.css'

// Card styles
const useStyles = makeStyles({
    title: {
        fontSize: 18,
    },
    date: {
        fontSize: 16,
    },
});

// Props types
interface CompletedTaskCardProps {
    task: Task,
}

const CompletedTaskCard: FC<CompletedTaskCardProps> = (props): JSX.Element => {

    const classes = useStyles();

    return (
        <Card className="taskCard" variant="outlined">

            <Grid container direction="row" alignItems="center">
                <Grid item xs={2}>
                    <Grid item className="taskIcon">
                        {getIcon(props.task.icon)}
                    </Grid>
                </Grid>

                <Divider orientation="vertical" flexItem />

                <Grid item xs container direction="column" alignItems="center">
                    <Grid item className={classes.title}>
                        {handleTaskField(props.task.task)}
                    </Grid>

                    <Grid item className={classes.date}>
                        {getTaskCardDateString(props.task.date)}
                    </Grid>
                </Grid>
            </Grid>

        </Card>);
}

export default CompletedTaskCard;