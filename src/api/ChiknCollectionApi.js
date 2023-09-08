import axios from 'axios';

export const getAllTokensChikn = (amountOnPage = 100, page = 1) => {
    return axios
        .get(`https://api.chikn.farm/api/chikn/list?page=${page}&limit=${amountOnPage}&contentType=application%2Fjson`)
        .then(res => res?.data)
}

export const getNFTMetadataChikn = (tokenId) => {
    return axios
        .get(`https://api.chikn.farm/api/chikn/metadata/${tokenId}`)
        .then(res => res?.data)
}

export const getNFTDataChikn = (tokenId) => {
    return axios
        .get(`https://api.chikn.farm/api/chikn/details/${tokenId}`)
        .then(res => res?.data)
}
