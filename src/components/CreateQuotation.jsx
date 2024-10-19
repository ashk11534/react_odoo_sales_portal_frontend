import CreateQuotationHeader from "./CreateQuotationHeader";
import CreateQuotationForm from "./CreateQuotationForm";
import { useRef, useState } from "react";

const CreateQuotation = function () {
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const expirationDateRef = useRef(null);
  const quotationDateRef = useRef(null);

  const handleFormSubmission = function () {
    console.log({
      selectedCustomerId,
      ex: expirationDateRef.current.value,
      qu: quotationDateRef.current.value,
      selectedProducts,
    });
  };
  return (
    <>
      <CreateQuotationHeader handleFormSubmission={handleFormSubmission} />
      <CreateQuotationForm
        setSelectedCustomerId={setSelectedCustomerId}
        setSelectedProducts={setSelectedProducts}
        selectedProducts={selectedProducts}
        expirationDateRef={expirationDateRef}
        quotationDateRef={quotationDateRef}
      />
    </>
  );
};

export default CreateQuotation;
