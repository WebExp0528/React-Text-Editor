import * as actionTypes from './authActionTypes'
import { takeLatest, all, call, put } from 'redux-saga/effects';
import AuthService from '../../../../services/api/AuthService';
import UserService from '../../../../services/api/UserService';

function * loginFlow (action) {
  const authServObj = new AuthService();

  try {
    const { email, password } = action;
    let response = yield call(authServObj.login, email, password);
    if (response.status !== 200) {
      throw new Error("Something is wrong", response)
    }
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('refresh_token', response.data.refresh_token);
    yield put({ type: actionTypes.LOGIN_SUCCESS, user: response.data.user })
  } catch (error) {
    console.log(error);
    yield put({ type: actionTypes.LOGIN_ERROR, error })
  }
}

function * updateAccount (action) {
  const service = new UserService();
  try {
    let response = yield call(service.update, action.data);
    if (response.status !== 200) {
      throw new Error("Something is wrong", response)
    }

    yield put({ type: actionTypes.ACCOUNT_UPDATED, user: response.data })
  } catch (error) {
    console.log(error);
    yield put({ type: actionTypes.ACCOUNT_ERROR, message: error.response.data.violations[0].message || 'Something went wrong' })
  }
}

function * updatePassword (action) {
  const service = new UserService();

  try {
    let response = yield call(service.updatePassword, action.data);
    if (response.status !== 200) {
      throw new Error("Something is wrong", response);
    }

    localStorage.setItem('token', response.data.token);
    localStorage.setItem('refresh_token', response.data.refresh_token);
    yield put({ type: actionTypes.ACCOUNT_PASSWORD_UPDATED });
  } catch (error) {
    yield put({ type: actionTypes.ACCOUNT_ERROR, message: error.response.data.violations[0].message || 'Something went wrong' })
  }
}

function * resetPassword (action) {
  const authServObj = new AuthService();
  let {newPassword, newRetypedPassword, token} = action.data;

  try {
    let response = yield call(authServObj.updatePassword, newPassword, newRetypedPassword, token);
    if (response.status !== 200) {
      throw new Error("Something is wrong", response);
    }

    localStorage.setItem('token', response.data.token);
    localStorage.setItem('refresh_token', response.data.refresh_token);
    yield put({ type: actionTypes.ACCOUNT_PASSWORD_RESET_END, user: response.data.user });
  } catch (error) {
    console.log(error);
    yield put({ type: actionTypes.LOGIN_ERROR, error })
  }
}

function * confirmUser (action) {
  const authServObj = new AuthService();

  try {
    let response = yield call(authServObj.confirm, action.token);
    if (response.status !== 200) {
      throw new Error("Something is wrong", response);
    }

    localStorage.setItem('token', response.data.token);
    localStorage.setItem('refresh_token', response.data.refresh_token);
    yield put({ type: actionTypes.ACCOUNT_CONFIRMED, user: response.data.user });
  } catch (error) {
    console.log(error);
    yield put({ type: actionTypes.LOGIN_ERROR, error })
  }
}


export default function * authSaga () {
  yield all([
    takeLatest(actionTypes.LOGIN_REQUESTING, loginFlow),
    takeLatest(actionTypes.ACCOUNT_UPDATE, updateAccount),
    takeLatest(actionTypes.ACCOUNT_PASSWORD_UPDATE, updatePassword),
    takeLatest(actionTypes.ACCOUNT_PASSWORD_RESET, resetPassword),
    takeLatest(actionTypes.ACCOUNT_CONFIRM, confirmUser)
  ])
}