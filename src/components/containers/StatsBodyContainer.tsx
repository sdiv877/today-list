import React from 'react';

import TasksGraph from '../TasksGraph';
import StatsCard from '../cards/StatsCard'

const StatsBodyContainer: React.VoidFunctionComponent = () => {

    const [year, setYear] = React.useState(new Date().getFullYear());

    return (
        < div className="StatsBodyContainer" >
            <TasksGraph year={year} setYear={setYear} />
            <StatsCard title={'Annual Stats'} year={year} />
            <StatsCard title={'Overall Stats'} year={0} />
        </div >);
}

export default StatsBodyContainer;