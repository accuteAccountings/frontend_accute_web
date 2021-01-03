import {createStore , applyMiddleware} from 'redux'
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger'
import rootReducer  from './root-reducer';

import rootSaga from './root-saga';

//persist and reload
// function saveToLocalStorage(state){
//     try {
//         const serializedState= JSON.stringify(state);
//         localStorage.setItem('state',serializedState);
//     } catch (error) {
//         console.log(error)
//     }
// }
// function loadFromLocalStorage(){
//     try {
//         const serializedState = localStorage.getItem('state')
//         if(serializedState===null) return;
//         return JSON.parse(serializedState);
//     } catch (error) {
//         console.log(error);
//         return undefined;
//     }
// }
const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

if(process.env.NODE_ENV==='development'){
    middlewares.push(logger);
} 

// const persistedState = loadFromLocalStorage()
// export const store=createStore(rootReducer,persistedState, applyMiddleware(...middlewares));
export const store=createStore(rootReducer, applyMiddleware(...middlewares));
sagaMiddleware.run(rootSaga);

//persist state
//store.subscribe(()=> saveToLocalStorage(store.getState()));


export default store;
