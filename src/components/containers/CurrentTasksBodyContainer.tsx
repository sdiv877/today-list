import React from 'react';
import { consoleLog } from '../../utils/logging'

import CurrentTasksDisplay from '../task_cards/CurrentTasksDisplay';
import AddTasksFab from '../buttons/AddTasksFab';
import AddTasksModal from '../AddTasksModal'

import Task from '../../models/Task'

const CurrentTasksBodyContainer: React.VoidFunctionComponent = () => {
    // currrentList states
    const [currentList, setCurrentList] = React.useState(new Array<Task>());

    // AddTasksFab and AddTasksModal states
    const [show, setShow] = React.useState(false);

    // Handling getting lists from db on page reload
    React.useEffect(() => {
        consoleLog('use effect called');

        window.database.sendListRequest('request-list', 'current_tasks');

        window.database.receiveListResponse('response-list', (event, list_res) => {
            consoleLog('current_tasks response received from main. Length: ' + list_res.length)
            setCurrentList(list_res)
        })

        return () => {
            window.app.removeAllListeners('response-list');
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