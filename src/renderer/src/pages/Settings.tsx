import React from "react";

import SettingsHeaderContainer from "../components/containers/SettingsHeaderContainer";
import SettingsBodyContainer from "../components/containers/SettingsBodyContainer";

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
