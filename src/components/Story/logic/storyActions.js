import * as actionTypes from './storyActionTypes'

export const getAll = () => {
  return ({
    type: actionTypes.STORY_LOADING
  })
};

export const get = (id) => {
  return ({
    type: actionTypes.STORY_LOAD_SINGLE,
    id
  })
};


export const update = (data) => {
  return ({
    type: actionTypes.STORY_UPDATE,
    data
  })
};

export const create = (data) => {
  return ({
    type: actionTypes.STORY_CREATE,
    data
  })
};

export const remove = (id) => {
  return ({
    type: actionTypes.STORY_DELETE,
    id
  })
};