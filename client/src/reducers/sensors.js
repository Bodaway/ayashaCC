import {SENSORS_GET, SENSORS_UPDATE_LOCATION} from '../actions/constant'

export const sensors = (state = [], action) => {
  switch (action.type) {
    case SENSORS_GET : {
      return action.data
    }
    case SENSORS_UPDATE_LOCATION : {
      return state.map((s) =>
        s.id === action.data.sensorId
          ? { ...s, locationId: action.data.locationId }
          : s
      )
    }
    default:
      return state
  }
}
