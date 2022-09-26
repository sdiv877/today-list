import React, { FC } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { Task, TaskStatus } from '../../../../../common/models/task.model';
import { LOG } from '../../../../../common/utils/debug';
import CurrentTaskCard from './CurrentTaskCard';

import '../../../styles/TaskCard.css';

// Props type
interface CurrentsTaskDisplayProps {
  currentList: Task[];
  setCurrentTaskList: React.Dispatch<React.SetStateAction<Task[]>>;
}

const CurrentTasksDisplay: FC<CurrentsTaskDisplayProps> = (
  props
): JSX.Element => {
  function handleCompleteTask(task: Task): void {
    // update react state
    removeFromDisplayList(task.id);
    // update db state
    task.status = TaskStatus.Completed;
    window.api.task.update(task);
    window.ipcRendererManager.LOG('Set TaskStatus to Delete, id ' + task.id);
  }

  function handleDeleteTask(task: Task): void {
    // update react state
    removeFromDisplayList(task.id);
    // update db state
    task.status = TaskStatus.Deleted;
    window.api.task.update(task);
    window.ipcRendererManager.LOG('Set TaskStatus to Deleted, id ' + task.id);
  }

  function removeFromDisplayList(taskId: number): void {
    // clone the list of tasks in the UI
    const taskListCopy = props.currentList.map((l) => Object.assign({}, l));
    // iterate over it and remove the task that the user wants to delete
    for (let i = 0; i < taskListCopy.length; i++) {
      if (taskListCopy[i].id === taskId) {
        taskListCopy.splice(i, 1);
        break;
      }
    }
    // update react state
    LOG('Removed item from display list, key: ' + taskId);
    props.setCurrentTaskList(taskListCopy);
  }

  const cardList = props.currentList.map((task) => (
    <CSSTransition key={task.id} timeout={350} classNames="fading-task-card">
      <div className="taskCardItem">
        <CurrentTaskCard
          task={task}
          handleCompleteTask={handleCompleteTask}
          handleDeleteTask={handleDeleteTask}
        />
      </div>
    </CSSTransition>
  ));

  return (
    <div className="currentTasksDisplay">
      <TransitionGroup>{cardList}</TransitionGroup>
    </div>
  );
};

export default CurrentTasksDisplay;
