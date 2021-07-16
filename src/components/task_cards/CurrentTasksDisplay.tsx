import React, { FC } from 'react';
import { consoleLog } from '../../utils/logging'
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import CurrentTaskCard from './CurrentTaskCard';

import Task from '../../models/Task';

import '../../styles/TaskCard.css'

// Needed to let TS know explicitly what is passed from props
interface CurrentsTaskDisplayProps {
    currentList: Task[],
    setCurrentList: React.Dispatch<React.SetStateAction<Task[]>>,
}

const CurrentTasksDisplay: FC<CurrentsTaskDisplayProps> = (props): JSX.Element => {
    // Task completion handler
    function handleCompleteTask(task: Task): void {

        // Delete it from currentList (takes care of react state)
        handleDeleteTask(task, false);

        // Add it to completed_tasks (takes care of db state)
        window.database.addToList('completed_tasks', task);

        consoleLog('Item added to completed_tasks, key ' + task.id);
    }

    // Task deletion handler
    function handleDeleteTask(task: Task, deleteFromDb: boolean): void {
        // Map needed to clone an array of objects
        const taskListCopy = props.currentList.map(l => Object.assign({}, l));

        for (let i = 0; i < taskListCopy.length; i++) {
            if (taskListCopy[i].id === task.id) {
                taskListCopy.splice(i, 1);
                break;
            }
        }

        // Update react state
        consoleLog('Deleted item, key: ' + task.id);
        props.setCurrentList(taskListCopy);

        // Then delete from current_tasks table in db
        window.database.deleteFromList('current_tasks', task.id);

        // Needed as we only add the task to deleted_tasks if the delete button is clicked.
        // If complete is clicked, we only change the react state. The db stays the same. 
        if (deleteFromDb) {
            // Add to deleted_tasks db 
            window.database.addToList('deleted_tasks', task)
        }
    }

    const cardList = props.currentList.map((task) => (
        <CSSTransition key={task.id} timeout={350} classNames="fading-task-card">
            <div className="taskCardItem">
                <CurrentTaskCard task={task} handleCompleteTask={handleCompleteTask} handleDeleteTask={handleDeleteTask} />
            </div>
        </CSSTransition>
    ));

    // Returned FC
    return (
        <div className="currentTasksDisplay">
            <TransitionGroup>
                {cardList}
            </TransitionGroup>
        </div>
    );
}

export default CurrentTasksDisplay;