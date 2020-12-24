import LoginRegActionTypes from './login_reg.types';

const INITITAL_STATE = {
    currentUser:null,
    errorMsg:null,
    successMsg:null
}

const loginRegReducer = (state=INITITAL_STATE,action)=>{

    switch(action.type){
        case LoginRegActionTypes.SIGN_UP_SUCCESS:
            return {
                ...state,
                successMsg:"Registration Successful",
                errorMsg:null
            }
        case LoginRegActionTypes.SIGN_IN_SUCCESS:
            return {
                ...state,
                currentUser:action.payload,
                errorMsg:null
            }
        case LoginRegActionTypes.SIGN_OUT_SUCCESS:
            return {
                ...state,
                currentUser:null,
                errorMsg:null,
                successMsg:action.payload,
            }
            
        case LoginRegActionTypes.SIGN_IN_FAILURE:
        case LoginRegActionTypes.SIGN_OUT_FAILURE:
        case LoginRegActionTypes.SIGN_UP_FAILURE:
            return {
                ...state,
                errorMsg:action.payload
            }
        case LoginRegActionTypes.RESET_ERROR_MESSAGE:
            return {
                ...state,
                errorMsg:null
            }
        default:
            return state;
        }
        
}
export default loginRegReducer;