import * as actionTypes from './modalActionTypes'

export const show = (id) => {
  return ({
    type: actionTypes.DELETE_STORY_MODAL_SHOW,
    id
  })
};

export const hide = () => {
  return ({
    type: actionTypes.DELETE_STORY_MODAL_HIDE
  })
};