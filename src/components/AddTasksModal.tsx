import React, { FC } from "react";
import FocusTrap from "focus-trap-react";
import { v4 as uuid } from 'uuid';
import { Card, TextField, Button } from "@material-ui/core";

import Task from '../models/Task'
import IconMenu from './IconMenu'

import '../styles/AddTasksModal.css'

// Pass in the taskList and setTaskList props, and add a new item to the list based on what was submitted in the text fields
function handleAdd(taskList: Task[],
  setTaskList: React.Dispatch<React.SetStateAction<Task[]>>,
  submission: Task) {

  // Map needed to clone an array of objects
  const taskListCopy = taskList.map(l => Object.assign({}, l));

  const newList = taskListCopy.concat({ id: uuid(), icon: submission.icon, task: submission.task, date: submission.date });
  setTaskList(newList);
}

// Handle any changes made to state of submission
function handleOnChange(field: string, changedField: string, submission: Task, setSubmission: React.Dispatch<React.SetStateAction<Task>>) {
  const submissionCopy = submission;

  switch (field) {
    case 'task':
      submissionCopy.task = changedField;
      break;
    case 'date':
      submissionCopy.date = changedField;
      break;
    default:
      console.log("State of submission was not changed")
      break;
  }

  setSubmission(submissionCopy);
}

// Props types
interface AddTasksModalProps {
  taskList: Task[],
  setTaskList: React.Dispatch<React.SetStateAction<Task[]>>,
  show: boolean,
  setShow: (show: boolean) => void,
}

// The actual component
const AddTasksModal: FC<AddTasksModalProps> = (props): JSX.Element => {
  // Tracking values submitted in the form
  const initialTask: Task = {
    id: '',
    icon: '',
    task: '',
    date: '',
  }

  const [submission, setSubmission] = React.useState(initialTask);

  // If show is not true, don't return the component
  if (!props.show) {
    return null;
  }

  return (
    <FocusTrap>
      {/* 'modal'represents the gray area outside of the card, while 'dialogCard' represents the actual white part of the dialog.
      In this way if someone clicks on the gray area we want to close the dialog.
      So we add the setShow(false) onClick to 'modal' so that an event can be generated if the gray is clicked. */}
      <div className="modal" onClick={() => {
        props.setShow(false);
        setSubmission(initialTask);
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
                <IconMenu submission={submission} setSubmission={setSubmission} />

                <TextField label="Task" variant="filled" onChange={
                  (event) => {
                    handleOnChange('task', event.target.value, submission, setSubmission)
                  }} />

                <TextField label="Complete by" variant="filled" onChange={
                  (event) => {
                    handleOnChange('date', event.target.value, submission, setSubmission)
                  }} />
              </form>
            </div>

            <div className="modal-footer">
              <Button className="button" onClick={() => { handleAdd(props.taskList, props.setTaskList, submission) }}>
                Submit
              </Button>

              {/*On clicking Cancel, hide the Modal*/}
              <Button className="button" onClick={() => {
                setSubmission(initialTask);
                props.setShow(false);
              }}>
                Cancel
              </Button>
            </div>

          </div>
        </Card>

      </div>
    </FocusTrap>
  );
}

export default AddTasksModal;
