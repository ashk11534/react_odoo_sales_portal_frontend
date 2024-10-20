
import UseAnimations from "react-useanimations";
import loading from 'react-useanimations/lib/loading'

const CreateQuotationHeader = function ({ handleFormSubmission, quotationCreating }) {
  return (
    <div className="createQuotationHeader mt-4 mb-2">
      <div className="createQuotationHeaderLeft">
        <p>Status</p>
        <button className="createQuotationHeaderStatusBtn" disabled={true}>
          Quotation
        </button>
      </div>
      <div className="createQuotationHeaderRight">
        {!quotationCreating && <button
          className="createQuotationHeaderStatusBtn quotationConfirmBtn"
          onClick={handleFormSubmission}
        >
          Confirm
        </button>}

        {quotationCreating && <button className="createQuotationHeaderStatusBtn quotationConfirmBtn"><UseAnimations animation={loading} size={20} strokeColor="#fff" /></button>}
        {/* <button className="createQuotationHeaderStatusBtn quotationCancelBtn">
          Cancel
        </button> */}
      </div>
    </div>
  );
};

export default CreateQuotationHeader;
