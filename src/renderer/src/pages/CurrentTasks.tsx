import React from 'react';

import CurrentTasksBodyContainer from '../components/containers/CurrentTasksBodyContainer';
import CurrentTasksHeaderContainer from '../components/containers/CurrentTasksHeaderContainer';

/**
 * /
 */
const CurrentTasks: React.VoidFunctionComponent = () => {
  return (
    <div className="CurrentTasksPage">
      <CurrentTasksHeaderContainer />
      <CurrentTasksBodyContainer />
    </div>
  );
};

export default CurrentTasks;
