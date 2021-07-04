import React from 'react';

import TaskList from './TaskList';
import AddTasksFab from './AddTasksFab';

const BodyContainer: React.VoidFunctionComponent = () => {

    const initialList = [
        {
            id: '1',
            name: '1',
        },
    ];

    const [list, setList] = React.useState(initialList);

    return (
        <div className="BodyContainer">
            <TaskList list={list} setList={setList} />
            <AddTasksFab />
        </div>);
}

export default BodyContainer;