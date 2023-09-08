import { useContractERC20WithSigner } from "hooks/blockchain/useHandleContracts";
import { hexToNumber } from "utils/blockchain";

export default function useBalanceOfERC20() {
  const handleContractERC20WithSigner = useContractERC20WithSigner();
  const balanceOfERC20 = async (walletAddress, contractAddress, count = 3) => {
    const ContractERC20WithSigner = await handleContractERC20WithSigner;
    return ContractERC20WithSigner.contractERC20WithSigner(contractAddress)
      .balanceOf(walletAddress)
      .then((tx) => String(hexToNumber(tx._hex) / Math.pow(10, 18)))
      .catch(() =>
        count ? balanceOfERC20(walletAddress, contractAddress, count - 1) : null
      );
  };
  return { balanceOfERC20 };
}
