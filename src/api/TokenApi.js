import Base from "./Base";

export default class TokenApi extends Base {
  async getTokenList(address) {
    // TODO: should fetch token of users, not all
    return super.get(`token/${address}`);
  }

  async createToken(data) {
    return super.post(`token`, data);
  }

  async checkToken(data) {
    return super.post("token/check", data);
  }

  async updateUserTokenList(data) {
    return super.post("token/updateUserTokenList", data);
  }

  async getAmount() {
    return super.get("token/amount");
  }

  async checkTxEvent({ txHash, eventName }) {
    return super.get(`token/checkTxEvent/${txHash}/${eventName}`);
  }
}
