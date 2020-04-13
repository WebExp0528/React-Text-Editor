import * as actionTypes from './authActionTypes'

const loginRequest = (userData) => {
  return ({
    type: actionTypes.LOGIN_REQUESTING,
    ...userData
  })
};

export const loginError = (error) => {
  return ({
    type: actionTypes.LOGIN_ERROR,
    error
  })
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('refresh_token');
  
  return ({
    type: actionTypes.LOGIN_LOGOUT
  })
};

export const updateAccount = (data) => {
  return ({
    type: actionTypes.ACCOUNT_UPDATE,
    data
  })
};

export const updatePassword = (data) => {
  return ({
    type: actionTypes.ACCOUNT_PASSWORD_UPDATE,
    data
  })
};

export const resetPassword = (data) => {
  return ({
    type: actionTypes.ACCOUNT_PASSWORD_RESET,
    data
  })
};

export const confirmAccount = (token) => {
  return ({
    type: actionTypes.ACCOUNT_CONFIRM,
    token
  })
};

export const refreshUser = user => {
  return ({
    type: actionTypes.REFRESH_USER,
    user
  })
};


export default loginRequest
