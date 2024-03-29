import React, { FC } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField
} from '@material-ui/core';

import DateTimePicker from '../pickers/DateTimePicker';
import IconMenu from '../pickers/IconMenu';

import {
  Task,
  NewTask,
  TaskStatus
} from '../../../../common/models/task.model';
import { TaskIcon, TaskIconUtil } from '../../utils/icon-helpers';
import { sortTaskList } from '../../utils/task-display-helpers';
import { getCurrentDate } from '../../../../common/utils/dates';

import '../../styles/AddTasksModal.css';

// Props types
interface AddTasksModalProps {
  currentTaskList: Task[];
  setCurrentTaskList: React.Dispatch<React.SetStateAction<Task[]>>;
  show: boolean;
  setShow: (show: boolean) => void;
  buttonColour: string;
}

const AddTasksModal: FC<AddTasksModalProps> = (props): JSX.Element => {
  // tracks the icon selected
  const [selectedIcon, setSelectedIcon] = React.useState<TaskIcon>('create');
  const handleIconChange = (icon: TaskIcon) => {
    setSelectedIcon(icon);
  };
  // tracks the task written
  const [selectedTask, setSelectedTask] = React.useState('');
  const handleTaskChange = (task: string | null) => {
    setSelectedTask(task);
  };
  // tracks the date selected
  const [selectedDate, setSelectedDate] = React.useState(getCurrentDate());
  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  /**
   * Add a new item to the taskList based on what was submitted in the text fields
   */
  const handleAdd = () => {
    const newTask: NewTask = {
      icon: TaskIconUtil.valueOf(selectedIcon),
      description: selectedTask,
      status: TaskStatus.InProgress,
      dueDate: selectedDate
    };
    // clone the current list of tasks
    let taskListCopy = props.currentTaskList.map((l) => Object.assign({}, l));
    // add the task to the db
    window.api.task.create(newTask).then((storedTask) => {
      // add the new task to react state and sort the list
      taskListCopy.push(storedTask);
      taskListCopy = sortTaskList(taskListCopy);
      props.setCurrentTaskList(taskListCopy);
      window.ipcRendererManager.LOG('Created new task, ' + newTask);
      // scroll to the bottom of the page so the user can see their new task
      // 500ms is the time for a card's fade transition
      setTimeout(() => {
        scrollToBottom();
      }, 100);
    });
  };

  /**
   * Allows submission of conent in the modal to be done with the enter key.
   */
  function handleKeyPress(event: React.KeyboardEvent) {
    if (event.key === 'Enter') {
      handleAdd();
    }
  }

  function scrollToBottom() {
    window.scroll({
        top: document.body.scrollHeight,
        left: 0,
        behavior: 'smooth',
    });
  }

  /**
   * Clears states of all input fields.
   */
  function clearStates() {
    setSelectedIcon('create');
    setSelectedTask('');
    setSelectedDate(getCurrentDate());
  }

  function handleClose() {
    props.setShow(false);
    clearStates();
  }

  // if show is not true, don't return the component
  if (!props.show) {
    return null;
  }
  return (
    <div>
      <Dialog
        className="modal"
        onClose={handleClose}
        open={props.show}
        onKeyPress={(event) => {
          handleKeyPress(event);
        }}
      >
        <DialogTitle className="modal-title">Add Tasks</DialogTitle>
        <DialogContent
          className="modal-content"
          dividers
          style={{ paddingBottom: '40px' }}
        >
          <Grid
            container
            className="formGridContainer"
            direction="column"
            spacing={4}
            alignItems="center"
          >
            <Grid item>
              <IconMenu
                selectedIcon={selectedIcon}
                handleIconChange={handleIconChange}
              />
            </Grid>
            <Grid item>
              <TextField
                label="Task"
                fullWidth
                style={{ minWidth: '425px' }}
                value={selectedTask}
                onChange={(event) => {
                  handleTaskChange(event.target.value);
                }}
              />
            </Grid>
            <Grid item>
              <DateTimePicker
                selectedDate={selectedDate}
                handleDateChange={handleDateChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions
          className="modal-footer"
          style={{
            paddingTop: '15px',
            paddingBottom: '15px',
            paddingRight: '15px'
          }}
        >
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            variant="contained"
            style={{ backgroundColor: props.buttonColour, color: 'white' }}
            onClick={handleAdd}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddTasksModal;
