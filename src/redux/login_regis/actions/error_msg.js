import {SET_ERROR_MESSAGE} from '../../types'

export const Setmsg = (err) => {
    return{
        type : SET_ERROR_MESSAGE,
        payload : err
    }
}
