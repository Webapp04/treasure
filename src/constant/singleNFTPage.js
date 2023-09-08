export const LISTING_TABLE_HEADERS = ["Event", "Volume", "Tx", "Date"];
export const LISTING_TABLE_DATA = [
  {
    eventNFT: "Offer",
    price: "10",
    from: "@no_name_6723",
    to: "@no_name_6723",
    date: "a day ago",
  },
  {
    eventNFT: "Offer",
    price: "10",
    from: "@no_name_6723",
    to: "@no_name_6723",
    date: "a day ago",
  },
  {
    eventNFT: "Offer",
    price: "10",
    from: "@no_name_6723",
    to: "-",
    date: "a day ago",
  },
];

export const OFFER_TABLE_HEADERS = [
  "Price",
  "From",
  "To",
  "Start date",
  "End date",
  "",
];
export const OFFER_TABLE_DATA = [
  {
    price: "10",
    from: "@no_name_6723",
    startDate: "a day ago",
    endDate: "a day ago",
    action: "Accept",
  },
  {
    price: "10",
    from: "@no_name_6723",
    startDate: "a day ago",
    endDate: "a day ago",
    action: "Accept",
  },
  {
    price: "10",
    from: "@no_name_6723",
    startDate: "a day ago",
    endDate: "a day ago",
    action: "Accept",
  },
];

export const AUCTION_TABLE_HEADERS = ["Price", "USD price", "From", "Date"];
export const AUCTION_TABLE_DATA = [
  {
    price: "10",
    priceUSD: "827,87",
    from: "@no_name_6723",
    date: "12 minutes ago",
  },
  {
    price: "10",
    priceUSD: "827,87",
    from: "@no_name_6723",
    date: "12 minutes ago",
  },
  {
    price: "10",
    priceUSD: "827,87",
    from: "@no_name_6723",
    date: "12 minutes ago",
  },
];

export const RAFFLE_TABLE_HEADERS = ["Amount", "USD Price", "From", "Date"];
export const RAFFLE_TABLE_DATA = [
  {
    amount: "10",
    price: "827,87",
    from: "@no_name_6723",
    date: "12 minutes ago",
    isUSD: true,
  },
  {
    amount: "10",
    price: "827,87",
    from: "@no_name_6723",
    date: "12 minutes ago",
    isUSD: true,
  },
  {
    amount: "10",
    price: "827,87",
    from: "@no_name_6723",
    date: "12 minutes ago",
    isUSD: true,
  },
];

export const NFT_METADATA = [
  {
    background: "Background",
    color: "Dark Purple",
    percentage: "5% have this trait",
  },
  {
    background: "Background",
    color: "Dark Purple",
    percentage: "5% have this trait",
  },
  {
    background: "Background",
    color: "Dark Purple",
    percentage: "5% have this trait",
  },
  {
    background: "Background",
    color: "Dark Purple",
    percentage: "5% have this trait",
  },
  {
    background: "Background",
    color: "Dark Purple",
    percentage: "5% have this trait",
  },
  {
    background: "Background",
    color: "Dark Purple",
    percentage: "5% have this trait",
  },
  {
    background: "Background",
    color: "Dark Purple",
    percentage: "5% have this trait",
  },
  {
    background: "Background",
    color: "Dark Purple",
    percentage: "5% have this trait",
  },
];

export const SOCIALS_FOOTER = [
  { image: "twitterImg" },
  { image: "discordImg" },
  { image: "instaImg" },
  { image: "facebookImg" },
];

export const SOCIALS_FOOTER_LIGHT = [
  { image: "twitterImgLight", link: "https://twitter.com/0xNFTreasure" },
  { image: "discordImgLight", link: "https://discord.gg/7YEpq7MY" },
  { image: "instaImgLight", link: "https://discord.gg/7YEpq7MY" },
  { image: "facebookImgLight", link: "https://discord.gg/7YEpq7MY" },
];

export const NAV_LINKS_FOOTER = [
  { label: "Marketplace", path: "/#", isUser: true, isToken: false },
  { label: "Defi Game", path: "/game", isUser: true, isToken: true },
  {
    label: "Litepaper",
    path: "https://paper.nftreasure.com/",
    isUser: true,
    isToken: true,
  },
];

export const FOOTER_WALLET_ADDRESS = [
  {
    label: "Founder's Keys",
    addr: "0x630d6ADf8Eb4886E9fC62805Db376d767D038666",
    addable: false,
  },
  {
    label: "$TRESR",
    addr: "0x630d6ADf8Eb4886E9fC62805Db376d767D038666",
    addable: true,
  },
  {
    label: "$SMRTR",
    addr: "0x630d6ADf8Eb4886E9fC62805Db376d767D038666",
    addable: true,
  },
  {
    label: "$TRESR/AVAX LP",
    addr: "0x630d6ADf8Eb4886E9fC62805Db376d767D038666",
    addable: true,
  },
  {
    label: "$SMRTR/AVAX LP",
    addr: "0x630d6ADf8Eb4886E9fC62805Db376d767D038666",
    addable: true,
  },
];

export const MODAL_TAB_MENU_ITEMS = [
  {
    label: "Start the Raffle",
    value: "raffle",
  },
  {
    label: "Timed Auction",
    value: "auction",
  },
  {
    label: "Fixed price",
    value: "listing",
  },
];

export const AVAILABLE_CURRENCY = [
  {
    label: "AVAX",
    value: "avax",
    address: "0x0000000000000000000000000000000000000000",
    coingecko_id: "avalanche-2",
  },
  {
    label: "WAVAX",
    value: "wavax",
    address: "0xD9D01A9F7C810EC035C0e42cB9E80Ef44D7f8692",
    coingecko_id: "avalanche-2",
  },
  {
    label: "USDC",
    value: "usdc",
    address: "0x6701dbeF919500c7B030253fE0de17A41efAa1dE",
  },
  {
    label: "WETH.e",
    value: "weth.e",
    address: "0x4f5003fd2234Df46FB2eE1531C89b8bdcc372255",
    coingecko_id: "ethereum",
  },
  {
    label: "BTC.b",
    value: "btc.b",
    address: "0x1cd0FcbE15E4365C8D11513e0406CA00F02e61c8",
    coingecko_id: "bitcoin",
  },
  {
    label: "TRESR",
    value: "tresr",
    address: process.env.REACT_APP_TRESR_ADDRESS,
  },
  {
    label: "SMRTR",
    value: "smrtr",
    address: process.env.REACT_APP_SMARTR_ADDRESS,
    coingecko_id: "smart-coin-smrtr",
  },
];

export const DURATION_DROPDOWN = [
  { label: "1 Day", value: 1 },
  { label: "3 Days", value: 3 },
  { label: "1 Week", value: 7 },
  { label: "Custom", value: 0 },
];

export const SUCCESS_LISTING_TEXT = (token) =>
  `Your NFT#${token?.tokenId} has been successfully Listed.`;
export const SUCCESS_AUCTION_TEXT = (token) =>
  `Your NFT#${token?.tokenId} has been successfully Auctioned.`;
export const SUCCESS_BUY_TEXT = (token) =>
  `You successfully bought NFT#${token?.tokenId}.`;
export const SUCCESS_ACCEPT_OFFER = (token) =>
  `You just sold NFT#${token?.tokenId}. It’s been confirmed on the blockchain!`;
export const SUCCESS_CREATE_TEST = (token) =>
  `Your NFT is now live in blockchain, and your auction was successfully started.`;

export const SINGLE_NFT_PAGE_TABS = [
  { title: "Details", id: 0 },
  { title: "Offers", id: 1 },
  { title: "Item activity", id: 2 },
];
