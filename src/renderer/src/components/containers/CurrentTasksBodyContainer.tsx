import React, { useContext } from 'react';
import { UserSettingsContext } from '../../providers/UserSettingsProvider';
import AddTasksModal from '../modals/AddTasksModal';
import AddTasksFab from '../buttons/AddTasksFab';
import CurrentTasksDisplay from '../cards/task/CurrentTasksDisplay';

import { Task, TaskStatus } from '../../../../common/models/task.model';
import { sortTaskList } from '../../utils/task-display-helpers';
import { LOG } from '../../../../common/utils/debug';

const CurrentTasksBodyContainer: React.VoidFunctionComponent = () => {
  const userSettingsContext = useContext(UserSettingsContext);
  const [currentTaskList, setCurrentTaskList] = React.useState(
    new Array<Task>()
  );
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    LOG('CurrentTasksBodyContainer useEffect() called');
    window.api.task.getAll(TaskStatus.InProgress).then((taskRes) => {
      window.ipcRendererManager.LOG(
        'Current Tasks response received from main. Length: ' + taskRes.length
      );
      setCurrentTaskList(sortTaskList(taskRes));
    });
  }, []);

  return (
    <div className="CurrentTasksBodyContainer">
      <CurrentTasksDisplay
        currentList={currentTaskList}
        setCurrentTaskList={setCurrentTaskList}
      />
      <AddTasksFab
        setShow={setShow}
        buttonColour={userSettingsContext.buttonColour}
      />
      <AddTasksModal
        currentTaskList={currentTaskList}
        setCurrentTaskList={setCurrentTaskList}
        show={show}
        setShow={setShow}
        buttonColour={userSettingsContext.buttonColour}
      />
    </div>
  );
};

export default CurrentTasksBodyContainer;
