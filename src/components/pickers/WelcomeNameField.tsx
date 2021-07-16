import React from 'react';
import { consoleLog } from '../../utils/debug'
import { Typography, makeStyles } from "@material-ui/core"

const useStyles = makeStyles(() => ({
    root: {
        fontSize: 40,
        fontFamily: 'Montserrat',
        fontWeight: 500,

        paddingTop: 0,
        paddingBottom: 0,

        textAlign: 'center',
    },
}));

const WelcomeNameField: React.VoidFunctionComponent = () => {

    const [username, setUsername] = React.useState('')

    React.useEffect(() => {
        consoleLog('use effect called');

        window.user_data.sendUserDataRequest();

        window.user_data.receiveUserDataResponse('response-user-data', (event, user_data_res) => {
            consoleLog('User data response received from main: ' + JSON.stringify(user_data_res));
            setUsername(user_data_res.username);
        })

        return () => {
            window.app.removeAllListeners('response-user-data');
        }
    }, [])


    const classes = useStyles();

    if (username === '') {
        return null;

    } else {
        return (
            <div className="WelcomeNameField">
                <style>
                    @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
                </style>

                <Typography className={classes.root}>
                    {username}
                </Typography>
            </div>);
    }
}

export default WelcomeNameField;