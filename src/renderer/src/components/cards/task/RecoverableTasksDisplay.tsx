import React, { FC } from 'react';
import { LOG } from '../../../../../common/utils/debug'
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import RecoverableTaskCard from './RecoverableTaskCard';

import { Task } from '../../../../../common/models/Task';

import '../../../styles/TaskCard.css'

// Props type
interface RecoverableTasksDisplayProps {
    recoverableList: Task[],
    setRecoverableList: React.Dispatch<React.SetStateAction<Task[]>>,
    table: string,
}

const RecoverableTasksDisplay: FC<RecoverableTasksDisplayProps> = (props): JSX.Element => {
    /**
     * Deletes a given task from the list in the UI, and then deletes it from the deleted_tasks table in the db.
     * Then adds the deleted task back to the current_tasks table in the db.
     */
    function handleRecoverTask(task: Task): void {
        // Delete it from React:recoverableList and db:deleted_tasks
        handleDeleteTask(task.id);
        // Add it to db:current_tasks
        window.database.addToTable('current_tasks', task);
        LOG('Item added to current_tasks, key ' + task.id);
    }

    /**
     * Deletes a task from db:deleted_tasks and React:recoverableList
     */
    function handleDeleteTask(id: number): void {
        // Clone the list of tasks in the UI
        const taskListCopy = props.recoverableList.map(l => Object.assign({}, l));
        // Iterate over it and remove the task that the user wants to delete
        for (let i = 0; i < taskListCopy.length; i++) {
            if (taskListCopy[i].id === id) {
                taskListCopy.splice(i, 1);
                break;
            }
        }
        // Update react state with the new list of Tasks
        LOG('Deleted task, id: ' + id);
        props.setRecoverableList(taskListCopy);
        // Then delete the task from the local db
        window.database.deleteFromTable(props.table, id);
    }

    /** 
     * Format all tasks into cards, and put them in an array called cardList
     * fading-task-card relates to styles in TaskCard.css
     */
    const cardList = props.recoverableList.map((task) => (
        <CSSTransition key={task.id} timeout={350} classNames="fading-task-card">
            <div className="taskCardItem">
                <RecoverableTaskCard task={task} handleRecoverTask={handleRecoverTask} />
            </div>
        </CSSTransition>
    ));

    /** The returned component. Wrapping the cards in a Transition group allows each item in the list to
     * have transitions applied separately (provided they each have a unique key).
     */
    return (
        <div className="RecoverableTasksDisplay">
            <TransitionGroup>
                {cardList}
            </TransitionGroup>
        </div>
    );
}

export default RecoverableTasksDisplay;