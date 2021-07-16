import React, { FC } from 'react';
import { v4 as uuid } from 'uuid';
import { Button, Grid, TextField, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';

import IconMenu from './pickers/IconMenu';
import DateTimePicker from './pickers/DateTimePicker';

import Task from '../models/Task'

import '../styles/AddTasksModal.css'

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
        window.database.addToList('current_tasks', newTask)

        // Scroll to the bottom of the page so the user can see their new task
        // 500ms is the time for a card's fade transition
        setTimeout(() => { handleScroll() }, 100);
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

    // Enter key handler
    function handleKeyPress(event: React.KeyboardEvent) {
        console.log('h');

        if (event.key === 'Enter') {
            handleAdd()
        }
    }

    // Scrolling to bottom of page when a task is added
    function handleScroll() {
        window.scroll({
            top: document.body.scrollHeight,
            left: 0,
            behavior: 'smooth',
        });
    }

    // Clear states of all input fields upon closing the window
    function clearStates() {

        setSelectedIcon('');
        setSelectedTask('');
        setSelectedDate(new Date());
    }

    function handleClose() {
        props.setShow(false);
        clearStates();
    }

    // If show is not true, don't return the component
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
                    <Button variant='contained' color='primary' onClick={handleAdd}>
                        Submit
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default AddTasksModal;