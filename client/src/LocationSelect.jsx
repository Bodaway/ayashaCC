import React, { useState } from 'react'
import PropTypes from 'prop-types'

const LocationSelect = ({ selectionslist, selectedid, exselect }) => {
  const [selected, setSelected] = useState(selectedid)
  const opt = selectionslist.map((l) => (
    <option key={l.id.toString()} value={l.id}>
      {l.name}
    </option>
  ))
  const selectionChange = (event) => {
    console.log('Click happened')
    setSelected(event.target.value)
    exselect(event)
  }

  return (
    <select name="locationSelect" value={selected} onChange={selectionChange}>
      <option key="-1" value="undefined">
        non assigner
      </option>
      {opt}
    </select>
  )
}

LocationSelect.propTypes = {
  selectionslist: PropTypes.array,
  selectedid: PropTypes.string
}

export default LocationSelect
