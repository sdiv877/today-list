import React from 'react';

import SettingsHeaderContainer from '../components/containers/SettingsHeaderContainer';
import SettingsBodyContainer from '../components/containers/SettingsBodyContainer';

const Settings: React.VoidFunctionComponent = () => {

    // /settings
    return (
        <div className="SettingsPage">
            <SettingsHeaderContainer />
            <SettingsBodyContainer />
        </div>);
}

export default Settings;