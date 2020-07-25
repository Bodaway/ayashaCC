import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { locationsGet, locationAdd } from '../actions/locations'
import PropTypes from 'prop-types'

/**
 * component used to manage Locations
 * @param {Object} props
 * @param {import('../Store').location[]} props.locations
 * @param {Function} props.locationGet redux action
 * @param {Function} props.locationAdd redux action
 */
export const LocationsEditor = ({ locations, locationsGet, locationAdd }) => {
  const [newName, setNewName] = useState('')

  useEffect(() => {
    locationsGet()
  }, [locationsGet])

  const handleSubmit = (event) => {
    event.preventDefault()
    locationAdd(newName)
    setNewName("")
  }

  const list = locations.map((l) => (
    <tr key={l.id.toString()}>
      <td>{l.id}</td>
      <td>{l.name}</td>
    </tr>
  ))

  return (
    <div className="locationsEditor">
      <h1>Locations</h1>
      <table>
        <thead>
          <tr>
            <td>ID</td>
            <td>Nom</td>
          </tr>
        </thead>
        <tbody>{list}</tbody>
        <tfoot>
          <tr>
            <td>
              <form onSubmit={handleSubmit}>
                <label>
                  Nom :
                  <input
                    type="text"
                    value={newName}
                    onChange={(event) => setNewName(event.target.value)}
                  />
                </label>
                <input type="submit" value="Creer" />
              </form>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}

LocationsEditor.propTypes = {
  locations: PropTypes.array,
  locationsGet: PropTypes.func,
  locationAdd: PropTypes.func
}

const mapStateToProps = (state) => {
  const { locations } = state
  return {
    locations
  }
}
export default connect(mapStateToProps, { locationsGet, locationAdd })(
  LocationsEditor
)
