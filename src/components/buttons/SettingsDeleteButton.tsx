import React, { FC } from 'react';
import { Button } from '@material-ui/core';

// Props types
interface SettingsDeleteButtonProps {

}

const SettingsDeleteButton: FC<SettingsDeleteButtonProps> = (props): JSX.Element => {

    return (
        <Button variant='outlined' style={{ color: 'crimson', borderColor: 'crimson', fontWeight: 'bold' }}>
            Delete all data
        </Button>
    );
}

export default SettingsDeleteButton;