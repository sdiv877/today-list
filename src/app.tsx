import React from 'react';
import ReactDOM from 'react-dom';

import AppDrawer from './components/AppDrawer';
import WelcomeHeaderContainer from './components/WelcomeHeaderContainer';
import BodyContainer from './components/BodyContainer'

import './styles/App.css'

// Treat this as the function App() portion of the project
// Anything inside ReactDOM.render() is 'returned'
ReactDOM.render(
    <div className="App">
        <AppDrawer />

        <div className="content">
            <WelcomeHeaderContainer />
            <BodyContainer />
        </div>
    </div>
    , document.body);