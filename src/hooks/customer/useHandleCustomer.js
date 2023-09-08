import CustomerApi from "../../api/CustomerApi";
import { useDispatch } from "react-redux";
import ACTIONS from "redux/action";

export default function useHandleCustomer() {
  const dispatch = useDispatch();

  const fetchInfo = async () => {
    return new CustomerApi().getInfo().then((res) => {
      if (res?.status) {
        ACTIONS.SET_USER(dispatch, res?.data);
      }
      return res?.data || null;
    });
  };

  const getNonce = (address) => {
    return new CustomerApi()
      .getNonce(address)
      .then((res) => (res?.status ? res?.data : null));
  };

  const getMerkleTree = (address) => {
    return new CustomerApi().getMerkleTree(address).then((res) => res?.data);
  };

  const updateInfo = (data) => {
    return new CustomerApi()
      .updateOne(data)
      .then((res) =>
        res?.status ? ACTIONS.SET_USER(dispatch, res?.data) : null
      );
  };

  return {
    getNonce,
    fetchInfo,
    updateInfo,
    getMerkleTree,
  };
}
