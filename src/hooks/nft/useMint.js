import AirdropApi from "api/AirdropApi";
import useHandleToastAlert from "hooks/alert/useHandleToastAlert";
import useHandleCustomer from "hooks/customer/useHandleCustomer";
import useHandleToken from "hooks/token/useHandleToken";
import { useDispatch, useSelector } from "react-redux";
import ACTIONS from "redux/action";
import { selectAvaxBalance } from "redux/slice/balanceSlice";
import { selectUser } from "redux/slice/userSlice";
import useGetZoneCommission from "./useGetZoneCommission";
import useReloadNFTItemBalance from "./useReloadNFTItemBalance";
import { useContractNFKeyWithSigner } from "hooks/blockchain/useHandleContracts";

export default function useMint() {
  const user = useSelector(selectUser);
  const avaxBalance = useSelector(selectAvaxBalance);
  const dispatch = useDispatch();
  const handleCustomer = useHandleCustomer();
  const handleToastAlert = useHandleToastAlert();
  const handleToken = useHandleToken();
  const handleGetZoneCommission = useGetZoneCommission();
  const handleReloadNFTItemBalance = useReloadNFTItemBalance();
  const handleContractNFKeyWithSigner = useContractNFKeyWithSigner();

  const mint = async (zone, amount) => {
    const commission = await handleGetZoneCommission?.getZoneCommission(
      user?.wallet_id,
      zone
    );
    const merkle_data = await handleCustomer.getMerkleTree(user?.wallet_id);
    const merkle_proof = merkle_data[0].proof;
    const merkle_wl = {
      whitelistAddress: merkle_data[0].whitelistAddress,
      level: merkle_data[0].level,
      zone1: merkle_data[0].zone1,
      zone2: merkle_data[0].zone2,
      zone3: merkle_data[0].zone3,
      zone4: merkle_data[0].zone4,
    };
    if (commission * amount > avaxBalance * 10 ** 18) {
      handleToastAlert.error("Insufficient balance");
      new AirdropApi().logger({
        wallet_id: user?.wallet_id,
        type: "ERROR",
        action: "mint",
        description: "Insufficient balance",
        error: JSON.stringify("Insufficient balance"),
      });
      return;
    }
    const contractNFKeyWithSigner = await handleContractNFKeyWithSigner;
    return contractNFKeyWithSigner
      .bulkMint(user?.wallet_id, zone, amount, merkle_wl, merkle_proof, {
        value: (commission * amount).toString(),
      })
      .then(async (tx) => {
        new AirdropApi().logger({
          wallet_id: user?.wallet_id,
          type: "PENDING",
          action: "mint",
          description: "HomeMint unique token",
          tx: JSON.stringify(tx),
        });
        const answer = await tx.wait();
        await handleToken.getcheckTxEvent(tx?.hash, "BatchMinted");
        ACTIONS.SET_TRANSANCTION_HASH(dispatch, tx?.hash);
        const transactionLogList = answer?.logs?.filter(
          (log) => log?.address === process.env.REACT_APP_NFKEY_ADDRESS
        );
        for (const transactionLog of transactionLogList) {
          const tokenID = parseInt(transactionLog?.topics[3], 16);
          // FIXME: should remove this
          if (+tokenID > 0 && +tokenID < 10000)
            await handleReloadNFTItemBalance.reloadNFTItemBalance(
              process.env.REACT_APP_NFKEY_ADDRESS,
              tokenID
            );
        }
        return transactionLogList;
      })
      .catch((err) => {
        new AirdropApi().logger({
          wallet_id: user?.wallet_id,
          type: "ERROR",
          action: "mint",
          description: "HomeMint unique token",
          error: JSON.stringify(err),
        });
      });
  };

  return { mint };
}
