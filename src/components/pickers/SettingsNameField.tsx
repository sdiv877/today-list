import React from 'react';
import { TextField, InputAdornment } from "@material-ui/core"
import { AccountCircle } from '@material-ui/icons';

const SettingsNameField: React.VoidFunctionComponent = () => {

    return (
        <div className="SettingsNameField">
            <TextField
                label="Username"
                variant='outlined'
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <AccountCircle />
                        </InputAdornment>
                    ),
                }}
            />
        </div>);
}

export default SettingsNameField;