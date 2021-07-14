import React from 'react';

import SettingsCard from '../cards/SettingsCard'
import SettingsNameField from '../pickers/SettingsNameField'
import SettingsColourPicker from '../pickers/SettingsColourPicker';
import SettingsDeleteButton from '../buttons/SettingsDeleteButton';

const SettingsBodyContainer: React.VoidFunctionComponent = () => {

    return (
        < div className="SettingsBodyContainer" >
            <SettingsCard title={'User Profile'} component={<SettingsNameField />} />
            <SettingsCard title={'Appearance'} component={<SettingsColourPicker />} />
            <SettingsCard title={'Data'} component={<SettingsDeleteButton />} />
        </div >);
}

export default SettingsBodyContainer;