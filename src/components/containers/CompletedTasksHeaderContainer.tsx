import React from 'react';

import HeaderCard from '../text/HeaderCard'

const CompletedTasksHeaderContainer: React.VoidFunctionComponent = () => {

    return (
        <div className="CompletedTasksHeaderContainer">
            <HeaderCard text={"Completed Tasks"} />
        </div>);
}

export default CompletedTasksHeaderContainer;