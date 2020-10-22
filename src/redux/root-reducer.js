import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import loginRegReducer from './login_reg/login_reg.reducer'



// const persistConfig = {
//     key : 'root',
//     storage,
//     whitelist : ['loginReg']
// }
const rootReducer = combineReducers({
    loginReg : loginRegReducer
})
//export default persistReducer(persistConfig , rootReducer);
export default rootReducer;