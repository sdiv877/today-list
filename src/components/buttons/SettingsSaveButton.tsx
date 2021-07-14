import React, { FC } from 'react';
import { Button } from '@material-ui/core';

import '../../styles/SettingsSaveButton.css'

// Props types
interface SettingsSaveButtonProps {
    submitUserData: () => void;
}

const SettingsSaveButton: FC<SettingsSaveButtonProps> = (props): JSX.Element => {

    return (
        <div className="settingsSaveButton">
            <Button variant='contained' color='primary' onClick={props.submitUserData}>
                Save
            </Button>
        </div>
    );
}

export default SettingsSaveButton;