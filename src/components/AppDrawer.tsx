import React from 'react';
import { HashRouter, Route, Link } from 'react-router-dom';
import { Drawer, List, Divider, Tooltip, ListItem, ListItemIcon, withStyles, makeStyles } from '@material-ui/core';

import { getIcon } from '../utils/AppDrawerHelpers'

import CurrentTasks from '../pages/CurrentTasks'
import Settings from '../pages/Settings'
import CompletedTasks from '../pages/CompletedTasks';
import RecycleBin from '../pages/RecycleBin';
import Stats from '../pages/Stats';

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
        <HashRouter>

            <Drawer
                variant="permanent"
                anchor="left"
                className={classes.drawerPaper}
            >
                <List>
                    <ButtonTooltip title={'Current Tasks'} arrow placement="right" key={'Current Tasks'}>
                        <ListItem button component={Link} to="/" replace >
                            <ListItemIcon>
                                {getIcon('Current Tasks')}
                            </ListItemIcon>
                        </ListItem>
                    </ButtonTooltip>

                    <ButtonTooltip title={'Completed Tasks'} arrow placement="right" key={'Completed Tasks'}>
                        <ListItem button component={Link} to="/completed" replace >
                            <ListItemIcon>
                                {getIcon('Completed Tasks')}
                            </ListItemIcon>
                        </ListItem>
                    </ButtonTooltip>

                    <ButtonTooltip title={'Recycle Bin'} arrow placement="right" key={'Recycle Bin'}>
                        <ListItem button component={Link} to="/bin" replace >
                            <ListItemIcon>
                                {getIcon('Recycle Bin')}
                            </ListItemIcon>
                        </ListItem>
                    </ButtonTooltip>

                    <Divider orientation="horizontal" />

                    <ButtonTooltip title={'Stats'} arrow placement="right" key={'Stats'}>
                        <ListItem button component={Link} to="/stats" replace >
                            <ListItemIcon>
                                {getIcon('Stats')}
                            </ListItemIcon>
                        </ListItem>
                    </ButtonTooltip>

                    <Divider orientation="horizontal" />

                    <ButtonTooltip title={'Settings'} arrow placement="right" key={'Settings'}>
                        <ListItem button component={Link} to="/settings" replace >
                            <ListItemIcon>
                                {getIcon('Settings')}
                            </ListItemIcon>
                        </ListItem>
                    </ButtonTooltip>

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