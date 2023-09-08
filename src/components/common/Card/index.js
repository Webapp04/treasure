import './style.scss';
import avaxBlueImage from '../../../assets/images/avax-blue.svg'
import avaxOrangeImage from '../../../assets/images/avax-orange.svg'

const Card = ({rewardCount, ticker, title}) => {

    return (
        <div className="card">
            <div className="card__title">{title}</div>
            <img
                className="card__icon"
                src={ticker === 'TRESR' ? avaxOrangeImage : avaxBlueImage} alt=""
            />
            <div className="card__reward">
                {rewardCount}
            </div>
            <div className="card__p1">
                AVAILABLE ${ticker} TO CLAIM
            </div>
            <div className="card__p2">
                est 150.000000 ${ticker} per month
            </div>
            <button className="button light claim">
                Claim ${ticker}
            </button>
            <div className="card__p3">
                Stake ${ticker}-AVAX to Boost Bonus Rewards
            </div>
            <div className="card__p4">
                <div>0.56</div>
                <div>5.06 <span>ve{ticker} boost/hour</span></div>
                <div>0.8%</div>
            </div>
            <button className="button stake">Stake</button>
        </div>
    );
}

export default Card;
