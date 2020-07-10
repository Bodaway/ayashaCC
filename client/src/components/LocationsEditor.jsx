import React, { useState, useEffect } from 'react'
import { locationsAPI } from '../API'
import PropTypes from 'prop-types'

export const LocationsEditor = () => {
  const [locations, setlocations] = useState([])
  const [newName, setnewname] = useState('')

  useEffect(() => {
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

  const handleSubmit = (event) => {
    event.preventDefault()
    locationsAPI()
      .add(newName)
      .then(function (response) {
        console.log(JSON.stringify(response.data))
        const data = response.data
        var currentState = Object.assign([], locations)
        currentState.push(data)
        setlocations(currentState)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  const list = locations.map((l) => (
    <tr key={l.id.toString()}>
      <td>{l.id}</td>
      <td>{l.name}</td>
    </tr>
  ))

  return (
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
                  onChange={(event) => setnewname(event.target.value)}
                />
              </label>
              <input type="submit" value="Creer" />
            </form>
          </td>
        </tr>
      </tfoot>
    </table>
  )
}

