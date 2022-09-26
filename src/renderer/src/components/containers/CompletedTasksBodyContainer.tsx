import React from 'react';

import RecoverableTasksDisplay from '../cards/task/RecoverableTasksDisplay';
import { Task, TaskStatus } from '../../../../common/models/task.model';
import { sortTaskList } from '../../utils/task-display-helpers';
import { LOG } from '../../../../common/utils/debug';

const CompletedTasksBodyContainer: React.VoidFunctionComponent = () => {
  const [completedTaskList, setCompletedTaskList] = React.useState(
    new Array<Task>()
  );

  React.useEffect(() => {
    LOG('CompletedTasksBodyContainer useEffect() called');
    window.api.task.getAll(TaskStatus.Completed).then((taskRes) => {
      window.ipcRendererManager.LOG(
        'Completed Tasks received from main. Length: ' + taskRes.length
      );
      setCompletedTaskList(sortTaskList(taskRes));
    });
  }, []);

  return (
    <div className="CompletedTasksBodyContainer">
      <RecoverableTasksDisplay
        recoverableTaskList={completedTaskList}
        setRecoverableTaskList={setCompletedTaskList}
      />
    </div>
  );
};

export default CompletedTasksBodyContainer;
