import React from 'react';

import WelcomeHeaderContainer from '../components/CurrentTasks/WelcomeHeaderContainer';
import BodyContainer from '../components/CurrentTasks/BodyContainer';

const CurrentTasks: React.VoidFunctionComponent = () => {

    // /
    return (
        <div className="CurrentTasksPage">
            <WelcomeHeaderContainer />
            <BodyContainer />
        </div>);
}

export default CurrentTasks;