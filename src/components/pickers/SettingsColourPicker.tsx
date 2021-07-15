import React, { FC } from 'react';
import { GithubPicker, ColorResult } from 'react-color'

import '../../styles/SettingsColourPicker.css'

//Props types
interface SettingsColourPickerProps {
    setBgColour: React.Dispatch<React.SetStateAction<string>>,
    setDisabled: (disabled: boolean) => void,
}


const SettingsColourPicker: FC<SettingsColourPickerProps> = (props): JSX.Element => {

    function handleChangeComplete(colour: ColorResult) {
        props.setBgColour(colour.hex);
        props.setDisabled(false);
    }

    return (
        <div className="settingsColourPicker">
            <GithubPicker
                className="center"
                triangle='hide'
                colors={['#ffffff', '#d27676', '#e49576', '#f2bdca', '#f4dc76', '#76bc77', '#76abb1', '#7fafe5', '#769cde', '#9f76ec']}
                onChangeComplete={handleChangeComplete}
                width={'27.9%'}
            />
        </div>);
}

export default SettingsColourPicker;