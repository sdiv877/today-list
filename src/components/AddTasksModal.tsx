import React, { FC } from "react";
import { v4 as uuid } from 'uuid';
import { Card, TextField, Button } from "@material-ui/core";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

import Task from '../models/Task'
import IconMenu from './IconMenu'

import '../styles/AddTasksModal.css'
import DateFnsUtils from "@date-io/date-fns";
import { getLogicalDateString } from "../utils/dateHelpers";

// Props types
interface AddTasksModalProps {
  taskList: Task[],
  setTaskList: React.Dispatch<React.SetStateAction<Task[]>>,
  show: boolean,
  setShow: (show: boolean) => void,
}

const AddTasksModal: FC<AddTasksModalProps> = (props): JSX.Element => {
  // Add a new item to the taskList based on what was submitted in the text fields
  const handleAdd = () => {

    // Map needed to clone an array of objects
    const taskListCopy = props.taskList.map(l => Object.assign({}, l));

    const newList = taskListCopy.concat({ id: uuid(), icon: selectedIcon, task: selectedTask, date: getLogicalDateString(selectedDate) });
    props.setTaskList(newList);
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

  // If show is not true, don't return the component
  if (!props.show) {
    return null;
  }

  return (
    <div>
      {/* 'modal'represents the gray area outside of the card, while 'dialogCard' represents the actual white part of the dialog.
        In this way if someone clicks on the gray area we want to close the dialog.
        So we add the setShow(false) onClick to 'modal' so that an event can be generated if the gray is clicked. */}
      <div className="modal" onClick={() => {
        props.setShow(false);
      }}>

        <Card className="dialogCard">
          {/*Stop the event from clicking on modal from reaching other parts of our component (we don't need it anymore).
            Any closing that happens from a click inside the dialogCard should only be due to the cancel button, which already 
            has its own closing logic.*/}
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              Add Tasks
            </div>

            <div className="modal-body">
              <form>
                <IconMenu selectedIcon={selectedIcon} handleIconChange={handleIconChange} />

                <TextField label="Task" variant="filled" value={selectedTask} onChange={
                  (event) => {
                    handleTaskChange(event.target.value)
                  }} />

                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    variant="inline"
                    disableToolbar={true}
                    autoOk={true}
                    value={selectedDate}
                    onChange={(date) => handleDateChange(date)} />
                </MuiPickersUtilsProvider>
              </form>
            </div>

            <div className="modal-footer">
              <Button className="button" onClick={() => { handleAdd() }}>
                Submit
              </Button>

              {/*On clicking Cancel, hide the Modal*/}
              <Button className="button" onClick={() => {
                props.setShow(false);
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
