    
import {all, fork} from 'redux-saga/effects';
import authSaga from '../containers/auth/login/logic/authSaga';
import storySaga from '../components/Story/logic/storySaga';
import folderSaga from '../components/Folder/logic/folderSaga';
import paymentSaga from '../containers/account/payment/logic/paymentSaga';
import referralSaga from '../containers/account/referral/logic/referralSaga';

export default function* rootSaga() {
    yield all([
        fork(authSaga),
        fork(storySaga),
        fork(folderSaga),
        fork(paymentSaga),
        fork(referralSaga),
    ])
}
