import React, { FC } from 'react';
import { v4 as uuid } from 'uuid';

// Pass in the list and setList props, and add a new item to the list
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

// Needed to let TS know explicitly what is passed from props
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
             {/*Whenever the add button is clicked, handle addition of a new item to the list prop*/}
            <button type="button" onClick={() => handleAdd(props.list, props.setList)}>
                Add
            </button>

            {/*Write all the items in the list prop via their key*/}
            <ul>
                {props.list.map((item) => (
                    <li key={item.id}>{item.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default TaskList;