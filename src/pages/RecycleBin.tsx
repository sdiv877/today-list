import React from 'react';

import RecycleBinHeaderContainer from '../components/containers/RecycleBinHeaderContainer'
import RecycleBinBodyContainer from '../components/containers/RecycleBinBodyContainer'

const RecycleBin: React.VoidFunctionComponent = () => {

    // /bin
    return (
        <div className="RecycleBinPage">
            <RecycleBinHeaderContainer />
            <RecycleBinBodyContainer />
        </div>);
}

export default RecycleBin;