import { createContext } from "react";

const AppContext = createContext({
    reRenderHomePage: false,
    setReRenderHomePage: () => {},
    showCancelConfirmationModal: false,
    setShowCancelConfirmationModal: () => {},
    permitCancelQuotation: false,
    setPermitCancelQuotation: () => {},
})

export {AppContext};