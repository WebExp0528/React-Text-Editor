import * as actionTypes from './paymentActionTypes'
import { LOGIN_SUCCESS } from '../../../auth/login/logic/authActionTypes';
import { takeLatest, all, call, put } from 'redux-saga/effects';
import PlanService from '../../../../services/api/PlanService';
import PaymentDataService from '../../../../services/api/PaymentDataService';

function * loadPlans (action) {
  const service = new PlanService();

  try {
    let response = yield call(service.getAll);
    if (response.status !== 200) {
      throw new Error("Something is wrong", response)
    }
    yield put({ type: actionTypes.PLANS_LOADED, plans: response.data['hydra:member'] })
  } catch (error) {
    console.log(error);
    yield put({ type: actionTypes.PLANS_ERROR, error })
  }
}

function * checkoutCard (action) {
  const service = new PaymentDataService();

  try {
    let response = yield call(service.createSubscription, action.data);
    if (response.status !== 200) {
      throw new Error("Something is wrong", response)
    }
    yield put({ type: actionTypes.CHECKOUT_CARD_SUCCESS });
    /** Added prop updated here to force redux-persist to updated the persisted state */
    yield put({ type: LOGIN_SUCCESS, user: { ...response.data, updated: Math.random() } })
  } catch (error) {
    console.log(error);
    yield put({ type: actionTypes.CHECKOUT_CARD_ERROR, error })
  }
}

function * cancelSubscription (action) {
  const service = new PaymentDataService();

  try {
    let response = yield call(service.cancelSubscription, action.id);
    if (response.status !== 200) {
      throw new Error("Something is wrong", response)
    }
    yield put({ type: actionTypes.CANCEL_SUBSCRIPTION_SUCCESS });
    /** Added prop updated here to force redux-persist to updated the persisted state */
    yield put({ type: LOGIN_SUCCESS, user: { ...response.data, updated: Math.random() } })
  } catch (error) {
    console.log(error);
    yield put({ type: actionTypes.CANCEL_SUBSCRIPTION_ERROR, error })
  }
}

function * changePlan (action) {
  const service = new PaymentDataService();

  try {
    let response = yield call(service.changeSubscription, action.data);
    if (response.status !== 200) {
      throw new Error("Something is wrong", response)
    }

    yield put({ type: actionTypes.PLANS_CHANGED });
    /** Added prop updated here to force redux-persist to updated the persisted state */
    yield put({ type: LOGIN_SUCCESS, user: { ...response.data, updated: Math.random() } })
  } catch (error) {
    console.log(error);
    yield put({ type: actionTypes.PLANS_CHANGE_ERROR, error })
  }
}

function * changeSource (action) {
  const service = new PaymentDataService();

  try {
    let response = yield call(service.changeSource, action.data);
    if (response.status !== 200) {
      throw new Error("Something is wrong", response)
    }

    yield put({ type: actionTypes.CHANGE_SOURCE_SUCCESS });
  } catch (error) {
    console.log(error);
    yield put({ type: actionTypes.CHANGE_SOURCE_ERROR, error })
  }
}


export default function * paymentSaga () {
  yield all([
    takeLatest(actionTypes.PLANS_LOAD, loadPlans),
    takeLatest(actionTypes.CHECKOUT_CARD, checkoutCard),
    takeLatest(actionTypes.CANCEL_SUBSCRIPTION, cancelSubscription),
    takeLatest(actionTypes.PLANS_CHANGE, changePlan),
    takeLatest(actionTypes.CHANGE_SOURCE, changeSource),
  ])
}
