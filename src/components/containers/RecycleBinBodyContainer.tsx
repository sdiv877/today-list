import React from 'react';

import RecoverableTasksDisplay from '../task_cards/RecoverableTasksDisplay';

import Task from '../../models/Task'

import '../../styles/fadeIn.css'

const RecycleBinBodyContainer: React.VoidFunctionComponent = () => {
    // deletedList states
    const [deletedList, setDeletedList] = React.useState(new Array<Task>());

    // Handling getting lists from db on page reload
    React.useEffect(() => {
        console.log('use effect called');

        window.api.sendListRequest('request-list', 'deleted_tasks');

        window.api.receiveListResponse('response-list', (event, list_res) => {
            console.log('deleted_tasks response received from main. Length: ' + list_res.length)
            setDeletedList(list_res)
        })

        return () => {
            window.api.removeAllListeners('response-list');
        }
    }, [])

    return (
        <div className="RecycleBinBodyContainer">
            <div className="fadeIn">
                <RecoverableTasksDisplay recoverableList={deletedList} setRecoverableList={setDeletedList} table={'deleted_tasks'} />
            </div>
        </div>);
}

export default RecycleBinBodyContainer;