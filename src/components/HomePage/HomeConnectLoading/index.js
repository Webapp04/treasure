import React from "react";
import "./style.scss";
import Loader from "storybook/atom/Loader/loader";

const HomeConnectLoading = () => {
  return (
    <div className="homeConnectLoading">
      <p className="homeConnectLoading__title">Take a deep breath</p>
      <p className="homeConnectLoading__text">
        Checking Your Wallet for Whitelist Placement and Key Level...
      </p>
      <Loader variant="pageLoader" isLoaderActive={true} opacityLevel={0} />
    </div>
  );
};

export default HomeConnectLoading;
