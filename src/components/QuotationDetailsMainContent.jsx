import QuotationDetailOrderLine from "./QuotationDetailOrderLine";

const QuotationDetailsMainContent = function({quotation}){

    return <div className="quotationDetails">
        <h5 className="mb-2">#{quotation.quotation_name}</h5>
        <p className="mb-2">Customer: {quotation.customer_name} </p>
        <p className="mb-2">Expiration date: {quotation.expiration_date} </p>
        <p className="mb-2">Quotation date: {quotation.quotation_date} </p>
        <p className="mb-2">Order lines:</p>

        {
            quotation.order_lines?.map(orderLine => <QuotationDetailOrderLine key={orderLine.order_line_id} orderLine={orderLine} />)
        }

        <div className="quotationDetailOrderLine mb-2">
            <p>Total:</p>
            <p>{quotation.currency}{quotation.amount_total}</p>
        </div>      
    </div>
}

export default QuotationDetailsMainContent;