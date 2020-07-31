import React from 'react'
import './App.css'
import Sensors from './components/Sensors'
import LocationsEditor from './components/LocationsEditor'

const App = () => {
  console.log('hello')
  return (
    <div className="App">
      <h1 className="mainTitle">Ayasha Command & Control</h1>
      <div className="sections">
       <Sensors />
      <LocationsEditor /> 
      </div>
      
    </div>
  )
}

export default App
