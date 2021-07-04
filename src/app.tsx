import React from 'react';
import ReactDOM from 'react-dom';

import WelcomeHeaderContainer from './components/WelcomeHeaderContainer';

// Treat this as the function App() portion of the project
// Anything inside ReactDOM.render() is 'returned'
ReactDOM.render(
    <div className="App">
        <WelcomeHeaderContainer />
    </div>
    , document.body);