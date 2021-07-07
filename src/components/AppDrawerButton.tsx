import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Tooltip, ListItem, ListItemIcon, withStyles } from '@material-ui/core';

import { getIcon } from '../utils/AppDrawerHelpers'

const ButtonTooltip = withStyles(() => ({
    tooltip: {
        border: '2px solid',
        color: 'white',
        fontSize: 17,
        fontWeight: 400,
    },
}))(Tooltip);

// Needed to let TS know explicitly what is passed from props
interface AppDrawerButtonProps {
    label: string,
    path: string,
}

const AppDrawerButton: FC<AppDrawerButtonProps> = (props): JSX.Element => {

    return (<ButtonTooltip title={props.label} arrow placement="right">
        <ListItem button component={Link} to={props.path} replace >
            <ListItemIcon>
                {getIcon(props.label)}
            </ListItemIcon>
        </ListItem>
    </ButtonTooltip>);
}

export default AppDrawerButton;