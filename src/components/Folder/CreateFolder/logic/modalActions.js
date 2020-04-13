import * as actionTypes from './modalActionTypes'

export const show = () => {
  return ({
    type: actionTypes.CREATE_FOLDER_MODAL_SHOW
  })
};

export const hide = () => {
  return ({
    type: actionTypes.CREATE_FOLDER_MODAL_HIDE
  })
};