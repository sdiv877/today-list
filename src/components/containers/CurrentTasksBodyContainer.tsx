import React from 'react';

import TaskDisplay from '../TaskDisplay';
import AddTasksModal from '../AddTasksModal'
import AddTasksFab from '../AddTasksFab';

import Task from '../../models/Task';

const CurrentTasksBodyContainer: React.VoidFunctionComponent = () => {
    // TaskList states
    const initialList = new Array<Task>();

    const [taskList, setTaskList] = React.useState(initialList);

    // CompletedList states
    const [completedList, setCompletedList] = React.useState(initialList);

    // AddTasksFab and AddTasksModal states
    const [show, setShow] = React.useState(false);

    return (
        <div className="CurrentTasksBodyContainer">
            <TaskDisplay taskList={taskList} setTaskList={setTaskList} completedList={completedList} setCompletedList={setCompletedList} />
            <AddTasksFab setShow={setShow} />
            <AddTasksModal taskList={taskList} setTaskList={setTaskList} show={show} setShow={setShow} />
        </div>);
}

export default CurrentTasksBodyContainer;