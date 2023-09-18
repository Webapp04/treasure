import React, { useState, useEffect } from "react";
import MarketplaceButton from "../../MarketplaceButton";
import { useNavigate } from "react-router-dom";
import customSlider_left from "assets/images/customSlider-left.svg";
import customSlider_right from "assets/images/customSlider-right.svg";
import "./style.scss";
import Slider from "react-slick";
import { useSelector } from "react-redux";
import { selectNftList } from "redux/slice/nftSlice";
import Modal from "storybook/atom/Modal/modal";

const SuccessMintModal = ({
  isOpen,
  onClose,
  tokenIdList,
  sumCommission,
  curAVAX,
  AVAXPrice,
  enoughFlag,
}) => {
  const nftLists = useSelector(selectNftList);
  const [activeSlide, setActiveSlide] = useState(0);
  const [tokenList, setTokenList] = useState([]);
  const [sliderRef, setSliderRef] = useState(null);
  const navigate = useNavigate();

  const settings = {
    centerMode: true,
    centerPadding: "0px",
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: false,
    focusOnSelect: true,
    afterChange: (current) => setActiveSlide(current ?? 0),
  };

  const handleCloseModal = () => {
    setTokenList([]);
    setActiveSlide(0);
    onClose();
  };

  const onGoToGame = () => {
    handleCloseModal();
    navigate("/game");
  };

  useEffect(() => {
    setTokenList(
      nftLists?.filter((item) => tokenIdList?.includes(item?.tokenId))
    );
  }, [tokenIdList?.length, nftLists?.length]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (tokenList?.length) {
      const blockOldPrev = document.querySelector(`.slick-slide.prev`);
      if (blockOldPrev) blockOldPrev?.classList?.remove("prev");

      const blockOldNext = document.querySelector(`.slick-slide.next`);
      if (blockOldNext) blockOldNext?.classList?.remove("next");

      setTimeout(() => {
        const blockPrev = document.querySelector(
          `[data-index='${activeSlide - 1}']`
        );
        if (blockPrev) blockPrev?.classList?.add("prev");
      }, 0);

      const blockNext = document.querySelector(
        `[data-index='${activeSlide + 1}']`
      );
      if (blockNext) blockNext?.classList?.add("next");
    }
  }, [tokenList, activeSlide]); // eslint-disable-line react-hooks/exhaustive-deps

  if (enoughFlag) {
    return (
      <Modal
        isModalOpen={isOpen}
        handleClose={handleCloseModal}
        withCrossIcon
        isFullModalBg
        className="px-[0px] py-[0px] max-h-[638px] max-w-[458px]"
      >
        <p className="modal__title successMintModal__title">
          Welcome to the Club!
        </p>
        <p className="modal__text successMintModal__text">
          You have successfully minted{" "}
          {tokenList?.length === 1
            ? `Founder's key #${tokenList[0]?.tokenId}`
            : `${tokenList?.length?.toString()} keys`}
        </p>

        <div className="successMintModal__slider">
          {tokenList?.length === 1 ? (
            <div className="successMintModal__singleItem">
              <img src={tokenList[0]?.spaceThumbnail} alt={""} />
              <div className="text-white py-2">
                Founder's Key #{tokenList[0]?.tokenId}
              </div>
            </div>
          ) : (
            <Slider {...settings} ref={setSliderRef}>
              {tokenList?.map((item, key) => (
                <div className="successMintModal__slider--item" key={key}>
                  <img src={item?.spaceThumbnail} alt="" />
                  <p>NFT#{item?.tokenId}</p>
                </div>
              ))}
            </Slider>
          )}
        </div>

        <div className="text-[#fff] px-[30px] text-center pt-[32px]">
          Learn how to upgrade your key, open treasure boxes, and earn TRESR
          tokens by continuing to the game dashboard.
        </div>
        {tokenList.length > 1 && (
          <div className="absolute left-[30px] top-[260px] z-30 cursor-pointer">
            <img
              src={customSlider_left}
              alt="NFTDetail-left"
              onClick={sliderRef?.slickPrev}
            />
          </div>
        )}
        {tokenList.length > 1 && (
          <div className="absolute right-[30px] top-[260px] z-30 cursor-pointer">
            <img
              src={customSlider_right}
              alt="NFTDetail-right"
              onClick={sliderRef?.slickNext}
            />
          </div>
        )}
        <div
          className={`successMintModal__buttons ${
            tokenList?.length === 1 ? "successMintModal__buttons--oneToken" : ""
          }`}
        >
          <MarketplaceButton
            title={"Stay on Mint page"}
            onClick={handleCloseModal}
          />
          <MarketplaceButton
            title={"Go to the Game"}
            isBlue
            onClick={onGoToGame}
          />
        </div>
      </Modal>
    );
  } else {
    return (
      <Modal
        isModalOpen={isOpen}
        handleClose={handleCloseModal}
        withCrossIcon
        isFullModalBg
        className="max-w-[458px]"
      >
        <div className="p-[32px] text-white">
          <div className="text-[#F44550] text-[16px] text-center">
            You do not have enough AVAX.
          </div>
          <div className="text-[16px] pt-[32px]">
            You need to lower the number of Keys you are minting, or replenish
            your AVAX supply.
          </div>
          <div className="py-4">
            <hr className="bg-[#fbfbfb22] border-0 h-0.5" />
          </div>
          <div className="flex justify-between">
            <div>You need to pay</div>
            <div className="flex gap-2">
              <div className="text-[#fbfbfb77]">
                ${(AVAXPrice * sumCommission).toFixed(2)}
              </div>
              <div className="text-[#BBC5FF] font-medium">
                {sumCommission} AVAX
              </div>
            </div>
          </div>
          <div className="flex justify-between">
            <div>Balance:</div>
            <div className="flex gap-2">
              <div className="text-[#fbfbfb77]">
                ${(AVAXPrice * curAVAX).toFixed(2)}
              </div>
              <div className="text-[#BBC5FF] font-medium">{curAVAX} AVAX</div>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
};

export default SuccessMintModal;
