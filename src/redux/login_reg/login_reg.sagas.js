import {takeLatest, put, call, all} from 'redux-saga/effects';
import LoginRegActionTypes from './login_reg.types';

import {signUpSuccess,signUpFailure,signInSuccess,signInFailure,signOutSuccess,signOutFailure} from './login_reg.actions';

    ///sign up
    function signUpApi(data){    
        return fetch('/api/register' , {
            method : "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(res=>res.json())
        .then(json=>json)
        .catch(error=> error);
    }

    export function* signUp(data){
        try{
            const res = yield call(signUpApi,data);
            yield put(signUpSuccess(res.data.user))
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
    
    //sign in
    function signInApi(data){
        return fetch('/api/login' , {
            method : "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
        .then(data => data)
        .catch(err => err)
    }
    export function* onSignInStart(){
        yield takeLatest(LoginRegActionTypes.SIGN_IN_START,signIn)
    }
    export function* signIn(data){
        try{
          const userData = yield call(signInApi,data);
          if(userData.error){
              throw userData.error
          }
         
          yield put(signInSuccess(userData))
        }catch(error){
            yield put(signInFailure(error))
        }
        
    }

export function* loginRegSagas(){
    yield all([call(onSignInStart)])
}