import { TiDelete } from "react-icons/ti";
import ExistingProduct from "./ExistingProduct";

const OrderLineProduct = function ({
  id,
  currentOrderLineId,
  handleRemoveOrderLine,
  productRef,
  productQuantityRef,
  unitPriceRef,
  handleSelectProduct,
  selectedProducts,
  existingProducts,
  setExistingProducts,
}) {

  const handleProductQuantity = function (e) {
    const toUpdateProduct = selectedProducts.find((prod) => prod.lineId === id);
    toUpdateProduct.product_qty = Number(e.target.value);
  };

  const handleUnitPrice = function (e) {
    const toUpdateProduct = selectedProducts.find((prod) => prod.lineId === id);
    toUpdateProduct.product_price = Number(e.target.value);
  };

  const handleProductSearch = function (e) {
    const searchedVal = e.target.value;

    if (searchedVal.length === 0) {
      setExistingProducts([]);
      return;
    }

    const form_data = new FormData();

    form_data.append("productName", searchedVal);

    fetch("http://localhost:8089/search-product", {
      method: "POST",
      body: form_data,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.code === 200) {
          setExistingProducts(data.product_data);
        }
      });
  };

  return (
    <div className="orderLineProduct mb-3">
      <div className="orderLineProductInputContainer">
        <input
          type="text"
          className="orderLineInput"
          id="orderLineProductInput"
          autoComplete="off"
          placeholder="Product"
          ref={productRef}
          onChange={handleProductSearch}
        />
        {(existingProducts.length > 0 && id === currentOrderLineId) &&
          <div className="existingProducts">
            {existingProducts.map((prod) => (
              <ExistingProduct
                key={prod.product_id}
                lineId={id}
                product={prod}
                handleSelectProduct={handleSelectProduct}
              />
            ))}
          </div>
        }
      </div>
      <input
        type="number"
        className="orderLineInput"
        id="orderLineQuantityInput"
        placeholder="Quantity"
        min={1}
        ref={productQuantityRef}
        onChange={handleProductQuantity}
      />
      <input
        type="number"
        className="orderLineInput"
        id="orderLineUnitPriceInput"
        placeholder="Unit price"
        ref={unitPriceRef}
        onChange={handleUnitPrice}
      />

      <span
        className="removeOrderLineBtn"
        onClick={() => handleRemoveOrderLine(id)}
      >
        <TiDelete className="removeOrderLineBtnIcon" size="25" />
      </span>
    </div>
  );
};

export default OrderLineProduct;
