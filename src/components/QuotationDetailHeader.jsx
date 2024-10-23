import { useContext, useEffect, useState } from "react";
import UseAnimations from "react-useanimations";
import loading from 'react-useanimations/lib/loading'
import { AppContext } from "./context_store/app_context";

const QuotationDetailHeader = function({quotation, handleSetQuotationCancelled}){

    const [quotationCancelling, setQuotationCancelling] = useState(false);
    // const [quotationConfirming, setQuotationConfirming] = useState(false);

    const {permitCancelQuotation, handleShowCancelConfirmationModal, handlePermitCancelQuotation} = useContext(AppContext);

    useEffect(() => {

        if(!permitCancelQuotation) return;

        if(permitCancelQuotation){

            setQuotationCancelling(true);

            const formData = new FormData();
            formData.append('quotationId', quotation.quotation_id)

            fetch('http://localhost:8089/cancel-quotation', {
                method: 'POST', 
                body: formData
            })
            .then(res => res.json())
            .then(data => {
                if(data.code === 200){
                    setQuotationCancelling(false);
                    handleSetQuotationCancelled();
                    handlePermitCancelQuotation();
                }
            })
        }
    }, [permitCancelQuotation])


    return <div className="createQuotationHeader mt-4 mb-2">
    <div className="createQuotationHeaderLeft">
      <p>Status</p>
      
      {quotation.quotation_state === 'cancel' && <button className="createQuotationHeaderStatusBtn cancelledQuotation">Cancelled</button>}
      {quotation.quotation_state === 'sale' && <button className="createQuotationHeaderStatusBtn confirmedQuotation">Confirmed</button>}
      {/* {quotation.quotation_state === 'draft' && <button className="createQuotationHeaderStatusBtn quotationStatusBtn">Quotation</button>} */}

    </div>
    <div className="createQuotationHeaderRight">
      
      {quotation.quotation_state === 'sale' && 
        <>
            {!quotationCancelling && <button className="createQuotationHeaderStatusBtn quotationCancelBtn" onClick={handleShowCancelConfirmationModal}>
                Cancel
            </button>}
            {quotationCancelling && <button className="createQuotationHeaderStatusBtn quotationCancelBtn"><UseAnimations animation={loading} size={20} strokeColor="#fff" /></button>}
        </> 
      }

    </div>
  </div>
}

export default QuotationDetailHeader;