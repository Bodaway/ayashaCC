import { locationsAPI } from '../API'
import { LOCATION_GET, LOCATION_ADD } from './constant'

export const receiveLocations = (locs) => ({
  type: LOCATION_GET,
  data: locs
})

export const addingLocation = (nLoc) => ({
  type: LOCATION_ADD,
  data: nLoc
})

export const locationsGet = () => (dispatch) => {
  locationsAPI()
    .get()
    .then(function (response) {
      console.log(JSON.stringify(response.data))
      const data = response.data
      dispatch(receiveLocations(data.locations))
    })
    .catch(function (error) {
      console.log(error)
    })
}

export const locationAdd = (name) => (dispatch) => {
  locationsAPI()
    .add(name)
    .then(function (response) {
      console.log(JSON.stringify(response.data))
      const data = response.data
      dispatch(addingLocation(data))
    })
    .catch(function (error) {
      console.log(error)
    })
}
