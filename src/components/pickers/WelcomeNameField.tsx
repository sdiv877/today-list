import React from 'react';
import { makeStyles, TextField } from "@material-ui/core"

const WelcomeNameField: React.VoidFunctionComponent = () => {

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

    const classes = useStyles();

    return (
        <div className="WelcomeNameField">
            <TextField
                fullWidth
                InputProps={{ disableUnderline: true }}
                inputProps={{ className: classes.root }}
                placeholder="Enter your name"
            />
        </div>);
}

export default WelcomeNameField;