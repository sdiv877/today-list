import React from 'react';

import CompletedTasksBodyContainer from '../components/containers/CompletedTasksBodyContainer';
import CompletedTasksHeaderContainer from '../components/containers/CompletedTasksHeaderContainer';

/**
 * /completed
 */
const CompletedTasks: React.VoidFunctionComponent = () => {
  return (
    <div className="CompletedTasksPage">
      <CompletedTasksHeaderContainer />
      <CompletedTasksBodyContainer />
    </div>
  );
};

export default CompletedTasks;
