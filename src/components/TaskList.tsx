import { Card } from '@material-ui/core';
import React, { FC } from 'react';

import Task from '../models/Task';

import getIcon from '../utils/getIcon'

// Needed to let TS know explicitly what is passed from props
interface TaskListProps {
    list: Task[],
    setList: React.Dispatch<React.SetStateAction<Task[]>>,
}

const TaskList: FC<TaskListProps> = (props): JSX.Element => {

    return (
        <div>
            {/*Write all the items in the list prop by accessing their fields*/}
            {props.list.map((item) => (
                <Card variant="outlined" key={item.id}>
                    {getIcon(item.icon)}
                    <br />
                    {item.task}
                    <br />
                    {item.date}
                    <br />
                    {item.id}
                </Card>
            ))}
        </div>
    );
}

export default TaskList;