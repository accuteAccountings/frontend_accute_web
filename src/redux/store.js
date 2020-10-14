import {createStore , applyMiddleware} from 'redux'
import thunk from "redux-thunk";
import logger from 'redux-logger'
import {composeWithDevTools} from 'redux-devtools-extension'
import combined from './rootreduers';
import {persistStore} from 'redux-persist'

export  const store = createStore(
    combined,
    composeWithDevTools(
        applyMiddleware(logger , thunk)
    ) 
)

export const persistor = persistStore(store)
