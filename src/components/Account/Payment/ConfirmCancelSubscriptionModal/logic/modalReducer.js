import * as actionTypes from './modalActionTypes'

const initialState = {
  show: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CANCEL_SUBSCRIPTION_MODAL_SHOW:
      return {
        ...state,
        show: true
      };

    case actionTypes.CANCEL_SUBSCRIPTION_MODAL_HIDE:
      return {
        ...state,
        show: false
      };

    default:
      return state
  }
}
