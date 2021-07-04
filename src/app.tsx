import React from 'react';
import ReactDOM from 'react-dom';

import WelcomeHeaderContainer from './components/WelcomeHeaderContainer';
import BodyContainer from './components/BodyContainer'

// Treat this as the function App() portion of the project
// Anything inside ReactDOM.render() is 'returned'
ReactDOM.render(
    <div className="App">
        <WelcomeHeaderContainer />
        <BodyContainer />
    </div>
    , document.body);