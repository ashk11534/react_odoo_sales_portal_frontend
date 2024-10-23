import UseAnimations from "react-useanimations";
import loading from 'react-useanimations/lib/loading'

const Loader = function({fontSize, fontColor}){
    return <div className="loaderIcon">
        <UseAnimations animation={loading} size={fontSize} strokeColor={fontColor} />
    </div>
}

export default Loader;