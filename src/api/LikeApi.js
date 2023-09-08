import Base from "./Base";

export default class LikeApi extends Base {
    async set(data) {
        if (!super.getToken()) return null;
        return super.post('like', data);
    }

    async getAll() {
        if (!super.getToken()) return null;
        return super.get('like');
    }

    async getCountByTokens(data) {
        return super.post("like/tokens", data);
    }

    async getCountByToken(data) {
        return super.post("like/token", data);
    }
}
