import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router'
import authReducer from '../containers/auth/login/logic/authReducers';
import storyReducer from '../components/Story/logic/storyReducers';
import folderReducer from '../components/Folder/logic/fodlerReducer';
import createFolderModalReducer from '../components/Folder/CreateFolder/logic/modalReducer';
import updateFolderModalReducer from '../components/Folder/UpdateFolder/logic/modalReducer';
import moveStoryModalReducer from '../components/Story/MoveStory/logic/modalReducer';
import moveStoryCreateFolderModalReducer from '../components/Story/MoveStory/CreateFolder/logic/modalReducer';
import deleteStoryModalReducer from '../components/Story/StoryListItem/DeleteStoryModal/logic/modalReducer';
import deleteFolderModalReducer from '../components/Folder/FolderListItem/DeleteFolderModal/logic/modalReducer';
import paymentReducer from '../containers/account/payment/logic/paymentReducers';
import referralReducer from '../containers/account/referral/logic/referralReducer';
import cancelSubscriptionModalReducer from '../components/Account/Payment/ConfirmCancelSubscriptionModal/logic/modalReducer';

export default (history) => combineReducers({
  router: connectRouter(history),
  login: authReducer,
  stories: storyReducer,
  folders: folderReducer,
  createFolderModal: createFolderModalReducer,
  updateFolderModal: updateFolderModalReducer,
  moveStoryModal: moveStoryModalReducer,
  moveStoryCreateFolderModal: moveStoryCreateFolderModalReducer,
  deleteStoryModal: deleteStoryModalReducer,
  deleteFolderModal: deleteFolderModalReducer,
  payment: paymentReducer,
  referral: referralReducer,
  cancelSubscriptionModal: cancelSubscriptionModalReducer,
})
