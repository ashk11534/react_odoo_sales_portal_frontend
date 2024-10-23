import { FaCirclePlus } from "react-icons/fa6";
import OrderLineProduct from "./OrderLineProduct";
import { useRef, useState } from "react";
import ExistingCustomer from "./ExistingCustomer";
import Loader from "./Loader";

const CreateQuotationForm = function ({
  setSelectedCustomerId,
  expirationDateRef,
  quotationDateRef,
  setSelectedProducts,
  selectedProducts,
  customerRef,
  orderLineProducts,
  setOrderLineProducts,
}) {

  const [existingCustomers, setExistingCustomers] = useState([]);
  const [existingCustomersLoading, setExistingCustomersLoading] = useState(false);
  const [existingProducts, setExistingProducts] = useState([]);
  const [currentOrderLineId, setCurrentOrderLineId] = useState(null);
  
  const productRef = useRef(null);
  const productQuantityRef = useRef(null);
  const unitPriceRef = useRef(null);

  const handleSetOrderLineProducts = function () {
    const newOrderLine = crypto.randomUUID();
    setOrderLineProducts((cur) => [...cur, newOrderLine]);
    setCurrentOrderLineId(newOrderLine);
  };

  const handleRemoveOrderLine = function (id) {
    const newOrderLines = orderLineProducts.filter((lp) => lp !== id);
    const newSelectedProducts = selectedProducts.filter(
      (prod) => prod.lineId !== id
    );
    setOrderLineProducts(newOrderLines);
    setSelectedProducts(newSelectedProducts);
  };

  const handleCustomerSearch = function (e) {
    const searchedVal = e.target.value;

    if (searchedVal.length === 0) {
      setExistingCustomers([]);
      return;
    }

    const form_data = new FormData();

    form_data.append("customerName", searchedVal);

    setExistingCustomersLoading(true);

    fetch("http://localhost:8089/search-customer", {
      method: "POST",
      body: form_data,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.code === 200) {
          setExistingCustomers(data.customer_data);
          setExistingCustomersLoading(false);
        }
      });
  };

  const handleSelectCustomer = function (customer) {
    customerRef.current.value = customer.customer_name;
    setSelectedCustomerId(customer.customer_id);
    setExistingCustomers([]);
  };

  const handleSelectProduct = function (product, lineId) {
    productRef.current.value = product.product_name;
    productQuantityRef.current.value = 1;
    unitPriceRef.current.value = product.product_price;

    setSelectedProducts((cur) => [
      ...cur,
      {
        lineId: lineId,
        product_id: product.product_id,
        product_name: product.product_name,
        product_qty: productQuantityRef.current.value,
        product_price: product.product_price,
      },
    ]);
    setExistingProducts([]);
  };

  return (
    <form className="createQuotationForm mb-4">
      <div className="customerInputContainer mb-4">
        <p className="createQuotationFormLabel mb-1">Customer</p>
        <input
          type="text"
          className="createQuotationFormInput"
          id="customerInput"
          ref={customerRef}
          autoComplete="off"
          onChange={handleCustomerSearch}
        />
        {existingCustomers.length > 0 && (
          <div className="existingCustomers">
            {existingCustomers.map((customer) => (
              <ExistingCustomer
                key={customer.customer_id}
                customer={customer}
                handleSelectCustomer={handleSelectCustomer}
              />
            ))}
          </div>
        )}

        {existingCustomersLoading && <div className="existingCustomersLoading"><Loader fontSize={20} fontColor={"#000"}/></div>}
      </div>

      <div className="expirationDateInputContainer mb-4">
        <p className="createQuotationFormLabel mb-1">Expiration</p>
        <input
          type="date"
          className="createQuotationFormInput"
          id="expirationDateInput"
          ref={expirationDateRef}
        />
      </div>

      <div className="quotationDateInputContainer mb-4">
        <p className="createQuotationFormLabel mb-1">Quotation date</p>
        <input
          type="date"
          className="createQuotationFormInput"
          id="quotationDateInput"
          ref={quotationDateRef}
        />
      </div>

      <div className="orderLines">
        <p className="createQuotationFormLabel mb-2">
          Order Lines{" "}
          <span onClick={handleSetOrderLineProducts}>
            <FaCirclePlus size={20} className="createNewOrderLineBtnIcon" />
          </span>
        </p>
        {orderLineProducts.map((lp) => {
          return (
            <OrderLineProduct
              key={lp}
              id={lp}
              currentOrderLineId={currentOrderLineId}
              handleRemoveOrderLine={handleRemoveOrderLine}
              existingProducts={existingProducts}
              productRef={productRef}
              productQuantityRef={productQuantityRef}
              unitPriceRef={unitPriceRef}
              handleSelectProduct={handleSelectProduct}
              setExistingProducts={setExistingProducts}
              selectedProducts={selectedProducts}
            />
          );
        })}
      </div>
    </form>
  );
};

export default CreateQuotationForm;
