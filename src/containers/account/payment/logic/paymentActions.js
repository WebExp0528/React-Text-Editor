import * as actionTypes from './paymentActionTypes'

export const loadPlans = () => {
  return ({
    type: actionTypes.PLANS_LOAD
  })
};

export const checkoutCard = data => {
  return ({
    type: actionTypes.CHECKOUT_CARD,
    data
  })
};

export const cancelSubscription = id => {
  return ({
    type: actionTypes.CANCEL_SUBSCRIPTION,
    id
  })
};

export const changePlan = data => {
  return ({
    type: actionTypes.PLANS_CHANGE,
    data
  })
};


export const changeSource = data => {
  return ({
    type: actionTypes.CHANGE_SOURCE,
    data
  })
};
