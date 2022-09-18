import React from "react";

import CompletedTasksHeaderContainer from "../components/containers/CompletedTasksHeaderContainer";
import CompletedTasksBodyContainer from "../components/containers/CompletedTasksBodyContainer";

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
