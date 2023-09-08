import {
  useContractNFKeyStakingWithSigner,
  useContractNFKeyWithSigner,
} from "hooks/blockchain/useHandleContracts";
import { useSelector } from "react-redux";
import { selectNftList } from "redux/slice/nftSlice";
import { hexToNumber } from "utils/blockchain";

export default function useGetNFkeyInfo() {
  const nftLists = useSelector(selectNftList);
  const handleContractNFKeyStakingWithSigner =
    useContractNFKeyStakingWithSigner();
  const handleContractNFKeyWithSigner = useContractNFKeyWithSigner();

  const getNFkeyInfo = async (_token) => {
    const tokenIdList = nftLists?.map((item) => item.tokenId);
    const contractNFKeyStakingWithSigner =
      await handleContractNFKeyStakingWithSigner;
    const contractNFKeyWithSigner = await handleContractNFKeyWithSigner;
    return Promise.all([
      contractNFKeyWithSigner
        .getAmountUpgradeKey(_token.tier)
        .then((tx) => hexToNumber(tx?._hex)?.toString() / 10 ** 18)
        .then((res) => Math.ceil(+res))
        .catch((err) => console.log(err)),
      contractNFKeyStakingWithSigner
        .calcUnlockCost(_token.tokenId)
        .catch((err) => console.log(err))
        .then((tx) => hexToNumber(tx?._hex)?.toString() / 10 ** 18),
      contractNFKeyStakingWithSigner
        .calcBaseProbToOpen(_token.tokenId)
        .catch((err) => console.log(err))
        .then((tx) => hexToNumber(tx?._hex) / 10),
      contractNFKeyWithSigner
        .getUpgradeDelay(_token.tokenId)
        .catch((err) => console.log(err))
        .then((tx) => hexToNumber(tx?._hex)),
      contractNFKeyStakingWithSigner
        .pendingAllBaseReward(tokenIdList)
        .catch((err) => console.log(err))
        .then((tx) => hexToNumber(tx?._hex)?.toString() / 10 ** 18),
      contractNFKeyStakingWithSigner
        .calcRewards(_token.tokenId)
        .catch((err) => console.log(err))
        .then((tx) => hexToNumber(tx?._hex)?.toString() / 10 ** 18),
      contractNFKeyStakingWithSigner
        .calcRewardsPerSecond(_token.tokenId)
        .catch((err) => console.log(err))
        .then((tx) => hexToNumber(tx?._hex)?.toString() / 10 ** 18),
      contractNFKeyStakingWithSigner
        .calcRewardsPerSecondByTokens(tokenIdList)
        .catch((err) => console.log(err))
        .then((tx) => hexToNumber(tx?._hex)?.toString() / 10 ** 18),
    ]);
  };

  return { getNFkeyInfo };
}
