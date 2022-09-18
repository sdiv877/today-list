import React from 'react';

import SettingsBodyContainer from '../components/containers/SettingsBodyContainer';
import SettingsHeaderContainer from '../components/containers/SettingsHeaderContainer';

/**
 * /settings
 */
const Settings: React.VoidFunctionComponent = () => {
  return (
    <div className="SettingsPage">
      <SettingsHeaderContainer />
      <SettingsBodyContainer />
    </div>
  );
};

export default Settings;
