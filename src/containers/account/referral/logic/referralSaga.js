import * as actionTypes from './referralActionTypes'
import { takeLatest, all, call, put } from 'redux-saga/effects';
import InvitationService from "../../../../services/api/InvitationService";

function * createInvite (action) {
  const service = new InvitationService();

  try {
    let response = yield call(service.create, action.data);
    if (response.status !== 201) {
      throw new Error("Something is wrong", response)
    }
    yield put({ type: actionTypes.INVITE_CREATED})
  } catch (error) {
    let message = error.response.data.violations && error.response.data.violations[0] && error.response.data.violations[0].message ? error.response.data.violations[0].message : null;
    console.log(error);
    yield put({ type: actionTypes.INVITE_CREATE_ERROR, message })
  }
}

export default function * referralSaga () {
  yield all([
    takeLatest(actionTypes.INVITE_CREATE, createInvite)
  ])
}
