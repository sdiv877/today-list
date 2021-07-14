import React, { FC } from 'react';
import { TextField, InputAdornment } from "@material-ui/core"
import { AccountCircle } from '@material-ui/icons';

//Props types
interface SettingsNameFieldProps {
    username: string,
    setUsername: React.Dispatch<React.SetStateAction<string>>,
}


const SettingsNameField: FC<SettingsNameFieldProps> = (props): JSX.Element => {

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

                value={props.username}

                onChange={(event) => {
                    props.setUsername(event.target.value)
                }}
            />
        </div>);
}

export default SettingsNameField;