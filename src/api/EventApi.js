import Base from "./Base";

export default class EventApi extends Base {
    async getTokenHistory(contractAddress, tokenID) {
        return super.post(`event/history/${contractAddress}/${tokenID}`);
    }
}
