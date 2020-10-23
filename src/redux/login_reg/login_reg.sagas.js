import {takeLatest, put, call, all} from 'redux-saga/effects';
import LoginRegActionTypes from './login_reg.types';

import {signUpSuccess,signUpFailure,signInSuccess,signInFailure,signOutSuccess,signOutFailure, resetErrorMessage} from './login_reg.actions';
    
    ///sign up
    function signUpApi(payload){   
     //   console.log("the user object is ",data) 
        return fetch('/api/register' , {
            method : "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        }).then(res=>res.json())
        .then(user=>user)
        .catch(error=> error);
  
    }

    export function* signUp({payload}){
        try{
            const user = yield call(signUpApi,payload);
           // yield console.log(user)
             yield put(signUpSuccess())
        }catch(error ){
            yield put(signUpFailure(error))
         }
    }
    ///sign up watcher saga
    export function* onSignUpStart(){
        yield takeLatest(LoginRegActionTypes.SIGN_UP_START,signUp)
    }
   
    // export function* onSignUpSuccess(){
    //     yield takeLatest(LoginRegActionTypes.SIGN_UP_SUCCESS,signInAfterSignUp)
    // }
    // export function* signInAfterSignUp({payload:{user}}){
    
    // }
    
    //sign-in sagas
    function signInApi(payload){
        console.log(payload)
        return fetch('/api/login' , {
            method : "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        }).then(res => res.json())
        .then(parJson => {
            return parJson;
        })
        .catch(error => error)
    }

    export function* signIn({payload}){
        try{
           // yield put(resetErrorMessage());
          const loggedInData = yield call(signInApi,payload);
          if(loggedInData.error){ 
            throw new Error(loggedInData.error);     
          }else{ 
              yield put(signInSuccess(loggedInData.username))
          }
        }catch(error){
            yield put(signInFailure(error))
        }
        
    }
    // watcher saga
    export function* onSignInStart(){
        yield takeLatest(LoginRegActionTypes.SIGN_IN_START,signIn)
    }
    //google sign-in sagas
    function googleSignInApi({tokenId}){
        console.log(tokenId);
        return  fetch("/api/register/google", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ tokenId: tokenId })
          })
            .then(res => res.json())
            .then(parJson => parJson)
            .catch(error => error);
    }
    function* googleSignIn({payload}){
        try{
        const loggedInData= yield call(googleSignInApi,payload);
        if(loggedInData.error){ 
            console.log(loggedInData);
            throw new Error(loggedInData.error);
          }else{ 
              yield put(signInSuccess(loggedInData.email))
          }
        }catch(error){
            yield put(signInFailure(new Error('Unable to login with Google')))
        }
    }
    function* onGoogleSignInStart(){
        yield call(LoginRegActionTypes.GOOGLE_SIGN_IN_START,googleSignIn)
    }

    // facebook sign-in sagas
    function facebookSignInApi(payload){
        return  fetch("/api/register/facebook", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ accessToken: payload.accessToken,
                pic: payload.picture.data.url0
              })
          })
            .then(res => res.json())
            .then(parJson => parJson)
            .catch(error => error);
    }
    function* facebookSignIn({payload}){
        try{
        const loggedInData= yield call(facebookSignInApi,payload);
        if(loggedInData.error){ 
            console.log(loggedInData);
            throw new Error(loggedInData.error);
          }else{ 
              yield put(signInSuccess(loggedInData.user))
          }
        }catch(error){
            yield put(signInFailure(error))
        }
    }
    function* onFacebookSignInStart(){
        yield call(LoginRegActionTypes.FACEBOOK_SIGN_IN_START,facebookSignIn)
    }
   
export function* loginRegSagas(){
    yield all([call(onSignInStart),call(onSignUpStart)])
}