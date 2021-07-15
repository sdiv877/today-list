import React, { FC } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import RecoverableTaskCard from './RecoverableTaskCard';

import Task from '../../models/Task';

import "../../styles/TaskCard.css"

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

    // Format all tasks into cards, and put them in an array called cardList
    // fading-task-card relates to styles in TaskCard.css
    const cardList = props.recoverableList.map((task) => (
        <CSSTransition key={task.id} timeout={350} classNames="fading-task-card">
            <div className="taskCardItem">
                <RecoverableTaskCard task={task} handleRecoverTask={handleRecoverTask} />
            </div>
        </CSSTransition>
    ));

    // Returned FC. Wrapping cards in a Transition group allows each item in the list to
    // have transitions applied separately (provided they each have a unique key)
    return (
        <div className="RecoverableTasksDisplay">
            <TransitionGroup>
                {cardList}
            </TransitionGroup>
        </div>
    );
}

export default RecoverableTasksDisplay;