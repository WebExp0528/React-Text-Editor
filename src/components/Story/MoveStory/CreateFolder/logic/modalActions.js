import * as actionTypes from './modalActionTypes'

export const show = () => {
  return ({
    type: actionTypes.MOVE_STORY_CREATE_FOLDER_MODAL_SHOW
  })
};

export const hide = () => {
  return ({
    type: actionTypes.MOVE_STORY_CREATE_FOLDER_MODAL_HIDE
  })
};