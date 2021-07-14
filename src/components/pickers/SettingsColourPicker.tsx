import React, { FC } from 'react';
import { ColorResult, TwitterPicker } from 'react-color'

import '../../styles/SettingsColourPicker.css'

//Props types
interface SettingsColourPickerProps {
    setBgColour: React.Dispatch<React.SetStateAction<string>>,
}


const SettingsColourPicker: FC<SettingsColourPickerProps> = (props): JSX.Element => {

    function handleChangeComplete(colour: ColorResult) {
        props.setBgColour(colour.hex);
    }

    return (
        <div className="settingsColourPicker">
            <TwitterPicker
                className="center"
                triangle='hide'
                onChangeComplete={handleChangeComplete}
            />
        </div>);
}

export default SettingsColourPicker;