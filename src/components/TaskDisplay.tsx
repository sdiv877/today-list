import React, { FC } from 'react';

import CurrentTaskCard from './CurrentTaskCard';
import CompletedTaskCard from './CompletedTaskCard'

import Task from '../models/Task';

// Needed to let TS know explicitly what is passed from props
interface TaskDisplayProps {
    taskList: Task[],
    setTaskList: React.Dispatch<React.SetStateAction<Task[]>>,
    completedList: Task[],
    setCompletedList: React.Dispatch<React.SetStateAction<Task[]>>,
}

const TaskDisplay: FC<TaskDisplayProps> = (props): JSX.Element => {
    // Task completion handler
    function handleCompleteTask(task: Task): void {
        // Map needed to clone an array of objects
        let completedListCopy = props.completedList.map(l => Object.assign({}, l));

        // Copy the task to completedList
        completedListCopy = completedListCopy.concat(task);

        // Delete it from taskList
        handleDeleteTask(task.id);

        console.log('Item added to completed, key ' + task.id);
        props.setCompletedList(completedListCopy)
    }

    // Task deletion handler
    function handleDeleteTask(id: string): void {
        // Map needed to clone an array of objects
        const taskListCopy = props.taskList.map(l => Object.assign({}, l));

        for (let i = 0; i < taskListCopy.length; i++) {
            if (taskListCopy[i].id === id) {
                taskListCopy.splice(i, 1);
                break;
            }
        }

        console.log('Deleted item, key: ' + id);
        props.setTaskList(taskListCopy);
    }

    // Returned FC
    return (
        <div className="taskDisplay">
            <br />
            Uncompleted section
            <br />

            {props.taskList.map((task) => (
                <CurrentTaskCard task={task} handleCompleteTask={handleCompleteTask} handleDeleteTask={handleDeleteTask} key={task.id} />
            ))}

            <br />
            Completed section
            <br />

            {props.completedList.map((task) => (
                <CompletedTaskCard task={task} key={task.id} />
            ))}
        </div>
    );
}

export default TaskDisplay;