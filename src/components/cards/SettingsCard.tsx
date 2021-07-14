import React, { FC } from 'react';
import { Card, Divider } from '@material-ui/core';

import '../../styles/SettingsCard.css'


// Props types
interface SettingsCardProps {
    title: string,
    component: React.ReactNode
}

const SettingsCard: FC<SettingsCardProps> = (props): JSX.Element => {

    return (
        <Card className="settingsCard" variant='outlined'>
            <div className="settingsTitle">
                {props.title}
            </div>

            <Divider orientation='horizontal' />

            <div className="settingsPickers">
                {props.component}
            </div>
        </Card>
    );
}

export default SettingsCard;