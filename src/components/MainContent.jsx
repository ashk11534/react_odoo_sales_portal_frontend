import { useState } from "react";
import MainContentHeading from "./MainContentHeading";
import QuotationContainer from "./QuotationContainer";

const MainContent = function () {
  const [quotations, setQuotations] = useState([]);
  const [quotationsLoading, setQuotationsLoading] = useState(false);

  return (
    <div className="mainContent">
      <MainContentHeading quotations={quotations} setQuotations={setQuotations} setQuotationsLoading={setQuotationsLoading} />
      <QuotationContainer quotations={quotations} setQuotations={setQuotations} quotationsLoading={quotationsLoading} setQuotationsLoading={setQuotationsLoading} />
    </div>
  );
};

export default MainContent;
