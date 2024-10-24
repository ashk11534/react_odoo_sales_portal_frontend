import { useContext, useEffect, useState } from "react";
import { FaCirclePlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { AppContext } from "./context_store/app_context";

const MainContentHeading = function ({quotations, setQuotations, setQuotationsLoading}) {

  const [filterVal, setFilterVal] = useState("");
  const {reRenderHomePage} = useContext(AppContext);

  const handleFilterQuotations = function(e){
    const filterVal = e.target.value;

    setFilterVal(e.target.value);

    if(filterVal == '') return;

    const formData = new FormData();

    formData.append('filterVal', filterVal)
    formData.append("userId", localStorage.getItem("react_odoo_sales_portal_user"))

    setQuotationsLoading(true);

    fetch('http://localhost:8089/filter-quotation', {
      method: 'POST', 
      body: formData
    }).then(res => res.json()).then(data => {
      if (data.code == 200){
        setQuotations(data.quotation_data);
        setQuotationsLoading(false);
      }
    })
  }

  useEffect(() => {

    setFilterVal("");

  }, [reRenderHomePage]);

  return (
    <div className="mainContentHeading mt-3 mb-5">
      <div className="mainContentHeadingLeft">
        <h2 className="mb-2">Quotations</h2>
        <p className="totalNumberOfQuotations">There are {quotations.length} total quotations</p>
      </div>
      <div className="mainContentHeadingRight">
        <select className="filterByStatus" value={filterVal} onChange={handleFilterQuotations}>
          <option value="">Filter by status</option>
          <option value="all">All</option>
          {/* <option value="draft">Quotation</option> */}
          <option value="sale">Confirmed</option>
          <option value="cancel">Cancelled</option>
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
