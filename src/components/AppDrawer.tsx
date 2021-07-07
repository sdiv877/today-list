import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import { Drawer, List, Divider, makeStyles } from '@material-ui/core';

import AppDrawerButton from './AppDrawerButton'

import CurrentTasks from '../pages/CurrentTasks'
import Settings from '../pages/Settings'
import CompletedTasks from '../pages/CompletedTasks';
import RecycleBin from '../pages/RecycleBin';
import Stats from '../pages/Stats';

const useStyles = makeStyles(() => ({
    drawerPaper: {
        width: 80,
    },
}));

const AppDrawer: React.VoidFunctionComponent = () => {

    const classes = useStyles();

    return (
        <HashRouter>

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
            </Drawer>

            <main>
                <Route exact path="/" component={CurrentTasks} />
                <Route exact path="/completed" component={CompletedTasks} />
                <Route exact path="/bin" component={RecycleBin} />
                <Route exact path="/stats" component={Stats} />
                <Route path="/settings" component={Settings} />
            </main>

        </HashRouter>);
}

export default AppDrawer;