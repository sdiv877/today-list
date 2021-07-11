import React from 'react';

import HeaderCard from '../text/HeaderCard'

const WelcomeHeaderContainer: React.VoidFunctionComponent = () => {

    return (
        <div className="WelcomeHeaderContainer">
            <HeaderCard text={"Completed Tasks"} />
        </div>);
}

export default WelcomeHeaderContainer;