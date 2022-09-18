import React from 'react';

import RecoverableTasksDisplay from '../cards/task/RecoverableTasksDisplay';
import { Task } from '../../../../common/models/task.model';
import { LOG } from '../../../../common/utils/debug';

const CompletedTasksBodyContainer: React.VoidFunctionComponent = () => {
  // completedList states
  const [completedList, setCompletedList] = React.useState(new Array<Task>());

  // handle getting Tasks from db on page reload
  React.useEffect(() => {
    LOG('CompletedTasksBodyContainer useEffect() called');

    // window.database.sendTableRequest("request-list", "completed_tasks");
    // window.database.receiveTableResponse("response-list", (event, list_res) => {
    //   LOG("completed_tasks response received from main. Length: " + list_res.length);
    //   setCompletedList(sortTaskList(list_res) as Task[]); // TODO: remove 'as'
    // });
    // return () => {
    //   window.app.removeAllListeners("response-list");
    // };
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
