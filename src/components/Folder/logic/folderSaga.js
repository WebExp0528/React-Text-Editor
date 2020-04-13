import * as actionTypes from './folderActionTypes'
import * as storyActionTypes from '../../Story/logic/storyActionTypes';
import { takeLatest, all, call, put } from 'redux-saga/effects';
import FolderService from '../../../services/api/FolderService';

const service = new FolderService();

function * getFolders() {
  try {
    let response = yield call(service.getAll);
    if (response.status !== 200) {
      throw new Error("Something is wrong", response)
    }
    yield put({ type: actionTypes.FOLDER_LOADED, data: response.data['hydra:member'] })
  } catch (error) {
    yield put({ type: actionTypes.FOLDER_ERROR, error })
  }
}

function * getFolder(action) {
  try {
    let response = yield call(service.get, action.id);
    if (response.status !== 200) {
      throw new Error("Something is wrong", response)
    }
    yield put({ type: actionTypes.FOLDER_LOADED_SINGLE, data: response.data })
  } catch (error) {
    yield put({ type: actionTypes.FOLDER_ERROR, error })
  }
}

function * createFolder(action) {
  try {
    let response = yield call(service.create, action.data);
    if (response.status !== 201) {
      throw new Error("Something is wrong", response)
    }
    yield put({ type: actionTypes.FOLDER_CREATED, data: response.data });
  } catch (error) {
    console.log(error);
    yield put({ type: actionTypes.FOLDER_ERROR, error });
  }
}

function * updateFolder(action) {
  try {
    let response = yield call(service.update, action.data);
    if (response.status !== 200) {
      throw new Error("Something is wrong", response)
    }
    yield put({ type: actionTypes.FOLDER_UPDATED, data: response.data });
    yield put({ type: storyActionTypes.STORY_LOADING });
  } catch (error) {
    console.log(error);
    yield put({ type: actionTypes.FOLDER_ERROR, error });
  }
}

function * deleteFolder(action) {
  try {
    let response = yield call(service.delete, action.id);
    if (response.status !== 204) {
      throw new Error("Something is wrong", response)
    }
    yield put({ type: actionTypes.FOLDER_DELETED, data: action.id });
    yield put({ type: storyActionTypes.STORY_LOADING });
  } catch (error) {
    console.log(error);
    yield put({ type: actionTypes.FOLDER_ERROR, error });
  }
}

export default function * folderSaga () {
  yield all([
    takeLatest(actionTypes.FOLDER_LOAD, getFolders),
    takeLatest(actionTypes.FOLDER_LOAD_SINGLE, getFolder),
    takeLatest(actionTypes.FOLDER_CREATE, createFolder),
    takeLatest(actionTypes.FOLDER_UPDATE, updateFolder),
    takeLatest(actionTypes.FOLDER_DELETE, deleteFolder),
  ])
}