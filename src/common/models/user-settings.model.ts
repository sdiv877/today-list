import { BackgroundColour, ButtonColour } from '../utils/colours';

/**
 * Describes the persistent app settings that the user can change.
 */
interface UserSettings {
  username: string;
  bgColour: BackgroundColour;
  buttonColour: ButtonColour;
}

const DefaultUserSettings: UserSettings = {
  username: '',
  bgColour: BackgroundColour.White,
  buttonColour: ButtonColour.Blue
};

export { UserSettings, DefaultUserSettings };
