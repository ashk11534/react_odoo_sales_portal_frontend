import { useEffect } from "react";
import MainContentHeading from "./MainContentHeading";
import QuotationContainer from "./QuotationContainer";

const MainContent = function () {
  return (
    <div className="mainContent">
      <MainContentHeading />
      <QuotationContainer />
    </div>
  );
};

export default MainContent;
