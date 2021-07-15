import React from 'react';

import RecoverableTasksDisplay from '../task_cards/RecoverableTasksDisplay';

import Task from '../../models/Task'

import '../../styles/fadeIn.css'

const CompletedTasksBodyContainer: React.VoidFunctionComponent = () => {
    // completedList states
    const [completedList, setCompletedList] = React.useState(new Array<Task>());

    // Handling getting lists from db on page reload
    React.useEffect(() => {
        console.log('use effect called');

        window.api.sendListRequest('request-list', 'completed_tasks');

        window.api.receiveListResponse('response-list', (event, list_res) => {
            console.log('completed_tasks response received from main. Length: ' + list_res.length)
            setCompletedList(list_res)
        })

        return () => {
            window.api.removeAllListeners('response-list');
        }
    }, [])

    return (
        <div className="CompletedTasksBodyContainer">
            <div className = 'fadeIn'>
                <RecoverableTasksDisplay recoverableList={completedList} setRecoverableList={setCompletedList} table={'completed_tasks'} />
            </div>
        </div>);
}

export default CompletedTasksBodyContainer;