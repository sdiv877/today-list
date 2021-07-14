import React from 'react';
import { TwitterPicker } from 'react-color'

import '../../styles/SettingsColourPicker.css'

const SettingsColourPicker: React.VoidFunctionComponent = () => {

    return (
        <div className="settingsColourPicker">
            <TwitterPicker className="center" />
        </div>);
}

export default SettingsColourPicker;