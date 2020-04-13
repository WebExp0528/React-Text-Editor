import * as actionTypes from './authActionTypes';

const initialState = {
  LoggedIn: true,
  error: false,
  errorMessage: null,
  success: false,
  user: null,
  loading: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_REQUESTING:
      return {
        ...state,
        error: false,
        loading: true
      };

    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        LoggedIn: true,
        error: false,
        user: action.user,
        loading: false
      };

    case actionTypes.LOGIN_ERROR:
      return {
        ...state,
        error: true,
        loading: false,
        LoggedIn: false
      };

    case actionTypes.ACCOUNT_UPDATE:
      return {
        ...state,
        loading: true,
        success: false,
        error: false,
        errorMessage: null
      };

    case actionTypes.ACCOUNT_PASSWORD_UPDATE:
      return {
        ...state,
        loading: true,
        success: false,
        error: false,
        errorMessage: null
      };

    case actionTypes.ACCOUNT_PASSWORD_UPDATED:
      return {
        ...state,
        ...state,
        loading: false,
        success: true,
        error: false,
        errorMessage: null
      };

    case actionTypes.ACCOUNT_UPDATED:
      return {
        ...state,
        loading: false,
        user: {
          ...state.user,
          ...action.user
        },
        success: true,
        error: false,
        errorMessage: null
      };

    case actionTypes.ACCOUNT_PASSWORD_RESET:
      return {
        ...state,
        loading: true,
        error: false
      };

    case actionTypes.ACCOUNT_PASSWORD_RESET_END:
      return {
        ...state,
        loading: false,
        user: action.user,
        LoggedIn: true
      };

    case actionTypes.ACCOUNT_CONFIRM:
      return {
        ...state,
        loading: true,
        error: false
      };

    case actionTypes.ACCOUNT_CONFIRMED:
      return {
        ...state,
        loading: false,
        user: action.user,
        LoggedIn: true
      };

    case actionTypes.ACCOUNT_ERROR:
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: action.message
      };

    case actionTypes.LOGIN_LOGOUT:
      return {
        ...state,
        LoggedIn: false,
        user: null
      };

    case actionTypes.REFRESH_USER:
      return {
        ...state,
        user: action.user
      };

    default:
      return state
  }
}
