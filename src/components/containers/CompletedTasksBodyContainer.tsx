import React from 'react';

import RecoverableTasksDisplay from '../task_cards/RecoverableTasksDisplay';

import Task from '../../models/Task'

const CompletedTasksBodyContainer: React.VoidFunctionComponent = () => {
    // completedList states
    const [completedList, setCompletedList] = React.useState(new Array<Task>());

    // Handling getting lists from db on page reload
    React.useEffect(() => {
        console.log('use effect called');

        window.api.sendRequest('request-list', 'completed_tasks');

        window.api.receiveResponse('response-list', (event, list_res) => {
            console.log('completed_tasks response received from main. Length: ' + list_res.length)
            setCompletedList(list_res)
        })

        return () => {
            window.api.removeAllListeners('response-list');
        }
    }, [])

    return (
        <div className="CompletedTasksBodyContainer">
            <RecoverableTasksDisplay recoverableList={completedList} setRecoverableList={setCompletedList} table={'completed_tasks'} />
        </div>);
}

export default CompletedTasksBodyContainer;