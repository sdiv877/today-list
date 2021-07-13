import React, { FC } from 'react';
import { Card, Divider, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { Create, CheckBox, Today, DateRange } from '@material-ui/icons';

import '../../styles/StatsCard.css'

// Props types
interface StatsCardProps {
    title: string,
    year: number,
}

const StatsCard: FC<StatsCardProps> = (props): JSX.Element => {

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
                        <ListItemText primary="Tasks created: " />
                    </ListItem>

                    <ListItem>
                        <ListItemIcon>
                            <CheckBox />
                        </ListItemIcon>
                        <ListItemText primary="Tasks completed: " />
                    </ListItem>

                    <ListItem>
                        <ListItemIcon>
                            <Today />
                        </ListItemIcon>
                        <ListItemText primary="Most productive month: " />
                    </ListItem>

                    <ListItem>
                        <ListItemIcon>
                            <DateRange />
                        </ListItemIcon>
                        <ListItemText primary="Most productive year: " />
                    </ListItem>
                </List>
            </div>
        </Card>
    );
}

export default StatsCard;