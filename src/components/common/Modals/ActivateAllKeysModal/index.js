import React, { useState, useEffect } from "react";
import MarketplaceButton from "../../MarketplaceButton";
import "./style.scss";
import cross from "../../../../assets/images/cross_keyList_black.svg";
import crossWhite from "../../../../assets/images/cross_keyList_white.svg";
import { useSelector } from "react-redux";
import { selectTheme } from "redux/slice/themeSlice";
import Modal from "storybook/atom/Modal/modal";

const ActivateAllKeysModal = ({
  isOpen,
  onClose,
  filterTokenList,
  onClick,
}) => {
  const theme = useSelector(selectTheme);
  const [curDelToken, setCurDelToken] = useState(-1);
  const [tokenList, setTokenList] = useState();

  const isDark = theme === "dark";

  // const onDeleteItem = (id) => setTokenList(tokenList?.filter(item => item?.tokenId !== id))
  const onDeleteItem = async (id) => {
    //setTokenList(tokenList?.filter((item) => item?.tokenId !== id));
    setCurDelToken(id);
    setTokenList(
      tokenList?.map((item, key) => {
        if (item.tokenId == id) item.flag = false;
        return item;
      })
    );
  };

  const onAddItem = async (id) => {
    setTokenList(
      tokenList?.map((item, key) => {
        if (item.tokenId == id) item.flag = true;
        return item;
      })
    );
  };

  const onActivate = () =>
    tokenList?.length &&
    onClick(
      tokenList
        ?.filter((item) => item?.flag == true)
        ?.map((item) => +item?.tokenId)
    );

  useEffect(() => {
    setTokenList(
      filterTokenList
        ?.filter((item) => !item?.staked)
        ?.map((tokenItem, tokenKey) => {
          return { ...tokenItem, flag: true };
        })
    );
  }, [filterTokenList]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Modal
      isModalOpen={isOpen}
      handleClose={onClose}
      withCrossIcon
      className="max-w-[458px] max-h-[582px] px-[20px] py-[32px]"
    >
      <p className="modal__title">Activate All Keys</p>

      <div className="modal__text mt-5">
        Activating your Founder's Key allows you to open Treasure Boxes and
        compete for $TRESR rewards.
        <br />
        Your daily $TRESR Rewards grow as you upgrade your "Key Level" and
        "Treasure Tier".
      </div>
      <div className="modal__text text-right text-[16px] mr-[20px]">
        {tokenList?.filter((item) => item?.flag == true)?.length} /{" "}
        {tokenList?.length}
      </div>
      <div className="activateAllKeysModal__list">
        {tokenList?.map((item, key) => {
          return (
            item.flag && (
              <div key={key} className="activateAllKeysModal__list--item">
                <div>
                  <img
                    width={36}
                    height={36}
                    src={item?.spaceThumbnail}
                    alt=""
                  />
                  <span>Founder’s Key #{item?.tokenId}</span>
                </div>
                <img
                  src={isDark ? crossWhite : cross}
                  alt={"delete"}
                  className="activateAllKeysModal__cross"
                  onClick={() => onDeleteItem(item?.tokenId)}
                />
              </div>
            )
          );
        })}
        {tokenList?.map((item, key) => {
          return (
            !item.flag && (
              <div key={key} className="activateAllKeysModal__list--item">
                <div className="filter brightness-[0.4]">
                  <img
                    width={36}
                    height={36}
                    src={item?.spaceThumbnail}
                    alt=""
                  />
                  <span>Founder’s Key #{item?.tokenId}</span>
                </div>
                <div
                  className="activateAllKeysModal__cross text-gray-400 hover:text-white"
                  onClick={() => onAddItem(item?.tokenId)}
                >
                  Add
                </div>
              </div>
            )
          );
        })}
      </div>

      <div className="activateAllKeysModal__buttons flex-grow justify-end items-end">
        <MarketplaceButton title="Cancel" isNormal onClick={onClose} />
        <MarketplaceButton
          isBlue
          title={`Activate ${
            tokenList?.filter((item) => item?.flag == true)?.length || 0
          } Keys`}
          onClick={onActivate}
        />
      </div>
    </Modal>
  );
};

export default ActivateAllKeysModal;
