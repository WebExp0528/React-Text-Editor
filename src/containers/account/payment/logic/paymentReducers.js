import * as actionTypes from './paymentActionTypes';

const initialState = {
  loading: false,
  error: false,
  plans: null,
  success: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PLANS_LOAD:
      return {
        ...state,
        loading: true,
        error: false,
        plans: null
      };

    case actionTypes.PLANS_LOADED:
      return {
        ...state,
        loading: false,
        error: false,
        plans: action.plans
      };

    case actionTypes.PLANS_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        plans: null
      };

    case actionTypes.CHECKOUT_CARD:
      return {
        ...state,
        loading: true,
        error: false,
        success: false
      };

    case actionTypes.CHECKOUT_CARD_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        success: true
      };

    case actionTypes.CHECKOUT_CARD_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        success: false
      };

    case actionTypes.CANCEL_SUBSCRIPTION:
      return {
        ...state,
        loading: true,
        error: false,
        success: false
      };

    case actionTypes.CANCEL_SUBSCRIPTION_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        success: true
      };

    case actionTypes.CANCEL_SUBSCRIPTION_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        success: false
      };

    case actionTypes.PLANS_CHANGE:
      return {
        ...state,
        loading: true,
        error: false,
        success: false
      };

    case actionTypes.PLANS_CHANGED:
      return {
        ...state,
        loading: false,
        error: false,
        success: true
      };

    case actionTypes.PLANS_CHANGE_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        success: false
      };

    case actionTypes.CHANGE_SOURCE:
      return {
        ...state,
        loading: true,
        error: false,
        success: false
      };

    case actionTypes.CHANGE_SOURCE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        success: true
      };

    case actionTypes.CHANGE_SOURCE_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        success: false
      };

    default:
      return state
  }
}
