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
    export const signOutStart = () => ({
        type : LoginRegActionTypes.SIGN_OUT_START,
       
   })
   export const signOutSuccess = successMsg => ({
           type : LoginRegActionTypes.SIGN_OUT_SUCCESS,
           payload:successMsg

   })
   export const signOutFailure = error => ({
           type : LoginRegActionTypes.SIGN_OUT_FAILURE,
           payload : error.message
   })
 
    export const signUpStart = userData => ({
            type : LoginRegActionTypes.SIGN_UP_START,
            payload: userData
    })  
    export const signUpSuccess = () => ({
            type : LoginRegActionTypes.SIGN_UP_SUCCESS,
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
    export const resetAll = ()=>({
        type: LoginRegActionTypes.RESET_ALL
    })
    export const facebookSignInStart = response =>({
            type: LoginRegActionTypes.FACEBOOK_SIGN_IN_START,
            payload:response
    })

