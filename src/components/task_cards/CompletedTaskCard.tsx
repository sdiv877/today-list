import React, { FC } from 'react';
import { Grid, Card, Divider, makeStyles, IconButton } from '@material-ui/core';
import { Replay } from '@material-ui/icons';

import { getIcon, handleTaskField } from '../../utils/TaskDisplayHelpers'
import { getTaskCardDateString } from '../../utils/dates';

import Task from '../../models/Task'

import '../../styles/TaskCard.css'

// Card styles
const useStyles = makeStyles({
    title: {
        fontSize: 18,
        textDecoration: 'line-through',
    },
    date: {
        fontSize: 16,
        textDecoration: 'line-through',
    },
});

// Props types
interface CompletedTaskCardProps {
    task: Task,
    handleRecoverTask(task: Task): void,
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

                <Grid item xs={8} container direction="column" alignItems="center">
                    <Grid item className={classes.title}>
                        {handleTaskField(props.task.task)}
                    </Grid>

                    <Grid item className={classes.date}>
                        {getTaskCardDateString(props.task.date)}
                    </Grid>
                </Grid>

                <Grid item xs container direction="column" alignItems="center">
                    <Grid item>
                        <IconButton aria-label="complete-task" className="hiddenButton" onClick={() => { props.handleRecoverTask(props.task) }}>
                            <Replay style={{ fontSize: 35 }} />
                        </IconButton>
                    </Grid>
                </Grid>
            </Grid>
        </Card>);
}

export default CompletedTaskCard;