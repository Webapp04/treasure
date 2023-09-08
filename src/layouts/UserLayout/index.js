import { useEffect, useState } from "react";
import HeaderBar from "../../components/HeaderBar";
import useEffectFirstLoad from "../../hooks/useFirstLoad";
import { useLocation } from "react-router-dom";
import NavBar from "../../components/NavBar";
import React from "react";
import Footer from "../../components/Footer";
import CustomAlert from "../../components/common/CustomAlert";
import useFaucet from "../../hooks/blockchain/useFaucet";
import TransactionLoadingModal from "../../components/common/Modals/TransactionLoadingModal";
import useHandleModal from "../../hooks/dom/useHandleModal";
import InputRange from "../../components/common/InputRange";
import useWindowDimensions from "hooks/useWidowDimensions";
import { useSelector } from "react-redux";
import { selectUser } from "redux/slice/userSlice";
import {
  selectLoaderComponentActive,
  selectLoaderIsActive,
  selectLoaderOpacityLevel,
} from "redux/slice/loaderSlice";
import { selectScaleIsActive } from "redux/slice/scaleSlice";
import Faucet from "storybook/molecule/Faucet/faucet";
import Loader from "storybook/atom/Loader/loader";

export default function UserLayout({ children }) {
  const user = useSelector(selectUser);
  const scaleIsActive = useSelector(selectScaleIsActive);
  const loaderIsActive = useSelector(selectLoaderIsActive);
  const loaderComponentActive = useSelector(selectLoaderComponentActive);
  const loaderOpacity = useSelector(selectLoaderOpacityLevel);
  const location = useLocation();
  const faucet = useFaucet();
  const handleTransactionLoadingModal = useHandleModal();
  const [showFaucet, toggleFaucet] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  const isHomePage = location?.pathname === "/";
  const isCollectionPage = location?.pathname?.includes("collections");
  const isAccountPage = location?.pathname?.includes("account");
  const isGame = location?.pathname?.includes("game");
  const windowParams = useWindowDimensions();
  const isMobile = windowParams?.width <= 850;

  const handleToggleFaucet = () => toggleFaucet(!showFaucet);

  const onGetTresr = () => {
    handleTransactionLoadingModal.open();
    faucet.getTRESR().finally(() => handleTransactionLoadingModal.close());
  };
  const onGetSmrtr = () => {
    handleTransactionLoadingModal.open();
    faucet.getSMRTR().finally(() => handleTransactionLoadingModal.close());
  };
  const onGetTresrLP = () => {
    handleTransactionLoadingModal.open();
    faucet.getTRESRLP().finally(() => handleTransactionLoadingModal.close());
  };
  const onGetSmrtrLP = () => {
    handleTransactionLoadingModal.open();
    faucet.getSMRTRLP().finally(() => handleTransactionLoadingModal.close());
  };

  useEffectFirstLoad();

  return (
    <>
      <div id="layout-wrapper">
        {loaderComponentActive && (
          <div className="w-screen h-screen bg-[#ffffff10] fixed left-0 top-0 z-50">
            <Loader
              variant="pageLoader"
              isLoaderActive={true}
              opacityLevel={0}
              customClass="mt-[30rem]"
            />
          </div>
        )}
        <HeaderBar
          setIsAccountOpen={setIsAccountOpen}
          isAccountOpen={isAccountOpen}
        />
        <CustomAlert />
        <div className={`main-content main-content__bg`}>
          {!isHomePage && !loaderIsActive && <NavBar />}
          <div className="page-content">{children}</div>
        </div>
        <Footer />
        {isGame && loaderIsActive && (
          <Loader
            variant="fullPageLoader"
            isLoaderActive={loaderIsActive}
            opacityLevel={loaderOpacity}
          />
        )}
        {scaleIsActive && (isCollectionPage || isAccountPage) && (
          <div className="main__range">
            <InputRange />
          </div>
        )}
        {!isMobile && (
          <div className="footerFaucet">
            <Faucet
              user={user}
              showFaucet={showFaucet}
              handleToggleFaucet={handleToggleFaucet}
              onGetTresr={onGetTresr}
              onGetSmrtr={onGetSmrtr}
              onGetTresrLP={onGetTresrLP}
              onGetSmrtrLP={onGetSmrtrLP}
            />
          </div>
        )}
        {handleTransactionLoadingModal?.isActive && (
          <TransactionLoadingModal
            isOpen={handleTransactionLoadingModal?.isActive}
          />
        )}
      </div>
    </>
  );
}
