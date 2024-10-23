const QuotationDetailOrderLine = function({orderLine}){
    return <div className="quotationDetailOrderLine mb-2">
        <p>{orderLine.product_name}</p>
        <p>Quantity: {orderLine.product_quantity}</p>
        <p>Price: {orderLine.currency}{orderLine.product_price}</p>
    </div>;
}

export default QuotationDetailOrderLine;