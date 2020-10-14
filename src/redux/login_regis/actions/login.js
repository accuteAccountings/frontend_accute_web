import {
    FETCH_LOGIN_BEGIN , FETCH_LOGIN_FAILS , 
    FETCH_LOGIN_SUCCESS
} from '../../types'
    
import {Setmsg} from './error_msg'
    
    export const loginBegin = () => {
        return{
            type : FETCH_LOGIN_BEGIN
        }
    }
    
    export const loginSuccess = () => {
        return{
            type : FETCH_LOGIN_SUCCESS
        }
    }
    
    export const loginFail = () => {
        return{
            type : FETCH_LOGIN_FAILS,
        }
    }
    
    
    export const login = (data) => {
        return dispatch => {
            dispatch(loginBegin())
            return fetch('/api/login' , {
                method : "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            }).then((res) => res.json())
            .then((data) => {
                console.log(data)
                if(data.error){
                    dispatch(loginFail());
                    dispatch(Setmsg("Incorrect Username or Password"))
                }
                else if(data){
                    dispatch(loginSuccess());
                }
            }).catch((err) =>{
                dispatch(loginFail())
                dispatch(Setmsg(err))
            } )
        }
    }