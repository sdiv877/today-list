import { Grid, Card, Divider, makeStyles } from '@material-ui/core';
import React, { FC } from 'react';

import Task from '../models/Task';
import { getIcon, handleEmptyTaskField, handleEmptyDateField } from '../utils/TaskListHelpers'

import '../styles/TaskList.css'

// Card styles
const useStyles = makeStyles({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 18,
    },
    pos: {
        marginBottom: 12,
    },
});

// Needed to let TS know explicitly what is passed from props
interface TaskListProps {
    list: Task[],
    setList: React.Dispatch<React.SetStateAction<Task[]>>,
}

const TaskList: FC<TaskListProps> = (props): JSX.Element => {

    const classes = useStyles();

    return (
        <div>
            {/*Write all the tasks in the list prop by accessing their fields*/}
            {props.list.map((task) => (
                <Card className="taskCard" variant="outlined" key={task.id}>

                    <Grid container direction="row" alignItems="center">
                        <Grid item xs={2}>
                            <Grid item className="taskIcon">
                                {getIcon(task.icon)}
                            </Grid>
                        </Grid>

                        <Divider orientation="vertical" flexItem />

                        <Grid item xs container direction="column" alignItems="center">
                            <Grid item xs={5} className={classes.title}>
                                {handleEmptyTaskField(task.task)}
                            </Grid>

                            <Grid item xs={5} className="taskDate">
                                {handleEmptyDateField(task.date)}
                            </Grid>

                            {/* <Grid item xs={3}>
                                {task.id}
                            </Grid> */}
                        </Grid>
                    </Grid>

                </Card>
            ))}
        </div>
    );
}

export default TaskList;