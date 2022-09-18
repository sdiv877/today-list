import React from 'react'
import { LOG } from "../../../../common/utils/debug"
import { Typography, makeStyles } from "@material-ui/core"
import "@fontsource/montserrat";

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
    const classes = useStyles();

    React.useEffect(() => {
        LOG('WelcomeNameField useEffect() called');

        // window.user_data.sendUserSettingsRequest();
        // window.user_data.receiveUserSettingsResponse('response-user-data', (event, user_data_res) => {
        //     LOG('User data response received from main: ' + JSON.stringify(user_data_res));
        //     setUsername(user_data_res.username);
        // })
        // return () => {
        //     window.app.removeAllListeners('response-user-data');
        // }
    }, [])

    if (username === '') {
        return null;
    } else {
        return (
            <div className="WelcomeNameField">
                <Typography className={classes.root}>
                    {username}
                </Typography>
            </div>
        );
    }
}

export default WelcomeNameField;