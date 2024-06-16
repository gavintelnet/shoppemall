import moment from "moment";
import { IoMdStar } from "react-icons/io";

export function splitText(string, length) {
  const count = string?.length;
  if (count > length) {
    const text = string.substring(0, length + 1).concat("...");
    return text;
  } else {
    return string;
  }
}

export const RenderRate = (rate) => {
  const stars = [];
  for (let i = 0; i < rate; i++) {
    stars.push(
      <IoMdStar key={i} className="star_icon" style={{ color: "yellow" }} />
    );
  }

  return <div>{stars}</div>;
};

export const formatVND = (price) => {
  const formattedAmount = price.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  return formattedAmount;
};
export const getTimeNow = () => {
  return moment().format("YYYY-MM-DD HH:mm:ss");
};

export const maskBankAccount = (accountNumber) => {
  const lastFourDigits = accountNumber.slice(-4);
  const maskedSection = "*".repeat(accountNumber.length - 4);
  return `${maskedSection}${lastFourDigits}`;
};
