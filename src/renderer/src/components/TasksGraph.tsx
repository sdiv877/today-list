import React, { FC } from 'react';
import { Card, Divider } from '@material-ui/core';
import { Bar, BarChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import SwitchGraphButton, { SwitchGraphOperation } from './buttons/SwitchGraphButton';

import { DefaultTaskGraphData, DefaultTaskGraphYearData } from '../../../common/models/task-graph-data.model';
import { LOG } from '../../../common/utils/debug';

import '../styles/TasksGraph.css';

interface TasksGraphProps {
  setSelectedYear: React.Dispatch<React.SetStateAction<number>>
}

const TasksGraph: FC<TasksGraphProps> = (props): JSX.Element => {
  // graph data
  const [graphData, setGraphData] = React.useState(DefaultTaskGraphData);
  const [yearData, setYearData] = React.useState(DefaultTaskGraphYearData);
  // buttons to switch yearData displayed in graph
  const [prevDisabled, setPrevDisabled] = React.useState(false);
  const [nextDisabled, setNextDisabled] = React.useState(false);

  /**
   * Fetch TaskGraphData from API, but don't set yearData yet as it takes some time
   * for setGraphData to finish.
   */
  React.useEffect(() => {
      LOG('TasksGraph useEffect() called');
      window.api.stats.getTaskGraphData().then((graphDataRes) => {
          window.ipcRendererManager.LOG('TaskGraphData received from main. Length: ' + graphDataRes.years.length);
          setGraphData(graphDataRes);
      })
  }, [])

  /**
   * On every update of graphData (actual completion of setGraphData() hook), update
   * the yearData that is currrently visible in the graph to the data that is closest
   * to the current year.
   */
  React.useEffect(() => {
      // attempt to find yearData from current year
      let currentYearIndex = graphData.years.indexOf(graphData.currentYear);
      if (currentYearIndex === -1) {
        // if not available just pick the latest year available
        currentYearIndex = graphData.years.length - 1;
      }
      props.setSelectedYear(graphData.yearlyData[currentYearIndex].year);
      setYearData(graphData.yearlyData[currentYearIndex]);
      handleSwitchGraphButtonState(currentYearIndex);
  }, [graphData])

  function handleSetYear(operation: SwitchGraphOperation) {
    const currentYearIndex = graphData.years.indexOf(yearData.year);
    let newYearIndex = currentYearIndex;
    if ((operation === 'next') && (yearData.year < graphData.yearRange.max)) {
      newYearIndex++;
    } else if ((operation === 'prev') && (yearData.year > graphData.yearRange.min)) {
      newYearIndex --;
    }
    props.setSelectedYear(graphData.yearlyData[newYearIndex].year);
    setYearData(graphData.yearlyData[newYearIndex]);
    handleSwitchGraphButtonState(newYearIndex);
    LOG("yearData set to " + yearData.year);
  }

  function handleSwitchGraphButtonState(currentYearIndex: number) {
    setNextDisabled(currentYearIndex >= (graphData.yearlyData.length - 1));
    setPrevDisabled(currentYearIndex <= 0);
  }

  const xAxisTickFormatter = (value: string) => {
    const limit = 3;
    if (value.length <= limit) return value;
    return value.substring(0, limit);
  };

  return (
    <Card variant="outlined" className="TasksGraph">
      <div className="graphTitle">
        Task completion in {yearData.year}
      </div>
      <Divider orientation="horizontal" />
      <div className="barGraph">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={yearData.monthlyData}>
            <XAxis dataKey="month" interval={0} tickFormatter={xAxisTickFormatter} />
            <YAxis
              domain={[0, 'auto']}
              label={{
                value: 'Number of Tasks',
                angle: -90,
                position: 'insideLeft'
              }}
            />
            <Tooltip />
            <Legend />
            <Bar dataKey="Created" fill="#8884d8" />
            <Bar dataKey="Completed" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="graphButtons">
        <SwitchGraphButton operation={'prev'} setSelectedYear={handleSetYear} disabled={prevDisabled} />
        <SwitchGraphButton operation={'next'} setSelectedYear={handleSetYear} disabled={nextDisabled} />
      </div>
    </Card>
  );
};

export default TasksGraph;
