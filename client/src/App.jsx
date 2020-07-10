import React from 'react'
import './App.css'
import { Sensors } from './components/Sensors'
import { LocationsEditor } from './components/LocationsEditor'

function App() {
  console.log('hello')
  return (
    <div className="App">
      <Sensors />
      <LocationsEditor />
    </div>
  )
}

export default App
