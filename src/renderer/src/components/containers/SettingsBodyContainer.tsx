import React from 'react';
import DeleteDataModal from '../DeleteDataModal';
import SettingsDeleteButton from '../buttons/SettingsDeleteButton';
import SettingsSaveButton from '../buttons/SettingsSaveButton';
import SettingsCard from '../cards/SettingsCard';
import SettingsColourPicker from '../pickers/SettingsColourPicker';
import SettingsColourPickerDisplay from '../pickers/SettingsColourPickerDisplay';
import SettingsNameField from '../pickers/SettingsNameField';

import { BackgroundColour, BackgroundColourUtil, ButtonColour } from '../../../../common/utils/colours';
import { UserSettings } from '../../../../common/models/user-settings.model';
import { LOG } from '../../../../common/utils/debug';

import '../../styles/fadeIn.css';

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
    window.api.settings.get().then((userDataRes) => {
        LOG('User data response received from main: ' + JSON.stringify(userDataRes));
        setUsername(userDataRes.username);
        setBgColour(userDataRes.bgColour);
        setButtonColour(userDataRes.buttonColour)
    })
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
    window.api.settings.update(userSettings);
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
