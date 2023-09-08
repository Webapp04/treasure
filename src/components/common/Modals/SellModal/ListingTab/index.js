import React from 'react';
import './style.scss'
import ListingForm from "./ListingForm";
import {
    NFKEY_COLLECTION_ADDRESS
} from "../../../../../constant/blockchain";
import {useParams} from "react-router-dom";

const ListingTab = ({onClose, onOpenCheckoutModal, token, setSellData, image}) => {
    const params = useParams()
    const isNFKeyCollection = params?.contractAddress === NFKEY_COLLECTION_ADDRESS
    return (
        <div className={'listingTab'}>

            <div className='listingTab__nft'>
                {isNFKeyCollection
                    ? <img src={token?.spaceThumbnail} className='listingTab__nft--image' alt={''}/>
                    : <img src={image} alt={''} className='listingTab__nft--image'/>
                }
                <p className='modal__boldText listingTab__nft--tokenId'>NFT#{token?.tokenId || token?.tokenID}</p>
                <p className='listingTab__nft--desc'>{token?.name}</p>
            </div>

            <ListingForm
                onClose={onClose}
                setSellData={setSellData}
                onOpenCheckoutModal={onOpenCheckoutModal}
                withButtons
            />

        </div>
    );
};

export default ListingTab;
