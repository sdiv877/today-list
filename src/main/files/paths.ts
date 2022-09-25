import { app } from "electron";
import { DEBUG } from "../../common/utils/debug";

/**
 * If in debug mode, files will be saved to the root directory of the repository
 *  at '.debug_user/', otherwise they will be in 'appData/today-list/user'.
 */
export const USER_DATA_PATH = DEBUG ? ".\\.debug_user\\" : app.getPath("userData") + "\\user\\";
