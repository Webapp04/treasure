export const APPROVE_OFFER = 1
export const APPROVE_LISTING = 2
export const APPROVE_STAKING_TRESR = 3
export const APPROVE_STAKING_SMRTR = 4
export const APPROVE_UPGRADE_KEY = 5
export const APPROVE_AUCTION = 6
export const APPROVE_UPGRADE_ALL_KEYS = 7

export const APPROVE_STATUS_TEXT = {
    [APPROVE_OFFER]: {
        firstTitle: 'Approve',
        firstText: 'Approve your token for transfers',
        secondTitle: 'Accepting offer',
        secondText: 'Sign message to accept the offer',
        button: 'Accept Offer',
        loadingButton: 'Accepting'
    },
    [APPROVE_LISTING]: {
        firstTitle: 'Approve',
        firstText: 'This transaction is conducted only once per collection',
        secondTitle: 'Start listing',
        secondText: 'Sign message to set fixed price',
        button: 'Start Listing',
        loadingButton: 'Starting'
    },
    [APPROVE_AUCTION]: {
        firstTitle: 'Approve',
        firstText: 'This transaction is conducted only once per collection',
        secondTitle: 'Start auction',
        secondText: 'Sign message to set fixed price',
        button: 'Start Auction',
        loadingButton: 'Starting'
    },
    [APPROVE_STAKING_TRESR]: {
        firstTitle: 'Approve Token',
        firstText: 'This transaction is conducted once per staking',
        secondTitle: 'Stake TRESR',
        secondText: 'Sign message to stake your TRESR',
        button: 'Stake',
        loadingButton: 'Staking'
    },
    [APPROVE_STAKING_SMRTR]: {
        firstTitle: 'Approve Token',
        firstText: 'This transaction is conducted once per staking',
        secondTitle: 'Stake SMRTR-LP',
        secondText: 'Sign message to stake your SMRTR',
        button: 'Stake',
        loadingButton: 'Staking'
    },
    [APPROVE_UPGRADE_KEY]: {
        firstTitle: 'Approve $SMRTR',
        firstText: 'This approval transaction is conducted once per upgrade.',
        secondTitle: 'Upgrade Key',
        secondText: "Sign message to upgrade your Founder's Key.",
        button: 'Upgrade',
        loadingButton: 'Upgrading'
    },
    [APPROVE_UPGRADE_ALL_KEYS]: {
        firstTitle: 'Approve SMRTR',
        firstText: 'This transaction is conducted once per upgrade',
        secondTitle: 'Upgrade All Keys',
        secondText: "Sign message to upgrade Founder's Keys",
        button: 'Upgrade',
        loadingButton: 'Upgrading'
    },
}
