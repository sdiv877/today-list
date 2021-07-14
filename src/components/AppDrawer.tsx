import React from 'react';
import { Drawer, List, Divider, makeStyles } from '@material-ui/core';

import AppDrawerButton from './buttons/AppDrawerButton'

const useStyles = makeStyles(() => ({
    drawerWidth: {
        width: 80,
    },
}));

const AppDrawer: React.VoidFunctionComponent = () => {

    const [hookStyles, setHookStyles] = React.useState(makeStyles(() => ({
        paperColour: {
            background: 'white',
        },
    })))

    React.useEffect(() => {
        console.log('use effect called');

        window.api.sendUserDataRequest();

        window.api.receiveUserDataResponse('response-user-data', (event, user_data_res) => {
            console.log('User data response received from main: ' + JSON.stringify(user_data_res));
            setHookStyles(makeStyles(() => ({
                paperColour: {
                    background: user_data_res.bg_colour,
                },
            })));
        })

        return () => {
            window.api.removeAllListeners('response-user-data');
        }
    }, [])

    const classes = useStyles();

    return (
        <Drawer
            variant="permanent"
            anchor="left"
            className={classes.drawerWidth}
            classes={{ paper: hookStyles.paperColour }}
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