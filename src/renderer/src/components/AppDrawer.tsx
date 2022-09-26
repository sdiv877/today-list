import React from 'react';
import { Drawer, List, Divider, makeStyles } from '@material-ui/core';

import AppDrawerButton from './buttons/AppDrawerButton';

export enum PageRoute {
  CURRENT_TASKS = '/',
  COMPLETED_TASKS = '/completed',
  RECYLE_BIN = '/bin',
  STATS = '/stats',
  SETTINGS = '/settings'
}

function getCurrentRoute(): PageRoute {
  const routeDirectories = window.location.href.split('/'); // ex. http://localhost:3000/main_window#/stats
  const currentPath = '/' + routeDirectories[routeDirectories.length - 1]; // final dir is where we are e.g. /stats
  if (!(Object.values(PageRoute) as string[]).includes(currentPath)) {
    return PageRoute.CURRENT_TASKS;
  }
  return currentPath as PageRoute;
}

const useStyles = makeStyles(() => ({
  drawerWidth: {
    width: 80
  },
  paper: {
    background: '#212a39'
  }
}));

const AppDrawer: React.VoidFunctionComponent = () => {
  const classes = useStyles();
  const [selectedRoute, setSelectedRoute] = React.useState(getCurrentRoute());

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
                is the same as 'selected'. If so, its icon color is changed to white.*/}
        <div
          className="appDrawerButtons"
          onClick={() => setSelectedRoute(getCurrentRoute())}
        >
          <AppDrawerButton
            label={'Current Tasks'}
            selected={selectedRoute}
            path={PageRoute.CURRENT_TASKS}
          />
          <AppDrawerButton
            label={'Completed Tasks'}
            selected={selectedRoute}
            path={PageRoute.COMPLETED_TASKS}
          />
          <AppDrawerButton
            label={'Recycle Bin'}
            selected={selectedRoute}
            path={PageRoute.RECYLE_BIN}
          />
          <Divider orientation="horizontal" />
          <AppDrawerButton
            label={'Stats'}
            selected={selectedRoute}
            path={PageRoute.STATS}
          />
          <Divider orientation="horizontal" />
          <AppDrawerButton
            label={'Settings'}
            selected={selectedRoute}
            path={PageRoute.SETTINGS}
          />
          <Divider orientation="horizontal" />
        </div>
      </List>
    </Drawer>
  );
};

export default AppDrawer;
