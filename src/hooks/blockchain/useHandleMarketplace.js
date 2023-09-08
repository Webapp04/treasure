import { hexToNumber } from "../../utils/blockchain";
import { ethers } from "ethers";
import { useSelector } from "react-redux";
import { selectUser } from "redux/slice/userSlice";
import {
  useContractERC721WithSigner,
  useContractMarketplaceCommunityCollectionWithSigner,
  useContractMarketplaceListingWithSigner,
} from "./useHandleContracts";

export default function useHandleMarketplace() {
  const user = useSelector(selectUser);
  const handleContractERC721WithSigner = useContractERC721WithSigner();
  const handleContractMarketplaceCommunityCollectionWithSigner =
    useContractMarketplaceCommunityCollectionWithSigner();
  const handleContractMarketplaceListingWithSigner =
    useContractMarketplaceListingWithSigner();

  const getListingCommission = async () => {
    const contractMarketplaceListingWithSigner =
      await handleContractMarketplaceListingWithSigner;
    return contractMarketplaceListingWithSigner.commissionPer().then(
      (tx) => console.log(tx)
      // ACTION.SET_MARKETPLACE_LISTING_COMMISSION(hexToNumber(tx?._hex))
    );
  };

  const transfer = async (
    address,
    tokenID,
    contractAddress = process.env.REACT_APP_NFKEY_ADDRESS
  ) => {
    const ContractERC721WithSigner = await handleContractERC721WithSigner;
    return ContractERC721WithSigner.contractERC721WithSigner(contractAddress)
      .transferFrom(user?.wallet_id, address, tokenID)
      .then((tx) => tx.wait());
  };

  const approveListing = async (
    tokenID,
    contractAddress = process.env.REACT_APP_NFKEY_ADDRESS
  ) => {
    const ContractERC721WithSigner = await handleContractERC721WithSigner;
    return ContractERC721WithSigner.contractERC721WithSigner(contractAddress)
      .approve(process.env.REACT_APP_MARKETPLACE_LISTING_ADDRESS, tokenID)
      .then((tx) => tx.wait());
  };

  const createListing = async (
    startDate,
    endDate,
    price,
    tokenID,
    isToken,
    tokenAddress,
    contractAddress = process.env.REACT_APP_NFKEY_ADDRESS
  ) => {
    const contractMarketplaceListingWithSigner =
      await handleContractMarketplaceListingWithSigner;
    return contractMarketplaceListingWithSigner
      .addListing(
        price,
        tokenID,
        contractAddress,
        startDate,
        endDate,
        isToken,
        tokenAddress
      )
      .then((tx) => tx.wait());
  };

  const purchaseListing = async (
    tokenID,
    price,
    contractAddress = process.env.REACT_APP_NFKEY_ADDRESS
  ) => {
    const contractMarketplaceListingWithSigner =
      await handleContractMarketplaceListingWithSigner;
    return contractMarketplaceListingWithSigner
      .purchase(contractAddress, tokenID, {
        value: (price * 10 ** 18).toString(),
      })
      .then((tx) => tx.wait());
  };

  const purchaseListingToken = async (
    tokenID,
    contractAddress = process.env.REACT_APP_NFKEY_ADDRESS
  ) => {
    const contractMarketplaceListingWithSigner =
      await handleContractMarketplaceListingWithSigner;
    return contractMarketplaceListingWithSigner
      ?.purchaseToken(contractAddress, tokenID)
      .then((tx) => tx.wait());
  };

  const cancelListing = async (
    tokenID,
    contractAddress = process.env.REACT_APP_NFKEY_ADDRESS
  ) => {
    const contractMarketplaceListingWithSigner =
      await handleContractMarketplaceListingWithSigner;
    return contractMarketplaceListingWithSigner
      .cancelListing(tokenID, contractAddress)
      .then((tx) => tx.wait());
  };

  const checkListing = async (
    tokenID,
    contractAddress = process.env.REACT_APP_NFKEY_ADDRESS
  ) => {
    const contractMarketplaceListingWithSigner =
      await handleContractMarketplaceListingWithSigner;
    return contractMarketplaceListingWithSigner
      .listings(contractAddress, tokenID)
      .then((tx) => {
        return {
          owner: tx?.owner,
          price: hexToNumber(tx?.price?._hex) / 10 ** 18,
          startDate: hexToNumber(tx?.startDate?._hex),
          endDate: hexToNumber(tx?.endDate?._hex),
          isToken: tx?.isToken,
          tokenAddress: tx?.tokenAddress,
        };
      });
  };

  const changePrice = async (
    price,
    tokenID,
    contractAddress = process.env.REACT_APP_NFKEY_ADDRESS
  ) => {
    const contractMarketplaceListingWithSigner =
      await handleContractMarketplaceListingWithSigner;
    return contractMarketplaceListingWithSigner
      .changeListingPrice(price, tokenID, contractAddress)
      .then((tx) => tx.wait());
  };

  const onMakeOffer = async (
    price,
    owner,
    tokenID,
    startDate,
    endDate,
    contractAddress = process.env.REACT_APP_NFKEY_ADDRESS
  ) => {
    const contractMarketplaceListingWithSigner =
      await handleContractMarketplaceListingWithSigner;
    return contractMarketplaceListingWithSigner
      .makeOffer(price, owner, contractAddress, tokenID, startDate, endDate, {
        value: price,
      })
      .then((tx) => tx.wait());
  };

  const onMakeOfferWithToken = async (
    price,
    owner,
    tokenID,
    startDate,
    endDate,
    isToken,
    tokenAddress,
    contractAddress = process.env.REACT_APP_NFKEY_ADDRESS
  ) => {
    const contractMarketplaceListingWithSigner =
      await handleContractMarketplaceListingWithSigner;
    return contractMarketplaceListingWithSigner
      .makeOfferToken(
        price,
        owner,
        contractAddress,
        tokenID,
        startDate,
        endDate,
        isToken,
        tokenAddress
      )
      .then((tx) => tx.wait());
  };

  const onCancelOffer = async (
    tokenID,
    offerID,
    contractAddress = process.env.REACT_APP_NFKEY_ADDRESS
  ) => {
    const contractMarketplaceListingWithSigner =
      await handleContractMarketplaceListingWithSigner;
    return contractMarketplaceListingWithSigner
      .cancelOffer(tokenID, contractAddress, offerID)
      .then((tx) => tx.wait());
  };

  const onAcceptOffer = async (
    tokenID,
    offerID,
    contractAddress = process.env.REACT_APP_NFKEY_ADDRESS
  ) => {
    const contractMarketplaceListingWithSigner =
      await handleContractMarketplaceListingWithSigner;
    return contractMarketplaceListingWithSigner
      .acceptOffer(contractAddress, tokenID, offerID)
      .then((tx) => tx.wait());
  };

  const checkOffer = async (
    tokenID,
    offerID,
    contractAddress = process.env.REACT_APP_NFKEY_ADDRESS
  ) => {
    const contractMarketplaceListingWithSigner =
      await handleContractMarketplaceListingWithSigner;
    return contractMarketplaceListingWithSigner
      .offers(contractAddress, tokenID, offerID)
      .then((tx) => {
        return {
          price: +ethers.utils.formatEther(
            hexToNumber(tx?.price?._hex)?.toString()
          ),
          owner: tx?.owner,
          from: tx?.buyer,
          id: hexToNumber(tx?.id?._hex),
          startDate: hexToNumber(tx?.startDate?._hex),
          endDate: hexToNumber(tx?.endDate?._hex),
          isToken: tx?.isToken,
          tokenAddress: tx?.tokenAddress,
        };
      })
      .catch((err) => null);
  };

  const getOffersLength = async (
    tokenID,
    contractAddress = process.env.REACT_APP_NFKEY_ADDRESS
  ) => {
    const contractMarketplaceListingWithSigner =
      await handleContractMarketplaceListingWithSigner;
    return contractMarketplaceListingWithSigner
      .offersCount(tokenID, contractAddress)
      .then((tx) => {
        return hexToNumber(tx?._hex);
      });
  };

  const approveOffer = async (
    tokenID,
    contractAddress = process.env.REACT_APP_NFKEY_ADDRESS
  ) => {
    const ContractERC721WithSigner = await handleContractERC721WithSigner;
    return ContractERC721WithSigner.contractERC721WithSigner(contractAddress)
      .approve(process.env.REACT_APP_MARKETPLACE_LISTING_ADDRESS, tokenID)
      .then((tx) => tx.wait());
  };

  const mint = async (walletAddress, ipfsLink) => {
    const contractMarketplaceCommunityCollectionWithSigner =
      await handleContractMarketplaceCommunityCollectionWithSigner;
    return contractMarketplaceCommunityCollectionWithSigner
      .mint(walletAddress, ipfsLink)
      .then((tx) => tx.wait());
  };

  return {
    transfer,
    approveListing,
    createListing,
    purchaseListing,
    cancelListing,
    checkListing,
    changePrice,
    onMakeOffer,
    onAcceptOffer,
    onCancelOffer,
    checkOffer,
    getOffersLength,
    approveOffer,
    purchaseListingToken,
    onMakeOfferWithToken,
    getListingCommission,
    mint,
  };
}
