import 'react-toastify/dist/ReactToastify.css';
import '../style.scss';

export default function HomeNoMore() {
    return (
        <div className="homePage__info">
            <div className="homePage__info-title">No more keys to mint</div>
            <div className="homePage__info-subtitle">
                It looks like you have already minted Founder’s Key. There are no more keys to mint at this time.
            </div>
        </div>
    );
}
