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
    setNewName('')
  }

  const list = locations.map((l) => (
    <tr key={l.id.toString()}>
      <td>{l.id}</td>
      <td>{l.name}</td>
    </tr>
  ))

  const getHeader = () => {
    if (locations.length === 0) {
      return (
        <thead>
          <tr>
            <td>pas encore de locations</td>
          </tr>
        </thead>
      )
    } else {
      return (
        <thead>
          <tr>
            <td>ID</td>
            <td>Nom</td>
          </tr>
        </thead>
      )
    }
  }

  return (
    <section className="locationsEditor">
      <h1>Locations</h1>
      <table>
        {getHeader()}
        <tbody>{list}</tbody>
        <tfoot>
          <tr>
            <td colSpan="2">
              <form onSubmit={handleSubmit}>
                <label htmlFor="newlocation">Nom :</label>
                <input name="newlocation"
                  type="text"
                  value={newName}
                  onChange={(event) => setNewName(event.target.value)}
                />
                <button type="submit">Créer</button>
              </form>
            </td>
          </tr>
        </tfoot>
      </table>
    </section>
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
