import React from 'react';
import DeleteDataModal from '../DeleteDataModal';
import SettingsCard from '../cards/SettingsCard';
import SettingsColourPicker from '../pickers/SettingsColourPicker';
import SettingsColourPickerDisplay from '../pickers/SettingsColourPickerDisplay';
import SettingsNameField from '../pickers/SettingsNameField';
import GenericButton from '../buttons/GenericButton';

import { BackgroundColour, BackgroundColourUtil, ButtonColour } from '../../../../common/utils/colours';
import { UserSettings } from '../../../../common/models/user-settings.model';
import { setDocumentBgColour } from '../../utils/task-display-helpers';
import { LOG } from '../../../../common/utils/debug';

import '../../styles/fadeIn.css';

const deleteButtonStyle ={ color: 'crimson', borderColor: 'crimson', fontWeight: 'bold' };

const SettingsBodyContainer: React.VoidFunctionComponent = () => {
  const [username, setUsername] = React.useState('');
  const [bgColour, setBgColour] = React.useState(BackgroundColour.White);
  const [buttonColour, setButtonColour] = React.useState(ButtonColour.Blue);
  const [bgDisplayColour, setBgDisplayColour] = React.useState('transparent');

  const [saveDisabled, setSaveDisabled] = React.useState(true);
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);

  React.useEffect(() => {
    LOG('SettingsBodyContainer useEffect() called');
    // get UserSettings and set initial values for background and username fields to display
    window.api.settings.get().then((userDataRes) => {
        LOG('User data response received from main: ' + JSON.stringify(userDataRes));
        setUsername(userDataRes.username);
        setDocumentBgColour(userDataRes.bgColour);
        setBgDisplayColour('transparent');
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
    setDocumentBgColour(bgColour);
    // save the colour so that it is remembered on the next app startup
    window.api.settings.update(userSettings);
  }

  return (
    <div className="SettingsBodyContainer">
      <SettingsColourPickerDisplay colour={bgDisplayColour} />

      <div className="fadeIn">
        <SettingsCard
          title={'User Profile'}
          content={
            <SettingsNameField
              username={username}
              setUsername={setUsername}
              setSaveDisabled={setSaveDisabled}
            />
          }
        />
        <SettingsCard
          title={'Appearance'}
          content={
            <SettingsColourPicker
              bgColour={bgColour}
              setBgColour={setBgColour}
              setButtonColour={setButtonColour}
              setDisplayColour={setBgDisplayColour}
              saveDisabled={saveDisabled}
              setSaveDisabled={setSaveDisabled}
            />
          }
        />
        <SettingsCard
          title={'Data'}
          content={
            <GenericButton
              label={'Delete all data'}
              style={deleteButtonStyle}
              variant={'outlined'}
              disabled={false}
              className={'SettingsDeleteButton'}
              onClick={() => {setShowDeleteModal(true)}}
            />
          }
        />
        <div style={{textAlign: 'center'}}>
          <GenericButton
            label={'Save'}
            style={{ backgroundColor: buttonColour, color: 'white', marginTop: '8px' }}
            variant={'contained'}
            disabled={saveDisabled}
            className={'SettingsSaveButton'}
            onClick={() => {
              submitUserSettings();
              setSaveDisabled(true);
            }}
          />
        </div>
        <DeleteDataModal 
          show={showDeleteModal}
          setShow={setShowDeleteModal}
          onConfirm={() => {
            window.api.settings.deleteAllData();
            setDocumentBgColour(BackgroundColour.White);
            setBgDisplayColour(BackgroundColour.White);
          }}
        />
      </div>
    </div>
  );
};

export default SettingsBodyContainer;
