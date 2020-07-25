import React from 'react'
import './App.css'
import Sensors from './components/Sensors'
import LocationsEditor from './components/LocationsEditor'

const App = () => {
  console.log('hello')
  return (
    <div className="App">
      <table>
        <thead>
          <tr>Ayasha Command and Control</tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <Sensors />
            </td>
            <td>
              <LocationsEditor />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default App
