import React, { useState, useEffect, useRef } from "react";
import NFTItem from "../../NFTItem";
import "./style.scss";
import MarketplaceButton from "../MarketplaceButton";
import useWindowDimensions from "../../../hooks/useWidowDimensions";
import { useNavigate, useParams } from "react-router-dom";
import { NFKEY_COLLECTION_ADDRESS } from "../../../constant/blockchain";
import useHandleLike from "../../../hooks/like/useHandleLike";
import customSlider_left from "assets/images/customSlider-left.svg";
import customSlider_right from "assets/images/customSlider-right.svg";
import { useHorizontalScroll } from "hooks/useSideScroll";
import cn from "classnames";

const CustomSlider = ({ data, title, text }) => {
  const windowParams = useWindowDimensions();
  const isMobile = windowParams?.width <= 450;
  const navigate = useNavigate();
  const params = useParams();
  const [likes, setLikes] = useState([]);
  const handleLike = useHandleLike();
  const isNFKeyCollection =
    params?.contractAddress === NFKEY_COLLECTION_ADDRESS;

  const getLikes = (list) => {
    handleLike
      .getCountByTokens(
        list?.map((item) => ({
          contractAddress: item?.contractAddress,
          tokenID: +item?.tokenId || +item?.tokenID,
        }))
      )
      .then((res) => res && setLikes(res));
  };

  const onClickSeeALl = () =>
    navigate(`/collections/${params?.contractAddress}/allItems`);
  const getLike = (item) =>
    likes?.find(
      (like) =>
        like?.contractAddress === item?.contractAddress &&
        +like?.tokenID === (+item?.tokenId || +item?.tokenID)
    );
  const scrollRef = useHorizontalScroll();
  useEffect(() => {
    getLikes(data);
  }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

  return isMobile ? (
    <div className="customSlider__mobile">
      <p className="customSlider__title">{title}</p>
      {/* <p className='customSlider__desc'>{text}</p> */}
      <div className="customSlider__mobile--nftList">
        {data?.map((item, key) => {
          return (
            <NFTItem
              key={key}
              width={300}
              nft={item}
              isDetailsShown={true}
              isSlider={true}
              isFromOutsideCollection={!isNFKeyCollection}
              like={getLike(item)}
              setLike={(tokenID, value) =>
                setLikes(
                  likes?.map((like) =>
                    like?.tokenID === tokenID ? { ...like, ...value } : like
                  )
                )
              }
            />
          );
        })}
      </div>
      <div className="customSlider__mobile--button">
        <MarketplaceButton title={"See all"} isBlue onClick={onClickSeeALl} />
      </div>
    </div>
  ) : (
    <div className="customSlider">
      <div className="customSlider__container" ref={scrollRef}>
        {data?.map((item, key) => {
          return (
            <NFTItem
              key={key}
              width={300}
              nft={item}
              isDetailsShown={true}
              isFromOutsideCollection={!isNFKeyCollection}
              isSlider={true}
              like={getLike(item)}
              setLike={(tokenID, value) =>
                setLikes(
                  likes?.map((like) =>
                    like?.tokenID === tokenID ? { ...like, ...value } : like
                  )
                )
              }
            />
          );
        })}
      </div>
      <div className="customSlider__blurredBlock">
        <p className="customSlider__title">{title}</p>
        <p className="customSlider__desc">{text}</p>
        <MarketplaceButton title={"See All"} isBlue onClick={onClickSeeALl} />
      </div>
      <div
        className={cn(
          "absolute left-[386px] top-[50%] z-30 cursor-pointer",
          data.length <= 3 ? "hidden" : ""
        )}
        onClick={() => {
          scrollRef.current.scrollBy(-300, 0);
        }}
      >
        <img src={customSlider_left} alt="customSlider-left" />
      </div>
      <div
        className={cn(
          "absolute right-[16px] top-[50%] z-30 cursor-pointer",
          data.length <= 3 ? "hidden" : ""
        )}
        onClick={() => {
          scrollRef.current.scrollBy(300, 0);
        }}
      >
        <img src={customSlider_right} alt="customSlider-right" />
      </div>
    </div>
  );
};

export default CustomSlider;
