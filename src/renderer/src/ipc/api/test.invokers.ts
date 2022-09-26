import { ipcRendererManager } from '../ipc-manager';
import { IpcEvents } from '../../../../common/ipc/ipc-events';

export interface ITestApi {
  headPing: () => Promise<string>;
}

export const testApi: ITestApi = {
  headPing: () => {
    return ipcRendererManager.invoke(IpcEvents.PING);
  }
};
