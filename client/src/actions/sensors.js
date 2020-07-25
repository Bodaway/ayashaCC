import { SENSORS_GET, SENSORS_UPDATE_LOCATION } from './constant'
import { sensorsAPI } from '../API'

export const receiveSensors = (sensors) => ({
  type: SENSORS_GET,
  data: sensors
})

export const updateLocationSensor = (sensorId, locationId) => ({
  type: SENSORS_UPDATE_LOCATION,
  data: { sensorId, locationId }
})

export const sensorsGet = () => (dispatch) => {
  sensorsAPI()
    .get()
    .then(function (response) {
      console.log(JSON.stringify(response.data))
      const data = response.data
      dispatch(receiveSensors(data.devices))
    })
    .catch(function (error) {
      console.log(error)
    })
}

export const sensorUpdateLocation = (sensorId, locationId) => (dispatch) => {
  sensorsAPI()
    .updateLocation(sensorId, locationId)
    .then(function (response) {
      console.log(JSON.stringify(response.data))
      dispatch(updateLocationSensor(sensorId, locationId))
    })
    .catch(function (error) {
      console.log(error)
    })
}
