import React, { FC } from 'react';
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { Today, DateRange } from '@material-ui/icons';

// Props types
interface MostProductiveStatProps {
    title: string,
    text: string,
    value: number,
}

const MostProductiveStat: FC<MostProductiveStatProps> = (props): JSX.Element => {
    if (props.title === 'Annual Stats')
        return (
            <div className="mostProductiveStat">
                <ListItem>
                    <ListItemIcon>
                        <Today />
                    </ListItemIcon>
                    <ListItemText primary={"Most productive month: " + ' ' + props.text + ' [' + props.value + ' tasks completed]'} />
                </ListItem>
            </div>
        );
    else {
        return (
            <div className="mostProductiveStat">
                <ListItem>
                    <ListItemIcon>
                        <DateRange />
                    </ListItemIcon>
                    <ListItemText primary={"Most productive year: " + ' ' + props.text + ' [' + props.value + ' tasks completed]'} />
                </ListItem>
            </div>
        );
    }
}

export default MostProductiveStat;
