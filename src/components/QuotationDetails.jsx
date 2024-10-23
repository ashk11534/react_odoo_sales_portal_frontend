import { useParams } from "react-router-dom";
import QuotationDetailHeader from "./QuotationDetailHeader";
import { useEffect, useState } from "react";
import Loader from "./Loader";
import QuotationDetailsMainContent from "./QuotationDetailsMainContent";

const QuotationDetails = function(){

    const [quotationData, setQuotationData] = useState({})
    const [quotationDetailsLoading, setQuotationDetailsLoading] = useState(false);
    const [quotationCancelled, setQuotationCancelled] = useState(false);

    const param = useParams();
    const quotationId = parseInt(param.quotation_id);

    const handleSetQuotationCancelled = function(){
        setQuotationCancelled(cur => !cur);
    }

    useEffect(() => {
        setQuotationDetailsLoading(true);

        fetch(`http://localhost:8089/quotation-details/${quotationId}`)
        .then(res => res.json())
        .then(data => {
            if(data.code === 200){
                setQuotationData(data.quotation_data);
                setQuotationDetailsLoading(false);
            }
        })
    }, [quotationId, quotationCancelled])

    return <>
        {!quotationDetailsLoading && 
            <>
                <QuotationDetailHeader quotation={quotationData} handleSetQuotationCancelled={handleSetQuotationCancelled} />
                <QuotationDetailsMainContent quotation={quotationData} />
            </>
        }

        {quotationDetailsLoading && <Loader fontSize={56} fontColor={"#fff"}/> }
    </>
}

export default QuotationDetails;