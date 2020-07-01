//https://www.youtube.com/watch?v=u99tNt3TZf8&t=2708s

import { createStore, applyMiddleware } from 'redux'
import rootReducer  from './reducers/index'
import {
     offlineMiddleware,
     suspendSaga, // saga nao execute se estiver offline
     consumeActionMiddleware // consumir a fila quanto estiver online
} from 'redux-offline-queue'
import createSagaMiddleware from "redux-saga"
import rootSaga from '../saga/index'

const middlewares = []
const sagaMiddleware = createSagaMiddleware()

middlewares.push(offlineMiddleware())
middlewares.push(suspendSaga(sagaMiddleware))
middlewares.push(consumeActionMiddleware())

const store = createStore(
     rootReducer,
     applyMiddleware(...middlewares)
   );

sagaMiddleware.run(rootSaga);

export default store