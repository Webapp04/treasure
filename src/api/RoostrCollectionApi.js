import axios from 'axios';

export const getAllTokensRoostr = (amountOnPage = 100, page = 1) => {
    return axios
        .get(`https://api.chikn.farm/api/roostr/list?page=${page}&limit=${amountOnPage}&contentType=application%2Fjson`)
        .then(res => res?.data)
}

export const getNFTMetadataRoostr = (tokenId) => {
    return axios
        .get(`https://api.chikn.farm/api/roostr/metadata/${tokenId}`)
        .then(res => res?.data)
}

export const getNFTInfoRoostr = (tokenId) => {
    return axios
        .get(`https://api.chikn.farm/api/roostr/details/${tokenId}`)
        .then(res => res?.data)
}
