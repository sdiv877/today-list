import React from 'react';

import StatsBodyContainer from '../components/containers/StatsBodyContainer';
import StatsHeaderContainer from '../components/containers/StatsHeaderContainer';

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
