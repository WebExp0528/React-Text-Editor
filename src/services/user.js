import {getDateDiffInDays} from "./date";

export const isUserActive = user => user.paymentData && user.paymentData.expirationDate && (new Date(user.paymentData.expirationDate).getTime() > (new Date()).getTime());
export const getUserPlan = user => user.paymentData && user.paymentData.plan ? user.paymentData.plan : null;
export const getDaysLeft = date => {
  let days = getDateDiffInDays(new Date(), date);

  return days > 0 ? days : 0;
};
export const getReferralLink = user => window.location.origin + `/invite/${user.refcode}`;
