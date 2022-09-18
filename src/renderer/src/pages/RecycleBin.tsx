import React from 'react';

import RecycleBinBodyContainer from '../components/containers/RecycleBinBodyContainer';
import RecycleBinHeaderContainer from '../components/containers/RecycleBinHeaderContainer';

/**
 * /bin
 */
const RecycleBin: React.VoidFunctionComponent = () => {
  return (
    <div className="RecycleBinPage">
      <RecycleBinHeaderContainer />
      <RecycleBinBodyContainer />
    </div>
  );
};

export default RecycleBin;
