import * as actionTypes from './referralActionTypes';

const initialState = {
  invite: {
    loading: false,
    error: false,
    success: false,
    errorMessage: null
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INVITE_CREATE:
      return {
        ...state,
        invite: {
          loading: true,
          error: false,
          success: false
        }
      };

    case actionTypes.INVITE_CREATED:
      return {
        ...state,
        invite: {
          loading: false,
          error: false,
          success: true
        }
      };

    case actionTypes.INVITE_CREATE_ERROR:
      return {
        ...state,
        invite: {
          loading: false,
          error: true,
          success: false,
          errorMessage: action.message ? action.message : null
        }
      };

    default:
      return state
  }
}
