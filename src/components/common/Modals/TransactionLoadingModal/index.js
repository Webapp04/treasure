import React, { useEffect, useState } from "react";
import "./style.scss";
import viewMore from "assets/images/viewMore.svg";
import timeSVG from "assets/images/time.svg";
import useWindowDimensions from "hooks/useWidowDimensions";
import Loader from "storybook/atom/Loader/loader";
import Modal from "storybook/atom/Modal/modal";

const TransactionLoadingModal = ({ isOpen }) => {
  const [time, setLoadTime] = useState(0);
  const windowParams = useWindowDimensions();
  const isMobile = windowParams?.width <= 750;
  const TEXT = [
    "Upgrade your Key Level to earn more TRESR in the Founder’s Pool and Bonus Pool.",
    "Staking TRESR to earn veTRESR will improve your odds of opening a Treasure Box and allow you to earn more TRESR.",
    "Be sure to open another Treasure Box before the countdown timer hits zero or your Treasure Tier will decrease by one.",
    "The higher your Key Level, the more commissions you will earn from e-commerce sales connected to your NFTs.",
    "The higher your Key Level, the greater discount you will receive on all e-commerce purchases.",
    "NFTREASURE let’s you take any piece of artwork and turn it into an NFT and e-commerce products that earn your monthly commissions.",
    "Remember: To get the benefit of your accumulated veTRESR balance, you must claim it in the Bonus Pool dashboard.",
    "Increase your veTRESR by staking TRESR. You earn more rewards from the Bonus Pool as your veTRESR balance goes up.",
    "You earn more rewards from the Bonus Pool when you add liquidity to the SMRTR-AVAX pool and stake your LP tokens.",
    "You earn more rewards from the Bonus Pool when you add liquidity to the TRESR-AVAX pool and stake your LP tokens.",
    "If you have three keys, each at Key Level 20, your Cumulative Key Level = 60. Increase your Cumulative Key Level to earn more from the Bonus Pool",
    "You can upgrade the level for multiple Keys at a time by using the “Upgrade All Keys” button in the Founder’s Pool.",
    "Every time you upgrade your Key Level, a cooldown period will follow. When this cooldown timer reaches zero, you may upgrade your Key Level again.",
    "The levers that calculate rewards in the Bonus Pool will change over time, and are voted on by veTRESR holders.",
    "Your veTRESR balance equals your governance power. The more veTRESR you hold, the greater power your vote will have in important protocol decisions.",
    "NFTREASURE is one of the best ways to learn how to navigate Decentralized Finance and NFTs, while creating an e-commerce & crypto side hustle.",
    "The project is giving its community 90% of the total token supply of $TRESR, making it a truly community-governed initiative.",
    "This platform is the first NFT print-on-demand marketplace and play-to-earn game in crypto, powered by decentralized finance (DeFi).",
    "Reading the entire whitepaper can increase your chances of earning more $TRESR tokens, as information is power in the world of crypto.",
    "The platform aims to provide both NFT projects and holders access to real utility and meaningful data, setting it apart from other NFT marketplaces.",
    "All daily or monthly numbers shown in dashboards are estimates. Actual rewards will vary based on gameplay.",
    "Dashboards can take a moment to sync to the blockchain. Use the refresh button to make sure they are displaying properly.",
  ];
  const [randomIndex, setRandomIndex] = useState(0);
  useEffect(() => {
    if (isOpen) {
      const interval = setInterval(() => {
        setLoadTime((prev) => prev + 1);
      }, 1000);
      return () => clearInterval(interval);
    } else setLoadTime(0);
    const temp = 0 + Math.random() * (TEXT.length - 1 - 0);
    setRandomIndex(temp.toFixed(0));
  }, [isOpen]);
  return (
    <Modal
      isModalOpen={isOpen}
      className={`px-[20px] py-[32px] max-w-[458px] max-h-[424px]  ${
        isMobile ? "h-[400px] rounded-tr-[50px] rounded-tl-[50px]" : "h-[586px]"
      }`}
    >
      <p className="modal__title transactionLoadingModal__title">
        Take a deep breath
      </p>
      <Loader variant="pageLoader" isLoaderActive={true} opacityLevel={0} />
      <div className="flex h-[180px] justify-center items-center">
        <div className="bg-[#BBC5FF33] p-3 rounded-lg h-fit">
          <p className="modal__text transactionLoadingModal__text">
            {TEXT[randomIndex]}
          </p>
        </div>
      </div>
      <div className="modal__text flex gap-3 ">
        <img src={timeSVG} />
        {time}s
      </div>
      {/* <div className='transactionLoadingModal__wrapper'>
                <p className='modal__text transactionLoadingModal__text'>Your NFTreasure team</p>
            </div> */}
      {/* <div className='flex items-center justify-center mt-5'>
                <p className='modal__text transactionLoadingModal__text mr-4'>View on SnowTrace</p>
            <img src={viewMore}/>
            </div> */}
    </Modal>
  );
};

export default TransactionLoadingModal;
