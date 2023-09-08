// const AVALANCHE_MAINNET_PARAMS = {
//     chainId: '0xA86A',
//     chainName: 'Avalanche Mainnet C-Chain',
//     nativeCurrency: {
//       name: 'Avalanche',
//       symbol: 'AVAX',
//       decimals: 18
//     },
//     rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
//     blockExplorerUrls: ['https://snowtrace.io/']
// }

export const AVALANCHE_TESTNET_PARAMS = {
    chainId: '0xA869',
    chainName: 'Avalanche Testnet C-Chain',
    nativeCurrency: {
        name: 'Avalanche',
        symbol: 'AVAX',
        decimals: 18
    },
    rpcUrls: ['https://api.avax-test.network/ext/bc/C/rpc'],
    blockExplorerUrls: ['https://testnet.snowtrace.io/']
}

export const AVALANCHE_NETWORK_PARAMS = AVALANCHE_TESTNET_PARAMS;

export const CHIKN_COLLECTION_ADDRESS = '0x8927985B358692815E18F2138964679DcA5d3b79' // 3,1147138889 hours to upload
export const ROOSTR_COLLECTION_ADDRESS = '0xCf91B99548b1C17dD1095c0680E20de380635e20'
export const FARMLAND_COLLECTION_ADDRESS = '0x00f5D01D86008D14d04E29EFe88DffC75a9cAc47'

export const JOEPEGS_COLLECTION_ADDRESS = '0xB842344669579ECf4Cee12f740520376c4CBC6d1'
export const CLOUDHEADS_COLLECTION_ADDRESS = '0xE8dBa81D5B9f605D3C53c67AdEa91D295606cE74' // 298,559 seconds / 4,976 minutes to upload
export const DOODLEVERSE_COLLECTION_ADDRESS = '0x6aF53a162Deb0d3ABfd4F47Bd6c9615b08D553FD' // 7,596 seconds to upload
export const HAPPY_SUN_COLLECTION_ADDRESS = '0x17d11B8802bd5eD3FcC838bE353D927B4983C2dE' // 5,616 seconds to upload

export const AVAX_APES_COLLECTION_ADDRESS = '0x6d5087B3082f73D42a32D85e38BC95dcceDe39Bb' // 327545ms
export const PARTY_ANIMALS_COLLECTION_ADDRESS = '0x880Fe52C6bc4FFFfb92D6C03858C97807a900691' // 334341ms
export const MORE_SATOS_COLLECTION_ADDRESS = '0x457990106d7663723ce177CD07f3Ae8D69c845FC' // 8852ms
export const VIN_TAGE_TAPE_COLLECTION_ADDRESS = '0xe723411537eF0c57e367F0a67D965573c28d94af' // 7228ms

export const CASH_COWS_TAPE_COLLECTION_ADDRESS = '0x1b676534F9575881ff573dDb411BaDcf0e1E7136' // 7228ms

export const NFKEY_COLLECTION_ADDRESS = process.env.REACT_APP_NFKEY_ADDRESS
export const COMMUNITY_COLLECTION_ADDRESS = process.env.REACT_APP_COMMUNITY_COLLECTION_ADDRESS

export const MAX_LEVEL = 150;
export const MAX_CHEST_TIER = 7;
export const BASE_REWARD = 0.125;

export const MARKETPLACE_STATUS_PENDING = 0;
export const MARKETPLACE_STATUS_MINTED = 1;
export const MARKETPLACE_STATUS_LISTED = 2;
export const MARKETPLACE_STATUS_AUCTION = 3;
export const MARKETPLACE_STATUS_RUFFLE = 4;
export const MARKETPLACE_STATUS_STAKED = 5;
export const MARKETPLACE_STATUS = {
    [MARKETPLACE_STATUS_PENDING]: {title: 'Pending'},
    [MARKETPLACE_STATUS_MINTED]: {title: 'Minted'},
    [MARKETPLACE_STATUS_LISTED]: {title: 'On sale'},
    [MARKETPLACE_STATUS_AUCTION]: {title: 'Auction'},
    [MARKETPLACE_STATUS_RUFFLE]: {title: 'Ruffle'},
    [MARKETPLACE_STATUS_STAKED]: {title: 'Staked'},
};


export const EVENT_CREATED_LISTING = 'CREATED_LISTING'
export const EVENT_BUYING_LISTING = 'BUYING_LISTING'
export const EVENT_CANCEL_LISTING = 'CANCEL_LISTING'
export const EVENT_CHANGED_LISTING = 'CHANGED_LISTING'

export const EVENT_ACCEPT_OFFER = 'ACCEPT_OFFER'
export const EVENT_CREATED_OFFER = 'CREATED_OFFER'
export const EVENT_CANCELED_OFFER = 'CANCELED_OFFER'

export const EVENT_TRANSFER = 'TRANSFER'

export const EVENT_AUCTION_CREATED = 'AUCTION_CREATED'
export const EVENT_AUCTION_CANCELED = 'AUCTION_CANCELED'
export const EVENT_AUCTION_FINALIZED = 'AUCTION_FINALIZED'
export const EVENT_BID_SUCCESS = 'BID_SUCCESS'

export const MINT_KEY_LEVEL_DEFAULT = 'https://artifactory-nfkey.nyc3.digitaloceanspaces.com/keys-space/1/400x400.mp4';
export const MINT_KEY_LEVEL_LIST = {
    1: 'https://artifactory-nfkey.nyc3.digitaloceanspaces.com/keys-space/1/400x400.mp4',
    2: 'https://artifactory-nfkey.nyc3.digitaloceanspaces.com/keys-space/2/400x400.mp4',
    3: 'https://artifactory-nfkey.nyc3.digitaloceanspaces.com/keys-space/3/400x400.mp4',
    4: 'https://artifactory-nfkey.nyc3.digitaloceanspaces.com/keys-space/4/400x400.mp4',
    5: 'https://artifactory-nfkey.nyc3.digitaloceanspaces.com/keys-space/5/400x400.mp4',
    6: 'https://artifactory-nfkey.nyc3.digitaloceanspaces.com/keys-space/6/400x400.mp4',
    7: 'https://artifactory-nfkey.nyc3.digitaloceanspaces.com/keys-space/7/400x400.mp4',
    8: 'https://artifactory-nfkey.nyc3.digitaloceanspaces.com/keys-space/8/400x400.mp4',
    9: 'https://artifactory-nfkey.nyc3.digitaloceanspaces.com/keys-space/9/400x400.mp4',
    10: 'https://artifactory-nfkey.nyc3.digitaloceanspaces.com/keys-space/10/400x400.mp4',
}
