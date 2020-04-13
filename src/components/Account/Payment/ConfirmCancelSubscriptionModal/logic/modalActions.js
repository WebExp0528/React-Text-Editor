import * as actionTypes from './modalActionTypes'

export const show = (id) => {
  return ({
    type: actionTypes.CANCEL_SUBSCRIPTION_MODAL_SHOW,
    id
  })
};

export const hide = () => {
  return ({
    type: actionTypes.CANCEL_SUBSCRIPTION_MODAL_HIDE
  })
};
