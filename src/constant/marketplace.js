import nftImage from '../assets/images/marketplace/nftImg.svg'

import {
    AVAX_APES_COLLECTION_ADDRESS,
    CASH_COWS_TAPE_COLLECTION_ADDRESS,
    CHIKN_COLLECTION_ADDRESS,
    CLOUDHEADS_COLLECTION_ADDRESS,
    COMMUNITY_COLLECTION_ADDRESS,
    DOODLEVERSE_COLLECTION_ADDRESS,
    FARMLAND_COLLECTION_ADDRESS,
    HAPPY_SUN_COLLECTION_ADDRESS,
    JOEPEGS_COLLECTION_ADDRESS,
    MORE_SATOS_COLLECTION_ADDRESS,
    NFKEY_COLLECTION_ADDRESS,
    PARTY_ANIMALS_COLLECTION_ADDRESS,
    ROOSTR_COLLECTION_ADDRESS
} from "./blockchain";
import {DASHBOARD_TAB_MENU_DASHBOARD, DASHBOARD_TAB_MENU_FAQ, DASHBOARD_TAB_MENU_GAME} from "./navigation";

export const TAB_MENU_ITEMS = [
    // {
    //     label: 'Created',
    //     value: 'created'
    // },
    {
        label: 'All my NFTs',
        value: 'nfts'
    },
    {
        label: 'Auctions',
        value: 'auctions'
    },
    {
        label: 'Activity',
        value: 'activity'
    }
]

export const TOP_COLLECTIONS_TABS = [
    {
        label: '24 hours',
        value: '1'
    },
    {
        label: '7 days',
        value: '7'
    },
    {
        label: '30 days',
        value: '30'
    }
]

export const COLLECTION_ITEMS = [
    {
        image: '',
        title: 'NFKey',
        amount: '1245.6k',
        percentage: '+14,56%',
        isMinted: false,
        contractAddress: process.env.REACT_APP_NFKEY_ADDRESS
    },
    {
        image: '',
        title: 'Community Collection',
        amount: '1245.6k',
        percentage: '+14,56%',
        isMinted: false,
        contractAddress: COMMUNITY_COLLECTION_ADDRESS
    },
    {
        image: '',
        title: 'Chikn',
        amount: '1245.6k',
        percentage: '+14,56%',
        isMinted: false,
        contractAddress: CHIKN_COLLECTION_ADDRESS
    },
    {
        image: '',
        title: 'FarmLand',
        amount: '1245.6k',
        percentage: '+14,56%',
        isMinted: false,
        contractAddress: FARMLAND_COLLECTION_ADDRESS
    },
    {
        image: '',
        title: 'Roostr',
        amount: '1245.6k',
        percentage: '+14,56%',
        isMinted: false,
        contractAddress: ROOSTR_COLLECTION_ADDRESS
    },
    {
        image: '',
        title: 'Conscious Lines By Gabe Weis',
        amount: '1245.6k',
        percentage: '+14,56%',
        isMinted: false,
        contractAddress: JOEPEGS_COLLECTION_ADDRESS
    },
    {
        image: '',
        title: 'Cloudheadz',
        amount: '1245.6k',
        percentage: '+14,56%',
        isMinted: false,
        contractAddress: CLOUDHEADS_COLLECTION_ADDRESS
    },
    {
        image: '',
        title: 'Doodleverse',
        amount: '1245.6k',
        percentage: '+14,56%',
        isMinted: false,
        contractAddress: DOODLEVERSE_COLLECTION_ADDRESS
    },
    {
        image: '',
        title: 'Happy Sun',
        amount: '1245.6k',
        percentage: '+14,56%',
        isMinted: false,
        contractAddress: HAPPY_SUN_COLLECTION_ADDRESS
    },
    {
        image: '',
        title: 'AvaxApes',
        amount: '1245.6k',
        percentage: '+14,56%',
        isMinted: false,
        contractAddress: AVAX_APES_COLLECTION_ADDRESS
    },
    {
        image: '',
        title: 'Party Animals',
        amount: '1245.6k',
        percentage: '+14,56%',
        isMinted: false,
        contractAddress: PARTY_ANIMALS_COLLECTION_ADDRESS
    },
    {
        image: '',
        title: 'More Satos',
        amount: '1245.6k',
        percentage: '+14,56%',
        isMinted: false,
        contractAddress: MORE_SATOS_COLLECTION_ADDRESS
    },
    {
        image: '',
        title: 'Cash Cows',
        amount: '1245.6k',
        percentage: '+14,56%',
        isMinted: false,
        contractAddress: CASH_COWS_TAPE_COLLECTION_ADDRESS
    },

]

export const ACTIVITY_TABLE_DATA = [
    {
        image: '',
        name: 'Infected Mob',
        price: '1720,37',
        networkId: 10,
        quantity: '13,986',
        addressFrom: '0x61688ff1E4aA41BFfC6C6137976bF811fCd1Ac23',
        addressTo: '-',
        activity: 'Minted',
        time: '10/04/22'
    },
    {
        image: '',
        name: 'Infected Mob',
        price: '1720,37',
        networkId: 10,
        quantity: '13,986',
        addressFrom: '0x61688ff1E4aA41BFfC6C6137976bF811fCd1Ac23',
        addressTo: '-',
        activity: 'Minted',
        time: '10/04/22'
    },
    {
        image: '',
        name: 'Infected Mob',
        price: '1720,37',
        networkId: 10,
        quantity: '13,986',
        addressFrom: '0x61688ff1E4aA41BFfC6C6137976bF811fCd1Ac23',
        addressTo: '-',
        activity: 'Minted',
        time: '10/04/22'
    },
]

export const ACTIVITY_TABLE_HEADER = ['Item', 'Price', 'Quantity', 'From', 'To', 'Time', 'Activity']

export const NAVBAR_ITEMS_MARKETPLACE = [
    {label: 'Profile', link: '/account'},
    {label: 'All NFTs', link: '/allNFTs'},
    {label: 'Collections', link: '/collections'},
    {label: 'Statistics', link: '/statistics'},
]

export const NAVBAR_ITEMS_COLLECTION_PAGE = [
    {label: 'All Items', link: 'collections/allItems'},
    // {label: 'Activity', link: 'collections/activity'},
]

export const NAVBAR_ITEMS_ALL_NFTS_PAGE = [
    // {label: 'Founder’s Keys', link: '/allNFTs'},
    // {label: '1:1 Collection', link: '/collections'},
    {label: 'Founder’s Keys', link: `/collections/${NFKEY_COLLECTION_ADDRESS}`},
    {label: '1:1 Collection', link: `/collections/${COMMUNITY_COLLECTION_ADDRESS}`},
]

export const NAVBAR_ITEMS_CREATE_PAGE = [
    {label: 'Uploading One NFT', link: '/create/nft'},
    {label: 'Creating a Collection', link: '/create/collection'},
]

export const NAVBAR_ITEMS_ACCOUNT_PAGE = [
    {label: 'My NFTs', link: '/account'},
    {label: 'Favorites', link: '/account/favourites'},
]

export const FAVOURITED_TAB = 'FAVOURITED_TAB'
export const AUCTIONS_TAB = 'AUCTIONS_TAB'
export const ALL_NFTS_TAB = 'ALL_NFTS_TAB'

export const NAVBAR_ITEMS_GAME_PAGE = [
    {label: 'Key Rewards', link: `/${DASHBOARD_TAB_MENU_GAME}`},
    {label: 'Bonus Rewards', link: `/${DASHBOARD_TAB_MENU_GAME}/${DASHBOARD_TAB_MENU_DASHBOARD}`},
    // {label: 'FAQs', link: `/${DASHBOARD_TAB_MENU_GAME}/${DASHBOARD_TAB_MENU_FAQ}`},
]

export const NFT_DATA = [
    {
        image: nftImage,
        name: '4567r674',
        listed: {
            price: 1,
            endDate: 0,
        },
        status: 1,
        contractAddress: '0x0',
        tokenId: 0
    }, {
        image: nftImage,
        name: '4567r674',
        listed: {
            price: 1,
            endDate: 0,
        },
        status: 1,
        contractAddress: '0x0',
        tokenId: 0
    }, {
        image: nftImage,
        name: '4567r674',
        listed: {
            price: 1,
            endDate: 0,
        },
        status: 1,
        contractAddress: '0x0',
        tokenId: 0
    }, {
        image: nftImage,
        name: '4567r674',
        listed: {
            price: 1,
            endDate: 0,
        },
        status: 1,
        contractAddress: '0x0',
        tokenId: 0
    }, {
        image: nftImage,
        name: '4567r674',
        listed: {
            price: 1,
            endDate: 0,
        },
        status: 1,
        contractAddress: '0x0',
        tokenId: 0
    }, {
        image: nftImage,
        name: '4567r674',
        listed: {
            price: 1,
            endDate: 0,
        },
        status: 1,
        contractAddress: '0x0',
        tokenId: 0
    }, {
        image: nftImage,
        name: '4567r674',
        listed: {
            price: 1,
            endDate: 0,
        },
        status: 1,
        contractAddress: '0x0',
        tokenId: 0
    }, {
        image: nftImage,
        name: '4567r674',
        listed: {
            price: 1,
            endDate: 0,
        },
        status: 1,
        contractAddress: '0x0',
        tokenId: 0
    }, {
        image: nftImage,
        name: '4567r674',
        listed: {
            price: 1,
            endDate: 0,
        },
        status: 1,
        contractAddress: '0x0',
        tokenId: 0
    }, {
        image: nftImage,
        name: '4567r674',
        listed: {
            price: 1,
            endDate: 0,
        },
        status: 1,
        contractAddress: '0x0',
        tokenId: 0
    },
]

export const TOP_COLLECTION_ITEMS = [
    {name: '12434', percentage: '+14,56%', floor: '100', image: ''},
    {name: '12434', percentage: '+14,56%', floor: '100', image: ''},
    {name: '12434', percentage: '+14,56%', floor: '100', image: ''},
    {name: '12434', percentage: '+14,56%', floor: '100', image: ''},
    {name: '12434', percentage: '+14,56%', floor: '100', image: ''},
    {name: '12434', percentage: '+14,56%', floor: '100', image: ''},
    {name: '12434', percentage: '+14,56%', floor: '100', image: ''},
    {name: '12434', percentage: '+14,56%', floor: '100', image: ''},
    {name: '12434', percentage: '+14,56%', floor: '100', image: ''},
    {name: '12434', percentage: '+14,56%', floor: '100', image: ''},
    {name: '12434', percentage: '+14,56%', floor: '100', image: ''},
    {name: '12434', percentage: '+14,56%', floor: '100', image: ''},
]


export const FILTER_STATUS = 1
export const FILTER_PRICE = 2
export const FILTER_BLOCKCHAIN = 3
export const FILTER_PROPERTIES = 4
export const FILTER_SORT_BY = 5

export const FILTERS_CRITERIONS = [
    {label: 'Status', value: FILTER_STATUS},
    {label: 'Price', value: FILTER_PRICE},
    {label: 'Blockchain', value: FILTER_BLOCKCHAIN},
    // {label: 'Properties', value: FILTER_PROPERTIES},
    {label: 'Sort by', value: FILTER_SORT_BY},
]

export const FILTER_SORT_BY_OPTIONS = ['Price Low to High', 'Price High to Low']
export const FILTER_BUY_NOW = 'Buy Now'
export const FILTER_ON_AUCTION = 'On Auction'
export const FILTER_PRICE_LOW_TO_HIGH = 'Price Low to High'
export const FILTER_PRICE_HIGH_TO_LOW = 'Price High to Low'

export const FILTERS_OPTIONS = {
    [FILTER_STATUS]: [FILTER_BUY_NOW, FILTER_ON_AUCTION],
    [FILTER_PRICE]: [],
    [FILTER_BLOCKCHAIN]: ['Avalanche'],
    [FILTER_PROPERTIES]: ['Background', 'Head', 'Body', 'Accessories', 'Arms'],
    [FILTER_SORT_BY]: FILTER_SORT_BY_OPTIONS,
}

export const TOKEN_ID_LIST = Array.from(Array(16).keys(), n => n + 1)
export const TOKEN_ID_LIST_4 = Array.from(Array(4).keys(), n => n + 1)

