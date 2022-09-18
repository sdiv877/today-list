import React from 'react';
import { Drawer, List, Divider, makeStyles } from '@material-ui/core';

import AppDrawerButton from './buttons/AppDrawerButton'

const useStyles = makeStyles(() => ({
    drawerWidth: {
        width: 80,
    },
    paper: {
        background: '#212a39'
    }
}));

function getCurrentRoute(): string {
    const routeDirectories = window.location.href.split('/'); // ex. http://localhost:3000/main_window#/stats
    const currentPath = '/' + routeDirectories[routeDirectories.length - 1]; // final dir is where we are e.g. /stats
    return currentPath;
}

const AppDrawer: React.VoidFunctionComponent = () => {
    const classes = useStyles();
    const [selectedRoute, setSelectedRoute] = React.useState(getCurrentRoute())

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
                
                <div className="appDrawerButtons" onClick={() => setSelectedRoute(getCurrentRoute())}>
                    <AppDrawerButton label={'Current Tasks'} selected={selectedRoute} path={'/'} />
                    <AppDrawerButton label={'Completed Tasks'} selected={selectedRoute} path={'/completed'} />
                    <AppDrawerButton label={'Recycle Bin'} selected={selectedRoute} path={'/bin'} />
                    <Divider orientation="horizontal" />
                    <AppDrawerButton label={'Stats'} selected={selectedRoute} path={'/stats'} />
                    <Divider orientation="horizontal" />
                    <AppDrawerButton label={'Settings'} selected={selectedRoute} path={'/settings'} />
                    <Divider orientation="horizontal" />
                </div>
            </List>
        </Drawer>);
}

export default AppDrawer;