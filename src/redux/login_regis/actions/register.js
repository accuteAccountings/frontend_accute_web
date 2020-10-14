import {
    FETCH_SIGNUP_BEGIN , FETCH_SIGNUP_SUCCESS
    ,FETCH_SIGNUP_FAILS , SET_ISLOG
} from '../../types';

import {Setmsg} from './error_msg'


export const signupBegin = () => {
    return{
        type : FETCH_SIGNUP_BEGIN
    }
}

export const signupSuccess = (token) => {
    return{
        type : FETCH_SIGNUP_SUCCESS,
        payload : token
    }
}

export const signupFail = () => {
    return{
        type : FETCH_SIGNUP_FAILS,
    }
}

export const setislog = () => {
    return{
        type : SET_ISLOG
    }

}


export const CreateUser = (data) => {
    return dispatch => {
        dispatch(signupBegin())
        if(data.user.email.indexOf("@") === -1 || data.user.email.indexOf(".") === -1){
            dispatch(signupFail())
            dispatch(Setmsg("Please Enter A Valid Email Address"))
            return;
        }
        else if(data.user.password.length < 8){
            dispatch(signupFail())
            dispatch(Setmsg("Password Should Be Greater Than 8 letter"))
        }else{
        return fetch('/api/register' , {
            method : "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then((res) => res.json())
          .then((data) => {
            if(data.error){
                dispatch(signupFail())
                dispatch(Setmsg(data.error))
            }
            else if(data){
                dispatch(signupSuccess(data.user.token));
                console.log(data.user.token)
            }
        }).catch((err) => {
            dispatch(signupFail())
            dispatch(Setmsg(err))
        } );
    }
    }
}
