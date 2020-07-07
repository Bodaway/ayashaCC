
module.exports.sensorsStore = () => {
  var devices = {
    devices: [
      { id: 0, protocol: 'Lacrosse' },
      { id: 1, protocol: 'test' }
    ]
  }
  return {
    obtainAllSensors: () => { return devices },
    obtainSensorById: (id) => { devices.devices.find(d => d.id === id) },
    changeLocation: (idsensor, idlocation) => {
      var tomodify = devices.devices.find(d => d.id === idsensor)
      if (tomodify === undefined) { return undefined } else {
        tomodify.idlocation = idlocation
      }
    }
  }
}
