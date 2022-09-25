import { ITaskApi, taskApi } from "./task";
import { IStatsApi, statsApi } from "./stats";
import { ITestApi, testApi } from "./test";

/**
 * The methods available from the API. For use with Window.ts.
 */
export interface IApi {
    task: ITaskApi,
    stats: IStatsApi,
    test: ITestApi
}

/**
 * The list of available API calls the renderer can make.
 * Uses ipcRendererManager under the hood.
 */
export const api: IApi = {
    task: taskApi,
    stats: statsApi,
    test: testApi
}
