import React from 'react';

import RecoverableTasksDisplay from '../cards/task/RecoverableTasksDisplay';

import { LOG } from '../../../../common/utils/debug';
import { Task, TaskStatus } from '../../../../common/models/task.model';
import { sortTaskList } from '../../utils/task-display-helpers';

const RecycleBinBodyContainer: React.VoidFunctionComponent = () => {
  // deletedList states
  const [deletedList, setDeletedList] = React.useState(new Array<Task>());

  // handle getting Tasks from db on page reload
  React.useEffect(() => {
    LOG('RecycleBinBodyContainer useEffect() called');
    // get all Deleted Tasks
    window.api.task.getAll(TaskStatus.Deleted).then((listRes) => {
      LOG('Deleted Tasks response received from main. Length: ' + listRes.length)
      setDeletedList(sortTaskList(listRes) as Task[]) // TODO: remove 'as'
    });
  }, []);

  return (
    <div className="RecycleBinBodyContainer">
      <RecoverableTasksDisplay
        recoverableList={deletedList}
        setRecoverableList={setDeletedList}
        table={'deleted_tasks'}
      />
    </div>
  );
};

export default RecycleBinBodyContainer;
