import React from 'react'
import { BarChart, XAxis, YAxis, Tooltip, Legend, Bar, ResponsiveContainer } from 'recharts'
import { Card, Divider } from '@material-ui/core';

import SwitchGraphButton from './buttons/SwitchGraphButton'

import TasksGraphData from '../models/TasksGraphData';

import '../styles/TasksGraph.css'

const TasksGraph: React.VoidFunctionComponent = () => {
    // Graph data states
    const [graphData, setGraphData] = React.useState(new Array<TasksGraphData>())
    const [graphRange, setGraphRange] = React.useState([new Date().getFullYear(), new Date().getFullYear()]);
    const [year, setYear] = React.useState(new Date().getFullYear())

    // Handling getting graph-data from db on page reload
    React.useEffect(() => {
        console.log('use effect called');

        window.api.sendGraphDataRequest('request-graph-data', year);

        window.api.receiveGraphDataResponse('response-graph-data', (event, graph_data_res) => {
            console.log('Graph data response received from main')
            setGraphData(graph_data_res);
        })

        window.api.sendGraphDataRequest('request-graph-range', year);

        window.api.receiveGraphRangeResponse('response-graph-range', (event, graph_range_res) => {
            console.log('Graph year range response received from main')
            console.log(graph_range_res);
            setGraphRange(graph_range_res);
        })

        return () => {
            window.api.removeAllListeners('response-graph-data');
            window.api.removeAllListeners('response-graph-range');
        }
    }, [])

    function handleSetYear(year: number) {

        setYear(year);

        window.api.sendGraphDataRequest('request-graph-data', year);

        window.api.receiveGraphDataResponse('response-graph-data', (event, graph_data_res) => {
            console.log('Graph data response received from main')
            setGraphData(graph_data_res);
            window.api.removeAllListeners('response-graph-data');
        })
    }

    return (
        < Card variant='outlined' className="TasksGraph" >

            <div className="graphTitle">
                Task completion in {year.toString()}
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
                <SwitchGraphButton label={'prev'} graphRange={graphRange} year={year} setYear={handleSetYear} />
                <SwitchGraphButton label={'next'} graphRange={graphRange} year={year} setYear={handleSetYear} />
            </div>
        </Card >);
}

export default TasksGraph;