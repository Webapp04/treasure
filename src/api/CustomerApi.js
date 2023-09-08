import Base from "./Base";

export default class CustomerApi extends Base {
    async getInfo() {
        return super.get(`customer/info`);
    }

    async getNonce(address) {
        return super.get(`customer/nonce/${address}`);
    }

    async getMerkleTree(address) {
        return super.get(`customer/merkleTree/${address}`);
    }
    
    async updateOne(data) {
        return super.put('customer', data)
    }
}
