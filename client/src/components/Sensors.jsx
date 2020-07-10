import React, { useState, useEffect } from 'react'
import {sensorsAPI, locationsAPI} from '../API'
import PropTypes from 'prop-types'
import LocationSelect from './LocationSelect'

const Sensor = ({ sensorValue, locations }) => {
  const [sensor, setsensor] = useState(sensorValue)

  const sel = (event) => {
    const newstate = { ...sensor, idlocation: +event.target.value }
    setsensor(newstate)
    locationsAPI()
      .updateLocation(newstate.id, newstate.idlocation)
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
        selectionslist={locations}
        selectedid={sensor.idlocation}
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
  const [devices, setdevices] = useState([])
  const [locations, setlocations] = useState([])

  useEffect(() => {
    sensorsAPI()
      .get()
      .then(function (response) {
        console.log(JSON.stringify(response.data))
        const data = response.data
        setdevices(data.devices)
      })
      .catch(function (error) {
        console.log(error)
      })

    locationsAPI()
      .get()
      .then(function (response) {
        console.log(JSON.stringify(response.data))
        const data = response.data
        setlocations(data.locations)
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
