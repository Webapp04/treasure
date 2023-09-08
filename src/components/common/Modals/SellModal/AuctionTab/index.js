import React from 'react';
import './style.scss'
import AuctionForm from "./AuctionForm";
import {useParams} from "react-router-dom";
import {NFKEY_COLLECTION_ADDRESS} from "../../../../../constant/blockchain";

const AuctionTab = ({onClose, onOpenCheckoutModal, token, setAuctionData, image}) => {
    const params = useParams()
    const isNFKeyCollection = params?.contractAddress === NFKEY_COLLECTION_ADDRESS

    return (
        <div className={'auctionTab'}>

            <div className='listingTab__nft'>
                {isNFKeyCollection
                    ? <img src={token?.spaceThumbnail} className='listingTab__nft--image' alt={''}/>
                    : <img src={image} alt={''} className='listingTab__nft--image'/>
                }
                <p className='modal__boldText listingTab__nft--tokenId'>NFT#{token?.tokenId || token?.tokenID}</p>
                <p className='listingTab__nft--desc'>{token?.name}</p>
            </div>


            <AuctionForm
                onOpenCheckoutModal={onOpenCheckoutModal}
                onClose={onClose}
                setAuctionData={setAuctionData}
                withButtons
            />

        </div>
    );
};

export default AuctionTab;
