import React from 'react';

import StatsHeaderContainer from '../components/containers/StatsHeaderContainer'
import StatsBodyContainer from '../components/containers/StatsBodyContainer'

const Stats: React.VoidFunctionComponent = () => {

    // /stats
    return (
        <div className="StatsPage">
            <StatsHeaderContainer />
            <StatsBodyContainer />
        </div>);
}

export default Stats;