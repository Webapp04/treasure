export default function useGetRewardsReleased() {
  const getRewardsReleased = async (count = 3) => {
    // if (!token?.selected?.staked) return null;
    // return handleContracts.contractNFKeyStakingWithSigner
    //   .getClaimed(token?.selected?.tokenId)
    //   .then((tx) =>
    //     ACTIONS.SET_TRESR_REWARDS_RELEASED(
    //       dispatch,
    //       +ethers.utils.formatEther(hexToNumber(tx?._hex)?.toString())
    //     )
    //   )
    //   .catch(() => (count ? getRewardsReleased(count - 1) : null));
  };
  return { getRewardsReleased };
}
