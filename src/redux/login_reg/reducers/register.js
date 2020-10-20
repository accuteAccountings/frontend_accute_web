import {
    FETCH_SIGNUP_BEGIN , FETCH_SIGNUP_SUCCESS
    ,FETCH_SIGNUP_FAILS , SET_ISLOG} from '../types'
    
    const initialState = {
        loading : false,
        islog : true,
        token : null
    }
    
    const RegisterReducers = (state = initialState , action) => {
        switch (action.type){
            case FETCH_SIGNUP_BEGIN : 
            return{
                ...state,
                loading : true,
            }
            case FETCH_SIGNUP_SUCCESS : 
            return{
                ...state,
                loading : false,
                islog : false,
                token : action.payload
                }
            case FETCH_SIGNUP_FAILS : 
            return{
                ...state , 
                loading : false,
                islog : true,
            }
            case SET_ISLOG :
                return{
                    islog : !state.islog
                }
            default :
            return state
        }
    }
    
    export default RegisterReducers