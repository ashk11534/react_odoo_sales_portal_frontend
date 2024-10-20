import Quotation from "./Quotation";
import { useEffect, useState } from "react";

const QuotationContainer = function () {
  const [quotations, setQuotations] = useState([]);

  useEffect(() => {
    const formData = new FormData();
    formData.append(
      "userId",
      localStorage.getItem("react_odoo_sales_portal_user")
    );

    fetch("http://localhost:8089/retrieve-quotations", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.code === 200) {
          setQuotations(data.quotation_data);
        }
      });
  }, []);

  return (
    <div className="quotationsList">
      {quotations.map((quotation) => (
        <Quotation key={quotation.quotation_id} quotation={quotation} />
      ))}
    </div>
  );
};

export default QuotationContainer;
