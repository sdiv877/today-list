import React from 'react';

import RecoverableTasksDisplay from '../cards/task/RecoverableTasksDisplay';

import { Task, TaskStatus } from '../../../../common/models/task.model';
import { setDocumentBgColour, sortTaskList } from '../../utils/task-display-helpers';
import { LOG } from '../../../../common/utils/debug';

const RecycleBinBodyContainer: React.VoidFunctionComponent = () => {
  // deletedList states
  const [deletedList, setDeletedList] = React.useState(new Array<Task>());

  // handle getting Tasks from db on page reload
  React.useEffect(() => {
    LOG('RecycleBinBodyContainer useEffect() called');
    window.api.settings.get().then((userSettingsRes) => {
      setDocumentBgColour(userSettingsRes.bgColour);
    })
    // get all Deleted Tasks
    window.api.task.getAll(TaskStatus.Deleted).then((listRes) => {
      window.ipcRendererManager.LOG('Deleted Tasks response received from main. Length: ' + listRes.length)
      setDeletedList(sortTaskList(listRes))
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
