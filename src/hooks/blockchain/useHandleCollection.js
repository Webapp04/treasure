import CollectionApi from "../../api/CollectionApi";

export default function useHandleCollection() {
  const getTokenList = (contractAddress, limit, page) => {
    return new CollectionApi()
      .getTokenList(contractAddress, limit, page)
      .then((res) => (res?.status ? res?.data || {} : {}));
  };

  const getOneToken = (contractAddress, tokenID) => {
    return new CollectionApi()
      .getOneToken(contractAddress, tokenID)
      .then((res) => (res?.status ? res?.data || {} : {}));
  };

  const checkToken = (contractAddress, tokenID) => {
    return new CollectionApi()
      .checkToken(contractAddress, tokenID)
      .then((res) => {
        return res?.status ? res?.data?._doc || {} : {};
      });
  };

  const getCollectionStatistics = (contractAddress) => {
    return new CollectionApi()
      .getCollectionStatistics(contractAddress)
      .then((res) => {
        return res?.status ? res?.data || {} : {};
      });
  };

  return {
    getTokenList,
    getOneToken,
    checkToken,
    getCollectionStatistics,
  };
}
