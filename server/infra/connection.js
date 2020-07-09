const mongoose = require('mongoose')

module.exports.getPhysicalStore = () => {
  mongoose.connect('mongodb://mongo', { dbName: 'AyashaCC', useNewUrlParser: true, useUnifiedTopology: true })

  const db = mongoose.connection
  db.on('error', console.error.bind(console, 'connection error:'))
  db.once('open', function () {
    console.log('we re connected')
  })

  const sensorSch = new mongoose.Schema({
    id: String,
    protocol: String,
    idlocation: String,
    dtDebutVersion: Date,
    dtFinVersion: Date
  })
  const SensorModel = mongoose.model('Sensors', sensorSch)
  const SensorDotToEntity = (sensor) => { return { id: sensor.id, protocol: sensor.protocol, idlocation: sensor.idlocation } }

  const locationSch = new mongoose.Schema({
    id: Number,
    name: String,
    dtDebutVersion: Date
  })
  const LocationModel = new mongoose.model('Locations', locationSch)
  const LocationDtoToEntity = (dto) => { return { id: dto.id, name: dto.name } }

  return {
    Sensors: {
      getAll: async () => {
        const all = await SensorModel.find({ dtFinVersion: null })
        return all.map(s => SensorDotToEntity(s))
      },
      record: async (sensor) => {
        const current = await SensorModel.find({ id: sensor.id, protocol: sensor.protocol })
        if (current.length > 1) { console.log(`il y à plusieurs sensor actif avec le meme id ${sensor.id}`) }
        const dtDebutNewVersion = Date.now()
        current.map(async s => {
          s.dtFinVersion = dtDebutNewVersion
          await s.save()
        })

        const newVersion = new SensorModel({
          id: sensor.id,
          protocol: sensor.protocol,
          idlocation: sensor.idlocation,
          dtDebutVersion: dtDebutNewVersion
        })
        await newVersion.save()
      }
    },
    Locations: {
      getAll: async () => {
        const all = await LocationModel.find({})
        return all.map(s => LocationDtoToEntity(s))
      },
      record: async (loc) => {
        const location = new LocationModel({
          id: loc.id,
          name: loc.name,
          dtDebutVersion: Date.now()
        })
        await location.save()
      }
    }
  }
}
