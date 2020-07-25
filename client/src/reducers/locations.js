import { LOCATION_ADD, LOCATION_GET } from '../actions/constant'

export const locations = (state = [], action) => {
  switch (action.type) {
    case LOCATION_GET: {
      return action.data
    }
    case LOCATION_ADD: {
      return [...state, action.data]
    }
    default:
      return state
  }
}
