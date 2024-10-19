const CreateQuotationHeader = function ({ handleFormSubmission }) {
  return (
    <div className="createQuotationHeader mt-4 mb-2">
      <div className="createQuotationHeaderLeft">
        <p>Status</p>
        <button className="createQuotationHeaderStatusBtn" disabled={true}>
          Quotation
        </button>
      </div>
      <div className="createQuotationHeaderRight">
        <button
          className="createQuotationHeaderStatusBtn quotationConfirmBtn"
          onClick={handleFormSubmission}
        >
          Confirm
        </button>
        {/* <button className="createQuotationHeaderStatusBtn quotationCancelBtn">
          Cancel
        </button> */}
      </div>
    </div>
  );
};

export default CreateQuotationHeader;
