import React, { FC } from 'react';
import { LOG } from '../../../../../common/utils/debug';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import CurrentTaskCard from './CurrentTaskCard';

import { Task } from '../../../../../common/models/Task';

import '../../../styles/TaskCard.css'

// Props type
interface CurrentsTaskDisplayProps {
    currentList: Task[],
    setCurrentList: React.Dispatch<React.SetStateAction<Task[]>>,
}

const CurrentTasksDisplay: FC<CurrentsTaskDisplayProps> = (props): JSX.Element => {
    /**
     * Deletes the given task from React:currentList and adds it to db:completed_tasks.
     */
    function handleCompleteTask(task: Task): void {
        // Delete it from currentList but don't add it to db:deleted_tasks (takes care of react state)
        handleDeleteTask(task, false);
        // Add it to completed_tasks (takes care of db state)
        // window.database.addToTable('completed_tasks', task);
        LOG('Item added to completed_tasks, key ' + task.id);
    }

    /**
     * Deletes the given Task from React state, but only deletes the Task and adds it to db:deleted_tasks 
     * if specified.
     * @param deleteFromDb whether or not the Task should be added to db:delete_tasks
     */
    function handleDeleteTask(task: Task, deleteFromDb: boolean): void {
        // Clone the list of tasks in the UI
        const taskListCopy = props.currentList.map(l => Object.assign({}, l));
        // Iterate over it and remove the task that the user wants to delete
        for (let i = 0; i < taskListCopy.length; i++) {
            if (taskListCopy[i].id === task.id) {
                taskListCopy.splice(i, 1);
                break;
            }
        }
        // Update react state
        LOG('Deleted item, key: ' + task.id);
        props.setCurrentList(taskListCopy);
        // Then delete from current_tasks table in db
        // window.database.deleteFromTable('current_tasks', task.id);
        // // Needed as we only add the task to deleted_tasks if the delete button is clicked.
        // // If complete is clicked, we only change the react state. The db stays the same. 
        // if (deleteFromDb) {
        //     window.database.addToTable('deleted_tasks', task)
        // }
    }

    const cardList = props.currentList.map((task) => (
        <CSSTransition key={task.id} timeout={350} classNames="fading-task-card">
            <div className="taskCardItem">
                <CurrentTaskCard task={task} handleCompleteTask={handleCompleteTask} handleDeleteTask={handleDeleteTask} />
            </div>
        </CSSTransition>
    ));

    // Returned component
    return (
        <div className="currentTasksDisplay">
            <TransitionGroup>
                {cardList}
            </TransitionGroup>
        </div>
    );
}

export default CurrentTasksDisplay;