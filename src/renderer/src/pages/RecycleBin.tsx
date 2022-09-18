import React from "react";

import RecycleBinHeaderContainer from "../components/containers/RecycleBinHeaderContainer";
import RecycleBinBodyContainer from "../components/containers/RecycleBinBodyContainer";

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
