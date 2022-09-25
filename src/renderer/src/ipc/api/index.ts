import { ITaskApi, taskApi } from "./task.invokers";
import { IStatsApi, statsApi } from "./stats.invokers";
import { ISettingsApi, settingsApi } from "./settings.invokers";
import { ITestApi, testApi } from "./test.invokers";

/**
 * The methods available from the API. For use with Window.ts.
 */
export interface IApi {
    task: ITaskApi,
    stats: IStatsApi,
    settings: ISettingsApi,
    test: ITestApi
}

/**
 * The list of available API calls the renderer can make.
 * Uses ipcRendererManager under the hood.
 */
export const api: IApi = {
    task: taskApi,
    stats: statsApi,
    settings: settingsApi,
    test: testApi
}
