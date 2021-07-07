import React from 'react';
import { Drawer, List, Divider, Tooltip, ListItem, ListItemIcon, withStyles, makeStyles } from '@material-ui/core';
import { v4 as uuid } from 'uuid';

import { getIcon } from '../utils/AppDrawerHelpers'

const ButtonTooltip = withStyles(() => ({
    tooltip: {
        border: '2px solid',
        color: 'white',
        fontSize: 17,
        fontWeight: 400,
    },
}))(Tooltip);

const useStyles = makeStyles(() => ({
    drawerPaper: {
        width: 80,
    },
}));

const AppDrawer: React.VoidFunctionComponent = () => {

    const classes = useStyles();

    return (
        <Drawer
            variant="permanent"
            anchor="left"
            className={classes.drawerPaper}
        >
            <List>
                {['Current Tasks', 'Completed Tasks', 'Recycle Bin'].map((icon) => (
                    <ButtonTooltip title={icon} arrow placement="right" key={icon}>
                        <ListItem button key={uuid()} >
                            <ListItemIcon>
                                {getIcon(icon)}
                            </ListItemIcon>
                        </ListItem>
                    </ButtonTooltip>
                ))}

                <Divider orientation="horizontal" />

                {['Stats'].map((icon) => (
                    <ButtonTooltip title={icon} arrow placement="right" key={icon}>
                        <ListItem button >
                            <ListItemIcon>
                                {getIcon(icon)}
                            </ListItemIcon>
                        </ListItem>
                    </ButtonTooltip>
                ))}

                <Divider orientation="horizontal" />

                {['Settings'].map((icon) => (
                    <ButtonTooltip title={icon} arrow placement="right" key={icon}>
                        <ListItem button >
                            <ListItemIcon>
                                {getIcon(icon)}
                            </ListItemIcon>
                        </ListItem>
                    </ButtonTooltip>
                ))}

                <Divider orientation="horizontal" />
            </List>
        </Drawer>);
}

export default AppDrawer;