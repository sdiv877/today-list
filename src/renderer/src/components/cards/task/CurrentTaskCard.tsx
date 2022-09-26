import React, { FC } from 'react';
import { Card, Divider, Grid, IconButton, makeStyles } from '@material-ui/core';
import { Check, Delete } from '@material-ui/icons';

import { Task } from '../../../../../common/models/task.model';
import { getTaskCardDateString } from '../../../../../common/utils/dates';
import { TaskIconUtil } from '../../../utils/icon-helpers';
import { handleTaskField } from '../../../utils/task-display-helpers';

import '../../../styles/TaskCard.css';

// Card styles
const useStyles = makeStyles({
  title: {
    fontSize: 18
  },
  date: {
    fontSize: 16
  }
});

// Props types
interface CurrentTaskCardProps {
  task: Task;
  handleCompleteTask(task: Task): void;
  handleDeleteTask(task: Task): void;
}

const CurrentTaskCard: FC<CurrentTaskCardProps> = (props): JSX.Element => {
  const classes = useStyles();

  return (
    <Card className="taskCard" variant="outlined">
      <Grid container direction="row" alignItems="center">
        <Grid item xs={2}>
          <Grid item className="taskIcon">
            {TaskIconUtil.getIcon(props.task.icon)}
          </Grid>
        </Grid>

        <Divider orientation="vertical" flexItem />

        <Grid item xs={8} container direction="column" alignItems="center">
          <Grid item className={classes.title}>
            {handleTaskField(props.task.description)}
          </Grid>

          <Grid item className={classes.date}>
            {getTaskCardDateString(props.task.dueDate)}
          </Grid>
        </Grid>

        <Grid item xs container direction="column" alignItems="center">
          <Grid item>
            <IconButton
              aria-label="complete-task"
              className="hiddenButton"
              onClick={() => {
                props.handleCompleteTask(props.task);
              }}
            >
              <Check />
            </IconButton>
          </Grid>

          <Grid item>
            <IconButton
              aria-label="delete-task"
              className="hiddenButton"
              onClick={() => {
                props.handleDeleteTask(props.task);
              }}
            >
              <Delete />
            </IconButton>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};

export default CurrentTaskCard;
