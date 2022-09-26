import React from 'react';

import RecoverableTasksDisplay from '../cards/task/RecoverableTasksDisplay';
import { Task, TaskStatus } from '../../../../common/models/task.model';
import { sortTaskList, setDocumentBgColour } from '../../utils/task-display-helpers';
import { LOG } from '../../../../common/utils/debug';

const CompletedTasksBodyContainer: React.VoidFunctionComponent = () => {
  // completedList states
  const [completedList, setCompletedList] = React.useState(new Array<Task>());

  React.useEffect(() => {
    LOG('CompletedTasksBodyContainer useEffect() called');
    window.api.settings.get().then((userSettingsRes) => {
      setDocumentBgColour(userSettingsRes.bgColour);
    })
    // get all Completed Tasks
    window.api.task.getAll(TaskStatus.Completed).then((taskRes) => {
      window.ipcRendererManager.LOG("Completed Tasks received from main. Length: " + taskRes.length);
      setCompletedList(sortTaskList(taskRes));
    });
  }, []);

  return (
    <div className="CompletedTasksBodyContainer">
      <RecoverableTasksDisplay
        recoverableList={completedList}
        setRecoverableList={setCompletedList}
        table={'completed_tasks'}
      />
    </div>
  );
};

export default CompletedTasksBodyContainer;
