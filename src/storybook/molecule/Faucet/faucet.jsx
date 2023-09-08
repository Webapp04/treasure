import React from "react";
import "./style.scss";

const Faucet = ({
  user,
  showFaucet,
  handleToggleFaucet = () => {},
  onGetTresr = () => {},
  onGetSmrtr = () => {},
  onGetTresrLP = () => {},
  onGetSmrtrLP = () => {},
}) => {
  return (
    <div>
      {user?.wallet_id && (
        <div className="faucet" onClick={handleToggleFaucet}>
          <div>Faucet</div>
        </div>
      )}
      {showFaucet && (
        <div className="faucet-list">
          <button className="faucet-button" onClick={onGetTresr}>
            TRESR
          </button>
          <button className="faucet-button" onClick={onGetSmrtr}>
            SMARTR
          </button>
          <button className="faucet-button" onClick={onGetTresrLP}>
            TRESR-LP
          </button>
          <button className="faucet-button" onClick={onGetSmrtrLP}>
            SMARTR-LP
          </button>
        </div>
      )}
    </div>
  );
};

export default Faucet;
