import React from 'react';

import SettingsCard from '../cards/SettingsCard'
import SettingsNameField from '../pickers/SettingsNameField'
import SettingsColourPicker from '../pickers/SettingsColourPicker';
import SettingsDeleteButton from '../buttons/SettingsDeleteButton';
import SettingsSaveButton from '../buttons/SettingsSaveButton';
import DeleteDataModal from '../DeleteDataModal';

import UserData from '../../models/UserData'

import '../../styles/fadeIn.css'

const SettingsBodyContainer: React.VoidFunctionComponent = () => {
    const [username, setUsername] = React.useState('');
    const [bgColour, setBgColour] = React.useState('');
    const [disabled, setDisabled] = React.useState(true);
    const [show, setShow] = React.useState(false);

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

        document.querySelector('body').style.backgroundColor = bgColour;
        window.api.saveUserData(userData);
    }

    return (
        < div className="SettingsBodyContainer" >
            <div className="fadeIn">
                <SettingsCard title={'User Profile'} component={<SettingsNameField username={username} setUsername={setUsername} setDisabled={setDisabled} />} />
                <SettingsCard title={'Appearance'} component={<SettingsColourPicker setBgColour={setBgColour} setDisabled={setDisabled} />} />
                <SettingsCard title={'Data'} component={<SettingsDeleteButton show={show} setShow={setShow} />} />
                <SettingsSaveButton submitUserData={submitUserData} disabled={disabled} setDisabled={setDisabled} />

                <DeleteDataModal show={show} setShow={setShow} />
            </div>
        </div >);
}

export default SettingsBodyContainer;