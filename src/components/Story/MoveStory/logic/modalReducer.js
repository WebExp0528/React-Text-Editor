import * as actionTypes from './modalActionTypes'

const initialState = {
  show: false,
  story: null,
  selected: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.MOVE_STORY_MODAL_SHOW:
      return {
        ...state,
        show: true,
        story: action.story,
        selected: action.story.folder
      };

    case actionTypes.MOVE_STORY_MODAL_HIDE:
      return {
        ...state,
        show: false,
        story: null
      };

    case actionTypes.MOVE_STORY_MODAL_SELECT:
      return {
        ...state,
        selected: action.folder
      };

    default:
      return state
  }
}