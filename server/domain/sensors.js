
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
    changeLocation: (idsensor, idlocation) => {
      var tomodify = devices.devices.find(d => d.id === idsensor)
      if (tomodify === undefined) { return undefined } else {
        tomodify.idlocation = idlocation
      }
      physical.Sensors.record(tomodify)
    }
  }
}
