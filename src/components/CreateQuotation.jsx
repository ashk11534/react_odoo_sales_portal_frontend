import CreateQuotationHeader from "./CreateQuotationHeader";
import CreateQuotationForm from "./CreateQuotationForm";
import { useRef, useState } from "react";

const CreateQuotation = function () {
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [quotationCreating, setQuotationCreating] = useState(false);
  const [orderLineProducts, setOrderLineProducts] = useState([]);
  
  const customerRef = useRef(null);
  const expirationDateRef = useRef(null);
  const quotationDateRef = useRef(null);

  const handleFormSubmission = function () {
    const formData = new FormData();

    const salesPersonId = localStorage.getItem('react_odoo_sales_portal_user')

    formData.append("salesPersonId", salesPersonId);
    formData.append("selectedCustomerId", selectedCustomerId);
    formData.append("expirationDate", expirationDateRef.current.value);
    formData.append("quotationDate", quotationDateRef.current.value);
    formData.append("selectedProducts", JSON.stringify(selectedProducts));

    setQuotationCreating(true);

    fetch('http://localhost:8089/create-quotation', {
      method: "POST", 
      body: formData
    }).then(res => res.json()).then(data => {
      if(data.code === 200){
        setQuotationCreating(false);
        customerRef.current.value='';
        expirationDateRef.current.value='';
        quotationDateRef.current.value='';
        setOrderLineProducts([]);
        setSelectedProducts([]);
      }
    })

  };
  return (
    <>
      <CreateQuotationHeader handleFormSubmission={handleFormSubmission} quotationCreating={quotationCreating} />
      <CreateQuotationForm
        setSelectedCustomerId={setSelectedCustomerId}
        setSelectedProducts={setSelectedProducts}
        selectedProducts={selectedProducts}
        expirationDateRef={expirationDateRef}
        quotationDateRef={quotationDateRef}
        customerRef={customerRef}
        orderLineProducts={orderLineProducts}
        setOrderLineProducts={setOrderLineProducts}
      />
    </>
  );
};

export default CreateQuotation;
