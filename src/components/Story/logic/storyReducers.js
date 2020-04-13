import * as actionTypes from './storyActionTypes'

const initialState = {
  loading: false,
  data: null,
  success: false,
  single: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.STORY_LOADING:
      return {
        ...state,
        loading: true
      };

    case actionTypes.STORY_LOADED:
      return {
        ...state,
        loading: false,
        data: action.data
      };

    case actionTypes.STORY_UPDATE:
      return {
        ...state,
        loading: true
      };

    case actionTypes.STORY_UPDATED:
      if (state.data) {
        state.data = state.data.map(story => {
          if (story.id === action.data.id) {
            story = action.data;
          }

          return story;
        });

        state.data.sort((a,b) => (new Date(b.updated)).getTime() - (new Date(a.updated)).getTime());
      }

      if (state.single && state.single.id === action.data.id) {
        state.single = {
          ...state.single,
          ...action.data
        };
      }

      return {
        ...state,
        data: state.data,
        loading: false,
        single: state.single
      };

    case actionTypes.STORY_DELETE:
      return {
        ...state,
        loading: true
      };

    case actionTypes.STORY_DELETED:
      if (state.data) {
        state.data = state.data.filter(story => story.id !== action.data)
      }
      return {
        ...state,
        data: state.data,
        loading: false
      };

    case actionTypes.STORY_CREATE:
      return {
        ...state,
        loading: true,
        success: false
      };

    case actionTypes.STORY_CREATED:
      state.data.unshift(action.data);

      return {
        ...state,
        data: state.data,
        loading: false,
        success: true,
      };

    case actionTypes.STORY_LOAD_SINGLE:
      return {
        ...state,
        loading: true,
        single: null
      };

    case actionTypes.STORY_LOADED_SINGLE:
      return {
        ...state,
        loading: false,
        single: action.data
      };

    default:
      return state
  }
}
