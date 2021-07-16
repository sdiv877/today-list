import React, { FC } from 'react';

import '../../styles/SettingsColourPickerDisplay.css'

//Props types
interface SettingsColourPickerDisplayProps {
    colour: string,
}

// This component is used to show the user what selecting a certain colour in settings would look like
// without changing the actual colour of the pages body
const SettingsColourPickerDisplay: FC<SettingsColourPickerDisplayProps> = (props): JSX.Element => {

    return (
        <div className="settingsColourPickerDisplay" style={{ backgroundColor: props.colour }} />);
}

export default SettingsColourPickerDisplay;