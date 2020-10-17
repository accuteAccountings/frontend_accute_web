import LoginRegActionTypes from './login_reg.types';

    export const setCurrentUser = user => ({
        type:LoginRegActionTypes.SET_CURRENT_USER,
        payload:user
    })
    export const signInStart = () => ({
            type : LoginRegActionTypes.SIGN_IN_START
    })
    export const signInSuccess = user => ({
            type : LoginRegActionTypes.SIGN_IN_SUCCESS,
            payload : user
    })
    export const signInFailure = error => ({
            type : LoginRegActionTypes.SIGN_IN_FAILURE,
            payload : error
    })
    export const signUpStart = (userCredentials) => ({
            type : LoginRegActionTypes.SIGN_UP_START,
            payload: userCredentials
    })  
    export const signUpSuccess = (user) => ({
            type : LoginRegActionTypes.SIGN_UP_SUCCESS,
            payload : user
    })   
    export const signUpFailure = () => ({
            type : LoginRegActionTypes.SIGN_UP_FAILURE,
    }) 
    export const setislog = () => ({
            type : LoginRegActionTypes.SET_ISLOG
    })   
    export const googleSignInStart = () =>({
            type: LoginRegActionTypes.GOOGLE_SIGN_IN_START
    })
    export const facebookSignInStart = () =>({
            type: LoginRegActionTypes.FACEBOOK_SIGN_IN_START
    })

