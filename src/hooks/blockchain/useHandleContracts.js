import { useMemo } from "react";
import { ethers } from "ethers";
import WHITELIST_ABI from "../../abi/WHITELIST_ABI.json";
import NFKEY_ABI from "../../abi/NFKEY_ABI.json";
import SMARTR_ABI from "../../abi/SMARTR_ABI.json";
import NFKEY_STAKING_ABI from "../../abi/NFKEY_STAKING_ABI.json";
import TRESR_ABI from "../../abi/TRESR_ABI.json";
import REWARD_ABI from "../../abi/REWARD_ABI.json";
import TRESR_STAKING_ABI from "../../abi/TRESR_STAKING_ABI.json";
import LP_SMRTRAVAX_STAKING_ABI from "../../abi/LP_SMRTRAVAX_STAKING_ABI.json";
import LP_TRESRAVAX_STAKING_ABI from "../../abi/LP_TRESRAVAX_STAKING_ABI.json";
import LP_SMRTRAVAX_TOKEN_ABI from "../../abi/LP_SMRTRAVAX_TOKEN_ABI.json";
import LP_TRESRAVAX_TOKEN_ABI from "../../abi/LP_TRESRAVAX_TOKEN_ABI.json";
import MARKETPLACE_LISTING_ABI from "../../abi/MARKETPLACE_LISTING_ABI.json";
import MARKETPLACE_AUCTION_ABI from "../../abi/MARKETPLACE_AUCTION_ABI.json";
import COMMUNITY_COLLECTION from "../../abi/COMMUNITY_COLLECTION_ABI.json";
import ERC20_ABI from "../../abi/ERC20_ABI.json";
import ERC721_ABI from "../../abi/ERC721_ABI.json";
import MASTER_CHEF_ABI from "../../abi/MASTER_CHEF_ABI.json";
import { useWeb3React } from "@web3-react/core";

export default function useGetSigner() {
  const context = useWeb3React();
  const { library } = context;
  const getSigner = useMemo(() => {
    if (!library) {
      return new ethers.providers.Web3Provider(window.ethereum).getSigner();
    } else {
      return library.getSigner();
    }
  }, [window.ethereum]);
  return getSigner;
}

export function useGetProvider() {
  const context = useWeb3React();
  const { library } = context;
  const getProvider = useMemo(() => {
    if (library) {
      return library.provider;
    }
    return new ethers.providers.Web3Provider(window?.ethereum);
  }, [window.ethereum]);
  return getProvider;
}

export function useContractWhitelist() {
  const getProvider = useGetProvider();
  const contractWhitelist = useMemo(async () => {
    return await new ethers.Contract(
      process.env.REACT_APP_WHITELIST_ADDRESS,
      WHITELIST_ABI,
      getProvider
    );
  }, [window.ethereum, getProvider]);
  return contractWhitelist;
}

export function useContractWhitelistWithSigner() {
  const getContractWhitelist = useContractWhitelist();
  const getSigner = useGetSigner();
  const contractWhitelistWithSigner = useMemo(async () => {
    const contract = await getContractWhitelist;
    return contract.connect(getSigner);
  }, [window.ethereum, getSigner]);
  return contractWhitelistWithSigner;
}

export function useContractNFKey() {
  const getProvider = useGetProvider();
  const contractNFKey = useMemo(async () => {
    return await new ethers.Contract(
      process.env.REACT_APP_NFKEY_ADDRESS,
      NFKEY_ABI,
      getProvider
    );
  }, [window.ethereum, getProvider]);
  return contractNFKey;
}

export function useContractNFKeyWithSigner() {
  const getSigner = useGetSigner();
  const getContractNFKey = useContractNFKey();
  const contractNFKeyWithSigner = useMemo(async () => {
    const contract = await getContractNFKey;
    return contract?.connect(getSigner);
  }, [window.ethereum, getSigner]);
  return contractNFKeyWithSigner;
}

export function useContractSmarterCoin() {
  const getProvider = useGetProvider();
  const contractSmarterCoin = useMemo(async () => {
    return await new ethers.Contract(
      process.env.REACT_APP_SMARTR_ADDRESS,
      SMARTR_ABI,
      getProvider
    );
  }, [window.ethereum, getProvider]);
  return contractSmarterCoin;
}

export function useContractSmarterCoinWithSigner() {
  const getSigner = useGetSigner();
  const getContractSmarterCoin = useContractSmarterCoin();
  const contractSmarterCoinWithSigner = useMemo(async () => {
    const contract = await getContractSmarterCoin;
    return contract?.connect(getSigner);
  }, [window.ethereum, getSigner]);
  return contractSmarterCoinWithSigner;
}

export function useContractNFKeyStaking() {
  const getProvider = useGetProvider();
  const contractNFKeyStaking = useMemo(async () => {
    return await new ethers.Contract(
      process.env.REACT_APP_NFKEY_STAKING_ADDRESS,
      NFKEY_STAKING_ABI,
      getProvider
    );
  }, [window.ethereum, getProvider]);
  return contractNFKeyStaking;
}

export function useContractNFKeyStakingWithSigner() {
  const getSigner = useGetSigner();
  const getContractNFKeyStaking = useContractNFKeyStaking();
  const contractNFKeyStakingWithSigner = useMemo(async () => {
    const contracttoConnect = await getContractNFKeyStaking;
    let contract = contracttoConnect.connect(getSigner);
    return contract;
  }, [window.ethereum, getSigner]);
  return contractNFKeyStakingWithSigner;
}

export function useContractTresrCoin() {
  const getProvider = useGetProvider();
  const contractTresrCoin = useMemo(async () => {
    return await new ethers.Contract(
      process.env.REACT_APP_TRESR_ADDRESS,
      TRESR_ABI,
      getProvider
    );
  }, [window.ethereum, getProvider]);
  return contractTresrCoin;
}

export function useContractTresrCoinWithSigner() {
  const getSigner = useGetSigner();
  const getContractTresrCoin = useContractTresrCoin();
  const contractTresrCoinWithSigner = useMemo(async () => {
    const contract = await getContractTresrCoin;
    return contract?.connect(getSigner);
  }, [window.ethereum, getSigner]);
  return contractTresrCoinWithSigner;
}

export function useContractDailyBonusRewards() {
  const getProvider = useGetProvider();
  const contractDailyBonusRewards = useMemo(async () => {
    return await new ethers.Contract(
      process.env.REACT_APP_REWARD_ADDRESS,
      REWARD_ABI,
      getProvider
    );
  }, [window.ethereum, getProvider]);
  return contractDailyBonusRewards;
}

export function useContractDailyBonusRewardsWithSigner() {
  const getSigner = useGetSigner();
  const getContractDailyBonusRewards = useContractDailyBonusRewards();
  const contractDailyBonusRewardsWithSigner = useMemo(async () => {
    const contract = await getContractDailyBonusRewards;
    return contract.connect(getSigner);
  }, [window.ethereum, getSigner]);
  return contractDailyBonusRewardsWithSigner;
}

export function useContractTresrStakingCoin() {
  const getProvider = useGetProvider();
  const contractTresrStakingCoin = useMemo(async () => {
    return await new ethers.Contract(
      process.env.REACT_APP_TRESR_STAKING_ADDRESS,
      TRESR_STAKING_ABI,
      getProvider
    );
  }, [window.ethereum, getProvider]);
  return contractTresrStakingCoin;
}

export function useContractTresrStakingCoinWithSigner() {
  const getSigner = useGetSigner();
  const getContractTresrStakingCoin = useContractTresrStakingCoin();
  const contractTresrStakingCoinWithSigner = useMemo(async () => {
    const contract = await getContractTresrStakingCoin;
    return contract?.connect(getSigner);
  }, [window.ethereum, getSigner]);
  return contractTresrStakingCoinWithSigner;
}

export function useContractLpStakingTRESRAVAX() {
  const getProvider = useGetProvider();
  const contractLpStakingTRESRAVAX = useMemo(async () => {
    return await new ethers.Contract(
      process.env.REACT_APP_LP_TRESRAVAX_STAKING_ADDRESS,
      LP_TRESRAVAX_STAKING_ABI,
      getProvider
    );
  }, [window.ethereum, getProvider]);
  return contractLpStakingTRESRAVAX;
}

export function useContractLpStakingTRESRAVAXWithSigner() {
  const getSigner = useGetSigner();
  const getContractLpStakingTRESRAVAX = useContractLpStakingTRESRAVAX();
  const contractLpStakingTRESRAVAXWithSigner = useMemo(async () => {
    const contract = await getContractLpStakingTRESRAVAX;
    return contract.connect(getSigner);
  }, [window.ethereum, getSigner]);
  return contractLpStakingTRESRAVAXWithSigner;
}

export function useContractLpStakingSMRTRAVAX() {
  const getProvider = useGetProvider();
  const contractLpStakingSMRTRAVAX = useMemo(async () => {
    return await new ethers.Contract(
      process.env.REACT_APP_LP_SMRTRAVAX_STAKING_ADDRESS,
      LP_SMRTRAVAX_STAKING_ABI,
      getProvider
    );
  }, [window.ethereum, getProvider]);
  return contractLpStakingSMRTRAVAX;
}

export function useContractLpStakingSMRTRAVAXWithSigner() {
  const getSigner = useGetSigner();
  const getContractLpStakingSMRTRAVAX = useContractLpStakingSMRTRAVAX();
  const contractLpStakingSMRTRAVAXWithSigner = useMemo(async () => {
    const contract = await getContractLpStakingSMRTRAVAX;
    return contract.connect(getSigner);
  }, [window.ethereum, getSigner]);
  return contractLpStakingSMRTRAVAXWithSigner;
}

export function useContractLpCoinTRESRAVAX() {
  const getProvider = useGetProvider();
  const contractLpCoinTRESRAVAX = useMemo(async () => {
    return await new ethers.Contract(
      process.env.REACT_APP_LP_TRESRAVAX_TOKEN_ADDRESS,
      LP_TRESRAVAX_TOKEN_ABI,
      getProvider
    );
  }, [window.ethereum, getProvider]);
  return contractLpCoinTRESRAVAX;
}

export function useContractLpCoinTRESRAVAXWithSigner() {
  const getSigner = useGetSigner();
  const getContractLpCoinTRESRAVAX = useContractLpCoinTRESRAVAX();
  const contractLpCoinTRESRAVAXWithSigner = useMemo(async () => {
    const contract = await getContractLpCoinTRESRAVAX;
    return contract.connect(getSigner);
  }, [window.ethereum, getSigner]);
  return contractLpCoinTRESRAVAXWithSigner;
}

export function useContractLpCoinSMRTRRAVAX() {
  const getProvider = useGetProvider();
  const contractLpCoinSMRTRRAVAX = useMemo(async () => {
    return await new ethers.Contract(
      process.env.REACT_APP_LP_SMRTRAVAX_TOKEN_ADDRESS,
      LP_SMRTRAVAX_TOKEN_ABI,
      getProvider
    );
  }, [window.ethereum, getProvider]);
  return contractLpCoinSMRTRRAVAX;
}

export function useContractLpCoinSMRTRAVAXWithSigner() {
  const getSigner = useGetSigner();
  const getContractLpCoinSMRTRRAVAX = useContractLpCoinSMRTRRAVAX();
  const contractLpCoinSMRTRAVAXWithSigner = useMemo(async () => {
    const contract = await getContractLpCoinSMRTRRAVAX;
    return contract.connect(getSigner);
  }, [window.ethereum, getSigner]);
  return contractLpCoinSMRTRAVAXWithSigner;
}

export function useContractMarketplaceListing() {
  const getProvider = useGetProvider();
  const contractMarketplaceListing = useMemo(async () => {
    return await new ethers.Contract(
      process.env.REACT_APP_MARKETPLACE_LISTING_ADDRESS,
      MARKETPLACE_LISTING_ABI,
      getProvider
    );
  }, [window.ethereum, getProvider]);
  return contractMarketplaceListing;
}

export function useContractMarketplaceListingWithSigner() {
  const getSigner = useGetSigner();
  const getContractMarketplaceListing = useContractMarketplaceListing();
  const contractMarketplaceListingWithSigner = useMemo(async () => {
    const contract = await getContractMarketplaceListing;
    return contract.connect(getSigner);
  }, [window.ethereum, getSigner]);
  return contractMarketplaceListingWithSigner;
}

export function useContractMarketplaceAuction() {
  const getProvider = useGetProvider();
  const contractMarketplaceAuction = useMemo(async () => {
    return await new ethers.Contract(
      process.env.REACT_APP_MARKETPLACE_AUCTION_ADDRESS,
      MARKETPLACE_AUCTION_ABI,
      getProvider
    );
  }, [window.ethereum, getProvider]);
  return contractMarketplaceAuction;
}

export function useContractMarketplaceAuctionWithSigner() {
  const getSigner = useGetSigner();
  const getContractMarketplaceAuction = useContractMarketplaceAuction();
  const contractMarketplaceAuctionWithSigner = useMemo(async () => {
    const contract = await getContractMarketplaceAuction;
    return contract.connect(getSigner);
  }, [window.ethereum, getSigner]);
  return contractMarketplaceAuctionWithSigner;
}

export function useContractMarketplaceCommunityCollection() {
  const getProvider = useGetProvider();
  const contractMarketplaceCommunityCollection = useMemo(async () => {
    return await new ethers.Contract(
      process.env.REACT_APP_COMMUNITY_COLLECTION_ADDRESS,
      COMMUNITY_COLLECTION,
      getProvider
    );
  }, [window.ethereum, getProvider]);
  return contractMarketplaceCommunityCollection;
}

export function useContractMarketplaceCommunityCollectionWithSigner() {
  const getSigner = useGetSigner();
  const getContractMarketplaceCommunityCollection =
    useContractMarketplaceCommunityCollection();
  const contractMarketplaceCommunityCollectionWithSigner = useMemo(async () => {
    const contract = await getContractMarketplaceCommunityCollection;
    return contract.connect(getSigner);
  }, [window.ethereum, getSigner]);
  return contractMarketplaceCommunityCollectionWithSigner;
}

export function useContractMasterChef() {
  const getProvider = useGetProvider();
  const contractMasterChef = useMemo(async () => {
    return await new ethers.Contract(
      process.env.REACT_APP_MASTER_CHEF_ADDRESS,
      MASTER_CHEF_ABI,
      getProvider
    );
  }, [window.ethereum, getProvider]);
  return contractMasterChef;
}

export function useContractMasterChefWithSigner() {
  const getSigner = useGetSigner();
  const getContractMasterChef = useContractMasterChef();
  const contractMasterChefWithSigner = useMemo(async () => {
    const contract = await getContractMasterChef;
    return contract.connect(getSigner);
  }, [window.ethereum, getSigner]);
  return contractMasterChefWithSigner;
}

export function useContractERC20WithSigner() {
  const getSigner = useGetSigner();
  const getProvider = useGetProvider();
  const contractERC20WithSigner = useMemo(
    () => async (contractAddress) => {
      const contract = await new ethers.Contract(
        contractAddress,
        ERC20_ABI,
        getProvider
      );
      return contract?.connect(getSigner);
    },
    [window.ethereums, getSigner, getProvider]
  );
  return { contractERC20WithSigner };
}
export function useContractERC721WithSigner() {
  const getSigner = useGetSigner();
  const getProvider = useGetProvider();
  const contractERC721WithSigner = useMemo(
    () => async (contractAddress) => {
      const contract = await new ethers.Contract(
        contractAddress,
        ERC721_ABI,
        getProvider
      );
      return contract?.connect(getSigner);
    },
    [window.ethereums, getSigner, getProvider]
  );
  return { contractERC721WithSigner };
}
