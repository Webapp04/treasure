import Base from "./Base";
const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3'

export default class PriceApi extends Base {
    async getPriceByCoingeckoId(coingecko_id) {
        // market_data.current_price.usd
        return super.getThirdParty(`${COINGECKO_API_URL}/coins/${coingecko_id}?localization=false&tickers=false&community_data=false&developer_data=false&sparkline=false`);
    }
}
