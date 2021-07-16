import React, { FC } from 'react';
import { GithubPicker, ColorResult } from 'react-color'
import { bgColours as background_colours, getButtonColour } from '../../utils/SettingsHelpers';

import '../../styles/SettingsColourPicker.css'

//Props types
interface SettingsColourPickerProps {
    bgColour: string,
    setBgColour: React.Dispatch<React.SetStateAction<string>>,
    setButtonColour: React.Dispatch<React.SetStateAction<string>>,
    setDisplayColour: React.Dispatch<React.SetStateAction<string>>,
    saveDisabled: boolean,
    setSaveDisabled: (disabled: boolean) => void,
}


const SettingsColourPicker: FC<SettingsColourPickerProps> = (props): JSX.Element => {

    const [leftClicked, setLeftClicked] = React.useState(false);

    // Run when a swatch is left clicked
    function handleChange(colour: ColorResult) {
        props.setBgColour(colour.hex);
        props.setButtonColour(getButtonColour(colour.hex))
        props.setDisplayColour(colour.hex);
        props.setSaveDisabled(false);

        // A colour was picked (left was clicked)
        setLeftClicked(true);
    }

    // If we hover a swatch, change the bg colour
    function handleMouseHover(colour: ColorResult) {

        if (!leftClicked) {
            props.setDisplayColour(colour.hex);
            props.setButtonColour(getButtonColour(colour.hex));
        }
    }

    // If we leave the button and haven't left clicked, turn off display colour
    function handleMouseLeave() {

        // If the left button wasn'y clicked on a swatch, change display back to transparent
        if (!leftClicked) {
            props.setDisplayColour('transparent')
            props.setButtonColour(getButtonColour(props.bgColour));
        }
    }

    // If the settings are saved (saveDisabled is true), we can allow the display colour to go transparent again
    React.useEffect(() => {

        if (props.saveDisabled) {
            setLeftClicked(false);
        }
    }, [props.saveDisabled])

    return (
        <div className="settingsColourPicker" onMouseLeave={handleMouseLeave}>
            <GithubPicker
                className="center"
                triangle='hide'
                colors={background_colours}
                onChange={handleChange}
                onSwatchHover={handleMouseHover}
                width={'27.9%'}
            />
        </div>);
}

export default SettingsColourPicker;