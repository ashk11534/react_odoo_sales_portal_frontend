import { useContext } from "react";
import { AppContext } from "./context_store/app_context";

const CancelConfirmationModal = function(){

    const {handleHideCancelConfirmationModal, handlePermitCancelQuotation} = useContext(AppContext);

    return <div className="cancelConfirmationFormParent">
        <div className="cancelConfirmationForm">
            <h6>Are you sure you want to cancel?</h6>
            <div className="confirmationButtons mt-3">
                <button className="confirmationNoBtn" onClick={handleHideCancelConfirmationModal}>No</button>
                <button className="confirmationYesBtn" onClick={handlePermitCancelQuotation}>Yes</button>
            </div>
        </div>
    </div>;
}

export default CancelConfirmationModal;