import Base from "./Base";

export default class CollectionApi extends Base {
    async getTokenList(contractAddress, limit = 10, page = 1) {
        return super.get(`marketplace/token/${contractAddress}?limit=${limit}&page=${page}`);
    }

    async getOneToken(contractAddress, tokenID) {
        return super.get(`marketplace/token/${contractAddress}/${tokenID}`);
    }

    async createToken(contractAddress, tokenID, fileLinkCDN, owner, metadata) {
        return super.post(`marketplace/token/${contractAddress}/${tokenID}`, {fileLinkCDN, owner, metadata});
    }

    async checkToken(contractAddress, tokenID) {
        return super.post(`marketplace/token/check/${contractAddress}/${tokenID}`);
    }

    async getCollectionStatistics(contractAddress) {
        return super.get(`marketplace/collection/info/${contractAddress}`);
    }
}
