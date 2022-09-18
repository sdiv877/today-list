import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Routes,Route } from "react-router-dom";

import AppDrawer from "./components/AppDrawer";
import CurrentTasks from "./pages/CurrentTasks";
import Settings from "./pages/Settings";
import CompletedTasks from "./pages/CompletedTasks";
import RecycleBin from "./pages/RecycleBin";
import Stats from "./pages/Stats";

import "./styles/App.css";

ReactDOM.render(
  <div className="App">
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
  </div>,
  document.getElementById("root")
);
