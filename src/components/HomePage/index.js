import { useEffect, useState } from "react";
import styles from "components/Loaders/FullPageLoader/styles.module.scss";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./style.scss";
import ConnectWallet from "./ConnectWallet";
import HomeZoneListNew from "./HomeZoneListNew";
import TokenApi from "../../api/TokenApi";
import {
  MINT_KEY_LEVEL_DEFAULT,
  MINT_KEY_LEVEL_LIST,
} from "../../constant/blockchain";
import useWindowDimensions from "hooks/useWidowDimensions";
import useHandleNFT from "hooks/blockchain/useHandleNFT";
import { useSelector } from "react-redux";
import { selectTheme } from "redux/slice/themeSlice";
import { selectUser } from "redux/slice/userSlice";
import { selectLoaderIsActive } from "redux/slice/loaderSlice";
import { selectWhitelist } from "redux/slice/whiteListSlice";
import NFTFooter from "components/NFTFooter";

export default function HomePage() {
  const whitelist = useSelector(selectWhitelist);
  const theme = useSelector(selectTheme);
  const user = useSelector(selectUser);
  const loaderIsActive = useSelector(selectLoaderIsActive);
  const isDark = theme === "dark";
  const [tokenAmount, setTokenAmount] = useState(0);
  const [isAnimated, setIsAnimated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadedList, setIsLoadedList] = useState(true);

  const windowDimensions = useWindowDimensions();
  const handleNFT = useHandleNFT();
  const isMobile = windowDimensions?.width <= 946;

  const mintKeyLevelImage = whitelist?.level
    ? MINT_KEY_LEVEL_LIST[whitelist?.level] || MINT_KEY_LEVEL_DEFAULT
    : MINT_KEY_LEVEL_DEFAULT;

  const getTokenAmount = async () =>
    setTokenAmount(await handleNFT.getTotalSupply());

  const animationCallback = () => {
    setTimeout(() => {
      setIsLoadedList(true);
      setIsLoading(false);
      setIsAnimated(false);
    }, 1);
    setIsLoading(true);
    setIsAnimated(true);
  };

  useEffect(() => {
    getTokenAmount();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <section className="homePage">
        <p className="homePage__title">Mint Your Founder’s Key</p>
        <div
          className={`homePage__mintBlock ${
            isLoading ? "homePage__mintBlock--isLoading" : ""
          }`}
        >
          <div className="homePage__connectBlock">
            <div className="homePage__keyPicture">
              <div className="homePage__keyPicture--videoBg">
                <video
                  src={mintKeyLevelImage}
                  autoPlay
                  loop
                  width={427}
                  height={427}
                />
                {!isMobile && (
                  <p className="homePage__subtitle">
                    {tokenAmount} / 12,000 minted
                  </p>
                )}
              </div>
              {!loaderIsActive && !user?.wallet_id && !isMobile && (
                <div className="flex flex-col justify-center">
                  <div className="w-[450px] h-[72px] homePage__info-text text-left">
                    Minting a Founder's Key NFT unlocks Defi Rewards, plus gives
                    you access to e-commerce discounts, affiliate commissions,
                    the Founder's Lounge, and more.
                  </div>
                  <ConnectWallet
                    setIsAnimated={setIsAnimated}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                    setIsLoadedList={setIsLoadedList}
                    isNotConnected
                  />
                </div>
              )}
            </div>
          </div>
          {!loaderIsActive && isMobile && (
            <p className="homePage__subtitle">Connect your Wallet</p>
          )}
          {loaderIsActive && (
            <div
              className="homePage__zoneloader"
              style={isDark ? { color: "#ECF1F9" } : { color: "#000000" }}
            >
              <div className="homePage__zoneloader__title">
                Take a deep breath
              </div>
              <div className="homePage__zoneloader__content">
                Checking Your Wallet for Whitelist Placement and Key Level...
              </div>
              <div
                className={`${styles.loaderWrap} ${styles[`opacityLevel_0`]}`}
                style={{
                  width: "100px",
                  height: "100px",
                  position: "relative",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, 0)",
                  marginTop: "32px",
                }}
              >
                <div className={`${styles["la-ball-atom"]} ${styles["la-3x"]}`}>
                  <div />
                  <div />
                  <div />
                  <div />
                </div>
              </div>
            </div>
          )}
          {user?.wallet_id && !loaderIsActive && (
            <HomeZoneListNew
              isLoadedList={isLoadedList}
              animationCallback={animationCallback}
            />
          )}
        </div>
        {!loaderIsActive && isMobile && !user?.wallet_id && (
          <div>
            <p className="homePage__info-text">
              You need to connect your wallet first to Mint the Founder’s Key
              and start earning $TRESR
            </p>
            <center>
              <ConnectWallet
                setIsAnimated={setIsAnimated}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                setIsLoadedList={setIsLoadedList}
                isNotConnected
                isMobile
              />
            </center>
          </div>
        )}
        <ToastContainer closeOnClick position="top-right" />
      </section>
      <NFTFooter />
    </>
  );
}
