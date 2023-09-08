import axios from 'axios';

export const getAllTokensFarmLand = (amountOnPage = 100, page = 1) => {
    return axios
        .get(`https://api.chikn.farm/api/farmland/list?page=${page}&limit=${amountOnPage}&contentType=application%2Fjson`)
        .then(res => res?.data)
}

export const getNFTMetadataFarmLand = (tokenId) => {
    return axios
        .get(`https://api.chikn.farm/api/farmland/metadata/${tokenId}`)
        .then(res => res?.data)
}

export const getNFTInfoFarmLand = (tokenId) => {
    return axios
        .get(`https://api.chikn.farm/api/farmland/details/${tokenId}`)
        .then(res => res?.data)
}
