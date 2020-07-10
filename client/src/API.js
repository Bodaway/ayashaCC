import axios from 'axios'

const rest = axios.create({
  baseURL: 'http://localhost:7000/'
})

export const sensorsAPI = () => {
  return {
    get: () => {
      return rest.get('sensors')
    },
    updateLocation: (sensorid, locationid) => {
      const url = 'sensors/' + sensorid + '/location/' + locationid
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
