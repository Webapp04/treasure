import React, { useEffect, useState } from "react";
import "./style.scss";

const KeyRewards = ({ token }) => {
  const [rewardsPerSec, setRewardsPerSec] = useState(0);
  const [rewards, setRewards] = useState(0);
  const [timerID, setTimerID] = useState(0);

  useEffect(() => {
    setRewards(+token?.reward);
    clearInterval(timerID);
    return () => clearInterval(timerID);
  }, [rewardsPerSec, token?.reward]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="keyReward__block">
      <span className="keyReward__text">Founder’s Key #{token?.tokenID}</span>
      <span className="keyReward__value">
        {rewards ? rewards?.toFixed(5) : 0}
      </span>
    </div>
  );
};

export default KeyRewards;
