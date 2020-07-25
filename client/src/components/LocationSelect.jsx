import React, { useState } from 'react'
import PropTypes from 'prop-types'

const LocationSelect = ({ selectionsList, selectedId, locationChange }) => {
  const [selected, setSelected] = useState(selectedId)
  const opt = selectionsList.map((l) => (
    <option key={l.id.toString()} value={l.id}>
      {l.name}
    </option>
  ))
  const selectionChange = (event) => {
    console.log('Click happened')
    setSelected(event.target.value)
    locationChange(event)
  }

  return (
    <div>
      <select name="locationSelect" value={selected} onChange={selectionChange}>
        <option key="-1" value="undefined">
          non assigner
        </option>
        {opt}
      </select>
    </div>
  )
}

LocationSelect.propTypes = {
  selectionsList: PropTypes.array,
  selectedId: PropTypes.number
}

export default LocationSelect
