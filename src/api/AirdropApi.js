import Base from "./Base";

export default class AirdropApi extends Base {
    async findWallet(wallet_id) {
        return await super.get(`customer?wallet_id=${wallet_id}`)
    }

    async availableNft(tier) {
        return await super.get(`ipfs?tier=${tier}`)
    }

    async logger(data) {
        return await super.post(`logger`, {...data, timestamp: new Date().getTime()})
    }

    async getIpfs(hash) {
        return await super.get(`ipfs/meta?hash=${hash}`)
    }


    async sendEmail(email) {
        return await super.post('email', { email, timestamp: new Date().getTime() })
    }
}