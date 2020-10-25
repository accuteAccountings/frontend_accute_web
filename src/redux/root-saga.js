import {call, all} from 'redux-saga/effects';
import {loginRegSagas} from './login_reg/login_reg.sagas';

export default function* rootSaga(){
    yield all([call(loginRegSagas)]);
}
