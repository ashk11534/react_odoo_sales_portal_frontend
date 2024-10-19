import { FaCirclePlus } from "react-icons/fa6";
import { Link } from "react-router-dom";

const MainContentHeading = function () {
  return (
    <div className="mainContentHeading mt-3 mb-5">
      <div className="mainContentHeadingLeft">
        <h2 className="mb-2">Quotations</h2>
        <p className="totalNumberOfQuotations">There are 10 total quotations</p>
      </div>
      <div className="mainContentHeadingRight">
        <select className="filterByStatus">
          <option value="">Filter by status</option>
          <option value="quotation">Quotation</option>
          <option value="sales_order">Sales order</option>
          <option value="cancelled">Cancelled</option>
        </select>
        <Link to="/create-quotation" className="createNewQuotationBtn">
          <FaCirclePlus size={30} className="createNewQuotationBtnIcon" />
          <p>New Quotation</p>
        </Link>
      </div>
    </div>
  );
};

export default MainContentHeading;
