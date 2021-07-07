import React from 'react';
import ReactDOM from 'react-dom';
import { CssBaseline } from '@material-ui/core';

import AppDrawer from './components/AppDrawer';

import './styles/App.css'

// Treat this as the function App() portion of the project
// Anything inside ReactDOM.render() is 'returned'
ReactDOM.render(
    <div className="App">
        <div className="content">
            <CssBaseline />
            <AppDrawer />
        </div>
    </div>
    , document.body);