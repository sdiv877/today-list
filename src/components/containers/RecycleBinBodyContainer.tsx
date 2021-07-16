import React from 'react';
import { consoleLog } from '../../utils/debug'

import RecoverableTasksDisplay from '../task_cards/RecoverableTasksDisplay'

import { sortTaskList } from '../../utils/TaskDisplayHelpers'

import Task from '../../models/Task'

const RecycleBinBodyContainer: React.VoidFunctionComponent = () => {
    // deletedList states
    const [deletedList, setDeletedList] = React.useState(new Array<Task>());

    // Handling getting lists from db on page reload
    React.useEffect(() => {
        consoleLog('use effect called');

        window.database.sendListRequest('request-list', 'deleted_tasks');

        window.database.receiveListResponse('response-list', (event, list_res) => {
            consoleLog('deleted_tasks response received from main. Length: ' + list_res.length)
            setDeletedList(sortTaskList(list_res))
        })

        return () => {
            window.app.removeAllListeners('response-list');
        }
    }, [])

    return (
        <div className="RecycleBinBodyContainer">
            <RecoverableTasksDisplay recoverableList={deletedList} setRecoverableList={setDeletedList} table={'deleted_tasks'} />
        </div>);
}

export default RecycleBinBodyContainer;