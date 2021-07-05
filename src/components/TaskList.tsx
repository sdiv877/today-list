import { Grid, Card, Divider, makeStyles, IconButton } from '@material-ui/core';
import { Check, Delete } from '@material-ui/icons';
import React, { FC } from 'react';

import Task from '../models/Task';
import { getIcon, handleEmptyTaskField, handleEmptyDateField } from '../utils/TaskListHelpers'

import '../styles/TaskList.css'

// Task completion and deletion handlers
function handleCompleteTask(): void {
    console.log('completed');
    // setCompletedList(completedList + completedTask)
}

function handleDeleteTask(): void {
    console.log('deletec');
    // setTaskList(taskList - deleted task)
}

// Card styles
const useStyles = makeStyles({
    title: {
        fontSize: 18,
    },
    date: {
        fontSize: 16,
    },
});

// Needed to let TS know explicitly what is passed from props
interface TaskListProps {
    taskList: Task[],
    setTaskList: React.Dispatch<React.SetStateAction<Task[]>>,
    completedList: Task[],
    setCompletedList: React.Dispatch<React.SetStateAction<Task[]>>,
}

const TaskList: FC<TaskListProps> = (props): JSX.Element => {

    const classes = useStyles();

    return (
        <div>
            {/*Write all the tasks in the list prop by accessing their fields*/}
            {props.taskList.map((task) => (
                <Card className="taskCard" variant="outlined" key={task.id}>

                    <Grid container direction="row" alignItems="center">
                        <Grid item xs={2}>
                            <Grid item className="taskIcon">
                                {getIcon(task.icon)}
                            </Grid>
                        </Grid>

                        <Divider orientation="vertical" flexItem />

                        <Grid item xs={8} container direction="column" alignItems="center">
                            <Grid item className={classes.title}>
                                {handleEmptyTaskField(task.task)}
                            </Grid>

                            <Grid item className={classes.date}>
                                {handleEmptyDateField(task.date)}
                            </Grid>
                        </Grid>

                        <Grid item xs container direction="column" alignItems="center">
                            <Grid item>
                                <IconButton aria-label="complete-task" className="hiddenButton" onClick={() => { handleCompleteTask() }}>
                                    <Check />
                                </IconButton>
                            </Grid>

                            <Grid item>
                                <IconButton aria-label="delete-task" className="hiddenButton" onClick={() => { handleDeleteTask() }}>
                                    <Delete />
                                </IconButton>
                            </Grid>
                        </Grid>

                    </Grid>

                </Card>
            ))}
        </div>
    );
}

export default TaskList;