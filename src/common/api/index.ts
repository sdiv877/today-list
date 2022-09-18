import { ITestApi, testApi } from "./test";

/**
 * The methods available from the API. For use with Window.ts.
 */
export interface IApi {
    test: ITestApi
}

/**
 * The list of available API calls the renderer can make.
 * Uses ipcRendererManager under the hood.
 */
export const api: IApi = {
    test: testApi
}
