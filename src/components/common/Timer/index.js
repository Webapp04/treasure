import { useCountdown } from "../../../hooks/useCountdown";
import "./style.scss";

const Timer = ({ targetDate, isDark }) => {
  const [hours, minutes, seconds, days] = useCountdown(targetDate);

  return (
    <div className="timer">
      <div className="timer__element">
        <div className="timer__element--count">{days > 0 ? days : "00"}</div>
        <div className="timer__element--label">Days</div>
      </div>
      <div className="timer__element">
        <div className="timer__element--count">{hours > 0 ? hours : "00"}</div>
        <div className="timer__element--label">hrs</div>
      </div>
      <div className="timer__element">
        <div className="timer__element--count">
          {minutes > 0 ? minutes : "00"}
        </div>
        <div className="timer__element--label">mins</div>
      </div>
      <div className="timer__element">
        <div className="timer__element--count">
          {seconds > 0 ? seconds : "00"}
        </div>
        <div className="timer__element--label">secs</div>
      </div>
      <div className="w-[40px] -mr-[50px] ml-[5px] mt-2">
        {/* {loader?.componentActive && (
          <ClipLoader size={30} color={isDark ? "#fff" : "#4964fe80"} />
        )} */}
      </div>
    </div>
  );
};

export default Timer;
