import partnershipImage from '../../assets/images/partnership.png';

import './style.scss';

const Partnership = () => {
    return (
        <div className="partnership">
            <div className="partnership--content">
                <h1>
                    HFKey Holders: <br></br>
                    Suggest a Partnership
                </h1>
                <p>
                    Our goal is to find the best partnerships in crypto for our Founder’s Key holders and we’re relying on our community to point us in the right direction. Know a project launching that’s looking for a boost from our comunity? Submit details and we’ll negotiate the best deals we can for our trusted NFKey holders.
                </p>
                <div className="partnership--content-buttons">
                    <button className="button">
                        Suggest a Partnership
                    </button>
                    <button className="button light">
                        Discover more
                    </button>
                </div>
            </div>
            <div className="partnership--image">
                <img src={partnershipImage} alt="" />
            </div>
        </div>
    )
}

export default Partnership;
