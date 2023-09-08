import loaderIcon from '../../../assets/images/loader.gif'
import loaderBlueIcon from '../../../assets/images/loaderBlue.gif'

const Loader = ({blue = false}) => {
    return (
        <div className="loader">
            <img src={blue ? loaderBlueIcon : loaderIcon} style={{height: '16px'}} alt=""/>
        </div>
    );
}

export default Loader;
