import * as actionTypes from './modalActionTypes'

export const show = (story) => {
  return ({
    type: actionTypes.MOVE_STORY_MODAL_SHOW,
    story
  })
};

export const hide = () => {
  return ({
    type: actionTypes.MOVE_STORY_MODAL_HIDE
  })
};

export const select = (folder) => {
  return ({
    type: actionTypes.MOVE_STORY_MODAL_SELECT,
    folder
  })
};