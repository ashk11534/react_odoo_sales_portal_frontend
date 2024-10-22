import Loader from "./Loader";
import Quotation from "./Quotation";
import { useEffect } from "react";

const QuotationContainer = function ({quotations, setQuotations, quotationsLoading, setQuotationsLoading}) {

  useEffect(() => {
    const formData = new FormData();
    formData.append(
      "userId",
      localStorage.getItem("react_odoo_sales_portal_user")
    );

    setQuotationsLoading(true);

    fetch("http://localhost:8089/retrieve-quotations", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.code === 200) {
          setQuotations(data.quotation_data);
          setQuotationsLoading(false);
        }
      });
  }, []);

  return (
    <div className="quotationsList">
      {quotationsLoading && <Loader/>}

      {!quotationsLoading && quotations.map((quotation) => (
        <Quotation key={quotation.quotation_id} quotation={quotation} />
      ))}
    </div>
  );
};

export default QuotationContainer;
