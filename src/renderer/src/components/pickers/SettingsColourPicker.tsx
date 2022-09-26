import React, { FC } from 'react';
import { ColorResult, GithubPicker } from 'react-color';

import {
  BG_COLOURS,
  BackgroundColourUtil
} from '../../../../common/utils/colours';

import '../../styles/SettingsColourPicker.css';

// Props types
interface SettingsColourPickerProps {
  bgColour: string;
  setBgColour: React.Dispatch<React.SetStateAction<string>>;
  setButtonColour: React.Dispatch<React.SetStateAction<string>>;
  setDisplayColour: React.Dispatch<React.SetStateAction<string>>;
  saveDisabled: boolean;
  setSaveDisabled: (disabled: boolean) => void;
}

const SettingsColourPicker: FC<SettingsColourPickerProps> = (
  props
): JSX.Element => {
  const [leftClicked, setLeftClicked] = React.useState(false);

  /**
   * Set page colours when a swatch is left clicked.
   */
  function handleChange(colour: ColorResult) {
    props.setBgColour(colour.hex);
    props.setButtonColour(BackgroundColourUtil.toButtonColour(colour.hex));
    props.setDisplayColour(colour.hex);
    props.setSaveDisabled(false);
    // a colour was picked (left was clicked)
    setLeftClicked(true);
  }

  /**
   * Changes the bg colour if a swatch is hovered.
   */
  function handleMouseHover(colour: ColorResult) {
    if (!leftClicked) {
      props.setDisplayColour(colour.hex);
      props.setButtonColour(BackgroundColourUtil.toButtonColour(colour.hex));
    }
  }

  /**
   * Turn off display colour if we leave the button and haven't left clicked
   */
  function handleMouseLeave() {
    if (!leftClicked) {
      props.setDisplayColour('transparent');
      props.setButtonColour(
        BackgroundColourUtil.toButtonColour(props.bgColour)
      );
    }
  }

  /**
   * Sets the display colour back to transparent again when settings are saved (i.e. save is disabled)
   */
  React.useEffect(() => {
    if (props.saveDisabled) {
      setLeftClicked(false);
    }
  }, [props.saveDisabled]);

  return (
    <div className="settingsColourPicker" onMouseLeave={handleMouseLeave}>
      <GithubPicker
        className="center"
        triangle="hide"
        colors={BG_COLOURS}
        onChange={handleChange}
        onSwatchHover={handleMouseHover}
        width={'28%'}
      />
    </div>
  );
};

export default SettingsColourPicker;
