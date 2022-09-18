import React from 'react';

import {
  BackgroundColour,
  BackgroundColourUtil,
  ButtonColour
} from '../../../../common/utils/colours';
import { LOG } from '../../../../common/utils/debug';
import '../../styles/fadeIn.css';
import SettingsDeleteButton from '../buttons/SettingsDeleteButton';
import SettingsSaveButton from '../buttons/SettingsSaveButton';
import SettingsCard from '../cards/SettingsCard';
import DeleteDataModal from '../DeleteDataModal';
import SettingsColourPicker from '../pickers/SettingsColourPicker';
import SettingsColourPickerDisplay from '../pickers/SettingsColourPickerDisplay';
import SettingsNameField from '../pickers/SettingsNameField';

import { UserSettings } from '../../../../common/models/user-settings.model';

const SettingsBodyContainer: React.VoidFunctionComponent = () => {
  const [username, setUsername] = React.useState('');
  const [bgColour, setBgColour] = React.useState(BackgroundColour.White);
  const [buttonColour, setButtonColour] = React.useState(ButtonColour.Blue);
  const [displayColour, setDisplayColour] = React.useState('transparent');

  const [saveDisabled, setSaveDisabled] = React.useState(true);
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    LOG('SettingsBodyContainer useEffect() called');

    // get UserSettings and set initial values for background and username fields to display
    // window.user_data.sendUserSettingsRequest();
    // window.user_data.receiveUserSettingsResponse('response-user-data', (event, user_data_res) => {
    //     LOG('User data response received from main: ' + JSON.stringify(user_data_res));
    //     setUsername(user_data_res.username);
    //     setBgColour(user_data_res.bg_colour);
    //     setButtonColour(user_data_res.button_colour)
    // })
    // return () => {
    //     window.app.removeAllListeners('response-user-data');
    // }
  }, []);

  function submitUserSettings() {
    const userSettings: UserSettings = {
      username: username,
      bgColour: bgColour,
      buttonColour: BackgroundColourUtil.toButtonColour(bgColour)
    };
    setButtonColour(userSettings.buttonColour);
    // change the colour to what was chosen for the current session
    document.querySelector('body').style.backgroundColor = bgColour;
    // save the colour so that it is remembered on the next app startup
    // window.userSettings.saveUserSettings(userSettings);
  }

  return (
    <div className="SettingsBodyContainer">
      <SettingsColourPickerDisplay colour={displayColour} />

      <div className="fadeIn">
        <SettingsCard
          title={'User Profile'}
          component={
            <SettingsNameField
              username={username}
              setUsername={setUsername}
              setSaveDisabled={setSaveDisabled}
            />
          }
        />
        <SettingsCard
          title={'Appearance'}
          component={
            <SettingsColourPicker
              bgColour={bgColour}
              setBgColour={setBgColour}
              setButtonColour={setButtonColour}
              setDisplayColour={setDisplayColour}
              saveDisabled={saveDisabled}
              setSaveDisabled={setSaveDisabled}
            />
          }
        />
        <SettingsCard
          title={'Data'}
          component={<SettingsDeleteButton show={show} setShow={setShow} />}
        />
        <SettingsSaveButton
          buttonColour={buttonColour}
          submitUserSettings={submitUserSettings}
          disabled={saveDisabled}
          setDisabled={setSaveDisabled}
        />
        <DeleteDataModal show={show} setShow={setShow} />
      </div>
    </div>
  );
};

export default SettingsBodyContainer;
