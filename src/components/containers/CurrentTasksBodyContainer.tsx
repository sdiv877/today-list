import React from 'react';

import CurrentTasksDisplay from '../CurrentTasksDisplay';
import AddTasksModal from '../AddTasksModal'
import AddTasksFab from '../AddTasksFab';

import Task from '../../models/Task'

const CurrentTasksBodyContainer: React.VoidFunctionComponent = () => {
    // currrentList states
    const [currentList, setCurrentList] = React.useState(new Array<Task>());

    // AddTasksFab and AddTasksModal states
    const [show, setShow] = React.useState(false);

    // Handling getting lists from db on page reload
    React.useEffect(() => {
        console.log('use effect called');

        window.api.sendRequest('request-list', 'current_tasks');

        window.api.receiveResponse('response-list', (event, list_res) => {
            console.log('current_tasks response received from main. Length: ' + list_res.length)
            setCurrentList(list_res)
        })

        return () => {
            window.api.removeAllListeners('response-list');
        }
    }, [])

    return (
        <div className="CurrentTasksBodyContainer">
            <CurrentTasksDisplay currentList={currentList} setCurrentList={setCurrentList} />
            <AddTasksFab setShow={setShow} />
            <AddTasksModal currentList={currentList} setCurrentList={setCurrentList} show={show} setShow={setShow} />
        </div>);
}

export default CurrentTasksBodyContainer;