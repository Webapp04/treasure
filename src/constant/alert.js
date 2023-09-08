export const MESSAGE_FAIL_DEFAULT = "Something went wrong!";

export const ALERT_STATUS_SUCCESS = 1;
export const ALERT_STATUS_FAILURE = 2;
export const ALERT_STATUS_INFO = 3;

export const TRANSFER_MESSAGE_SUCCESS = "You successfully transferred your NFT";
export const TRANSFER_MESSAGE_FAILURE = "Transfer failed. Try again";

export const APPROVE_MESSAGE_FAILURE = "Approve failed. Try again";
export const LISTING_MESSAGE_FAILURE = "Listing creation failed. Try again";

export const FILE_LOADING_MESSAGE_FAILURE = "Failed to load file. Try again";
export const METADATA_LOADING_MESSAGE_FAILURE =
  "Failed to load metadata. Try again";
export const MINT_MESSAGE_FAILURE = "Failed to mint NFT. Try again";

export const LISTING_CREATED = (id) =>
  `This Founder’s Key #${id} was put on listing`;
export const LISTING_CHANGED = (id) =>
  `Price for Founder’s Key #${id} has been changed`;
export const LISTING_CANCELED = (id) =>
  `Listing for this Founder’s Key #${id} was canceled`;
export const LISTING_BUYING = (id) =>
  `This Founder’s Key #${id} has been bought`;

export const OFFER_CREATED = (id) =>
  `Someone placed an offer on this Founder’s Key #${id}`;
export const OFFER_ACCEPTED = (id) =>
  `Your offer on Founder’s Key #${id} was accepted`;
export const OFFER_CANCELED = (id) =>
  `Offer on Founder’s Key #${id} was canceled`;

export const AUCTION_CREATED = (id) =>
  `This Founder’s Key #${id} was put on auction`;
export const AUCTION_CANCELED = (id) =>
  `Auction for this Founder’s Key #${id} was canceled`;
export const AUCTION_FINALIZED = (id) =>
  `Auction for this Founder’s Key #${id} was finalized`;
export const BID_SUCCESS = (id) =>
  `Someone placed a bid on this Founder’s Key #${id}`;

export const TRANSFER_EVENT = (id) =>
  `Someone transferred Founder’s Key #${id} to you`;

export const ACTIVATE_KEY_ALERT = (id, status) =>
  status
    ? `You successfully activated Founder’s Key #${id}`
    : `Activation of Founder’s Key #${id} failed. Try again`;

export const DEACTIVATE_KEY_ALERT = (id, status) =>
  status
    ? `You successfully deactivated Founder’s Key #${id}`
    : `Deactivation of Founder’s Key #${id} failed. Try again`;

export const UPGRADE_KEY_ALERT = (id, status) =>
  status
    ? `You successfully upgraded Founder’s Key #${id}`
    : `Upgrade of Founder’s Key #${id} failed. Try again`;

export const CLAIM_FOUNDERS_REWARDS_ALERT = (status) =>
  status
    ? `You successfully claimed Founder’s rewards`
    : `Failed to claim Founder’s rewards. Try again`;

export const CLAIM_ALL_FOUNDERS_REWARDS_ALERT = (status) =>
  status
    ? `You successfully claimed all Founder’s rewards`
    : `Failed to claim all founder's rewards. Try again`;

export const CLAIM_ALL_REWARDS_ALERT = (status) =>
  status
    ? `You successfully claimed all rewards`
    : `Failed to claim all rewards. Try again`;

export const CLAIM_BONUS_REWARDS_ALERT = (status) =>
  status
    ? `You successfully claimed bonus rewards`
    : `Failed to claim bonus rewards. Try again`;

export const STAKE_TRESR_LP_ALERT = (status, value) =>
  status
    ? `You successfully staked ${value} TRESR-AVAX-LP`
    : `Failed to staked ${value} TRESR-AVAX-LP. Try again`;

export const STAKE_SMRTR_LP_ALERT = (status, value) =>
  status
    ? `You successfully staked ${value} SMRTR-AVAX-LP`
    : `Failed to staked ${value} SMRTR-AVAX-LP. Try again`;

export const UNSTAKE_TRESR_LP_ALERT = (status, value) =>
  status
    ? `You successfully unstaked ${value} TRESR-AVAX-LP`
    : `Failed to unstaked ${value} TRESR-AVAX-LP. Try again`;

export const UNSTAKE_SMRTR_LP_ALERT = (status, value) =>
  status
    ? `You successfully unstaked ${value} SMRTR-AVAX-LP`
    : `Failed to unstaked ${value} SMRTR-AVAX-LP. Try again`;

export const STAKE_TRESR = (status, value) =>
  status
    ? `You successfully staked ${value} TRESR`
    : `Failed to staked ${value} TRESR. Try again`;

export const UNSTAKE_TRESR = (status, value) =>
  status
    ? `You successfully unstaked ${value} TRESR`
    : `Failed to unstaked ${value} TRESR. Try again`;
