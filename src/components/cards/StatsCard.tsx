import React, { FC } from 'react';
import { Card, Divider, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { Create, CheckBox } from '@material-ui/icons';

import MostProductiveStat from '../text/MostProductiveStat';

import TaskStats from '../../models/TaskStats'

import '../../styles/StatsCard.css'


// Props types
interface StatsCardProps {
    title: string,
    year: number,
}

const StatsCard: FC<StatsCardProps> = (props): JSX.Element => {

    const initialStats: TaskStats = { totalCreated: 0, totalCompleted: 0 }
    const [stats, setStats] = React.useState(initialStats);

    // Handling getting task stats on page reload or props.year change
    React.useEffect(() => {
        console.log('use effect called');

        if (props.title === 'Annual Stats') {
            // Get annual task stats
            window.api.sendTaskStatsRequest('request-annual-task-stats', props.year);

            window.api.receiveTaskStatsResponse('response-annual-task-stats', (event, task_stats_res) => {
                setStats(task_stats_res);
            })
        } else {
            // Get the overall task stats
            window.api.sendTaskStatsRequest('request-overall-task-stats', 0);

            window.api.receiveTaskStatsResponse('response-overall-task-stats', (event, task_stats_res) => {
                setStats(task_stats_res);
            })
        }

        // Remove listeners when component unmounts
        return () => {
            window.api.removeAllListeners('response-annual-task-stats');
            window.api.removeAllListeners('response-overall-task-stats');
        }
    }, [props.year])

    return (
        <Card className="statsCard" variant='outlined'>
            <div className="statsTitle">
                {props.title}
            </div>

            <Divider orientation='horizontal' />

            <div className="statsText">
                <List className="statsTextList">
                    <ListItem>
                        <ListItemIcon>
                            <Create />
                        </ListItemIcon>
                        <ListItemText primary={"Tasks created: " + stats.totalCreated} />
                    </ListItem>

                    <ListItem>
                        <ListItemIcon>
                            <CheckBox />
                        </ListItemIcon>
                        <ListItemText primary={"Tasks completed: " + stats.totalCompleted} />
                    </ListItem>

                    <MostProductiveStat title={props.title} text={stats.mostProductiveText} value={stats.mostProductiveValue} />
                </List>
            </div>
        </Card>
    );
}

export default StatsCard;