import { hexToNumber, convertBigIntToNumber } from "../../utils/blockchain";
import NFKEY_ABI from "../../abi/NFKEY_ABI.json";
import AirdropApi from "../../api/AirdropApi";
import { ethers } from "ethers";
import { useSelector } from "react-redux";
import { selectUser } from "redux/slice/userSlice";
import {
  useContractERC721WithSigner,
  useContractMarketplaceAuction,
  useContractMarketplaceAuctionWithSigner,
} from "./useHandleContracts";

export default function useHandleAuction() {
  const user = useSelector(selectUser);
  const handleContractERC721WithSigner = useContractERC721WithSigner();
  const handleContractMarketplaceAuction = useContractMarketplaceAuction();
  const handleContractMarketplaceAuctionWithSigner =
    useContractMarketplaceAuctionWithSigner();

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

  const approveAuction = async (
    tokenID,
    contractAddress = process.env.REACT_APP_NFKEY_ADDRESS
  ) => {
    const ContractERC721WithSigner = await handleContractERC721WithSigner;
    return ContractERC721WithSigner?.contractERC721WithSigner(contractAddress)
      ?.approve(process.env.REACT_APP_MARKETPLACE_AUCTION_ADDRESS, tokenID)
      .then((tx) => tx.wait());
  };

  const createAuction = async (
    nftAddress,
    tokenID,
    startPrice,
    bidStep,
    blockDeadline,
    isToken = false,
    tokenAddress
  ) => {
    const contractMarketplaceAuctionWithSigner =
      await handleContractMarketplaceAuctionWithSigner;
    return contractMarketplaceAuctionWithSigner
      .create(
        nftAddress,
        tokenID,
        startPrice,
        bidStep,
        blockDeadline,
        isToken,
        tokenAddress
      )
      .then((tx) => tx.wait());
  };

  const getBids = async (nftAddress, tokenId) => {
    const contractMarketplaceAuctionWithSigner =
      await handleContractMarketplaceAuctionWithSigner;
    return contractMarketplaceAuctionWithSigner
      .bids(nftAddress, tokenId)
      .then((tx) => tx);
  };

  const bid = async (nftAddress, tokenID, value) => {
    const contractMarketplaceAuctionWithSigner =
      await handleContractMarketplaceAuctionWithSigner;
    return contractMarketplaceAuctionWithSigner
      .bid(nftAddress, tokenID, { value: value })
      .then((tx) => tx.wait());
  };

  const bidToken = async (nftAddress, tokenID, value) => {
    const contractMarketplaceAuctionWithSigner =
      await handleContractMarketplaceAuctionWithSigner;
    return contractMarketplaceAuctionWithSigner
      .bidToken(nftAddress, tokenID, value)
      .then((tx) => tx.wait());
  };

  const cancelAuction = async (nftAddress, tokenID) => {
    const contractMarketplaceAuctionWithSigner =
      await handleContractMarketplaceAuctionWithSigner;
    return contractMarketplaceAuctionWithSigner
      .cancel(nftAddress, tokenID)
      .then((tx) => tx.wait());
  };

  const finalize = async (nftAddress, tokenID) => {
    const contractMarketplaceAuctionWithSigner =
      await handleContractMarketplaceAuctionWithSigner;
    return contractMarketplaceAuctionWithSigner
      .finalize(nftAddress, tokenID)
      .then((tx) => tx.wait());
  };

  const checkAuction = async (contractAddress, tokenID) => {
    const contractMarketplaceAuctionWithSigner =
      await handleContractMarketplaceAuctionWithSigner;
    return contractMarketplaceAuctionWithSigner
      .auctions(contractAddress, tokenID)
      .then((tx) => ({
        owner: tx?.owner,
        startPrice: convertBigIntToNumber(tx?.startPrice._hex),
        bidStep: convertBigIntToNumber(tx?.bidStep._hex),
        blockDeadline: hexToNumber(tx?.blockDeadline._hex),
        active: tx?.active,
        finalized: tx?.finalized,
        isToken: tx?.isToken,
        tokenAddress: tx?.tokenAddress,
      }));
  };

  const getAllAuctions = async () => {
    const MAX_ATTEMPTS = 1000;
    const tokens = [];
    const tokenList = [];
    for (let i = 0; i < 5; i++) {
      const contractMarketplaceAuctionWithSigner =
        await handleContractMarketplaceAuctionWithSigner;
      return contractMarketplaceAuctionWithSigner
        .auctionsAll(i)
        .then(async (tx) => {
          const contractMarketplaceAuction =
            await handleContractMarketplaceAuction;
          return contractMarketplaceAuction
            .auctions(tx.nftAddress, hexToNumber(tx.tokenID._hex))
            .then(async (transaction) => {
              if (transaction.active) {
                tokens.push({
                  tokenId: hexToNumber(tx.tokenID._hex),
                  nftAddress: tx.nftAddress,
                  owner: transaction.owner,
                });
              }
            });
        })
        .catch((err) => {
          i = MAX_ATTEMPTS;
        });
    }

    for (let j = 0; j < tokens.length; j++) {
      const provider = new ethers.providers.Web3Provider(window?.ethereum);
      const signer = provider.getSigner();
      const contractNFKey = new ethers.Contract(
        tokens[j].nftAddress,
        NFKEY_ABI,
        provider
      );
      const contractNFKeyWithSigner = contractNFKey.connect(signer);

      await contractNFKeyWithSigner
        .tokenURI(tokens[j].tokenId)
        .then(async (uri) => {
          const ipfsHash = uri.split("/").pop();
          const ipfsData = await new AirdropApi().getIpfs(ipfsHash);
          const tokenData = {
            owner: tokens[j].owner,
            contractAddress: tokens[j].nftAddress,
            tokenId: tokens[j].tokenId,
            ...ipfsData,
          };

          tokenList.push(tokenData);
        });
    }

    return tokenList;
  };

  return {
    transfer,
    approveAuction,
    createAuction,
    cancelAuction,
    checkAuction,
    bid,
    bidToken,
    getAllAuctions,
    getBids,
    finalize,
  };
}
