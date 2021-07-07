import React from 'react';
import { Drawer, List, Divider, makeStyles } from '@material-ui/core';

import AppDrawerButton from './AppDrawerButton'

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
                    <AppDrawerButton label={'Current Tasks'} path={'/'} />
                    <AppDrawerButton label={'Completed Tasks'} path={'/completed'} />
                    <AppDrawerButton label={'Recycle Bin'} path={'/bin'} />

                    <Divider orientation="horizontal" />

                    <AppDrawerButton label={'Stats'} path={'/stats'} />

                    <Divider orientation="horizontal" />

                    <AppDrawerButton label={'Settings'} path={'/settings'} />

                    <Divider orientation="horizontal" />
                </List>
            </Drawer>);
}

export default AppDrawer;