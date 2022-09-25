import React, { FC } from 'react';
import {
  Card,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import { CheckBox, Create, Today } from '@material-ui/icons';

import { TaskStatsType, getDefaultTaskStats } from '../../../../common/models/task-stats.model';
import { LOG } from '../../../../common/utils/debug';

import '../../styles/StatsCard.css';

// Props types
interface StatsCardProps {
  type: TaskStatsType;
  selectedYear?: number;
}

const StatsCard: FC<StatsCardProps> = (props): JSX.Element => {
  const [stats, setStats] = React.useState(getDefaultTaskStats(props.type));

  // get TaskStats on page reload or `props.selectedYear` change
  React.useEffect(() => {
    LOG('StatsCard useEffect() called');
    if (props.type === 'Annual Stats') {
      window.api.stats.getAnnualTaskStats(props.selectedYear).then((taskStatsRes) => {
        setStats(taskStatsRes);
      })
    } else {
      window.api.stats.getOverallTaskStats().then((taskStatsRes) => {
        setStats(taskStatsRes);
      })
    }
  }, [props.selectedYear]);

  return (
    <Card className="statsCard" variant="outlined">
      <div className="statsTitle">{props.type}</div>
      <Divider orientation="horizontal" />
      <div className="statsText">
        <List className="statsTextList">
          <ListItem>
            <ListItemIcon>
              <Create />
            </ListItemIcon>
            <ListItemText primary={'Tasks created: ' + stats.totalCreated} />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <CheckBox />
            </ListItemIcon>
            <ListItemText
              primary={'Tasks completed: ' + stats.totalCompleted}
            />
          </ListItem>
          <div className="mostProductiveStat">
            <ListItem>
              <ListItemIcon>
                <Today />
              </ListItemIcon>
              <ListItemText
                primary={
                  `Most productive period: ${stats.mostProductivePeriod} [${stats.totalCompleted} tasks completed]`
                }
              />
            </ListItem>
          </div>
        </List>
      </div>
    </Card>
  );
};

export default StatsCard;
