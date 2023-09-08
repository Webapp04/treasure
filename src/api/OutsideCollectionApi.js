import axios from 'axios';

export const getCollectionInfo = (collectionAddress) => {
    const options = {
        method: 'GET',
        url: `https://deep-index.moralis.io/api/v2/nft/${collectionAddress}/metadata`,
        params: {chain: 'avalanche'},
        headers: {accept: 'application/json', 'X-API-Key': process.env.REACT_APP_MORALIS_API_KEY}
    };

    return axios
        .request(options)
        .then(response => {
            return response.data
        })
}

export const getCollectionInfoTESTNET = (collectionAddress) => {
    const options = {
        method: 'GET',
        url: `https://deep-index.moralis.io/api/v2/nft/${collectionAddress}/metadata`,
        params: {chain: '0xa869'},
        headers: {accept: 'application/json', 'X-API-Key': process.env.REACT_APP_MORALIS_API_KEY}
    };

    return axios
        .request(options)
        .then(response => response.data)
        .catch(() => null)
}

export const getCollectionNFTs = (collectionAddress) => {
    const options = {
        method: 'GET',
        url: `https://deep-index.moralis.io/api/v2/nft/${collectionAddress}`,
        params: {chain: 'avalanche', format: 'decimal'},
        headers: {accept: 'application/json', 'X-API-Key': process.env.REACT_APP_MORALIS_API_KEY}
    };

    return axios
        .request(options)
        .then(response => response.data)
}

export const getOneNftMetadata = (collectionAddress, tokenID) => {
    const options = {
        method: 'GET',
        url: `https://deep-index.moralis.io/api/v2/nft/${collectionAddress}/${tokenID}`,
        params: {chain: 'avalanche', format: 'decimal'},
        headers: {accept: 'application/json', 'X-API-Key': process.env.REACT_APP_MORALIS_API_KEY}
    };

    return axios
        .request(options)
        .then(response => response.data)
}
