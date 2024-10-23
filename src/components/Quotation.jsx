import { Link } from "react-router-dom";

const Quotation = function ({ quotation }) {
  return (
    <Link to={`/quotation-details/${quotation.quotation_id}`} className="singleQuotation mb-3">
      <h5>#{quotation.quotation_name}</h5>
      <p>{quotation.order_date}</p>
      <p>{quotation.customer_name}</p>
      <p>{quotation.currency}{quotation.amount_total}</p>
      {quotation.quotation_state === "sale" && (
        <div className="quotationStatusBtn confirmedQuotation">
          <div className="quotationStatusIcon confirmedQuotationIcon"></div>
          <p>Confirmed</p>
        </div>
      )}

      {quotation.quotation_state === "cancel" && (
        <div className="quotationStatusBtn cancelledQuotation">
          <div className="quotationStatusIcon cancelledQuotationIcon"></div>
          <p>Cancelled</p>
        </div>
      )}

      {/* {quotation.quotation_state === "draft" && (
        <div className="quotationStatusBtn">
          <div className="quotationStatusIcon"></div>
          <p>Quotation</p>
        </div>
      )} */}
    </Link>
  );
};

export default Quotation;
