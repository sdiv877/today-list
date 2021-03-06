import React from 'react';
import { consoleLog } from '../../utils/debug'

import RecoverableTasksDisplay from '../task_cards/RecoverableTasksDisplay';

import { sortTaskList } from '../../utils/TaskDisplayHelpers';

import Task from '../../models/Task'

const CompletedTasksBodyContainer: React.VoidFunctionComponent = () => {
    // completedList states
    const [completedList, setCompletedList] = React.useState(new Array<Task>());

    // Handling getting lists from db on page reload
    React.useEffect(() => {
        consoleLog('use effect called');

        window.database.sendListRequest('request-list', 'completed_tasks');

        window.database.receiveListResponse('response-list', (event, list_res) => {
            consoleLog('completed_tasks response received from main. Length: ' + list_res.length)
            setCompletedList(sortTaskList(list_res))
        })

        return () => {
            window.app.removeAllListeners('response-list');
        }
    }, [])

    return (
        <div className="CompletedTasksBodyContainer">
            <RecoverableTasksDisplay recoverableList={completedList} setRecoverableList={setCompletedList} table={'completed_tasks'} />
        </div>);
}

export default CompletedTasksBodyContainer;