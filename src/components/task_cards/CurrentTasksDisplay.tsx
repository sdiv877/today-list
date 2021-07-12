import React, { FC } from 'react';

import CurrentTaskCard from './CurrentTaskCard';

import Task from '../../models/Task';

// Needed to let TS know explicitly what is passed from props
interface CurrentsTaskDisplayProps {
    currentList: Task[],
    setCurrentList: React.Dispatch<React.SetStateAction<Task[]>>,
}

const CurrentTasksDisplay: FC<CurrentsTaskDisplayProps> = (props): JSX.Element => {
    // Task completion handler
    function handleCompleteTask(task: Task): void {

        // Delete it from currentList (takes care of react state)
        handleDeleteTask(task);

        // Add it to completed_tasks (takes care of db state)
        window.api.addToList('completed_tasks', task);

        console.log('Item added to completed_tasks, key ' + task.id);
    }

    // Task deletion handler
    function handleDeleteTask(task: Task): void {
        // Map needed to clone an array of objects
        const taskListCopy = props.currentList.map(l => Object.assign({}, l));

        for (let i = 0; i < taskListCopy.length; i++) {
            if (taskListCopy[i].id === task.id) {
                taskListCopy.splice(i, 1);
                break;
            }
        }

        // Update react state
        console.log('Deleted item, key: ' + task.id);
        props.setCurrentList(taskListCopy);

        // Then delete from current_tasks table in db, and add to deleted_tasks 
        window.api.deleteFromList('current_tasks', task.id);
        window.api.addToList('deleted_tasks', task)
    }

    // Returned FC
    return (
        <div className="currentTasksDisplay">
            {props.currentList.map((task) => (
                <CurrentTaskCard task={task} handleCompleteTask={handleCompleteTask} handleDeleteTask={handleDeleteTask} key={task.id} />
            ))}
        </div>
    );
}

export default CurrentTasksDisplay;