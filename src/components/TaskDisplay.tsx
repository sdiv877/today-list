import { Grid, Card, Divider, makeStyles, IconButton } from '@material-ui/core';
import { Check, Delete } from '@material-ui/icons';
import React, { FC } from 'react';

import Task from '../models/Task';
import { getIcon, handleEmptyTaskField, handleEmptyDateField } from '../utils/TaskListHelpers'

import '../styles/TaskDisplay.css'

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
interface TaskDisplayProps {
    taskList: Task[],
    setTaskList: React.Dispatch<React.SetStateAction<Task[]>>,
    completedList: Task[],
    setCompletedList: React.Dispatch<React.SetStateAction<Task[]>>,
}

const TaskDisplay: FC<TaskDisplayProps> = (props): JSX.Element => {

    // Task completion and deletion handlers
    function handleCompleteTask(task: Task): void {

        // Map needed to clone an array of objects
        let completedListCopy = props.completedList.map(l => Object.assign({}, l));

        // Copy the task to completedList
        completedListCopy = completedListCopy.concat(task);

        // Delete it from taskList
        handleDeleteTask(task.id);

        console.log('Item added to completed, key ' + task.id);
        props.setCompletedList(completedListCopy)
    }

    function handleDeleteTask(id: string): void {

        // Map needed to clone an array of objects
        const taskListCopy = props.taskList.map(l => Object.assign({}, l));

        for (let i = 0; i < taskListCopy.length; i++) {
            if (taskListCopy[i].id === id) {
                taskListCopy.splice(i, 1);
                break;
            }
        }

        console.log('Deleted item, key: ' + id);
        props.setTaskList(taskListCopy);
    }

    const classes = useStyles();

    // Returned FC
    return (
        <div>
            <br />
            <br />
            Uncompleted section
            <br />
            <br />

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
                                <IconButton aria-label="complete-task" className="hiddenButton" onClick={() => { handleCompleteTask(task) }}>
                                    <Check />
                                </IconButton>
                            </Grid>

                            <Grid item>
                                <IconButton aria-label="delete-task" className="hiddenButton" onClick={() => { handleDeleteTask(task.id) }}>
                                    <Delete />
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Grid>

                </Card>
            ))}

            <br />
            <br />
            Completed section
            <br />
            <br />

            {props.completedList.map((task) => (
                <Card className="taskCard" variant="outlined" key={task.id}>

                    <Grid container direction="row" alignItems="center">
                        <Grid item xs={2}>
                            <Grid item className="taskIcon">
                                {getIcon(task.icon)}
                            </Grid>
                        </Grid>

                        <Divider orientation="vertical" flexItem />

                        <Grid item xs container direction="column" alignItems="center">
                            <Grid item className={classes.title}>
                                {handleEmptyTaskField(task.task)}
                            </Grid>

                            <Grid item className={classes.date}>
                                {handleEmptyDateField(task.date)}
                            </Grid>
                        </Grid>
                    </Grid>

                </Card>
            ))}
        </div>
    );
}

export default TaskDisplay;