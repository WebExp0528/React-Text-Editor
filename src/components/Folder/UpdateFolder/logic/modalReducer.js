import * as actionTypes from './modalActionTypes'

const initialState = {
  show: false,
  folder: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.UPDATE_FOLDER_MODAL_SHOW:
      return {
        ...state,
        show: true,
        folder: action.folder
      };

    case actionTypes.UPDATE_FOLDER_MODAL_HIDE:
      return {
        ...state,
        show: false,
        folder: null
      };

    default:
      return state
  }
}