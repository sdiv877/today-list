import React from 'react';
import { makeStyles, TextField } from "@material-ui/core"

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
        console.log('use effect called');

        window.api.sendUserDataRequest();

        window.api.receiveUserDataResponse('response-user-data', (event, user_data_res) => {
            console.log('User data response received from main: ' + JSON.stringify(user_data_res));
            setUsername(user_data_res.username);
        })

        return () => {
            window.api.removeAllListeners('response-user-data');
        }
    }, [])


    const classes = useStyles();

    return (
        <div className="WelcomeNameField">
            <TextField
                fullWidth
                InputProps={{ disableUnderline: true }}
                inputProps={{ className: classes.root }}
                placeholder="Enter your name"
                value={username}
            />
        </div>);
}

export default WelcomeNameField;