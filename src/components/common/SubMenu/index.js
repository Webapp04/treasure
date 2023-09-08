import React from "react";
import useCommon from "../../../hooks/useCommon";
import "./style.scss";
import { useSelector } from "react-redux";
import {
  selectAvaxBalance,
  selectSmrtrBalance,
  selectTresrBalance,
} from "redux/slice/balanceSlice";
import { selectUser } from "redux/slice/userSlice";

const SubMenu = () => {
  const user = useSelector(selectUser);
  const avaxBalance = useSelector(selectAvaxBalance);
  const smrtrBalance = useSelector(selectSmrtrBalance);
  const tresrBalance = useSelector(selectTresrBalance);

  const { americanFormatNumber } = useCommon();

  const balanceAvax = americanFormatNumber(avaxBalance, 3);
  const balanceSmrtr = americanFormatNumber(smrtrBalance, 3);
  const balanceTresr = americanFormatNumber(tresrBalance, 3);

  return (
    <div className="subMenu">
      <div className="tokenBalance">{balanceSmrtr} SMRTR</div>
      <div className="tokenBalance">{balanceTresr} TRESR</div>
      {!!user?.wallet_id && (
        <div className="tokenBalance">{balanceAvax} AVAX</div>
      )}
    </div>
  );
};

export default SubMenu;
