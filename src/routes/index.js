import { Routes, Route } from "react-router-dom";

import HomePage from '../components/HomePage'
import Dashboard from '../components/Dashboard'
import FAQsPage from "../components/FAQsPage";

export default function Routers() {
    return (
        <>
            <Routes>
                <Route path={`/`} element={<HomePage />}/>
                <Route path={`/game`} element={<Dashboard />}/>
                <Route path={`/game/dashboard`} element={<Dashboard />}/>
                {/* <Route path={`/game/faq`} element={<FAQsPage />}/> */}
                {/* <Route path={`/marketplace`} element={<LandingMarketplace/>}/> */}
                {/* <Route path={`/reward`} element={<Reward />}/> */}
                {/* <Route path={`/reward/:id`} element={<RewardInfo />}/> */}
                {/* <Route path={`/vote`} element={<VotePage />}/>
                <Route path={`/vote/:id`} element={<VoteInfo />}/>
                <Route path={`/vote/create`} element={<VoteCreate />}/> */}
                {/* <Route path={`/marketplace/:contractAddress/:tokenID`} element={<SingleNFTPage/>}/> */}
                {/* <Route path={`/account/:walletId`} element={<Marketplace/>}/>
                <Route path={`/account/:walletId/favourites`} element={<Marketplace/>}/>
                <Route path={`/account/:walletId/auctions`} element={<Marketplace/>}/> */}
                {/* <Route path={`/allNFTs`} element={<AllNFTsPage/>}/> */}
                {/* <Route path={`/collections`} element={<AllNFTsPage/>}/> */}
                {/*<Route path={`/collections`} element={<AllCollections/>}/>*/}
                {/* <Route path={`/collections/:contractAddress`} element={<SingleCollectionPage/>}/> */}
                {/* <Route path={`/collections/:contractAddress/allItems`} element={<SingleCollectionPage/>}/> */}
                {/* <Route path={`/collections/:contractAddress/activity`} element={<SingleCollectionPage/>}/> */}
                {/* <Route path={`/create/nft`} element={<CreateNFTPage/>}/> */}
                {/* <Route path={`/create/collection`} element={<CreateCollectionPage/>}/> */}
            </Routes>
        </>
    );
};
