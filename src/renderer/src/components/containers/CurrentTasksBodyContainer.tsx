import React from 'react';
import AddTasksModal from '../AddTasksModal';
import AddTasksFab from '../buttons/AddTasksFab';
import CurrentTasksDisplay from '../cards/task/CurrentTasksDisplay';

import { Task, TaskStatus } from '../../../../common/models/task.model';
import { sortTaskList, setDocumentBgColour } from '../../utils/task-display-helpers';
import { ButtonColour } from '../../../../common/utils/colours';
import { LOG } from '../../../../common/utils/debug';

const CurrentTasksBodyContainer: React.VoidFunctionComponent = () => {
  // currentList states
  const [currentList, setCurrentList] = React.useState(new Array<Task>());
  // AddTasksFab and AddTasksModal states
  const [show, setShow] = React.useState(false);
  const [buttonColour, setButtonColour] = React.useState(ButtonColour.Blue);

  // handle getting Tasks from db on page reload
  React.useEffect(() => {
    LOG('CurrentTasksBodyContainer useEffect() called');
    window.api.settings.get().then((userSettingsRes) => {
      setDocumentBgColour(userSettingsRes.bgColour);
    })
    // get all InProgress Tasks
    window.api.task.getAll(TaskStatus.InProgress).then((taskRes) => {
      window.ipcRendererManager.LOG('Current Tasks response received from main. Length: ' + taskRes.length);
      setCurrentList(sortTaskList(taskRes));
    });
    // getting button colour info
    window.api.settings.get().then((userSettingsRes) => {
      LOG('User settings received from main: ' + JSON.stringify(userSettingsRes));
      setButtonColour(userSettingsRes.buttonColour);
    })
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
