import React, { FC } from 'react';
import { LOG } from '../../../../common/utils/debug';
import { Card, Divider, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { Create, CheckBox } from '@material-ui/icons';

import MostProductiveStat from '../text/MostProductiveStat';

import TaskStats from '../../../../common/models/TaskStats';

import '../../styles/StatsCard.css'

// Props types
interface StatsCardProps {
    title: string,
    year: number,
}

const initialStats: TaskStats = { totalCreated: 0, totalCompleted: 0 }

const StatsCard: FC<StatsCardProps> = (props): JSX.Element => {
    const [stats, setStats] = React.useState(initialStats);

    // Handling getting task stats on page reload or props.year change
    React.useEffect(() => {
        LOG('StatsCard useEffect() called');

        // if (props.title === 'Annual Stats') {
        //     // get annual task stats
        //     window.statistics.getAnnualTaskStats((event, task_stats_res) => {
        //         setStats(task_stats_res);
        //     })
        // } else {
        //     // get the overall task stats
        //     window.statistics.getOverallTaskStats((event, task_stats_res) => {
        //         setStats(task_stats_res);
        //     })
        // }

        // // remove listeners when component unmounts
        // return () => {
        //     window.app.removeAllListeners('response-annual-task-stats');
        //     window.app.removeAllListeners('response-overall-task-stats');
        // }
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
                    <MostProductiveStat title={props.title} text={"MISSING API CALL stats.mostProductiveYear()"} value={stats.mostProductiveCount} />
                </List>
            </div>
        </Card>
    );
}

export default StatsCard;
