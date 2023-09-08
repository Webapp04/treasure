import React, { useState, useEffect } from "react";
import useHandleNFT from "../../../../hooks/blockchain/useHandleNFT";

const KeyRewardsDetails = ({ token }) => {
  const [rewardsPerSec, setRewardsPerSec] = useState(0);
  const [rewards, setRewards] = useState(0);
  const [timerID, setTimerID] = useState(0);

  const handleNFT = useHandleNFT();

  useEffect(() => {
    // handleNFT
    //   .getBonusRewardPerSecond([token?.tokenID])
    //   .then((res) => setRewardsPerSec(res));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setRewards(+token?.reward);

    clearInterval(timerID);

    // const timer = setInterval(() => {
    //   setRewards((prev) => +prev + +rewardsPerSec);
    // }, 1000);
    // setTimerID(timer);

    return () => clearInterval(timerID);
  }, [rewardsPerSec, token?.reward]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="totalPoolReward__details--block">
      <span className="totalPoolReward__details--text">
        Founder’s Key #{token?.tokenID}
      </span>
      <span className="totalPoolReward__details--value">
        {rewards ? rewards?.toFixed(5) : 0}
      </span>
    </div>
  );
};

export default KeyRewardsDetails;
