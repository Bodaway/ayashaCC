import { combineReducers } from 'redux'
import { locations } from './locations'
import { sensors } from './sensors'

const rootReducer = combineReducers({
  sensors,
  locations
})

export default rootReducer
