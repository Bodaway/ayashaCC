import axios from 'axios'

const rest = axios.create({
  baseURL: 'http://localhost:7000/'
})

export const sensorsAPI = () => {
  return {
    get: () => {
      return rest.get('sensors')
    },
    updateLocation: (sensorId, locationId) => {
      const url = 'sensors/' + sensorId + '/location/' + locationId
      console.log(url)

      return rest.put(url)
    }
  }
}

export const locationsAPI = () => {
  return {
    get: () => {
      return rest.get('locations')
    },
    add: (name) => {
      const url = 'locations/' + name
      return rest.put(url)
    }
  }
}
