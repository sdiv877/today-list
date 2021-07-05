import React from 'react';

import Task from '../models/Task';

import TaskList from './TaskList';
import AddTasksModal from './AddTasksModal'
import AddTasksFab from './AddTasksFab';

const BodyContainer: React.VoidFunctionComponent = () => {
    // TaskList states
    const initialList = new Array<Task>();

    const [list, setList] = React.useState(initialList);

    // AddTasksFab and AddTasksModal states
    const [show, setShow] = React.useState(false);

    return (
        <div className="BodyContainer">
            <TaskList list={list} setList={setList} />
            <AddTasksModal list={list} setList={setList} show={show} setShow={setShow} />
            <AddTasksFab setShow={setShow} />
        </div>);
}

export default BodyContainer;