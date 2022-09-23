import React from 'react';
import AddTasksModal from '../AddTasksModal';
import AddTasksFab from '../buttons/AddTasksFab';
import CurrentTasksDisplay from '../cards/task/CurrentTasksDisplay';

import { LOG } from '../../../../common/utils/debug';
import { Task, TaskStatus } from '../../../../common/models/task.model';
import { sortTaskList } from '../../utils/task-display-helpers';
import { ButtonColour } from '../../../../common/utils/colours';

const CurrentTasksBodyContainer: React.VoidFunctionComponent = () => {
  // currentList states
  const [currentList, setCurrentList] = React.useState(new Array<Task>());
  // AddTasksFab and AddTasksModal states
  const [show, setShow] = React.useState(false);
  const [buttonColour, setButtonColour] = React.useState(ButtonColour.Blue);

  // handle getting Tasks from db on page reload
  React.useEffect(() => {
    LOG('CurrentTasksBodyContainer useEffect() called');
    // get all InProgress Tasks
    window.api.task.getAll(TaskStatus.InProgress).then((taskRes) => {
      window.ipcRendererManager.LOG('Current Tasks response received from main. Length: ' + taskRes.length);
      setCurrentList(sortTaskList(taskRes) as Task[]);
    });
    // getting button colour info
    // window.user_data.receiveUserSettingsResponse('response-user-data', (event, user_data_res) => {
    //     LOG('User data response received from main: ' + JSON.stringify(user_data_res));

    //     if (user_data_res.button_colour === '') {
    //         setButtonColour(ButtonColour.Blue)
    //     } else {
    //         setButtonColour(user_data_res.button_colour);
    //     }
    // })
  }, []);

  return (
    <div className="CurrentTasksBodyContainer">
      <CurrentTasksDisplay
        currentList={currentList}
        setCurrentList={setCurrentList}
      />
      <AddTasksFab setShow={setShow} buttonColour={buttonColour} />
      <AddTasksModal
        currentList={currentList}
        setCurrentList={setCurrentList}
        show={show}
        setShow={setShow}
        buttonColour={buttonColour}
      />
    </div>
  );
};

export default CurrentTasksBodyContainer;
