import React from 'react';

import StatsCard from '../cards/StatsCard';
import TasksGraph from '../TasksGraph';

import '../../styles/fadeIn.css';

const StatsBodyContainer: React.VoidFunctionComponent = () => {
  const [year, setYear] = React.useState(new Date().getFullYear());

  return (
    <div className="StatsBodyContainer">
      <div className="fadeIn">
        <TasksGraph year={year} setYear={setYear} />
        <StatsCard title={'Annual Stats'} year={year} />
        <StatsCard title={'Overall Stats'} year={0} />
      </div>
    </div>
  );
};

export default StatsBodyContainer;
