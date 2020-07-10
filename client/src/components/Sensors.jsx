import React, { useState, useEffect } from 'react'
import {sensorsAPI, locationsAPI} from '../API'
import PropTypes from 'prop-types'
import LocationSelect from './LocationSelect'

const Sensor = ({ sensorValue, locations }) => {
  const [sensor, setSensor] = useState(sensorValue)

  const sel = (event) => {
    const newState = { ...sensor, idLocation: +event.target.value }
    setSensor(newState)
    sensorsAPI()
      .updateLocation(newState.id, newState.idLocation)
      .then(function (response) {
        console.log(JSON.stringify(response.data))
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  return (
    <li key={sensor.id.toString()}>
      {sensor.id} - {sensor.protocol}{' '}
      <LocationSelect
        selectionsList={locations}
        selectedId={sensor.idLocation}
        exselect={sel}
      />
    </li>
  )
}

Sensor.propTypes = {
  sensorValue: PropTypes.object,
  locations: PropTypes.array
}

///sensor control
export const Sensors = () => {
  const [devices, setDevices] = useState([])
  const [locations, setLocations] = useState([])

  useEffect(() => {
    sensorsAPI()
      .get()
      .then(function (response) {
        console.log(JSON.stringify(response.data))
        const data = response.data
        setDevices(data.devices)
      })
      .catch(function (error) {
        console.log(error)
      })

    locationsAPI()
      .get()
      .then(function (response) {
        console.log(JSON.stringify(response.data))
        const data = response.data
        setLocations(data.locations)
      })
      .catch(function (error) {
        console.log(error)
      })
  }, [])

  const lines = devices.map((s) => (
    <Sensor key={s.id.toString()} sensorValue={s} locations={locations} />
  ))

  return <ul>{lines}</ul>
}
