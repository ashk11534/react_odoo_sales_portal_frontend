import CreateQuotationHeader from "./CreateQuotationHeader";
import CreateQuotationForm from "./CreateQuotationForm";
import { useEffect, useRef, useState } from "react";

const CreateQuotation = function () {
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [quotationCreating, setQuotationCreating] = useState(false);
  const [orderLineProducts, setOrderLineProducts] = useState([]);
  const [quotationCreated, setQuotationCreated] = useState(false);

  const customerRef = useRef(null);
  const expirationDateRef = useRef(null);
  const quotationDateRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setQuotationCreated(false);
    }, 2000)

    return () => {
      clearTimeout(timer);
    }
  }, [quotationCreated])

  const handleFormSubmission = function () {
    if(selectedProducts.length === 0 || customerRef.current.value.trim() === '' || !selectedCustomerId || expirationDateRef.current.value.trim() === '' || quotationDateRef.current.value.trim() === '') return;
    console.log(selectedProducts)
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
        setSelectedCustomerId(null);
        customerRef.current.value='';
        expirationDateRef.current.value='';
        quotationDateRef.current.value='';
        setOrderLineProducts([]);
        setSelectedProducts([]);
        setQuotationCreated(true);
      }
    })

  };
  return (
    <>
      {quotationCreated && <div className="alert alert-success mt-3 quotationCreationAlert">A new quotation has been created.</div>}
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
