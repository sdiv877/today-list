import '../../styles/SettingsCard.css';
import React, { FC } from 'react';
import { Card, Divider } from '@material-ui/core';

// Props types
interface SettingsCardProps {
  title: string;
  content: React.ReactNode;
}

const SettingsCard: FC<SettingsCardProps> = (props): JSX.Element => {
  return (
    <Card className="settingsCard" variant="outlined">
      <div className="settingsTitle">{props.title}</div>
      <Divider orientation="horizontal" />
      <div className="settingsPickers">{props.content}</div>
    </Card>
  );
};

export default SettingsCard;
