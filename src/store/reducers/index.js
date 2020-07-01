import { combineReducers } from 'redux'
import {reducer as offline} from 'redux-offline-queue'
import reducer from './user'

export default combineReducers({
     reducer,
     offline
})