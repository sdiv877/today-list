import React, { FC } from 'react';
import { v4 as uuid } from 'uuid';

function handleAdd(list: {
    id: string;
    name: string;
}[]
    , setList: React.Dispatch<React.SetStateAction<{
        id: string;
        name: string;
    }[]>>) {
    const newList = list.concat({ id: uuid(), name: "New Item" });
    setList(newList);
}

interface TaskListProps {
    list: {
        id: string;
        name: string;
    }[],
    setList: React.Dispatch<React.SetStateAction<{
        id: string;
        name: string;
    }[]>>,
}

const TaskList: FC<TaskListProps> = (props): JSX.Element => {

    return (
        <div>
            <button type="button" onClick={() => handleAdd(props.list, props.setList)}>
                Add
            </button>

            <ul>
                {props.list.map((item) => (
                    <li key={item.id}>{item.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default TaskList;