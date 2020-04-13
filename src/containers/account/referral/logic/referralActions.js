import * as actionTypes from './referralActionTypes'

export const createInvite = data => {
  return ({
    type: actionTypes.INVITE_CREATE,
    data
  })
};
