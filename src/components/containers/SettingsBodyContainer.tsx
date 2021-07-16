import React from 'react';
import { consoleLog } from '../../utils/logging';

import SettingsCard from '../cards/SettingsCard';
import SettingsNameField from '../pickers/SettingsNameField';
import SettingsColourPickerDisplay from '../pickers/SettingsColourPickerDisplay';
import SettingsColourPicker from '../pickers/SettingsColourPicker';
import SettingsDeleteButton from '../buttons/SettingsDeleteButton';
import SettingsSaveButton from '../buttons/SettingsSaveButton';
import DeleteDataModal from '../DeleteDataModal';

import UserData from '../../models/UserData'

import '../../styles/fadeIn.css'

const SettingsBodyContainer: React.VoidFunctionComponent = () => {
    const [username, setUsername] = React.useState('');
    const [bgColour, setBgColour] = React.useState('');
    const [displayColour, setDisplayColour] = React.useState('transparent');
    const [saveDisabled, setSaveDisabled] = React.useState(true);
    const [show, setShow] = React.useState(false);

    React.useEffect(() => {
        consoleLog('use effect called');

        window.user_data.sendUserDataRequest();

        // Initial values for background and username fields to display
        window.user_data.receiveUserDataResponse('response-user-data', (event, user_data_res) => {
            consoleLog('User data response received from main: ' + JSON.stringify(user_data_res));
            setUsername(user_data_res.username);
            setBgColour(user_data_res.bg_colour);
        })

        return () => {
            window.app.removeAllListeners('response-user-data');
        }
    }, [])

    function submitUserData() {
        const userData: UserData = {
            username: username,
            bg_colour: bgColour
        }

        document.querySelector('body').style.backgroundColor = bgColour;
        window.user_data.saveUserData(userData);
    }

    return (
        < div className="SettingsBodyContainer" >
            <SettingsColourPickerDisplay colour={displayColour} />

            <div className="fadeIn">
                <SettingsCard title={'User Profile'} component={<SettingsNameField username={username} setUsername={setUsername} setSaveDisabled={setSaveDisabled} />} />
                <SettingsCard title={'Appearance'} component={<SettingsColourPicker setBgColour={setBgColour} setDisplayColour={setDisplayColour} saveDisabled={saveDisabled} setSaveDisabled={setSaveDisabled} />} />
                <SettingsCard title={'Data'} component={<SettingsDeleteButton show={show} setShow={setShow} />} />
                <SettingsSaveButton submitUserData={submitUserData} disabled={saveDisabled} setDisabled={setSaveDisabled} />

                <DeleteDataModal show={show} setShow={setShow} />
            </div>
        </div >);
}

export default SettingsBodyContainer;