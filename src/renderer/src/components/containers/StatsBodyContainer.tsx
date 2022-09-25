import React from "react";

import TasksGraph from "../TasksGraph";
import StatsCard from "../cards/StatsCard";

import "../../styles/fadeIn.css";
import { getCurrentYear } from "../../../../common/utils/dates";

const StatsBodyContainer: React.VoidFunctionComponent = () => {
  const [selectedYear, setSelectedYear] = React.useState(getCurrentYear());

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
