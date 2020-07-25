import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers/root'
//import reduxImmutableStateInvariant from 'redux-immutable-state-invariant'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension';




export default function configureStore(initialState) {
  return createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(thunk)))
}


/**
 * definition of sensor in cc context
 * @typedef {object} sensor
 * @property {number} id
 * @property {string} protocol - communication protocol 
 * @property {number} locationId
 */

 /**
  * @typedef {object} location
  * @property {number} id
  * @property {string} name
  */