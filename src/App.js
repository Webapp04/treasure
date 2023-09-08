import Routers from "./routes";
import UserLayout from "./layouts/UserLayout";
import { Web3Provider } from "@ethersproject/providers";

import { Web3ReactProvider } from "@web3-react/core";

import "./App.css";
import "./assets/styles/index.scss";
import "./assets/styles/variables.css";
import useWindowDimensions from "hooks/useWidowDimensions";
import metaMaskPng from "assets/wallet/metamask.png";
import trustPng from "assets/wallet/trust.png";
import Modal from "storybook/atom/Modal/modal";

function getLibrary(provider) {
  const library = new Web3Provider(provider);
  library.pollingInterval = 30000;
  return library;
}

function getMobileOperatingSystem() {
  let userAgent = navigator.userAgent || navigator.vendor || window.opera;

  // Windows Phone must come first because its UA also contains "Android"
  if (/windows phone/i.test(userAgent)) {
    return "Windows Phone";
  }

  if (/android/i.test(userAgent)) {
    return "Android";
  }

  // iOS detection from: http://stackoverflow.com/a/9039885/177710
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    return "iOS";
  }

  return "unknown";
}

function App() {
  const windowParams = useWindowDimensions();
  const isMobile = windowParams?.width <= 450;
  const deviceOS = getMobileOperatingSystem();
  if (!window?.ethereum) {
    return (
      <>
        <p className="homePage__title mt-10">Mint Your Founder’s Key</p>
        <Modal
          isModalOpen={true}
          className={`max-w-[458px] max-h-[280px] px-[20px] py-[40px] ${
            isMobile ? "h-[180px]" : "h-[280px]"
          }`}
          withCrossIcon
        >
          <p className={"modal__title"}>Connect Wallet</p>

          <div className="mintCModal__buttons max-md:mt-[20px] modal__text">
            <div style={{ width: "70px", height: "70px" }}>
              <a
                href={
                  deviceOS == "iOS"
                    ? "https://apps.apple.com/us/app/metamask-blockchain-wallet/id1438144202"
                    : "https://play.google.com/store/apps/details?id=io.metamask&hl=en_US&gl=US"
                }
              >
                <img src={metaMaskPng} style={{ borderRadius: "20px" }} />
                <div>Metamask</div>
              </a>
            </div>
            <div style={{ width: "70px", height: "70px" }}>
              <a
                href={
                  deviceOS === "iOS"
                    ? "https://apps.apple.com/ng/app/trust-crypto-bitcoin-wallet/id1288339409"
                    : "https://play.google.com/store/apps/details?id=com.wallet.crypto.trustapp"
                }
              >
                {/* <a href="Contacts://"> */}
                <img src={trustPng} style={{ borderRadius: "20px" }} />
                <div className="text-center">Trust</div>
              </a>
            </div>
          </div>
        </Modal>
      </>
    );
  } else {
    return (
      <div className="App">
        <Web3ReactProvider getLibrary={getLibrary}>
          <UserLayout>
            <Routers />
          </UserLayout>
        </Web3ReactProvider>
      </div>
    );
  }
}

export default App;
