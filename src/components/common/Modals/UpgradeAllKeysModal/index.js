import React, { useEffect, useState } from "react";
import "./style.scss";
import KeyItem from "./KeyItem";
import useHandleNFT from "../../../../hooks/blockchain/useHandleNFT";
import MarketplaceButton from "../../MarketplaceButton";
import { compareUnixDates, sleep } from "../../../../utils";
import { formatterUS } from "../../../../utils";
import useWindowDimensions from "hooks/useWidowDimensions";
import { useSelector } from "react-redux";
import { selectSmrtrBalance } from "redux/slice/balanceSlice";
import Modal from "storybook/atom/Modal/modal";

const UpgradeAllKeysModal = ({
  isOpen,
  onClose,
  filterTokenList,
  onClick,
  setTokenListToUpgrade,
  handleTransactionLoadingModal,
}) => {
  const smrtrBalance = useSelector(selectSmrtrBalance);
  const [tokenList, setTokenList] = useState([]);
  const [tokenAmountList, setTokenAmountList] = useState([]);
  const [curDelToken, setCurDelToken] = useState(-1);
  const [totalAmount, setTotalAmount] = useState(0);
  const handleNFT = useHandleNFT();
  const windowParams = useWindowDimensions();
  const isMobile = windowParams?.width <= 750;

  const isInsufficient = +totalAmount > +smrtrBalance;
  const buttonTitle = isInsufficient
    ? "Insufficient balance"
    : `Upgrade ${
        tokenList?.filter((item) => item?.flag == true)?.length || 0
      } Keys`;

  const onDeleteItem = async (id) => {
    //setTokenList(tokenList?.filter((item) => item?.tokenId !== id));
    setCurDelToken(id);
    setTokenList(
      tokenList?.map((item, key) => {
        if (item.tokenId == id) item.flag = false;
        return item;
      })
    );
    let temp = 0;
    tokenList
      ?.filter((item) => item?.flag == true)
      ?.map(
        (v, key) =>
          (temp += tokenAmountList?.filter(
            (amountItem) => amountItem?.tokenId == v?.tokenId
          )[0].amount)
      );

    setTotalAmount(temp);
  };

  const onAddItem = async (id) => {
    setTokenList(
      tokenList?.map((item, key) => {
        if (item.tokenId == id) item.flag = true;
        return item;
      })
    );
    let temp = 0;
    tokenList
      ?.filter((item) => item?.flag == true)
      ?.map(
        (v, key) =>
          (temp += tokenAmountList?.filter(
            (amountItem) => amountItem?.tokenId == v?.tokenId
          )[0].amount)
      );

    setTotalAmount(temp);
  };

  const onUpgrade = () => {
    if (tokenList?.length) {
      setTokenListToUpgrade(
        tokenList
          ?.filter((item) => item?.flag == true)
          ?.map((item) => +item?.tokenId)
      );
      onClick(totalAmount);
    }
  };

  useEffect(() => {
    (async () => {
      if (isOpen && filterTokenList?.length) {
        Promise.all(
          filterTokenList?.map((item) =>
            handleNFT.getUpgradeDelay(item?.tokenId)
          )
        ).then((res) => {
          setTokenList(
            filterTokenList
              ?.filter((item, key) =>
                compareUnixDates(new Date().getTime() / 1000, res[key])
              )
              ?.filter((item, key) => item?.staked)
              ?.map((tokenItem, tokenKey) => {
                return { ...tokenItem, flag: true };
              })
          );
        });
      }
    })();
  }, [filterTokenList, isOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    (async () => {
      if (isOpen && filterTokenList?.length) {
        handleTransactionLoadingModal.open();
        await Promise.all(
          filterTokenList?.map((item) =>
            handleNFT.getUpgradeDelay(item?.tokenId)
          )
        ).then((res) => {
          setTokenList(
            filterTokenList
              ?.filter((item, key) =>
                compareUnixDates(new Date().getTime() / 1000, res[key])
              )
              ?.filter((item, key) => item?.staked)
              ?.map((tokenItem, tokenKey) => {
                return { ...tokenItem, flag: true };
              })
          );
          handleTransactionLoadingModal.close();
        });
      }
    })();
  }, [isOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    (async () => {
      if (filterTokenList?.length) {
        Promise.all(
          filterTokenList?.map((item) =>
            handleNFT.getAmountUpgradeKey(item?.tier)
          )
        ).then((res) => {
          setTotalAmount(res.reduce((a, b) => a + b, 0));
          let temp = [];
          res?.map((item, key) => {
            temp.push({
              tokenId: filterTokenList[key].tokenId,
              amount: item,
            });
          });
          setTokenAmountList(temp);
        });
      }
    })();
  }, [filterTokenList]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Modal
      isModalOpen={isOpen}
      handleClose={onClose}
      withCrossIcon
      className="max-w-[608px] max-h-[582px] px-[20px] py-[32px]"
    >
      <p className="modal__title">Upgrade All Keys</p>

      {!isMobile && (
        <div className="modal__text mt-4 text-center">
          Upgrading your Key Level helps you earn more $TRESR.
        </div>
      )}
      {!isMobile && (
        <div className="modal__text text-right text-[16px] mr-[20px]">
          {tokenList?.filter((item) => item?.flag == true)?.length} /{" "}
          {tokenList?.length}
        </div>
      )}
      <div className={`upgradeAllKeysModal__list`}>
        {tokenList?.map((item, key) => {
          if (item.flag) {
            return (
              <KeyItem
                key={key}
                token={item}
                onDeleteItem={onDeleteItem}
                onAddItem={onAddItem}
                index={item?.tokenId}
                delI={curDelToken}
              />
            );
          }
        })}
        {tokenList?.map((item, key) => {
          if (!item.flag)
            return (
              <KeyItem
                key={key}
                token={item}
                onDeleteItem={onDeleteItem}
                onAddItem={onAddItem}
                index={key}
              />
            );
        })}
      </div>

      <div className="upgradeAllKeysModal__total">
        <span className="upgradeAllKeysModal__total--text">
          You need to Burn
        </span>
        <div className="upgradeAllKeysModal__total--price">
          {formatterUS(totalAmount)} SMRTR
        </div>
      </div>

      <div className="upgradeAllKeysModal__buttons flex-grow justify-end items-end">
        <MarketplaceButton title="Cancel" onClick={onClose} />
        <MarketplaceButton
          disabled={isInsufficient}
          title={buttonTitle}
          onClick={onUpgrade}
          isBlue
        />
      </div>
    </Modal>
  );
};

export default UpgradeAllKeysModal;
