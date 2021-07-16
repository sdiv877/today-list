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
    const [buttonColour, setButtonColour] = React.useState('transparent');

    // Handling getting lists from db on page reload
    React.useEffect(() => {
        consoleLog('use effect called');

        // Getting current_tasks table
        window.database.sendListRequest('request-list', 'current_tasks');

        window.database.receiveListResponse('response-list', (event, list_res) => {
            consoleLog('current_tasks response received from main. Length: ' + list_res.length)
            setCurrentList(list_res)
        })

        // Getting button colour info
        window.user_data.receiveUserDataResponse('response-user-data', (event, user_data_res) => {
            consoleLog('User data response received from main: ' + JSON.stringify(user_data_res));

            if (user_data_res.button_colour === '') {
                setButtonColour('#1976d2')
            } else {
                setButtonColour(user_data_res.button_colour);
            }
        })


        return () => {
            window.app.removeAllListeners('response-list');
            window.app.removeAllListeners('response-user-data');
        }
    }, [])

    return (
        <div className="CurrentTasksBodyContainer">

            <CurrentTasksDisplay currentList={currentList} setCurrentList={setCurrentList} />
            <AddTasksFab setShow={setShow} buttonColour={buttonColour} />
            <AddTasksModal currentList={currentList} setCurrentList={setCurrentList} show={show} setShow={setShow} buttonColour={buttonColour} />

        </div>);
}

export default CurrentTasksBodyContainer;