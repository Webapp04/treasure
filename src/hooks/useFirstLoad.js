import { useEffect } from "react";
import useHandleCustomer from "./customer/useHandleCustomer";
import useHandleAuth from "./auth/useHandleAuth";
import useWalletConnect from "./blockchain/useWalletConnect";
import useHandleLoader from "./loader/useHandleLoader";
import useHandleNFT from "./blockchain/useHandleNFT";
import useHandleTheme from "./theme/useHandleTheme";
import useHandleSocket from "./socket/useHandleSocket";
import useHandleRewards from "./blockchain/useHandleRewards";
import { useSelector } from "react-redux";
import { selectUser } from "redux/slice/userSlice";
import useHandleLpStaking from "./blockchain/useHandleLpStaking";

export default function useEffectFirstLoad() {
  const user = useSelector(selectUser);
  const handleAdmin = useHandleCustomer();
  const handleAuth = useHandleAuth();
  const walletConnect = useWalletConnect();
  const handleLoader = useHandleLoader();
  const handleNFT = useHandleNFT();
  const handleTheme = useHandleTheme();
  const handleSocket = useHandleSocket();
  const handleRewards = useHandleRewards();
  const handleLpStaking = useHandleLpStaking();

  useEffect(() => {
    handleTheme?.setDefaultTheme();
    if (!user?._id) {
      handleLoader
        .loaderWrapper(handleAdmin?.fetchInfo, 2)
        .then((res) => !res && handleAuth?.logout());
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (user?._id) {
      handleLoader?.loaderWrapper(
        () => walletConnect?.connectWallet(user?.wallet_id),
        2
      );
      walletConnect.connectWallet(user?.wallet_id);
      handleSocket.init();
      handleNFT?.loadNFTBalance(user?.wallet_id);
      walletConnect?.ethereumListener(handleAuth?.logout);
      /**
       * TODO: remove update function in below hooks
       * make aggregate async hook that fetch balance info
       * make aggregate action that update all balance info
       * do this in other code
       */

      // handleNFT.balanceOfSMRTR(user?.wallet_id);
      // handleNFT.balanceOfTRESR(user?.wallet_id);
      // handleNFT.getAVAXBalance(user?.wallet_id);

      handleLpStaking.balanceOfLp(user?.wallet_id);
      handleLpStaking.balanceOfStakedLp(user?.wallet_id);
      handleNFT?.updateProfileBalance(user?.wallet_id);
      /**
       * TODO: this is not used anymore
       */
      // handleNFT.getBurnedTresr();
      // handleNFT.getBurnedSmarter();
      // handleNFT.getBonusPoolAllocation();
      // handleNFT.getPoolAllocation();

      /**
       * TODO: remove update function in below hooks
       * make aggregate async hook that fetch below four functions
       * make separate action that update 4 info
       * do this in other code
       */
      handleRewards?.updateClaimableBonusRewardBalance();
      // handleRewards.getVeTresrBonusReward();
      // handleRewards.getJlpSmrtBonusReward();
      // handleRewards.getJlpTresrBonusReward();
      // handleRewards.getKeyLevelBonusReward();

      /**
       * TODO: Promise.all(above backend apis)
       * then update 4 actions
       */
    }
  }, [user]); // eslint-disable-line react-hooks/exhaustive-deps
}
