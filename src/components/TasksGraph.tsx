import React from 'react'
import { BarChart, XAxis, YAxis, Tooltip, Legend, Bar, ResponsiveContainer } from 'recharts'
import { Card, Divider } from '@material-ui/core';

import TasksGraphData from '../models/TasksGraphData';

import '../styles/TasksGraph.css'

const TasksGraph: React.VoidFunctionComponent = () => {
    // Graph data states
    const [graphData, setGraphData] = React.useState(new Array<TasksGraphData>())

    // Handling getting graph-data from db on page reload
    React.useEffect(() => {
        console.log('use effect called');

        window.api.sendRequest('request-graph-data', 'n/a');

        window.api.receiveGraphDataResponse('response-graph-data', (event, graph_data_res) => {
            console.log('Graph data response received from main')
            setGraphData(graph_data_res);
        })

        return () => {
            window.api.removeAllListeners('response-graph-data');
        }
    }, [])

    return (
        <Card variant='outlined' className="TasksGraph">

            <div className="graphTitle">
                Task completion in 2021
            </div>

            <Divider orientation='horizontal' />

            <div className="barGraph">
                <ResponsiveContainer width="150%" height={300}>
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
        </Card>);
}

export default TasksGraph;