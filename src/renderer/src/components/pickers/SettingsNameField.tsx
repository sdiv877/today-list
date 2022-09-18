import React, { FC } from 'react';
import { TextField, InputAdornment } from "@material-ui/core"
import { AccountCircle } from '@material-ui/icons';

//Props types
interface SettingsNameFieldProps {
    username: string,
    setUsername: React.Dispatch<React.SetStateAction<string>>,
    setSaveDisabled: (disabled: boolean) => void,
}


const SettingsNameField: FC<SettingsNameFieldProps> = (props): JSX.Element => {
    return (
      <div
        className="settingsNameField"
        style={{ width: "29%", marginLeft: "auto", marginRight: "auto" }}
      >
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
          }}
          value={props.username}
          onChange={(event) => {
            props.setUsername(event.target.value);
            props.setSaveDisabled(false);
          }}
        />
      </div>
    );
}

export default SettingsNameField;