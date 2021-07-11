import React, { FC } from 'react';

import CompletedTaskCard from './CompletedTaskCard';

import Task from '../models/Task';

// Needed to let TS know explicitly what is passed from props
interface CompletedTasksDisplayProps {
    completedList: Task[],
    setCompletedList: React.Dispatch<React.SetStateAction<Task[]>>,
}

const CompletedTasksDisplay: FC<CompletedTasksDisplayProps> = (props): JSX.Element => {
    // Task recovery handler
    function handleRecoverTask(task: Task): void {

        // Delete it from completedList (takes care of react state)
        handleDeleteTask(task.id);

        // Add it to curernt_tasks (takes care of db state)
        window.api.addToList('current_tasks', task);

        console.log('Item added to current_tasks, key ' + task.id);
    }

    // Task deletion handler
    function handleDeleteTask(id: string): void {
        // Map needed to clone an array of objects
        const taskListCopy = props.completedList.map(l => Object.assign({}, l));

        for (let i = 0; i < taskListCopy.length; i++) {
            if (taskListCopy[i].id === id) {
                taskListCopy.splice(i, 1);
                break;
            }
        }

        // Update react state
        console.log('Deleted item, key: ' + id);
        props.setCompletedList(taskListCopy);

        // Then delete from local db
        window.api.deleteFromList('completed_tasks', id);
    }

    // Returned FC
    return (
        <div className="currentTasksDisplay">
            {props.completedList.map((task) => (
                <CompletedTaskCard task={task} handleRecoverTask={handleRecoverTask} key={task.id} />
            ))}
        </div>
    );
}

export default CompletedTasksDisplay;