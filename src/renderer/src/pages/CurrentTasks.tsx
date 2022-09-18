import React from "react";

import CurrentTasksHeaderContainer from "../components/containers/CurrentTasksHeaderContainer";
import CurrentTasksBodyContainer from "../components/containers/CurrentTasksBodyContainer";

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
