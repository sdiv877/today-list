import React from 'react';
import { Drawer, List, Divider, makeStyles } from '@material-ui/core';

import AppDrawerButton from './buttons/AppDrawerButton'

const useStyles = makeStyles(() => ({
    drawerWidth: {
        width: 80,
    },
    paper: {
        background: '#212a39',
        opacity: 0.95,
    }
}));

function getCurrentPath(): string {
    const subDirectories = window.location.href.split('/');
    const currentPath = '/' + subDirectories[subDirectories.length - 1];

    return currentPath;
}

const AppDrawer: React.VoidFunctionComponent = () => {

    const classes = useStyles();

    const [selected, setSelected] = React.useState(getCurrentPath())

    return (
        <Drawer
            variant="permanent"
            anchor="left"
            className={classes.drawerWidth}
            classes={{ paper: classes.paper }}
        >
            <List>
                {/* On clicking any of the appDrawerButtons, get the currentPath (page) we're on
                and set 'selected' to it. The button then checks if the path it links to
                is the same as the 'selected'. If so its icon color is changed to white.*/}

                <div className="appDrawerButtons" onClick={() => setSelected(getCurrentPath())}>
                    <AppDrawerButton label={'Current Tasks'} selected={selected} path={'/'} />
                    <AppDrawerButton label={'Completed Tasks'} selected={selected} path={'/completed'} />
                    <AppDrawerButton label={'Recycle Bin'} selected={selected} path={'/bin'} />

                    <Divider orientation="horizontal" />

                    <AppDrawerButton label={'Stats'} selected={selected} path={'/stats'} />

                    <Divider orientation="horizontal" />

                    <AppDrawerButton label={'Settings'} selected={selected} path={'/settings'} />

                    <Divider orientation="horizontal" />
                </div>
            </List>
        </Drawer>);
}

export default AppDrawer;