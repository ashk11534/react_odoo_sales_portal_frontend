import UseAnimations from "react-useanimations";
import loading from 'react-useanimations/lib/loading'

const Loader = function(){
    return <div className="loaderIcon">
        <UseAnimations animation={loading} size={56} strokeColor="#fff" />
    </div>
}

export default Loader;