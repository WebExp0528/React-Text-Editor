import * as actionTypes from './folderActionTypes'

export const getAll = () => {
  return ({
    type: actionTypes.FOLDER_LOAD
  })
};

export const get = (id) => {
  return ({
    type: actionTypes.FOLDER_LOAD_SINGLE,
    id
  })
};

export const create = (data) => {
  return ({
    type: actionTypes.FOLDER_CREATE,
    data
  })
};

export const update = (data) => {
  return ({
    type: actionTypes.FOLDER_UPDATE,
    data
  })
};

export const remove = (id) => {
  return ({
    type: actionTypes.FOLDER_DELETE,
    id
  })
};