import React, { FC } from 'react';

import {
  DefaultUserSettings,
  UserSettings
} from '../../../common/models/user-settings.model';
import { setDocumentBgColour } from '../utils/task-display-helpers';

import { LOG } from '../../../common/utils/debug';

interface IUserSettingsContext extends UserSettings {
  refresh: () => void;
}

interface UserSettingsProviderProps {
  children: React.ReactNode;
}

/**
 * The actual Context for the app's UserSettings.
 */
export const UserSettingsContext = React.createContext<IUserSettingsContext>({
  ...DefaultUserSettings,
  refresh: (): void => {
    LOG('UserSettingsContext refresh() not initialized', 'UserSettingsContext');
  }
});

/**
 * A component that handles fetching the UserSettings from disk, and passing it to
 * the `UserSettingsContext.Provider`. Should be used to wrap the main `App` component.
 */
const UserSettingsProvider: FC<UserSettingsProviderProps> = (props) => {
  // state of UserSettings fetched from disk
  const [userSettings, setUserSettings] =
    React.useState<UserSettings>(DefaultUserSettings);
  // util function to fetch UserSettings from disk
  const refreshUserSettings = () => {
    window.api.settings.get().then((userSettingsRes) => {
      setUserSettings(userSettingsRes);
      setDocumentBgColour(userSettingsRes.bgColour);
    });
  };
  // initial state of the provider is the userSettings state and the util function to update it
  const DefaultUserSettingsContextProviderValue: IUserSettingsContext = {
    ...userSettings,
    refresh: refreshUserSettings
  };

  // on App's first load fetch data from disk
  React.useEffect(() => {
    refreshUserSettings();
  }, []);

  return (
    <UserSettingsContext.Provider
      value={DefaultUserSettingsContextProviderValue}
    >
      {props.children}
    </UserSettingsContext.Provider>
  );
};

export default UserSettingsProvider;
