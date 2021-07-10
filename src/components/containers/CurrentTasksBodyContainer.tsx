import React from 'react';

import TaskDisplay from '../TaskDisplay';
import AddTasksModal from '../AddTasksModal'
import AddTasksFab from '../AddTasksFab';

import Task from '../../models/Task'

const CurrentTasksBodyContainer: React.VoidFunctionComponent = () => {
    // TaskList states
    const [currentList, setCurrentList] = React.useState(new Array<Task>());

    // CompletedList states
    const [completedList, setCompletedList] = React.useState(new Array<Task>());

    // Handling initial currentList
    React.useEffect(() => {
        console.log('use effect called');

        window.api.sendRequest('request-loadCurrentList');

        window.api.receiveResponse('response-loadCurrentList', (event, text) => {
            console.log('loadCurrentList response received from main. Length: ' + text.length)
            setCurrentList(text)
        })

        return () => {
            window.api.removeAllListeners('response-loadCurrentList');
        }
    }, [])

    // AddTasksFab and AddTasksModal states
    const [show, setShow] = React.useState(false);

    return (
        <div className="CurrentTasksBodyContainer">
            <TaskDisplay currentList={currentList} setCurrentList={setCurrentList} completedList={completedList} setCompletedList={setCompletedList} />
            <AddTasksFab setShow={setShow} />
            <AddTasksModal currentList={currentList} setCurrentList={setCurrentList} show={show} setShow={setShow} />
        </div>);
}

export default CurrentTasksBodyContainer;