import React from 'react';

import TaskList from './TaskList';
import AddTasksModal from './AddTasksModal'
import AddTasksFab from './AddTasksFab';

const BodyContainer: React.VoidFunctionComponent = () => {
    // TaskList states
    const initialList = [
        {
            id: '1',
            name: '1',
        },
    ];

    const [list, setList] = React.useState(initialList);

    // AddTasksFab and AddTasksModal states
    const [show, setShow] = React.useState(false);

    return (
        <div className="BodyContainer">
            <TaskList list={list} setList={setList} />
            <AddTasksModal show={show} setShow={setShow} />
            <AddTasksFab setShow={setShow} />
        </div>);
}

export default BodyContainer;