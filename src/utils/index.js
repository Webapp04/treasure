import moment from "moment";

export function decimalAdjust(type, value, exp) {
  if (typeof exp === "undefined" || +exp === 0) return Math[type](value);

  value = +value;
  exp = +exp;

  if (isNaN(value) || !(typeof exp === "number" && exp % 1 === 0)) return NaN;

  value = value.toString().split("e");
  value = Math[type](+(value[0] + "e" + (value[1] ? +value[1] - exp : -exp)));

  value = value.toString().split("e");
  return +(value[0] + "e" + (value[1] ? +value[1] + exp : exp));
}

export const setActiveNavLink = ({ isActive }) => (isActive ? "active" : "");

export const sleep = async (sec) =>
  new Promise((resolve) => setTimeout(() => resolve(true), sec * 1000));

export const nowUnix = () => parseInt(Date.now() / 1000);

export const compareUnixDates = (date1, date2) =>
  Math.floor(date1) > Math.floor(date2);

export const convertDateToUnix = (date, time) => {
  const dateString = `${
    moment(date).format("MMMM Do YYYY, hh:mm a")?.split(", ")[0]
  }, ${time}`;
  const dateFormat = moment(dateString, "MMMM Do YYYY, h:mm a").toDate();
  return moment(dateFormat).unix();
};

export const formatterUS = (number, maximumFractionDigits = 2) => {
  return (
    new Intl.NumberFormat("en-US", { maximumFractionDigits }).format(number) ||
    0
  );
};
