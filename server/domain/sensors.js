
module.exports.sensorsRepo = (physical) => {
  var devices = {
    devices: [
      { id: 0, protocol: 'Lacrosse' },
      { id: 1, protocol: 'test' }
    ]
  }
  return {
    obtainAllSensors: async () => { return devices.devices }, // physical.Sensors.getAll()
    obtainSensorById: (id) => { devices.devices.find(d => d.id === id) },
    changeLocation: (idSensor, idLocation) => {
      var toModify = devices.devices.find(d => d.id === idSensor)
      if (toModify === undefined) { return undefined } else {
        toModify.idLocation = idLocation
      }
      physical.Sensors.record(toModify)
    }
  }
}
