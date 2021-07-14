import React from 'react';

import SettingsCard from '../cards/SettingsCard'
import SettingsNameField from '../pickers/SettingsNameField'
import SettingsColourPicker from '../pickers/SettingsColourPicker';
import SettingsDeleteButton from '../buttons/SettingsDeleteButton';
import SettingsSaveButton from '../buttons/SettingsSaveButton';

import UserData from '../../models/UserData'

const SettingsBodyContainer: React.VoidFunctionComponent = () => {
    const [username, setUsername] = React.useState('');
    const [bgColour, setBgColour] = React.useState('');

    React.useEffect(() => {
        console.log('use effect called');

        window.api.sendUserDataRequest();

        window.api.receiveUserDataResponse('response-user-data', (event, user_data_res) => {
            console.log('User data response received from main: ' + JSON.stringify(user_data_res));
            setUsername(user_data_res.username);
            setBgColour(user_data_res.bg_colour);
        })

        return () => {
            window.api.removeAllListeners('response-user-data');
        }
    }, [])

    function submitUserData() {
        const userData: UserData = {
            username: username,
            bg_colour: bgColour
        }

        window.api.saveUserData(userData);
        window.api.setBackgroundColour(bgColour);
    }

    return (
        < div className="SettingsBodyContainer" >
            <SettingsCard title={'User Profile'} component={<SettingsNameField username={username} setUsername={setUsername} />} />
            <SettingsCard title={'Appearance'} component={<SettingsColourPicker setBgColour={setBgColour} />} />
            <SettingsCard title={'Data'} component={<SettingsDeleteButton />} />

            <SettingsSaveButton submitUserData={submitUserData} />
        </div >);
}

export default SettingsBodyContainer;