import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Routes } from 'react-router-dom';
import UserSettingsProvider from './providers/UserSettingsProvider';

import AppDrawer from './components/AppDrawer';
import CompletedTasks from './pages/CompletedTasks';
import CurrentTasks from './pages/CurrentTasks';
import RecycleBin from './pages/RecycleBin';
import Settings from './pages/Settings';
import Stats from './pages/Stats';

import './styles/App.css';

import { IpcEvents } from '../../common/ipc/ipc-events';
import { DEBUG } from '../../common/utils/debug';

// compose App
const App = () => {
  return (
    <div className="App">
      <UserSettingsProvider>
        <HashRouter>
          <aside className="side-bar">
            <AppDrawer />
          </aside>
          <main className="main-content">
            <Routes>
              <Route path="/" element={<CurrentTasks />} />
              <Route path="/completed" element={<CompletedTasks />} />
              <Route path="/bin" element={<RecycleBin />} />
              <Route path="/stats" element={<Stats />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
        </HashRouter>
      </UserSettingsProvider>
    </div>
  );
};

// render App
ReactDOM.render(<App />, document.getElementById('root'));

// initialize IPC
window.ipcRendererManager.sendReadySignal();

if (DEBUG) {
  window.ipcRendererManager.send(IpcEvents.REQ_TEST);
  window.api.test.headPing().then((res) => {
    window.ipcRendererManager.LOG(res + ' received');
  });
}
