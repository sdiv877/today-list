/**
 * Specifies the persistent app settings that the user can change.
 */
interface UserSettings {
  username: string;
  bg_colour: string;
  button_colour: string;
}

const DefaultUserSettings: UserSettings = {
  username: "",
  bg_colour: "#ffffff",
  button_colour: ""
};

export { UserSettings, DefaultUserSettings };
