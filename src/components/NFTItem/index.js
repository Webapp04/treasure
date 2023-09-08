import React, { useEffect, useState, useRef } from "react";
import "./style.scss";
import { MARKETPLACE_STATUS } from "../../constant/blockchain";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import NFKeyImage from "../../assets/images/tresr_img.svg";
import { setTokenImage } from "../../utils/marketplace";
import useHandleLike from "../../hooks/like/useHandleLike";
import Lottie from "lottie-react";
import likeAnimation from "../../assets/animation/like_animation.json";
import Tooltip from "../ccommon/Tooltip";
import { useDispatch, useSelector } from "react-redux";
import ACTIONS from "redux/action";
import { selectUser } from "redux/slice/userSlice";

const NFTItem = ({
  nft,
  width,
  itemKey,
  isDetailsShown,
  changeSelectedOnClick = false,
  isFromOutsideCollection,
  isSlider,
  like,
  setLike,
}) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const [nftImage, setNftImage] = useState();
  const [nftPrice, setNftPrice] = useState("");
  const [nftName, setNftName] = useState("");
  const [likeCount, setLikeCount] = useState(0);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [detailsCoordinates, setDetailsCoordinates] = useState({});
  const [timeoutID, setTimeoutID] = useState(0);

  const navigate = useNavigate();
  const handleLike = useHandleLike();
  const likeRef = useRef(null);

  const today = moment().unix();
  const titleStatus = MARKETPLACE_STATUS[nft?.status]?.title;

  const isLiked = like?.userList?.includes(user?.wallet_id);

  const isLargeSize = width > 215;
  const isMediumSize = width > 160;
  const isSmallSize = width <= 160;

  const isDescription = isLargeSize;
  const isMetadata = isDetailsShown && !!nft?.metadata?.length;

  const onLike = (event) => {
    event.stopPropagation();
    if (user?.wallet_id) {
      if (!isLiked) likeRef?.current?.play();
      else likeRef?.current?.goToAndStop(0, true);

      const id = +nft?.tokenId || +nft?.tokenID;
      handleLike
        .set(nft?.contractAddress, id)
        .then((res) => res && setLike(id, res));
    }
  };

  const onViewDetail = () => {
    if (changeSelectedOnClick) {
      ACTIONS.SET_NFT_SELECTED(dispatch, nft);
    }
    navigate(
      `/marketplace/${nft?.contractAddress}/${nft?.tokenId || nft?.tokenID}`
    );
    window.scrollTo(0, 0);
  };

  const onMouseLeave = () => {
    clearTimeout(timeoutID);
    setIsDetailsOpen(false);
  };

  const onMouseMove = (e, key) => {
    setDetailsCoordinates({ top: e.pageY - 700, left: e.pageX + 80 });
    clearTimeout(timeoutID);
    const id = setTimeout(() => setIsDetailsOpen(true), 800);
    setTimeoutID(id);
  };

  useEffect(() => {
    if (nft?.tokenId || nft?.tokenID) {
      const name =
        nft?.metadata?.name ||
        nft?.name + " #" + (nft?.tokenId || nft?.tokenID || "")?.toString();

      if (name?.length > 20) setNftName(name?.slice(0, 20) + "...");
      else setNftName(name);

      setTokenImage(setNftImage, nft);

      if (nft?.auctions?.active) {
        setNftPrice("is on auction");
      } else if (
        nft?.listed?.price > 0 &&
        nft?.listed?.startDate <= today &&
        nft?.listed?.endDate >= today
      ) {
        setNftPrice(nft?.listed?.price?.toString() + " AVAX");
      } else {
        setNftPrice("Not Listed");
      }
    }
  }, [nft]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setLikeCount(like?.count);

    if (isLiked) likeRef?.current?.play();
    else likeRef?.current?.goToAndStop(1, true);
  }, [isLiked, like]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <div
        className={`nft ${isSmallSize ? "nft__isSmallSize" : ""} ${
          isDetailsShown ? "nft__withDetails" : ""
        }`}
        style={{ maxWidth: `${width}px` }}
        onMouseEnter={(e) => {
          if (!isSmallSize) return;
          onMouseMove(e, itemKey);
        }}
        onMouseLeave={onMouseLeave}
        onClick={onViewDetail}
      >
        {!isSmallSize && (
          <div className="nft__like--wrapper">
            <Tooltip
              tooltipText={isLiked ? "Delete from favorite" : "Add to favorite"}
              top={-40}
            >
              <div className="nft__like--number" onClick={onLike}>
                {likeCount || 0}
                <Lottie
                  animationData={likeAnimation}
                  loop={false}
                  autoplay={false}
                  lottieRef={likeRef}
                  style={{
                    width: 100,
                    height: 100,
                    position: "absolute",
                    top: "-67px",
                    right: "-30px",
                  }}
                />
              </div>
            </Tooltip>
          </div>
        )}

        {/* {
                        isTitleStatus && (!!nftImage?.length || !!nft?.spaceThumbnail?.length)
                        && <div className='nft__raffle'>
                            <p className='nft__raffle--title'>{titleStatus}</p>
                        </div>
                    } */}

        {isFromOutsideCollection ? (
          <div
            style={{
              maxWidth: `${width}px`,
              height: `${width}px`,
              width: isSlider ? "282px" : "100%",
            }}
            className={`nft__image--border nft__image--placeholder ${
              isMediumSize ? "" : "nft__image"
            }`}
          >
            {!!nftImage?.length && (
              <img
                src={nftImage}
                className={`nft__image--border ${
                  isMediumSize ? "" : "nft__image"
                }`}
                alt=""
                loading={"lazy"}
              />
            )}
          </div>
        ) : (
          <div
            style={{
              maxWidth: `${width}px`,
              height: `${width}px`,
              width: isSlider ? "282px" : "100%",
            }}
            className={`nft__image--border nft__image--placeholder ${
              isMediumSize ? "" : "nft__image"
            }`}
          >
            {!!nft?.spaceThumbnail?.length && (
              <img
                src={nft?.spaceThumbnail}
                className={`nft__image--border ${
                  isMediumSize ? "" : "nft__image"
                }`}
                alt={""}
              />
            )}
          </div>
        )}

        {isMediumSize && (
          <div className="nft__name--logo">
            <p className={"nft__name nft__title"}>{nftName}</p>
            <img src={NFKeyImage} alt={"Open Sea"} height={24} width={24} />
          </div>
        )}
        {isDescription && (
          <div className={"nft__desc"}>
            <div>
              <p className={"nft__subtitle"}>List price</p>
              <p className={"nft__name"}>{nftPrice}</p>
            </div>
            <div>
              <p className={"nft__subtitle"} style={{ textAlign: "right" }}>
                Ends
              </p>
              <p className={"nft__name"} style={{ textAlign: "right" }}>
                {nft?.listed?.endDate
                  ? moment
                      .unix(nft?.listed?.endDate)
                      .format("MM.DD.YY, hh:mm a")
                  : nft?.auctions?.blockDeadline
                  ? moment
                      .unix(nft?.auctions?.blockDeadline)
                      .format("MM.DD.YY, hh:mm a")
                  : "-"}
              </p>
            </div>
          </div>
        )}

        {isMetadata && (
          <div className={"nft__metadata"}>
            {nft?.metadata?.map((item, key) => (
              <div key={key} className={"nft__metadata--container"}>
                <p className={"nft__metadata--bg"}>{item?.bg}</p>
                <p className={"nft__metadata--color"}>{item?.color}</p>
                <p className={"nft__metadata--percentage"}>
                  {item?.percentage}
                </p>
              </div>
            ))}
          </div>
        )}

        {isMediumSize && (
          <div
            className={`nft__button ${isLargeSize ? "nft__button--large" : ""}`}
            onClick={onViewDetail}
          >
            View Details
          </div>
        )}
      </div>
      {isDetailsOpen && (
        <div className={"nft__details"} style={detailsCoordinates}>
          <div className={`nft nft__withDetails`} style={{ maxWidth: `315px` }}>
            <div className="nft__like--wrapper">
              <div className="nft__like--number">
                {likeCount || 0}
                <Lottie
                  animationData={likeAnimation}
                  loop={false}
                  autoplay={false}
                  lottieRef={likeRef}
                  style={{
                    width: 100,
                    height: 100,
                    position: "absolute",
                    top: "-67px",
                    right: "-30px",
                  }}
                />
              </div>
            </div>

            {/* {
                                isTitleStatus && (!!nftImage?.length || !!nft?.spaceThumbnail?.length)
                                && <div className='nft__raffle'>
                                    <p className='nft__raffle--title'>{titleStatus}</p>
                                </div>
                            } */}

            {isFromOutsideCollection ? (
              <div
                style={{ maxWidth: `315px`, height: `315px`, width: "100%" }}
                className={`nft__image--border nft__image--placeholder nft__image`}
              >
                {!!nftImage?.length && (
                  <img
                    src={nftImage}
                    className={`nft__image--border nft__image`}
                    alt=""
                    loading={"lazy"}
                  />
                )}
              </div>
            ) : (
              <div
                style={{ maxWidth: `315px`, height: `315px`, width: "100%" }}
                className={`nft__image--border nft__image--placeholder nft__image`}
              >
                {!!nft?.spaceThumbnail?.length && (
                  <img
                    src={nft?.spaceThumbnail}
                    className={`nft__image--border nft__image`}
                    alt={""}
                  />
                )}
              </div>
            )}

            <div className="nft__name--logo">
              <p className={"nft__name nft__title"}>{nftName}</p>
              <img src={NFKeyImage} alt={"Open Sea"} height={24} width={24} />
            </div>

            <div className={"nft__desc"}>
              <div>
                <p className={"nft__subtitle"}>List price</p>
                <p className={"nft__name"}>{nftPrice}</p>
              </div>
              <div>
                <p className={"nft__subtitle"} style={{ textAlign: "right" }}>
                  Ends
                </p>
                <p className={"nft__name"} style={{ textAlign: "right" }}>
                  {nft?.listed?.endDate
                    ? moment
                        .unix(nft?.listed?.endDate)
                        .format("MM.DD.YY, hh:mm a")
                    : nft?.auctions?.blockDeadline
                    ? moment
                        .unix(nft?.auctions?.blockDeadline)
                        .format("MM.DD.YY, hh:mm a")
                    : "-"}
                </p>
              </div>
            </div>

            {!!nft?.metadata?.length && (
              <div className={"nft__metadata"}>
                {nft?.metadata?.map((item, key) => (
                  <div key={key} className={"nft__metadata--container"}>
                    <p className={"nft__metadata--bg"}>{item?.bg}</p>
                    <p className={"nft__metadata--color"}>{item?.color}</p>
                    <p className={"nft__metadata--percentage"}>
                      {item?.percentage}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
export default NFTItem;
