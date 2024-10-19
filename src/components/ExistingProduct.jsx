const ExistingProduct = function ({ lineId, product, handleSelectProduct }) {
  return (
    <div
      className="existingProduct"
      onClick={() => handleSelectProduct(product, lineId)}
    >
      {product.product_name}
    </div>
  );
};

export default ExistingProduct;
