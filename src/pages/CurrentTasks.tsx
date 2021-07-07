import React from 'react';

import WelcomeHeaderContainer from '../components/WelcomeHeaderContainer';
import BodyContainer from '../components/BodyContainer';

const CurrentTasks: React.VoidFunctionComponent = () => {

    // /
    return (
        <div className="CurrentTasksPage">
            <WelcomeHeaderContainer />
            <BodyContainer />
        </div>);
}

export default CurrentTasks;