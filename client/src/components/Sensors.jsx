import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import LocationSelect from './LocationSelect'
import { sensorsGet, sensorUpdateLocation } from '../actions/sensors'
import { locationsGet } from '../actions/locations'

/**
 * component, display One sensor
 * @param {Object} props
 * @param {import('../Store').sensor} props.sensorValue
 * @param {import('../Store').location[]} props.locations
 * @param {Function} props.locationChange execute when change
 */
const Sensor = ({ sensorValue, locations, locationChange }) => {
  const [sensor, setSensor] = useState(sensorValue)

  const locationChanged = (event) => {
    const newState = { ...sensor, locationId: +event.target.value }
    setSensor(newState)
    locationChange(newState.locationId)
  }

  return (
    <li key={sensor.id.toString()}>
      {sensor.id} - {sensor.protocol}{' '}
      <LocationSelect
        selectionsList={locations}
        selectedId={sensor.locationId}
        locationChange={locationChanged}
      />
    </li>
  )
}

Sensor.propTypes = {
  sensorValue: PropTypes.object,
  locations: PropTypes.array
}

/**
 * Sensors component, used to manipulate sensors
 * @function Sensors
 * @param {Object} props
 * @param {import('../Store').sensor[]} props.devices,
 * @param {import('../Store').location[]} props.locations
 * @param {Function} props.sensorsGet redux action
 * @param {Function} props.locationsGet  redux action
 * @param {Function} props.sensorUpdateLocation redux action
 */
export const Sensors = ({
  devices = [],
  locations = [],
  sensorsGet,
  locationsGet,
  sensorUpdateLocation
}) => {
  useEffect(() => {
    sensorsGet()
    locationsGet()
  }, [sensorsGet,locationsGet])

  const setLocations = (sensorId) => (locationId) => {
    sensorUpdateLocation(sensorId, locationId)
  }

  const lines = devices.map((s) => (
    <Sensor
      key={s.id.toString()}
      sensorValue={s}
      locations={locations}
      locationChange={setLocations(s.id)}
    />
  ))

  return (
    <div className="sensors">
      <h1>Capteurs</h1>
      <ul>{lines}</ul>
    </div>
  )
}

const mapStateToProps = (state) => {
  const { sensors: devices, locations } = state
  return {
    devices,
    locations
  }
}

export default connect(mapStateToProps, {
  sensorsGet,
  locationsGet,
  sensorUpdateLocation
})(Sensors)
