import { useNavigate } from "react-router-dom";
import { DASHBOARD_FILTERS } from "../../../constant/navigation";
import refreshIcon from "assets/images/refresh.svg";
import useHandleToken from "hooks/token/useHandleToken";
import Tooltip from "components/common/Tooltip";
import { useSelector } from "react-redux";
import { selectUser } from "redux/slice/userSlice";

export default function DashboardFilters({
  activeFilter,
  setActiveFilter,
  handleTransactionLoadingModal,
}) {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const handleToken = useHandleToken();
  return (
    <div className="dashboard__data__content--list__filters">
      {DASHBOARD_FILTERS.map((filter, key) => (
        <div
          key={key}
          className={`dashboard__data__content--list__filters--item ${
            filter?.value === activeFilter?.value ? "active" : ""
          }`}
          onClick={() => setActiveFilter(filter)}
        >
          {filter.label}
        </div>
      ))}
      <div
        className="absolute right-4 cursor-pointer"
        onClick={async () => {
          handleTransactionLoadingModal.open();
          await handleToken.updateUserTokenList(user?.wallet_id);
          navigate(0);
          handleTransactionLoadingModal.close();
        }}
      >
        <Tooltip tooltipText="Force Update" top={-40} width={100}>
          <img src={refreshIcon} alt="" />
        </Tooltip>
      </div>
    </div>
  );
}
