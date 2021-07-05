import React from 'react';

import Task from '../models/Task';

import TaskList from './TaskList';
import AddTasksModal from './AddTasksModal'
import AddTasksFab from './AddTasksFab';

const BodyContainer: React.VoidFunctionComponent = () => {
    // TaskList states
    const initialList = new Array<Task>();

    const [taskList, setTaskList] = React.useState(initialList);

    // CompletedList states
    const [completedList, setCompletedList] = React.useState(initialList);

    // AddTasksFab and AddTasksModal states
    const [show, setShow] = React.useState(false);

    return (
        <div className="BodyContainer">
            <TaskList taskList={taskList} setTaskList={setTaskList} completedList={completedList} setCompletedList={setCompletedList} />
            <AddTasksModal taskList={taskList} setTaskList={setTaskList} show={show} setShow={setShow} />
            <AddTasksFab setShow={setShow} />
        </div>);
}

export default BodyContainer;