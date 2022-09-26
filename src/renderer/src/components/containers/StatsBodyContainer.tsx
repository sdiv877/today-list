import React from "react";

import TasksGraph from "../TasksGraph";
import StatsCard from "../cards/StatsCard";

import { setDocumentBgColour } from "../../utils/task-display-helpers";
import { getCurrentYear } from "../../../../common/utils/dates";

import "../../styles/fadeIn.css";

const StatsBodyContainer: React.VoidFunctionComponent = () => {
  const [selectedYear, setSelectedYear] = React.useState(getCurrentYear());

  React.useEffect(() => {
    window.api.settings.get().then((userSettingsRes) => {
      setDocumentBgColour(userSettingsRes.bgColour);
    })
  },[])

  return (
    <div className="StatsBodyContainer">
      <div className="fadeIn">
        <TasksGraph setSelectedYear={setSelectedYear} />
        <StatsCard type={"Annual Stats"} selectedYear={selectedYear} />
        <StatsCard type={"Overall Stats"} />
      </div>
    </div>
  );
};

export default StatsBodyContainer;
