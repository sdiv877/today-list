import React, { FC } from 'react';

import RecoverableTaskCard from './RecoverableTaskCard';

import Task from '../../models/Task';

// Needed to let TS know explicitly what is passed from props
interface RecoverableTasksDisplayProps {
    recoverableList: Task[],
    setRecoverableList: React.Dispatch<React.SetStateAction<Task[]>>,
    table: string,
}

const RecoverableTasksDisplay: FC<RecoverableTasksDisplayProps> = (props): JSX.Element => {
    // Task recovery handler
    function handleRecoverTask(task: Task): void {

        // Delete it from recoverableList (takes care of react state)
        handleDeleteTask(task.id);

        // Add it to current_tasks (takes care of db state)
        window.api.addToList('current_tasks', task);

        console.log('Item added to current_tasks, key ' + task.id);
    }

    // Task deletion handler
    function handleDeleteTask(id: string): void {
        // Map needed to clone an array of objects
        const taskListCopy = props.recoverableList.map(l => Object.assign({}, l));

        for (let i = 0; i < taskListCopy.length; i++) {
            if (taskListCopy[i].id === id) {
                taskListCopy.splice(i, 1);
                break;
            }
        }

        // Update react state
        console.log('Deleted item, key: ' + id);
        props.setRecoverableList(taskListCopy);

        // Then delete from local db
        window.api.deleteFromList(props.table, id);
    }

    // Returned FC
    return (
        <div className="RecoverableTasksDisplay">
            {props.recoverableList.map((task) => (
                <RecoverableTaskCard task={task} handleRecoverTask={handleRecoverTask} key={task.id} />
            ))}
        </div>
    );
}

export default RecoverableTasksDisplay;