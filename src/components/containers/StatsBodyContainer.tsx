import React from 'react';

import TasksGraph from '../TasksGraph';
import StatsCard from '../text/StatsCard'

const StatsBodyContainer: React.VoidFunctionComponent = () => {
    
    const [year, setYear] = React.useState(new Date().getFullYear())

    return (
        <div className="StatsBodyContainer">
            <TasksGraph year={year} setYear={setYear} />
            <StatsCard title={'Annual Stats'} year={year} />
            <StatsCard title={'Overall Stats'} year={year} />
        </div>);
}

export default StatsBodyContainer;