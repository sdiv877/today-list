import { Card } from '@material-ui/core';
import React, { FC } from 'react';
import { v4 as uuid } from 'uuid';

import Task from '../models/Task';

// Pass in the list and setList props, and add a new item to the list
function handleAdd(list: Task[], 
    setList: React.Dispatch<React.SetStateAction<Task[]>>) {

    const currentDate = new Date();

    const newList = list.concat({ id: uuid(), icon: "icon", task: "New Task", date: currentDate.toUTCString() });
    setList(newList);
}

// Needed to let TS know explicitly what is passed from props
interface TaskListProps {
    list: Task[],
    setList: React.Dispatch<React.SetStateAction<Task[]>>,
}

const TaskList: FC<TaskListProps> = (props): JSX.Element => {

    return (
        <div>
            {/*Whenever the add button is clicked, handle addition of a new item to the list prop*/}
            <button type="button" onClick={() => handleAdd(props.list, props.setList)}>
                Add
            </button>

            {/*Write all the items in the list prop by accessing their fields*/}
            {props.list.map((item) => (
                <Card variant="outlined" key={item.id}>
                    {item.icon}
                    <br />
                    {item.task}
                    <br />
                    {item.date}
                </Card>
            ))}
        </div>
    );
}

export default TaskList;