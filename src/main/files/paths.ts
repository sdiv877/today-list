import { DEBUG } from "../../common/utils/debug";

enum InstallationMethod {
  Precompiled,
  Native
}

/**
 * Modify depending on the package that is being made.
 */
const installationMethod = InstallationMethod.Precompiled;

/**
 * Specifies the path that the database and persistent app settings will be stored.
 * The `DEBUG` flag takes precedence, followed by handling of either an installer
 * based or precompiled environment.
 */
let USER_DATA_PATH: string;

if (DEBUG) {
  USER_DATA_PATH = ".\\.debug_user\\";
} else if (installationMethod === InstallationMethod.Precompiled) {
  USER_DATA_PATH = ".\\user_data\\";
} else if (installationMethod === InstallationMethod.Native) {
  throw Error("Native installation paths have not been implemented.");
}

export { USER_DATA_PATH };
