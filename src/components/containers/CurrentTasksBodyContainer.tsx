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

    // Handling async initialLists
    React.useEffect(() => {
        console.log('use effect called');

        const currentListPromise = window.api.currentList;
        currentListPromise.then((res: Task[]) => setCurrentList(res))

        // window.location.reload();

        window.api.sendText('text-from-renderer', 'ping');

        window.api.receiveText('text-from-main', (event, text) => {
            console.log('Text from main: ' + text.length)
            setCurrentList(text)
        })

        return () => {
            window.api.removeAllListeners('text-from-main');
        }

        // if (window.api.activeCurrentList.length > 0) {
        //     console.log('h');
        // }
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