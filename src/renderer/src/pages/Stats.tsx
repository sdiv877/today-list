import React from "react";

import StatsHeaderContainer from "../components/containers/StatsHeaderContainer";
import StatsBodyContainer from "../components/containers/StatsBodyContainer";

/**
 * /stats
 */
const Stats: React.VoidFunctionComponent = () => {
  return (
    <div className="StatsPage">
      <StatsHeaderContainer />
      <StatsBodyContainer />
    </div>
  );
};

export default Stats;
