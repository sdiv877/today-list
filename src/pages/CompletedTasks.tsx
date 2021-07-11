import React from 'react';

import CompletedTasksHeaderContainer from '../components/containers/CompletedTasksHeaderContainer'
import CompletedTasksBodyContainer from '../components/containers/CompletedTasksBodyContainer'

const CompletedTasks: React.VoidFunctionComponent = () => {

    // /completed
    return (
        <div className="CompletedTasksPage">
            <CompletedTasksHeaderContainer />
            <CompletedTasksBodyContainer />
        </div>);
}

export default CompletedTasks;