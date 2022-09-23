import React, { FC } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import RecoverableTaskCard from './RecoverableTaskCard';

import { LOG } from '../../../../../common/utils/debug';
import { Task, TaskStatus } from '../../../../../common/models/task.model';

import '../../../styles/TaskCard.css';

// Props type
interface RecoverableTasksDisplayProps {
  recoverableList: Task[];
  setRecoverableList: React.Dispatch<React.SetStateAction<Task[]>>;
  table: string;
}

const RecoverableTasksDisplay: FC<RecoverableTasksDisplayProps> = (
  props
): JSX.Element => {
  function handleRecoverTask(task: Task): void {
    // update react state
    removeFromDisplayList(task.id);
    // update db state
    task.status = TaskStatus.InProgress;
    window.api.task.update(task);
    window.ipcRendererManager.LOG('Set TaskStatus to InProgress, id ' + task.id);
  }

  function removeFromDisplayList(taskId: number): void {
    // clone the list of tasks in the UI
    const taskListCopy = props.recoverableList.map((l) => Object.assign({}, l));
    // iterate over it and remove the task that the user wants to delete
    for (let i = 0; i < taskListCopy.length; i++) {
      if (taskListCopy[i].id === taskId) {
        taskListCopy.splice(i, 1);
        break;
      }
    }
    // update react state with the new list of Tasks
    LOG('Removed item from display list, id: ' + taskId);
    props.setRecoverableList(taskListCopy);
  }

  /**
   * Format all tasks into cards, and put them in an array called cardList
   * fading-task-card relates to styles in TaskCard.css
   */
  const cardList = props.recoverableList.map((task) => (
    <CSSTransition key={task.id} timeout={350} classNames="fading-task-card">
      <div className="taskCardItem">
        <RecoverableTaskCard
          task={task}
          handleRecoverTask={handleRecoverTask}
        />
      </div>
    </CSSTransition>
  ));

  /** 
   * The returned component. Wrapping the cards in a Transition group allows each item in the list to
   * have transitions applied separately (provided they each have a unique key).
   */
  return (
    <div className="RecoverableTasksDisplay">
      <TransitionGroup>{cardList}</TransitionGroup>
    </div>
  );
};

export default RecoverableTasksDisplay;
