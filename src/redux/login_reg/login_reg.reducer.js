import LoginRegActionTypes from './login_reg.types';

const INITITAL_STATE = {
    currentUser:null,
    error:null
}

const loginRegReducer = (state=INITITAL_STATE,action)=>{

    switch(action.type){
        case LoginRegActionTypes.SIGN_IN_SUCCESS:
            return {
                ...state,
                currentUser:action.payload,
                error:null
            }
        case LoginRegActionTypes.SIGN_OUT_SUCCESS:
            return {
                ...state,
                currentUser:null,
                error:null
            }
            
        case LoginRegActionTypes.SIGN_IN_FAILURE:
        case LoginRegActionTypes.SIGN_OUT_FAILURE:
        case LoginRegActionTypes.SIGN_UP_FAILURE:
            return {
                ...state,
                error:action.payload
            }
        default:
            return state;
        }
        
}
export default loginRegReducer;