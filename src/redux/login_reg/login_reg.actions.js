import LoginRegActionTypes from './login_reg.types';

    export const setCurrentUser = user => ({
        type:LoginRegActionTypes.SET_CURRENT_USER,
        payload:user
    })
    export const signInStart = userCredentials => ({
            type : LoginRegActionTypes.SIGN_IN_START,
            payload:userCredentials
    })
    export const signInSuccess = user => ({
            type : LoginRegActionTypes.SIGN_IN_SUCCESS,
            payload : user
    })
    export const signInFailure = error => ({
            type : LoginRegActionTypes.SIGN_IN_FAILURE,
            payload : error.message
    })
    export const signUpStart = userData => ({
            type : LoginRegActionTypes.SIGN_UP_START,
            payload: userData
    })  
    export const signUpSuccess = user => ({
            type : LoginRegActionTypes.SIGN_UP_SUCCESS,
            payload : user
    })   
    export const signUpFailure = error => ({
            type : LoginRegActionTypes.SIGN_UP_FAILURE,
            payload : error.message
    }) 
    export const setislog = () => ({
            type : LoginRegActionTypes.SET_ISLOG
    })   
    export const googleSignInStart = response =>({
            type: LoginRegActionTypes.GOOGLE_SIGN_IN_START,
            payload:response
    })
    export const resetErrorMessage = ()=>({
            type: LoginRegActionTypes.RESET_ERROR_MESSAGE
    })
    export const facebookSignInStart = response =>({
            type: LoginRegActionTypes.FACEBOOK_SIGN_IN_START,
            payload:response
    })

