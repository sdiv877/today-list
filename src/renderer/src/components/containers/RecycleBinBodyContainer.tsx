import React from 'react';

import RecoverableTasksDisplay from '../cards/task/RecoverableTasksDisplay';

import { Task, TaskStatus } from '../../../../common/models/task.model';
import { sortTaskList } from '../../utils/task-display-helpers';
import { LOG } from '../../../../common/utils/debug';

const RecycleBinBodyContainer: React.VoidFunctionComponent = () => {
  const [deletedTaskList, setDeletedTaskList] = React.useState(new Array<Task>());

  React.useEffect(() => {
    LOG('RecycleBinBodyContainer useEffect() called');
    window.api.task.getAll(TaskStatus.Deleted).then((listRes) => {
      window.ipcRendererManager.LOG('Deleted Tasks response received from main. Length: ' + listRes.length)
      setDeletedTaskList(sortTaskList(listRes))
    });
  }, []);

  return (
    <div className="RecycleBinBodyContainer">
      <RecoverableTasksDisplay
        recoverableTaskList={deletedTaskList}
        setRecoverableTaskList={setDeletedTaskList}
      />
    </div>
  );
};

export default RecycleBinBodyContainer;
