import React, {FC} from 'react'
import { BarChart, XAxis, YAxis, Tooltip, Legend, Bar, ResponsiveContainer } from 'recharts'
import { Card, Divider } from '@material-ui/core';

import SwitchGraphButton from './buttons/SwitchGraphButton'

import TasksGraphData from '../models/TasksGraphData';

import '../styles/TasksGraph.css'

// Props types
interface TasksGraphProps {
    year: number,
    setYear: React.Dispatch<React.SetStateAction<number>>,
}

const TasksGraph: FC<TasksGraphProps> = (props): JSX.Element => {
    // Graph data states
    const [graphData, setGraphData] = React.useState(new Array<TasksGraphData>())
    const [graphRange, setGraphRange] = React.useState([new Date().getFullYear(), new Date().getFullYear()]);

    // Handling getting graph-data from db on page reload
    React.useEffect(() => {
        console.log('use effect called');

        // Get the graph data for the current year
        window.statistics.sendGraphDataRequest('request-graph-data', props.year);

        window.statistics.receiveGraphDataResponse('response-graph-data', (event, graph_data_res) => {
            console.log('Graph data response received from main')
            setGraphData(graph_data_res);
        })


        // Get the graph range (min and max year) to decide how many pages we need
        window.statistics.sendGraphDataRequest('request-graph-range', props.year);

        window.statistics.receiveGraphRangeResponse('response-graph-range', (event, graph_range_res) => {
            console.log('Graph year range response received from main')
            console.log(graph_range_res);
            setGraphRange(graph_range_res);
        })

        // Remove listeners when component unmounts
        return () => {
            window.app.removeAllListeners('response-graph-data');
            window.app.removeAllListeners('response-graph-range');
        }
    }, [])

    function handleSetYear(year: number) {
        // When we change the year
        props.setYear(year);

        // We need to request the new data that needs to be displayed for it
        window.statistics.sendGraphDataRequest('request-graph-data', year);

        window.statistics.receiveGraphDataResponse('response-graph-data', (event, graph_data_res) => {
            console.log('Graph data response received from main')

            // And set the react state to reflect this change in year
            setGraphData(graph_data_res);
            // Synchronously removeAllListeners
            window.app.removeAllListeners('response-graph-data');
        })
    }

    return (
        < Card variant='outlined' className="TasksGraph" >

            <div className="graphTitle">
                Task completion in {props.year.toString()}
            </div>

            <Divider orientation='horizontal' />

            <div className="barGraph">
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={graphData} >
                        <XAxis dataKey="month" />
                        <YAxis domain={[0, 'auto']} label={{ value: 'Number of Tasks', angle: -90, position: 'insideLeft' }} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="Created" fill="#8884d8" />
                        <Bar dataKey="Completed" fill="#82ca9d" />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            <div className="graphButtons">
                <SwitchGraphButton label={'prev'} graphRange={graphRange} year={props.year} setYear={handleSetYear} />
                <SwitchGraphButton label={'next'} graphRange={graphRange} year={props.year} setYear={handleSetYear} />
            </div>
        </Card >);
}

export default TasksGraph;