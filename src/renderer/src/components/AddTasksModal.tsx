import React, { FC } from 'react';
import { Button, Grid, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';

import IconMenu from './pickers/IconMenu';
import DateTimePicker from './pickers/DateTimePicker';

import { sortTaskList } from '../utils/TaskDisplayHelpers';

import { ApiTask } from "../../../common/models/Task";

import '../styles/AddTasksModal.css'

// Props types
interface AddTasksModalProps {
    currentList: ApiTask[],
    setCurrentList: React.Dispatch<React.SetStateAction<ApiTask[]>>,
    show: boolean,
    setShow: (show: boolean) => void,
    buttonColour: string,
}

const AddTasksModal: FC<AddTasksModalProps> = (props): JSX.Element => {
    // Tracks the icon selected
    const [selectedIcon, setSelectedIcon] = React.useState('');
    const handleIconChange = (icon: string | null) => {
        setSelectedIcon(icon);
    };
    // Tracks the task written
    const [selectedTask, setSelectedTask] = React.useState('');
    const handleTaskChange = (task: string | null) => {
        setSelectedTask(task);
    };
    // Tracks the date selected
    const [selectedDate, setSelectedDate] = React.useState(new Date());
    const handleDateChange = (date: Date | null) => {
        setSelectedDate(date);
    };

    /**
     * Add a new item to the taskList based on what was submitted in the text fields
     */
    const handleAdd = () => {
        const newTask: ApiTask = { icon: selectedIcon, description: selectedTask, dueDate: selectedDate };
        // clone the current list of tasks
        let taskListCopy = props.currentList.map(l => Object.assign({}, l));
        // sort list and add the new task to react state
        taskListCopy = taskListCopy.concat(newTask);
        taskListCopy = sortTaskList(taskListCopy) as ApiTask[]; // TODO: remove 'as'
        props.setCurrentList(taskListCopy);
        // and add the tasks to the db
        // window.database.addToTable('current_tasks', newTask)
        // scroll to the bottom of the page so the user can see their new task
        // 500ms is the time for a card's fade transition
        setTimeout(() => { scrollToBottom() }, 100);
    }

    /**
     * Allows submission of conent in the modal to be done with the enter key.
     */
    function handleKeyPress(event: React.KeyboardEvent) {
        if (event.key === 'Enter') {
            handleAdd()
        }
    }

    function scrollToBottom() {
        // window.scroll({
        //     top: document.body.scrollHeight,
        //     left: 0,
        //     behavior: 'smooth',
        // });
    }

    /**
     * Clears states of all input fields.
     */
    function clearStates() {
        setSelectedIcon('');
        setSelectedTask('');
        setSelectedDate(new Date());
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
            <Dialog className="modal" onClose={handleClose} open={props.show} onKeyPress={(event) => { handleKeyPress(event) }}>
                <DialogTitle className="modal-title">
                    Add Tasks
                </DialogTitle>
                <DialogContent className="modal-content" dividers style={{ paddingBottom: '40px' }}>
                    <Grid container className="formGridContainer" direction="column" spacing={4} alignItems="center">
                        <Grid item>
                            <IconMenu selectedIcon={selectedIcon} handleIconChange={handleIconChange} />
                        </Grid>
                        <Grid item>
                            <TextField label="Task" fullWidth style={{ minWidth: "425px" }} value={selectedTask} onChange={
                                (event) => {
                                    handleTaskChange(event.target.value)
                                }} />
                        </Grid>
                        <Grid item>
                            <DateTimePicker selectedDate={selectedDate} handleDateChange={handleDateChange} />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions className="modal-footer" style={{ paddingTop: '15px', paddingBottom: '15px', paddingRight: '15px' }}>
                    <Button onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant='contained' style={{ backgroundColor: props.buttonColour, color: 'white' }} onClick={handleAdd}>
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AddTasksModal;
