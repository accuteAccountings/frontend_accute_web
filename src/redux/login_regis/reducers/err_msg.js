import {SET_ERROR_MESSAGE} from '../../types';

let initialState = {
    errormsg : ''
}

const ErrorMsgReducer = (state = initialState , action) => {
    switch(action.type){
        case SET_ERROR_MESSAGE : 
            return{
                errormsg : action.payload
            }
        default : 
            return state
        
    }
}

export default ErrorMsgReducer