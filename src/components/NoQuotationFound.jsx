import { FaRegSadTear } from "react-icons/fa";

const NoQuotationFound = function(){
    return <div className="nothingFound">
        <h5 className="mb-3">Nothing found!!!</h5>
        <FaRegSadTear size={45}/>
    </div>
}

export default NoQuotationFound;