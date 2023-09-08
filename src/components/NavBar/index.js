import React, { useEffect, useRef, useState } from "react";
import "./style.scss";
import filterIcon from "../../assets/images/marketplace/icon-filter.svg";
import filterIconLight from "../../assets/images/marketplace/darkTheme/filter_light.svg";
import filterIconClose from "../../assets/images/marketplace/filter-light-close.svg";
import filterIconLightClose from "../../assets/images/marketplace/darkTheme/icon-filter-close.svg";
import cn from "classnames";
import {
  FILTER_BLOCKCHAIN,
  FILTER_PRICE,
  FILTER_SORT_BY,
  FILTER_SORT_BY_OPTIONS,
  FILTER_STATUS,
  FILTERS_CRITERIONS,
  FILTERS_OPTIONS,
  NAVBAR_ITEMS_ACCOUNT_PAGE,
  NAVBAR_ITEMS_ALL_NFTS_PAGE,
  NAVBAR_ITEMS_GAME_PAGE,
} from "../../constant/marketplace";
import NavBarEditMode from "../NavBarEditMode";
import AccountComponent from "../AccountComponent";
import defaultBanner from "../../assets/images/marketplace/navbar_banner.jpg";
import useWindowDimensions from "../../hooks/useWidowDimensions";
import NavBarEditModeMobile from "../NavBarEditModeMobile";
import { useLocation } from "react-router-dom";
import crossBlack from "../../assets/images/cross_black.svg";
import CustomDropdown from "../common/CustomDropdown";
import {
  AVAILABLE_CURRENCY,
  SUCCESS_AUCTION_TEXT,
  SUCCESS_CREATE_TEST,
  SUCCESS_LISTING_TEXT,
} from "../../constant/singleNFTPage";
import goBackArrowLight from "../../assets/images/singleNFTPage/arrow_left_light.svg";
import goBackArrowDark from "../../assets/images/singleNFTPage/arrow_left_dark.svg";
import { useNavigate } from "react-router-dom";
import MarketplaceButton from "../common/MarketplaceButton";
import FileApi from "../../api/FileApi";
import { hexToNumber } from "../../utils/blockchain";
import useHandleMarketplace from "../../hooks/blockchain/useHandleMarketplace";
import TransactionLoadingModal from "../common/Modals/TransactionLoadingModal";
import useHandleModal from "../../hooks/dom/useHandleModal";
import LoadingMintModal from "../common/Modals/LoadingMintModal";
import {
  CREATE_STATUS_IS_APPROVED,
  CREATE_STATUS_IS_MINTED,
  CREATE_STATUS_IS_PUT_ON_SALE,
  CREATE_STATUS_IS_UPLOADED,
  CREATE_STATUS_IS_UPLOADING,
} from "../../constant/createPage";
import CollectionApi from "../../api/CollectionApi";
import {
  ALERT_STATUS_FAILURE,
  APPROVE_MESSAGE_FAILURE,
  FILE_LOADING_MESSAGE_FAILURE,
  LISTING_MESSAGE_FAILURE,
  METADATA_LOADING_MESSAGE_FAILURE,
  MINT_MESSAGE_FAILURE,
} from "../../constant/alert";
import { convertDateToUnix, formatterUS } from "../../utils";
import useHandleLoader from "../../hooks/loader/useHandleLoader";
import useHandleNFT from "../../hooks/blockchain/useHandleNFT";
import useHandleAuction from "../../hooks/blockchain/useHandleAuction";
import {
  COMMUNITY_COLLECTION_ADDRESS,
  NFKEY_COLLECTION_ADDRESS,
} from "../../constant/blockchain";
import crossIcon from "../../assets/images/cross_keyList_white.svg";
import crossIconBlack from "../../assets/images/cross_keyList_black.svg";
import useOutsideClick from "../../hooks/dom/useOutsideClick";
import { customStylesMobile } from "../NavBarEditModeMobile/stylesMobile";
import useHandleRewards from "hooks/blockchain/useHandleRewards";
import { useDispatch, useSelector } from "react-redux";
import {
  selectBurnedSmrtrBalance,
  selectBurnedTresrBalance,
  selectPoolAllocationBalance,
} from "redux/slice/balanceSlice";
import { selectTheme } from "redux/slice/themeSlice";
import { selectUser } from "redux/slice/userSlice";
import ACTIONS from "redux/action";
import {
  selectCreateButtonCreatedData,
  selectCreateButtonIsDisabled,
} from "redux/slice/createButtonSlice";
import { selectBonusPoolAllocation } from "redux/slice/rewardSlice";
import Tab from "storybook/molecule/Tab/tab";
import Button from "storybook/atom/Button/button";
import Tooltip from "storybook/atom/Tooltip/tooltip";
import Modal from "storybook/atom/Modal/modal";

const NavBar = () => {
  const dispatch = useDispatch();
  const theme = useSelector(selectTheme);
  const user = useSelector(selectUser);
  const burnedSmrtrBalance = useSelector(selectBurnedSmrtrBalance);
  const burnedTresrBalance = useSelector(selectBurnedTresrBalance);
  const poolAllocationBalance = useSelector(selectPoolAllocationBalance);
  const claimableBonusPoolAllocationReward = useSelector(
    selectBonusPoolAllocation
  );
  const createButtonIsDisabled = useSelector(selectCreateButtonIsDisabled);
  const createButtonCreatedData = useSelector(selectCreateButtonCreatedData);
  const location = useLocation();
  const handleMarketplace = useHandleMarketplace();
  const navigate = useNavigate();
  const isDark = theme === "dark";
  const headerRef = useRef();
  const poolRef = useRef();
  const burnRef = useRef();
  const tryItOutRef = useRef();
  const handleTransactionLoadingModal = useHandleModal();
  const handleLoadingMintModal = useHandleModal();
  const handleLoader = useHandleLoader();
  const handleNFT = useHandleNFT();
  const handleAuction = useHandleAuction();
  const handleRewards = useHandleRewards();
  const contractAddress = location?.pathname?.split("/")[2];
  const isAuction = !!createButtonCreatedData?.priceStep?.length;
  const isOnSale =
    !!createButtonCreatedData?.price?.length &&
    !createButtonCreatedData?.priceStep?.length;
  const isNFKey =
    contractAddress?.toLowerCase() ===
    process.env.REACT_APP_NFKEY_ADDRESS?.toLowerCase();

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [activeLink, setActiveLink] = useState(0);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isShownFilters, setIsShownFilters] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(0);
  const [selectedFilterOption, setSelectedFilterOption] = useState([]);
  const [, /*filterSortBy*/ setFilterSortBy] = useState(null);
  const [filterCurrency, setFilterCurrency] = useState(null);
  const [filterMinPrice, setFilterMinPrice] = useState(null);
  const [filterMaxPrice, setFilterMaxPrice] = useState(null);
  const [headerOffsetTop, setHeaderOffsetTop] = useState(false);
  const [navbarItems, setNavbarItems] = useState([]);
  const [loadingStatus, setLoadingStatus] = useState(
    CREATE_STATUS_IS_UPLOADING
  );
  const [isOpenBurn, setIsOpenBurn] = useState(false);
  const [isOpenPool, setIsOpenPool] = useState(false);
  const [isOpenTryItOut, setIsOpenTryItOut] = useState(false);
  const [metadataLink, setMetadataLink] = useState("");
  const [metadata, setMetadata] = useState({});
  const [tokenLinks, setTokenLinks] = useState({});
  const [newTokenID, setNewTokenID] = useState(null);

  const [filtersObject, setFiltersObject] = useState({
    price: null,
    blockchain: [],
    status: [],
    sortBy: null,
  });

  const windowParams = useWindowDimensions();
  const isDesktop = windowParams?.width > 1024;
  const isMobile = windowParams?.width <= 450;
  const isAccountPage = location?.pathname?.includes("account");
  const isMarketplace = location?.pathname?.includes("marketplace");
  const isOneNFTPage = location?.pathname?.includes("marketplace/");
  const isOneCollectionPage = location?.pathname?.includes("collections/");
  const isCreatePage = location?.pathname?.includes("create/");
  const isAllNFTPage =
    location?.pathname === "/allNFTs" || location?.pathname === "collections";
  const isGamePage = location?.pathname?.includes("game");

  const setStickyHeader = () => {
    if (!headerRef?.current?.classList) return;

    if (window?.pageYOffset - 2 >= headerOffsetTop)
      headerRef?.current?.classList?.add("sticky");
    else headerRef?.current?.classList?.remove("sticky");
  };

  const onClickTab = (item, key) => {
    setActiveLink(key);
    if (item?.link === "/account") navigate(`${item?.link}/${user?.wallet_id}`);
    else if (item?.link === "/account/favourites")
      navigate(`account/${user?.wallet_id}/favourites`);
    else if (item?.link === "/account/auctions")
      navigate(`account/${user?.wallet_id}/auctions`);
    else if (item?.link === "collections/allItems")
      navigate(`collections/${contractAddress}/allItems`);
    else if (item?.link === "collections/activity")
      navigate(`collections/${contractAddress}/activity`);
    else navigate(item?.link);
  };

  const onToggleFilters = () => {
    setIsShownFilters(!isShownFilters);
    setSelectedFilter(0);
    if (isMobile) setIsMobileFilterOpen(!isMobileFilterOpen);
  };

  const onSelectFilter = (value) => setSelectedFilter(value);

  const onAddFilter = (item) => {
    if (selectedFilter === FILTER_SORT_BY) {
      setFilterSortBy(item);
      return setFiltersObject({ ...filtersObject, sortBy: item });
    }

    if (selectedFilterOption?.includes(item))
      setSelectedFilterOption(
        selectedFilterOption?.filter((filter) => filter !== item)
      );
    else
      setSelectedFilterOption([
        ...selectedFilterOption?.filter(
          (filter) => !FILTER_SORT_BY_OPTIONS.includes(filter)
        ),
        item,
      ]);

    if (selectedFilter === FILTER_STATUS) {
      setFiltersObject({
        ...filtersObject,
        status: filtersObject?.status?.includes(item)
          ? filtersObject?.status?.filter((i) => i !== item)
          : [...filtersObject?.status, item],
      });
    }

    if (selectedFilter === FILTER_BLOCKCHAIN) {
      setFiltersObject({
        ...filtersObject,
        blockchain: filtersObject?.blockchain?.includes(item)
          ? filtersObject?.blockchain?.filter((i) => i !== item)
          : [...filtersObject?.blockchain, item],
      });
    }
  };

  const onDeleteFilter = (filter, value) => {
    if (filter === "price") setFiltersObject({ ...filtersObject, price: null });
    if (filter === "blockchain")
      setFiltersObject({
        ...filtersObject,
        blockchain: filtersObject?.blockchain?.filter((item) => item !== value),
      });
    if (filter === "status")
      setFiltersObject({
        ...filtersObject,
        status: filtersObject?.status?.filter((item) => item !== value),
      });
    if (filter === "sortBy")
      setFiltersObject({ ...filtersObject, sortBy: null });
  };

  const onClearAllFilters = () => {
    setSelectedFilterOption([]);
    setFiltersObject({ price: null, blockchain: [], status: [], sortBy: null });
    setFilterSortBy(null);
    setFilterCurrency(null);
    setFilterMinPrice(null);
    setFilterMaxPrice(null);
  };

  const onChangeCurrency = (item) => {
    setFilterCurrency(item?.label);
    setFiltersObject({
      ...filtersObject,
      price: { ...filtersObject?.price, currency: item },
    });

    if (filterMinPrice || filterMaxPrice) {
      setSelectedFilterOption(
        [
          ...selectedFilterOption?.filter(
            (i) => !i?.includes("Min") && !i?.includes("Max")
          ),
          filterMinPrice ? `Min ${filterMinPrice} ${item?.label}` : null,
          filterMaxPrice ? `Max ${filterMaxPrice} ${item?.label}` : null,
        ]?.filter((i) => !!i)
      );
    }
  };

  const onChangeMinPrice = (event) => {
    setFilterMinPrice(event?.target?.value);

    setSelectedFilterOption([
      ...selectedFilterOption?.filter((item) => !item?.includes("Min")),
      `Min ${event?.target?.value} ${filterCurrency}`,
    ]);

    setFiltersObject({
      ...filtersObject,
      price: { ...filtersObject?.price, min: event?.target?.value },
    });
  };

  const onChangeMaxPrice = (event) => {
    setFilterMaxPrice(event?.target?.value);

    setSelectedFilterOption([
      ...selectedFilterOption?.filter((item) => !item?.includes("Max")),
      `Max ${event?.target?.value} ${filterCurrency}`,
    ]);

    setFiltersObject({
      ...filtersObject,
      price: { ...filtersObject?.price, max: event?.target?.value },
    });
  };

  const setPriceFilterText = () => {
    const min = filtersObject?.price?.min
      ? `Min ${filtersObject?.price?.min}`
      : "";
    const max = filtersObject?.price?.max
      ? `Max ${filtersObject?.price?.max}`
      : "";
    const currency = filtersObject?.price?.currency
      ? `${filtersObject?.price?.currency?.label}`
      : "";

    return filtersObject?.price?.max
      ? `${min} ${currency}, ${max} ${currency}`
      : `${min} ${currency}`;
  };

  const onGoBack = () =>
    navigate(
      isNFKey
        ? `/collections/${NFKEY_COLLECTION_ADDRESS}`
        : `/collections/${COMMUNITY_COLLECTION_ADDRESS}`
    );
  const onClickMint = () => navigate("/");

  const onToggleBurn = () => {
    setIsOpenBurn(!isOpenBurn);
    setIsOpenPool(false);

    //if (!isOpenBurn) setTimeout(() => setIsOpenTryItOut(true), 300);
  };

  const onTogglePool = () => {
    setIsOpenPool(!isOpenPool);
    setIsOpenBurn(false);

    //if (!isOpenPool) setTimeout(() => setIsOpenTryItOut(true), 300);
  };

  const handleMint = async () => {
    const tokenID = await handleMarketplace
      .mint(user?.wallet_id, metadataLink)
      .then((res) => {
        isOnSale || isAuction
          ? setLoadingStatus(CREATE_STATUS_IS_MINTED)
          : handleTransactionLoadingModal.close();
        return hexToNumber(res?.events[0]?.args[2]?._hex);
      })
      .catch(() => {
        handleTransactionLoadingModal.close();
        handleLoadingMintModal.close();
        setLoadingStatus(CREATE_STATUS_IS_UPLOADING);
        ACTIONS.SET_ALERT(
          dispatch,
          true,
          ALERT_STATUS_FAILURE,
          MINT_MESSAGE_FAILURE
        );
        return null;
      });

    if (!tokenID) return;

    setNewTokenID(tokenID);

    await new CollectionApi().createToken(
      process.env?.REACT_APP_COMMUNITY_COLLECTION_ADDRESS,
      tokenID,
      tokenLinks[1],
      user?.wallet_id,
      metadata
    );
  };

  const handleApproveListing = () => {
    handleMarketplace
      .approveListing(
        newTokenID,
        process.env.REACT_APP_COMMUNITY_COLLECTION_ADDRESS
      )
      .then(async (transaction) => {
        if (transaction?.status) {
          setLoadingStatus(CREATE_STATUS_IS_APPROVED);
        }
      })
      .catch(async () => {
        handleLoadingMintModal.close();

        if (loadingStatus === CREATE_STATUS_IS_MINTED) {
          ACTIONS.SET_CREATE_BUTTON(
            dispatch,
            false,
            {},
            true,
            SUCCESS_CREATE_TEST({ newTokenID })
          );
          navigate(
            `/marketplace/${process.env?.REACT_APP_COMMUNITY_COLLECTION_ADDRESS}/${newTokenID}`
          );
          await handleLoader.loaderWrapper(
            () =>
              handleNFT.reloadNFTItemBalance(
                process.env?.REACT_APP_COMMUNITY_COLLECTION_ADDRESS,
                newTokenID
              ),
            2
          );
        }

        setLoadingStatus(CREATE_STATUS_IS_UPLOADING);
        ACTIONS.SET_ALERT(
          dispatch,
          true,
          ALERT_STATUS_FAILURE,
          APPROVE_MESSAGE_FAILURE,
          tokenLinks[1]
        );
        return null;
      });
  };

  const handleApproveAuction = () => {
    handleAuction
      .approveAuction(
        newTokenID,
        process.env?.REACT_APP_COMMUNITY_COLLECTION_ADDRESS
      )
      .then(async (transaction) => {
        if (transaction.status) {
          setLoadingStatus(CREATE_STATUS_IS_APPROVED);
        }
      })
      .catch(async () => {
        handleLoadingMintModal.close();

        if (loadingStatus === CREATE_STATUS_IS_MINTED) {
          ACTIONS.SET_CREATE_BUTTON(
            dispatch,
            false,
            {},
            true,
            SUCCESS_CREATE_TEST({ newTokenID })
          );
          navigate(
            `/marketplace/${process.env?.REACT_APP_COMMUNITY_COLLECTION_ADDRESS}/${newTokenID}`
          );
          await handleLoader.loaderWrapper(
            () =>
              handleNFT.reloadNFTItemBalance(
                process.env?.REACT_APP_COMMUNITY_COLLECTION_ADDRESS,
                newTokenID
              ),
            2
          );
        }

        setLoadingStatus(CREATE_STATUS_IS_UPLOADING);
        ACTIONS.SET_ALERT(
          dispatch,
          true,
          ALERT_STATUS_FAILURE,
          APPROVE_MESSAGE_FAILURE,
          tokenLinks[1]
        );
        return null;
      });
  };

  const onStartListing = () => {
    handleMarketplace
      .createListing(
        convertDateToUnix(
          createButtonCreatedData?.selectedDate?.from,
          createButtonCreatedData?.selectedTime?.timeStart
        ),
        convertDateToUnix(
          createButtonCreatedData?.selectedDate?.to,
          createButtonCreatedData?.selectedTime?.timeEnd
        ),
        (+createButtonCreatedData?.price * 10 ** 18).toString(),
        newTokenID,
        createButtonCreatedData?.selectedCurrency?.address !==
          "0x0000000000000000000000000000000000000000",
        createButtonCreatedData?.selectedCurrency?.address,
        process.env.REACT_APP_COMMUNITY_COLLECTION_ADDRESS
      )
      .then(async (transaction) => {
        if (transaction?.status) {
          setLoadingStatus(CREATE_STATUS_IS_PUT_ON_SALE);
          ACTIONS.SET_CREATE_BUTTON(
            dispatch,
            false,
            {},
            true,
            SUCCESS_LISTING_TEXT({ tokenId: newTokenID })
          );
        } else
          ACTIONS.SET_ALERT(
            dispatch,
            true,
            ALERT_STATUS_FAILURE,
            LISTING_MESSAGE_FAILURE,
            tokenLinks[1]
          );
      })
      .catch(async () => {
        handleLoadingMintModal.close();

        if (loadingStatus === CREATE_STATUS_IS_APPROVED) {
          ACTIONS.SET_CREATE_BUTTON(
            dispatch,
            false,
            {},
            true,
            SUCCESS_CREATE_TEST({ newTokenID })
          );
          navigate(
            `/marketplace/${process.env?.REACT_APP_COMMUNITY_COLLECTION_ADDRESS}/${newTokenID}`
          );
          await handleLoader.loaderWrapper(
            () =>
              handleNFT.reloadNFTItemBalance(
                process.env?.REACT_APP_COMMUNITY_COLLECTION_ADDRESS,
                newTokenID
              ),
            2
          );
        }

        setLoadingStatus(CREATE_STATUS_IS_UPLOADING);
        ACTIONS.SET_ALERT(
          dispatch,
          true,
          ALERT_STATUS_FAILURE,
          LISTING_MESSAGE_FAILURE,
          tokenLinks[1]
        );
      })
      .finally(async () => {
        handleLoadingMintModal.close();
        navigate(
          `/marketplace/${process.env?.REACT_APP_COMMUNITY_COLLECTION_ADDRESS}/${newTokenID}`
        );
        await handleLoader.loaderWrapper(
          () => handleNFT.reloadNFTItemBalance(newTokenID),
          2
        );
      });
  };

  const onStartAuction = () => {
    handleAuction
      .createAuction(
        process.env?.REACT_APP_COMMUNITY_COLLECTION_ADDRESS,
        newTokenID,
        /* global BigInt */
        BigInt(createButtonCreatedData?.price * 10 ** 18).toString(),
        BigInt(createButtonCreatedData?.priceStep * 10 ** 18).toString(),
        convertDateToUnix(
          createButtonCreatedData?.selectedDate?.to,
          createButtonCreatedData?.selectedTime?.timeEnd
        ),
        createButtonCreatedData?.selectedCurrency.value !== "avax",
        createButtonCreatedData?.selectedCurrency.address
      )
      .then(async (transaction) => {
        if (transaction?.status) {
          setLoadingStatus(CREATE_STATUS_IS_PUT_ON_SALE);
          ACTIONS.SET_CREATE_BUTTON(
            dispatch,
            false,
            {},
            true,
            SUCCESS_AUCTION_TEXT({ tokenId: newTokenID })
          );
        } else
          ACTIONS.SET_ALERT(
            dispatch,
            true,
            ALERT_STATUS_FAILURE,
            LISTING_MESSAGE_FAILURE,
            tokenLinks[1]
          );
      })
      .catch(async () => {
        handleLoadingMintModal.close();

        if (loadingStatus === CREATE_STATUS_IS_APPROVED) {
          ACTIONS.SET_CREATE_BUTTON(
            dispatch,
            false,
            {},
            true,
            SUCCESS_CREATE_TEST({ newTokenID })
          );
          navigate(
            `/marketplace/${process.env?.REACT_APP_COMMUNITY_COLLECTION_ADDRESS}/${newTokenID}`
          );
          await handleLoader.loaderWrapper(
            () =>
              handleNFT.reloadNFTItemBalance(
                process.env?.REACT_APP_COMMUNITY_COLLECTION_ADDRESS,
                newTokenID
              ),
            2
          );
        }

        setLoadingStatus(CREATE_STATUS_IS_UPLOADING);
        ACTIONS.SET_ALERT(
          dispatch,
          true,
          ALERT_STATUS_FAILURE,
          LISTING_MESSAGE_FAILURE,
          tokenLinks[1]
        );
      })
      .finally(async () => {
        handleLoadingMintModal.close();
        navigate(
          `/marketplace/${process.env?.REACT_APP_COMMUNITY_COLLECTION_ADDRESS}/${newTokenID}`
        );
        await handleLoader.loaderWrapper(
          () => handleNFT.reloadNFTItemBalance(newTokenID),
          2
        );
      });
  };

  const onClickCreate = async () => {
    if (!createButtonCreatedData?.name?.length) {
      navigate("create/nft");
      return ACTIONS.SET_CREATE_BUTTON(dispatch, true);
    }

    if (isOnSale || isAuction) {
      handleLoadingMintModal.open();
    } else handleTransactionLoadingModal.open();

    const link = await Promise.all([
      new FileApi()
        .generateIPFSLink(createButtonCreatedData?.image)
        .then((res) => (res?.status ? res?.data?.link : null))
        .catch((err) => {
          handleTransactionLoadingModal.close();
          ACTIONS.SET_ALERT(
            dispatch,
            true,
            ALERT_STATUS_FAILURE,
            FILE_LOADING_MESSAGE_FAILURE
          );
          return null;
        }),
      new FileApi()
        .generateCDNLink(createButtonCreatedData?.image, "items")
        .then((res) => (res?.status ? res?.data : null))
        .catch(() => {
          handleTransactionLoadingModal.close();
          ACTIONS.SET_ALERT(
            dispatch,
            true,
            ALERT_STATUS_FAILURE,
            FILE_LOADING_MESSAGE_FAILURE
          );
          return null;
        }),
    ]);

    if (!link?.length || !link[0]?.length || !link[1]?.length) {
      handleTransactionLoadingModal.close();
      return ACTIONS.SET_ALERT(
        dispatch,
        true,
        ALERT_STATUS_FAILURE,
        FILE_LOADING_MESSAGE_FAILURE
      );
    }
    setTokenLinks(link);

    const tokenMetadata = {
      attributes: createButtonCreatedData?.attributes,
      description: createButtonCreatedData?.description,
      image: link[0],
      name: createButtonCreatedData?.name,
    };
    setMetadata(tokenMetadata);

    const generatedMetadataLink = await new FileApi()
      .generateMetadataLink(metadata)
      .then((res) => (res?.status ? res?.data?.hash : null))
      .catch(() => {
        handleTransactionLoadingModal.close();
        ACTIONS.SET_ALERT(
          dispatch,
          true,
          ALERT_STATUS_FAILURE,
          METADATA_LOADING_MESSAGE_FAILURE
        );
        return null;
      });

    setMetadataLink(generatedMetadataLink);
    setLoadingStatus(CREATE_STATUS_IS_UPLOADED);

    if (isOnSale || isAuction) return;

    const tokenID = await handleMarketplace
      .mint(user?.wallet_id, metadataLink)
      .then((res) => {
        isOnSale
          ? setLoadingStatus(CREATE_STATUS_IS_MINTED)
          : handleTransactionLoadingModal.close();
        return hexToNumber(res?.events[0]?.args[2]?._hex);
      })
      .catch(() => {
        handleTransactionLoadingModal.close();
        handleLoadingMintModal.close();
        setLoadingStatus(CREATE_STATUS_IS_UPLOADING);
        ACTIONS.SET_ALERT(
          dispatch,
          true,
          ALERT_STATUS_FAILURE,
          MINT_MESSAGE_FAILURE
        );
        return null;
      });

    if (!tokenID) return;

    await new CollectionApi().createToken(
      process.env?.REACT_APP_COMMUNITY_COLLECTION_ADDRESS,
      tokenID,
      link[1],
      user?.wallet_id,
      metadata
    );

    ACTIONS.SET_CREATE_BUTTON(
      dispatch,
      false,
      {},
      true,
      SUCCESS_CREATE_TEST({ tokenId: newTokenID })
    );
    navigate(
      `/marketplace/${process.env?.REACT_APP_COMMUNITY_COLLECTION_ADDRESS}/${tokenID}`
    );
    await handleLoader.loaderWrapper(
      () =>
        handleNFT.reloadNFTItemBalance(
          process.env?.REACT_APP_COMMUNITY_COLLECTION_ADDRESS,
          tokenID
        ),
      2
    );
  };

  // const burnBlock = document.getElementById("burnBlock");
  // const poolBlock = document.getElementById("poolBlock");

  // const listenerBurnBlock = (e) => {
  //   setIsOpenTryItOut(false);

  //   const left =
  //     windowParams.width > 1600
  //       ? e.pageX - (windowParams.width - 1700) - 150
  //       : e.pageX - 150;
  //   const top = e.pageY - 150;

  //   burnBlock.style.left = left + "px";
  //   burnBlock.style.top = top + "px";
  // };

  // const listenerPoolBlock = (e) => {
  //   setIsOpenTryItOut(false);

  //   const left =
  //     windowParams.width > 1600
  //       ? e.pageX - (windowParams.width - 1700) - 200
  //       : e.pageX - 200;
  //   const top = e.pageY - 200;

  //   poolBlock.style.left = left + "px";
  //   poolBlock.style.top = top + "px";
  // };

  // burnBlock?.addEventListener("mousedown", (e) => {
  //   document.addEventListener("mousemove", listenerBurnBlock);
  // });

  // burnBlock?.addEventListener("mouseup", (e) => {
  //   document.removeEventListener("mousemove", listenerBurnBlock);
  // });

  // poolBlock?.addEventListener("mousedown", (e) => {
  //   document.addEventListener("mousemove", listenerPoolBlock);
  // });

  // poolBlock?.addEventListener("mouseup", (e) => {
  //   document.removeEventListener("mousemove", listenerPoolBlock);
  // });

  const onCloseBurn = () => {
    setIsOpenBurn(false);
    setIsOpenTryItOut(false);
    // if (burnBlock != null) {
    //   burnBlock.style.left = 0 + "px";
    //   burnBlock.style.top = 55 + "px";
    // }
  };

  const onClosePool = () => {
    setIsOpenPool(false);
    setIsOpenTryItOut(false);
    // if (burnBlock != null) {
    //   poolBlock.style.left = 50 + "px";
    //   poolBlock.style.top = 55 + "px";
    // }
  };

  const onClickTryItOut = () => {
    // setIsOpenTryItOut(false);
    // if (isOpenPool) {
    //   setIsOpenPool(true);
    //   poolBlock.style.left = 50 + "px";
    //   poolBlock.style.top = 155 + "px";
    // } else {
    //   setIsOpenBurn(true);
    //   burnBlock.style.left = 0 + "px";
    //   burnBlock.style.top = 155 + "px";
    // }
  };

  const setHeaderButton = () => {
    if (isMarketplace || isCreatePage)
      return (
        <div className="navbar__header--goBack" onClick={onGoBack}>
          <img src={isDark ? goBackArrowLight : goBackArrowDark} alt={""} />
          Back to All NFTs
        </div>
      );
    else if (isGamePage && isDesktop)
      return (
        <div className="navbar__dashboard">
          <Tooltip title="Burn Count" position="bottom">
            <span className="navbar__dashboard--burn" onClick={onToggleBurn}>
              🔥
            </span>
          </Tooltip>

          <div
            className={`navbar__dashboard--burnBlock ${
              isOpenBurn ? "navbar__dashboard--burnBlock__open" : ""
            }`}
            ref={burnRef}
            id={"burnBlock"}
          >
            <div className="navbar__dashboard--burnBlock__title">
              <span>🔥 Burn Count</span>
              <img
                src={isDark ? crossIcon : crossIconBlack}
                alt={"close"}
                onClick={onCloseBurn}
              />
            </div>
            <p className="navbar__dashboard--burnBlock__smrtr">
              {formatterUS(burnedSmrtrBalance)} $SMRTR
            </p>
            <p className="navbar__dashboard--burnBlock__tresr">
              {formatterUS(burnedTresrBalance)} $TRESR
            </p>
          </div>

          <Tooltip title="Game Emissions Remaining" position="bottom">
            <span className="navbar__dashboard--burn" onClick={onTogglePool}>
              💰
            </span>
          </Tooltip>

          <div
            className={`navbar__dashboard--poolBlock ${
              isOpenPool ? "navbar__dashboard--poolBlock__open" : ""
            }`}
            ref={poolRef}
            id={"poolBlock"}
          >
            <div className="navbar__dashboard--burnBlock__title">
              <span>💰 Game Emissions Remaining</span>
              <img
                src={isDark ? crossIcon : crossIconBlack}
                alt={"close"}
                onClick={onClosePool}
              />
            </div>
            <div className="navbar__dashboard--poolBlock__text">
              <span>Founders' Pool:</span>
              <span>{formatterUS(poolAllocationBalance)}</span>
            </div>
            <div className="navbar__dashboard--poolBlock__text">
              <span>Bonus Pool:</span>
              <span>{formatterUS(claimableBonusPoolAllocationReward)}</span>
            </div>
          </div>

          <div
            className={`navbar__dashboard--tryItOut ${
              isOpenTryItOut ? "navbar__dashboard--tryItOut__open" : ""
            } `}
            style={{
              left: isOpenPool ? "50px" : "0px",
              height: isOpenBurn ? "226px" : "286px",
            }}
            ref={tryItOutRef}
          >
            {isOpenBurn && (
              <p>
                Drag and drop this box anywhere on your screen & watch SMRTR and
                TRESR burn in real time. Total token supply decreases every time
                you upgrade your Founder's Key Level or Open a Treasure Box.
                <br />
                Click the "X" to close this counter.
              </p>
            )}
            {isOpenPool && (
              <p>
                Drag and drop this box anywhere on your screen & see the total
                TRESR rewards available in real time. Be sure to claim all of
                your TRESR rewards before the Game Emissions hit zero. When the
                Key Rewards run out, all rewards will move to the Bonus Pool
                which is funded by e-commerce & NFT marketplace revenue.
                <br />
                Click the "X" to close this counter.
              </p>
            )}
            <MarketplaceButton
              title={"Try it out"}
              isBlue
              onClick={onClickTryItOut}
            />
          </div>
        </div>
      );
    else
      return isDesktop ? (
        // <div className="navbar__filters" onClick={onToggleFilters}>
        //   <p>Filters</p>
        //   <img src={isShownFilters ? (isDark ? filterIconLightClose : filterIconClose) : (isDark ? filterIconLight : filterIcon)} alt={""} />
        // </div>
        <></>
      ) : (
        !isGamePage && (
          <div
            className={cn(
              "navbar__filters",
              isMobileFilterOpen && "hidden",
              isDark ? "bg-[rgba(8, 15, 32, 0.8)]" : "bg-[#ECF1F9]"
            )}
            onClick={onToggleFilters}
          >
            <p>Filters</p>
            <img
              src={
                isShownFilters
                  ? isDark
                    ? filterIconLightClose
                    : filterIconClose
                  : isDark
                  ? filterIconLight
                  : filterIcon
              }
              alt={""}
            />
          </div>
        )
      );
  };

  useEffect(() => {
    setHeaderOffsetTop(headerRef?.current?.offsetTop);
    handleRewards.updateBurnedEmissionInfo();
  }, []);

  useEffect(() => {
    window?.addEventListener("scroll", () => setStickyHeader());

    return window?.removeEventListener("scroll", () => setStickyHeader());
  }, [headerOffsetTop]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (location?.pathname?.includes("/favourites")) {
      setActiveLink(
        navbarItems?.indexOf(
          navbarItems?.find((item) => item.link?.includes("/favourites"))
        )
      );
    } else if (location?.pathname?.includes("/auctions")) {
      setActiveLink(
        navbarItems?.indexOf(
          navbarItems?.find((item) => item.link?.includes("/auctions"))
        )
      );
    } else if (location?.pathname?.includes("/game")) {
      setActiveLink(
        navbarItems?.indexOf(
          navbarItems?.find((item) => item.link?.includes(location?.pathname))
        )
      );
    } else {
      setActiveLink(
        navbarItems?.indexOf(
          navbarItems?.find((item) => location?.pathname.includes(item.link))
        )
      );
    }
  }, [location?.pathname, navbarItems]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    return;
    ACTIONS.SET_FILTERS(
      dispatch,
      filtersObject?.price,
      filtersObject?.blockchain,
      filtersObject?.status,
      filtersObject?.sortBy
    );
  }, [filtersObject]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (isOneCollectionPage) return setNavbarItems(NAVBAR_ITEMS_ALL_NFTS_PAGE);
    else if (isAllNFTPage) return setNavbarItems(NAVBAR_ITEMS_ALL_NFTS_PAGE);
    else if (isGamePage) return setNavbarItems(NAVBAR_ITEMS_GAME_PAGE);
    else if (isAccountPage) return setNavbarItems(NAVBAR_ITEMS_ACCOUNT_PAGE);
    // else if (isCreatePage) return setNavbarItems(NAVBAR_ITEMS_CREATE_PAGE)
    else setNavbarItems([]);
  }, [location?.pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!isCreatePage && !isOneNFTPage)
      ACTIONS.SET_CREATE_BUTTON(dispatch, false, {}, false, "");
  }, [location?.pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  useOutsideClick(poolRef, onClosePool, tryItOutRef);
  useOutsideClick(burnRef, onCloseBurn, tryItOutRef);

  return (
    <>
      {isDesktop && isOneCollectionPage && (
        <div className="navbar__filters" onClick={onToggleFilters}>
          <p>Filters</p>
          <img
            src={
              isShownFilters
                ? isDark
                  ? filterIconLightClose
                  : filterIconClose
                : isDark
                ? filterIconLight
                : filterIcon
            }
            alt={""}
          />
        </div>
      )}
      {isDesktop && isShownFilters && isOneCollectionPage && (
        <div className="navbar__filtersItems">
          {!!selectedFilterOption?.length && (
            <div className="navbar__filtersOptions--selectedContainer">
              {!!filtersObject?.price && (
                <div className="navbar__filtersOptions--selected">
                  {setPriceFilterText()}
                  <img
                    src={crossBlack}
                    alt={""}
                    onClick={() => onDeleteFilter("price")}
                  />
                </div>
              )}

              {filtersObject?.blockchain?.length
                ? filtersObject?.blockchain?.map((item, key) => (
                    <div className="navbar__filtersOptions--selected" key={key}>
                      {item}
                      <img
                        src={crossBlack}
                        alt={""}
                        onClick={() => onDeleteFilter("blockchain", item)}
                      />
                    </div>
                  ))
                : null}

              {filtersObject?.status?.length
                ? filtersObject?.status?.map((item, key) => (
                    <div className="navbar__filtersOptions--selected" key={key}>
                      {item}
                      <img
                        src={crossBlack}
                        alt={""}
                        onClick={() => onDeleteFilter("status", item)}
                      />
                    </div>
                  ))
                : null}

              <div
                className="navbar__filtersOptions--selected navbar__filtersOptions--clearAll"
                onClick={onClearAllFilters}
              >
                Clear All
                {isDark && <img src={crossBlack} alt={""} />}
              </div>
              <div className="w-[120px] absolute left-[85%] top-[8px]">
                <MarketplaceButton
                  title={"Apply Filters"}
                  isBlue
                  onClick={() => {
                    setIsShownFilters(false);
                  }}
                />
              </div>
            </div>
          )}

          {!isMobile &&
            !!selectedFilter &&
            selectedFilter !== FILTER_SORT_BY && (
              <div className="navbar__filtersOptions">
                {FILTERS_OPTIONS[selectedFilter]?.map((item, key) => (
                  <div
                    key={key}
                    onClick={() => onAddFilter(item)}
                    className={
                      selectedFilterOption?.includes(item) &&
                      "navbar__filtersOptions--active"
                    }
                  >
                    {item}
                  </div>
                ))}
              </div>
            )}

          {!isMobile && selectedFilter === FILTER_PRICE && (
            <div className="navbar__filtersOptions--price">
              <CustomDropdown
                title={"Currency"}
                data={AVAILABLE_CURRENCY}
                onSelect={onChangeCurrency}
              />

              <input
                type={"number"}
                className="navbar__filtersOptions--priceInput"
                placeholder={"min"}
                onChange={onChangeMinPrice}
                value={filterMinPrice}
              />
              <input
                type={"number"}
                className="navbar__filtersOptions--priceInput"
                placeholder={"max"}
                onChange={onChangeMaxPrice}
                value={filterMaxPrice}
              />
            </div>
          )}

          <div className="flex gap-[16px] w-full">
            {FILTERS_CRITERIONS?.map((item, key) => {
              if (item?.value === FILTER_SORT_BY)
                return (
                  <CustomDropdown
                    title={item?.label}
                    data={FILTERS_OPTIONS[FILTER_SORT_BY]}
                    onSelect={onAddFilter}
                    isSortBy
                    onSelectSortBy={onSelectFilter}
                  />
                );

              return (
                <div
                  key={key}
                  className={`navbar__filtersItems--criterion ${
                    key + 1 === selectedFilter
                      ? "navbar__filtersItems--criterionActive"
                      : ""
                  }`}
                  onClick={() => onSelectFilter(item?.value)}
                >
                  {item?.label}
                </div>
              );
            })}
          </div>
        </div>
      )}
      {isDesktop ? (
        <NavBarEditMode
          isOpen={isOpenModal}
          onClose={() => setIsOpenModal(false)}
        />
      ) : (
        <NavBarEditModeMobile
          isOpen={isOpenModal}
          onClose={() => setIsOpenModal(false)}
        />
      )}
      {isMobile && isShownFilters ? (
        <Modal
          isModalOpen={isMobileFilterOpen}
          handleClose={() => setIsMobileFilterOpen(false)}
          className="max-h-[680px]"
        >
          <div className="headerBarAccountOpen__mobile">
            <div className="headerBarAccountOpen__mobile__filters__title">
              Filters
            </div>
            {!!selectedFilterOption?.length && (
              <div className="navbar__filtersOptions--selectedContainer">
                {!!filtersObject?.price && (
                  <div className="navbar__filtersOptions--selected">
                    {setPriceFilterText()}
                    <img
                      src={crossBlack}
                      alt={""}
                      onClick={() => onDeleteFilter("price")}
                    />
                  </div>
                )}

                {filtersObject?.blockchain?.length
                  ? filtersObject?.blockchain?.map((item, key) => (
                      <div
                        className="navbar__filtersOptions--selected"
                        key={key}
                      >
                        {item}
                        <img
                          src={crossBlack}
                          alt={""}
                          onClick={() => onDeleteFilter("blockchain", item)}
                        />
                      </div>
                    ))
                  : null}

                {filtersObject?.status?.length
                  ? filtersObject?.status?.map((item, key) => (
                      <div
                        className="navbar__filtersOptions--selected"
                        key={key}
                      >
                        {item}
                        <img
                          src={crossBlack}
                          alt={""}
                          onClick={() => onDeleteFilter("status", item)}
                        />
                      </div>
                    ))
                  : null}

                <div
                  className="navbar__filtersOptions--selected navbar__filtersOptions--clearAll"
                  onClick={onClearAllFilters}
                >
                  Clear All
                  {isDark && <img src={crossBlack} alt={""} />}
                </div>
              </div>
            )}
            <div className="navbar__filtersItems space-y-6">
              {FILTERS_CRITERIONS?.map((item, key) => {
                if (item?.value === FILTER_SORT_BY)
                  return (
                    <CustomDropdown
                      title={item?.label}
                      data={FILTERS_OPTIONS[FILTER_SORT_BY]}
                      onSelect={onAddFilter}
                      isSortBy
                      onSelectSortBy={onSelectFilter}
                    />
                  );

                return (
                  <div
                    key={key}
                    className={`navbar__filtersItems--criterion ${
                      key + 1 === selectedFilter
                        ? "navbar__filtersItems--criterionActive"
                        : ""
                    }`}
                    onClick={() => onSelectFilter(item?.value)}
                  >
                    {item?.label}
                  </div>
                );
              })}
            </div>

            {!!selectedFilter && selectedFilter !== FILTER_SORT_BY && (
              <div className="navbar__filtersOptions">
                {FILTERS_OPTIONS[selectedFilter]?.map((item, key) => (
                  <div
                    key={key}
                    onClick={() => onAddFilter(item)}
                    className={
                      selectedFilterOption?.includes(item) &&
                      "navbar__filtersOptions--active"
                    }
                  >
                    {item}
                  </div>
                ))}
              </div>
            )}
            {selectedFilter === FILTER_PRICE && (
              <div className="navbar__filtersOptions--price">
                <CustomDropdown
                  title={"Currency"}
                  data={AVAILABLE_CURRENCY}
                  onSelect={onChangeCurrency}
                />

                <input
                  type={"number"}
                  className="navbar__filtersOptions--priceInput"
                  placeholder={"min"}
                  onChange={onChangeMinPrice}
                  value={filterMinPrice}
                />
                <input
                  type={"number"}
                  className="navbar__filtersOptions--priceInput"
                  placeholder={"max"}
                  onChange={onChangeMaxPrice}
                  value={filterMaxPrice}
                />
              </div>
            )}

            <div className="navbar__filters__button">
              <MarketplaceButton
                title={"Clear All"}
                isN
                onClick={() => {
                  setIsMobileFilterOpen(false);
                  setIsShownFilters(false);
                  setSelectedFilterOption([]);
                  setFiltersObject({
                    price: null,
                    blockchain: [],
                    status: [],
                    sortBy: null,
                  });
                  setFilterSortBy(null);
                  setFilterCurrency(null);
                  setFilterMinPrice(null);
                  setFilterMaxPrice(null);
                }}
              />
              <MarketplaceButton
                title={"Accept Filters"}
                isBlue
                withShadow
                onClick={() => {
                  return setIsMobileFilterOpen(true), setIsShownFilters(false);
                }}
              />
            </div>
          </div>
        </Modal>
      ) : (
        <></>
      )}
      <div className={`navbar`} ref={headerRef}>
        <div className="navbar__header">
          {setHeaderButton()}

          {/* {!isMobile && isShownFilters ? (
            <></>
          ) : (
            <> */}
          {/* FIXME */}
          <div className="navbar__items">
            <Tab
              tabList={navbarItems}
              active={navbarItems?.[0]}
              onClick={onClickTab}
              variant="secondary"
            />
          </div>

          <div className="navbar__buttons">
            {!!user?.wallet_id?.length && (
              <>
                {isDesktop && (
                  <Button
                    variant="shadow"
                    disabled={isGamePage ? false : createButtonIsDisabled}
                    label={isGamePage ? "Mint New Key" : "Create"}
                    onClick={isGamePage ? onClickMint : onClickCreate}
                  />
                )}
              </>
            )}
          </div>
          {/* </>
          )} */}
        </div>

        {/* {!!selectedFilterOption?.length && (
          <div className="navbar__filtersOptions--selectedContainer">
            {!!filtersObject?.price && (
              <div className="navbar__filtersOptions--selected">
                {setPriceFilterText()}
                <img
                  src={crossBlack}
                  alt={""}
                  onClick={() => onDeleteFilter("price")}
                />
              </div>
            )}

            {filtersObject?.blockchain?.length
              ? filtersObject?.blockchain?.map((item, key) => (
                  <div className="navbar__filtersOptions--selected" key={key}>
                    {item}
                    <img
                      src={crossBlack}
                      alt={""}
                      onClick={() => onDeleteFilter("blockchain", item)}
                    />
                  </div>
                ))
              : null}

            {filtersObject?.status?.length
              ? filtersObject?.status?.map((item, key) => (
                  <div className="navbar__filtersOptions--selected" key={key}>
                    {item}
                    <img
                      src={crossBlack}
                      alt={""}
                      onClick={() => onDeleteFilter("status", item)}
                    />
                  </div>
                ))
              : null}

            <div
              className="navbar__filtersOptions--selected navbar__filtersOptions--clearAll"
              onClick={onClearAllFilters}
            >
              Clear All
              {isDark && <img src={crossBlack} alt={""} />}
            </div>
          </div>
        )}

        {!isMobile && !!selectedFilter && selectedFilter !== FILTER_SORT_BY && (
          <div className="navbar__filtersOptions">
            {FILTERS_OPTIONS[selectedFilter]?.map((item, key) => (
              <div
                key={key}
                onClick={() => onAddFilter(item)}
                className={
                  selectedFilterOption?.includes(item) &&
                  "navbar__filtersOptions--active"
                }
              >
                {item}
              </div>
            ))}
          </div>
        )}

        {!isMobile && selectedFilter === FILTER_PRICE && (
          <div className="navbar__filtersOptions--price">
            <CustomDropdown
              title={"Currency"}
              data={AVAILABLE_CURRENCY}
              onSelect={onChangeCurrency}
            />

            <input
              type={"number"}
              className="navbar__filtersOptions--priceInput"
              placeholder={"min"}
              onChange={onChangeMinPrice}
              value={filterMinPrice}
            />
            <input
              type={"number"}
              className="navbar__filtersOptions--priceInput"
              placeholder={"max"}
              onChange={onChangeMaxPrice}
              value={filterMaxPrice}
            />
          </div>
        )} */}
      </div>

      {isAccountPage && (
        <>
          <div
            className="navbar__banner"
            style={{
              backgroundImage: `url(${
                user?.banner?.length ? user?.banner : defaultBanner
              })`,
            }}
          >
            {!isMobile && (
              <div className={"navbar__banner--container"}>
                <AccountComponent
                  isEditMode={false}
                  setIsOpenModal={setIsOpenModal}
                />
              </div>
            )}
          </div>

          {isMobile && (
            <AccountComponent
              isEditMode={false}
              setIsOpenModal={setIsOpenModal}
            />
          )}
        </>
      )}
      {handleTransactionLoadingModal.isActive && (
        <TransactionLoadingModal
          isOpen={handleTransactionLoadingModal.isActive}
        />
      )}

      {/* {handleLoadingMintModal.isActive && ( */}
      <LoadingMintModal
        onClose={handleLoadingMintModal.close}
        isOpen={handleLoadingMintModal.isActive}
        status={loadingStatus}
        isAuction={isAuction}
        onMint={handleMint}
        setLoadingStatus={setLoadingStatus}
        onApprove={isAuction ? handleApproveAuction : handleApproveListing}
        onPutOnSale={isAuction ? onStartAuction : onStartListing}
        tokenId={newTokenID}
      />
      {/* )} */}
    </>
  );
};
export default NavBar;
