import * as actionTypes from './modalActionTypes'

const initialState = {
  show: false,
  id: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.DELETE_FOLDER_MODAL_SHOW:
      return {
        ...state,
        show: true,
        id: action.id
      };

    case actionTypes.DELETE_FOLDER_MODAL_HIDE:
      return {
        ...state,
        show: false
      };

    default:
      return state
  }
}