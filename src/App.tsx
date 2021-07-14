import React from 'react';
import ReactDOM from 'react-dom';

import { HashRouter, Route } from 'react-router-dom';

import AppDrawer from './components/AppDrawer';
import CurrentTasks from './pages/CurrentTasks'
import Settings from './pages/Settings'
import CompletedTasks from './pages/CompletedTasks';
import RecycleBin from './pages/RecycleBin';
import Stats from './pages/Stats';

import './styles/App.css'

// Treat this as the <App /> portion of the project
// Anything inside ReactDOM.render() is 'returned'
ReactDOM.render(
    <div className="App">
        <HashRouter>
            <AppDrawer />

            <div className="content">
                <main>
                    <Route exact path="/" component={CurrentTasks} />
                    <Route exact path="/completed" component={CompletedTasks} />
                    <Route exact path="/bin" component={RecycleBin} />
                    <Route exact path="/stats" component={Stats} />
                    <Route path="/settings" component={Settings} />
                </main>
            </div>
        </HashRouter>
    </div>, document.body);