import * as actionTypes from './storyActionTypes';
import * as folderActionTypes from '../../Folder/logic/folderActionTypes';
import { takeLatest, all, call, put } from 'redux-saga/effects';
import StoryService from '../../../services/api/StoryService';

const service = new StoryService();

function * getStories (action) {
  try {
    let response = yield call(service.getAll);
    if (response.status !== 200) {
      throw new Error("Something is wrong", response)
    }
    yield put({ type: actionTypes.STORY_LOADED, data: response.data['hydra:member'] })
  } catch (error) {
    yield put({ type: actionTypes.STORY_ERROR, error })
  }
}

function * updateStory(action) {
  try {
    let response = yield call(service.update, action.data);
    if (response.status !== 200) {
      throw new Error("Something is wrong", response)
    }
    yield put({ type: actionTypes.STORY_UPDATED, data: response.data });
    yield put({ type: folderActionTypes.FOLDER_LOAD });
  } catch (error) {
    console.log(error);
    yield put({ type: actionTypes.STORY_ERROR, error });
  }
}

function * deleteStory(action) {
  try {
    let response = yield call(service.delete, action.id);
    if (response.status !== 204) {
      throw new Error("Something is wrong", response)
    }
    yield put({ type: actionTypes.STORY_DELETED, data: action.id });
    yield put({ type: folderActionTypes.FOLDER_LOAD });
  } catch (error) {
    console.log(error);
    yield put({ type: actionTypes.STORY_ERROR, error });
  }
}

function * createStory(action) {
  try {
    let response = yield call(service.create, action.data);
    if (response.status !== 201) {
      throw new Error("Something is wrong", response)
    }
    yield put({ type: actionTypes.STORY_CREATED, data: response.data });
  } catch (error) {
    yield put({ type: actionTypes.STORY_ERROR, error });
  }
}

function * getStory(action) {
  try {
    let response = yield call(service.get, action.id);
    if (response.status !== 200) {
      throw new Error("Something is wrong", response)
    }
    yield put({ type: actionTypes.STORY_LOADED_SINGLE, data: response.data })
  } catch (error) {
    yield put({ type: actionTypes.STORY_ERROR, error })
  }
}

export default function * storySaga () {
  yield all([
    takeLatest(actionTypes.STORY_LOADING, getStories),
    takeLatest(actionTypes.STORY_UPDATE, updateStory),
    takeLatest(actionTypes.STORY_DELETE, deleteStory),
    takeLatest(actionTypes.STORY_CREATE, createStory),
    takeLatest(actionTypes.STORY_LOAD_SINGLE, getStory)
  ])
}