import React, { FC } from "react";
import { v4 as uuid } from 'uuid';
import { Card, Grid, TextField, Button } from "@material-ui/core";
import { KeyboardDateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

import Task from '../models/Task'
import IconMenu from './IconMenu'

import '../styles/AddTasksModal.css'
import DateFnsUtils from "@date-io/date-fns";

// Props types
interface AddTasksModalProps {
  currentList: Task[],
  setCurrentList: React.Dispatch<React.SetStateAction<Task[]>>,
  show: boolean,
  setShow: (show: boolean) => void,
}

const AddTasksModal: FC<AddTasksModalProps> = (props): JSX.Element => {
  // Add a new item to the taskList based on what was submitted in the text fields
  const handleAdd = () => {

    const newTask: Task = { id: uuid(), icon: selectedIcon, task: selectedTask, date: selectedDate };

    // Map needed to clone an array of objects
    let taskListCopy = props.currentList.map(l => Object.assign({}, l));

    // Add to react state
    taskListCopy = taskListCopy.concat(newTask);
    props.setCurrentList(taskListCopy);

    // And add it to the local db
    window.api.addToCurrentList(newTask)
  }

  // Tracking icon selected
  const [selectedIcon, setSelectedIcon] = React.useState('');

  const handleIconChange = (icon: string | null) => {
    setSelectedIcon(icon);
  };

  // Tracking task written
  const [selectedTask, setSelectedTask] = React.useState('');

  const handleTaskChange = (task: string | null) => {
    setSelectedTask(task);
  };

  // Tracking date selected
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  // Clear states of all input fields upon closing the window
  function clearStates() {

    setSelectedIcon('');
    setSelectedTask('');
    setSelectedDate(new Date());
  }

  // If show is not true, don't return the component
  if (!props.show) {
    return null;
  }

  return (
    <div>
      {/* 'modal'represents the gray area outside of the card, while 'dialogCard' represents the actual white part of the dialog.
        In this way if someone clicks on the gray area we want to close the dialog.
        So we add the setShow(false) onClick to 'modal' so that the modal is closed if the gray is clicked. */}
      <div className="modal" onClick={() => {
        props.setShow(false);
        clearStates();
      }}>

        <Card className="dialogCard">
          {/*Clicking on the gray above causes an event we don't want reaching other parts of our component (we don't need it anymore).
            Any closing that happens from a click inside the dialogCard should only be due to the cancel button, which already 
            has its own closing logic.*/}
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              Add Tasks
            </div>

            <div className="modal-body"> {/*The actual input fields*/}
              <Grid container className="formGridContainer" direction="column" spacing={3} alignItems="center">
                <Grid item>
                  <IconMenu selectedIcon={selectedIcon} handleIconChange={handleIconChange} />
                </Grid>

                <Grid item>
                  <TextField label="Task" fullWidth style={{ minWidth: "350px" }} value={selectedTask} onChange={
                    (event) => {
                      handleTaskChange(event.target.value)
                    }} />
                </Grid>

                <Grid item>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDateTimePicker
                      variant="inline"
                      ampm={false}
                      disablePast
                      style={{ minWidth: "350px" }}
                      autoOk={true}
                      value={selectedDate}
                      onChange={(date) => handleDateChange(date)} />
                  </MuiPickersUtilsProvider>
                </Grid>
              </Grid>
            </div>

            <div className="modal-footer"> {/*Submit and cancel buttons*/}
              <Button className="button" onClick={() => { handleAdd() }}>
                Submit
              </Button>

              {/*On clicking Cancel, hide the Modal*/}
              <Button className="button" onClick={() => {
                props.setShow(false);
                clearStates();
              }}>
                Cancel
              </Button>
            </div>

          </div>
        </Card>

      </div>
    </div>
  );
}

export default AddTasksModal;
