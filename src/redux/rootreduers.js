import {combineReducers} from 'redux'
import RegisterReducers from './login_regis/reducers/register'
import LoginReducers from './login_regis/reducers/loginReducers';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import ErrorMsgReducer from './login_regis/reducers/err_msg';

 const rootReducer = combineReducers({
    register : RegisterReducers,
    login : LoginReducers,
    errormsg : ErrorMsgReducer
})

const persistConfig = {
    key : 'root',
    storage,
    whitelist : ['login']
}

export default persistReducer(persistConfig , rootReducer);