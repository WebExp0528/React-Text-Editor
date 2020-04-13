import * as actionTypes from './folderActionTypes'

const initialState = {
  loading: false,
  data: null,
  single: null,
  singleActive: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FOLDER_LOAD:
      return {
        ...state,
        loading: true
      };

    case actionTypes.FOLDER_LOADED:
      return {
        ...state,
        loading: false,
        data: action.data
      };

    case actionTypes.FOLDER_LOAD_SINGLE:
      return {
        ...state,
        loading: true
      };

    case actionTypes.FOLDER_LOADED_SINGLE:
      return {
        ...state,
        loading: false,
        single: action.data
      };

    case actionTypes.FOLDER_CREATE:
      return {
        ...state,
        loading: true
      };

    case actionTypes.FOLDER_CREATED:
      state.data.push(action.data);

      return {
        ...state,
        data: state.data,
        loading: false
      };

    case actionTypes.FOLDER_UPDATE:
      return {
        ...state,
        loading: true
      };

    case actionTypes.FOLDER_UPDATED:
      state.data = state.data.map(folder => {
        if (folder.id === action.data.id) {
          folder = action.data;
        }

        return folder;
      });

      return {
        ...state,
        data: state.data,
        loading: false
      };

    case actionTypes.FOLDER_DELETE:
      return {
        ...state,
        loading: true
      };

    case actionTypes.FOLDER_DELETED:
      return {
        ...state,
        data: state.data.filter(folder => folder.id !== action.data),
        loading: false
      };

    default:
      return state
  }
}