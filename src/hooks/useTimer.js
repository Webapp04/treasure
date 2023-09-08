import { useSelector } from "react-redux";
import { selectTimestamp } from "redux/slice/timeStampSlice";

export default function useTimer() {
  const timestamp = useSelector(selectTimestamp);

  return { timestamp };
}
