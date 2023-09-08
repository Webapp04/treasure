import Base from "./Base";

export default class AuthApi extends Base {
    async loginMetamask(data) {
        return super.post("auth/customer/login-metamask", data);
    }
}