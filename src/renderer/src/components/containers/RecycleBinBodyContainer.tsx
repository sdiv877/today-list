import React from 'react';

import RecoverableTasksDisplay from '../cards/task/RecoverableTasksDisplay';

import { LOG } from '../../../../common/utils/debug';
import { Task } from '../../../../common/models/task.model';

const RecycleBinBodyContainer: React.VoidFunctionComponent = () => {
  // deletedList states
  const [deletedList, setDeletedList] = React.useState(new Array<Task>());

  // handle getting Tasks from db on page reload
  React.useEffect(() => {
    LOG('RecycleBinBodyContainer useEffect() called');

    // window.database.sendTableRequest('request-list', 'deleted_tasks');

    // window.database.receiveTableResponse('response-list', (event, list_res) => {
    //     LOG('deleted_tasks response received from main. Length: ' + list_res.length)
    //     setDeletedList(sortTaskList(list_res) as Task []) // TODO: remove 'as'
    // })
    // return () => {
    //     window.app.removeAllListeners('response-list');
    // }
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
