import * as actionTypes from './modalActionTypes'

export const show = (folder) => {
  return ({
    type: actionTypes.UPDATE_FOLDER_MODAL_SHOW,
    folder
  })
};

export const hide = () => {
  return ({
    type: actionTypes.UPDATE_FOLDER_MODAL_HIDE
  })
};