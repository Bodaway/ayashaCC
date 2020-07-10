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
    idLocation: String,
    dtDebutVersion: Date,
    dtFinVersion: Date
  })
  const SensorModel = mongoose.model('Sensors', sensorSch)
  const SensorDtoToEntity = (sensor) => { return { id: sensor.id, protocol: sensor.protocol, idLocation: sensor.idLocation } }

  const locationSch = new mongoose.Schema({
    id: Number,
    name: String,
    dtDebutVersion: Date,
    dtFinVersion: Date
  })
  const LocationModel = mongoose.model('Locations', locationSch)
  const LocationDtoToEntity = (dto) => { return { id: dto.id, name: dto.name } }

  const counterSch = new mongoose.Schema({
    id: String,
    sequence_current: Number
  })
  const CounterModel = mongoose.model('Counter', counterSch)
  const getNextSequenceValue = async (sequenceName) => {
    var counter = await CounterModel.findOne({ id: sequenceName })
    if (counter !== null) {
      counter.sequence_current++
    } else {
      counter = new CounterModel({
        id: sequenceName,
        sequence_current: 0
      })
    }
    await counter.save()
    return counter.sequence_current
  }

  return {
    Sensors: {
      getAll: async () => {
        const all = await SensorModel.find({ dtFinVersion: null })
        return all.map(s => SensorDtoToEntity(s))
      },
      record: async (sensor) => {
        const current = await SensorModel.find({ id: sensor.id, protocol: sensor.protocol })
        if (current.length > 1) { console.log(`il y a plusieurs sensor actif avec le meme id ${sensor.id}`) }
        const dtDebutNewVersion = Date.now()
        current.map(async s => {
          s.dtFinVersion = dtDebutNewVersion
          await s.save()
        })

        const newVersion = new SensorModel({
          id: sensor.id,
          protocol: sensor.protocol,
          idLocation: sensor.idLocation,
          dtDebutVersion: dtDebutNewVersion
        })
        await newVersion.save()
      }
    },
    Locations: {
      getAll: async () => {
        const all = await LocationModel.find({ dtFinVersion: null })
        return all.map(s => LocationDtoToEntity(s))
      },
      add: async (name) => {
        const dto = new LocationModel({
          id: await getNextSequenceValue('location'),
          name: name,
          dtDebutVersion: Date.now()
        })
        await dto.save()
        return LocationDtoToEntity(dto)
      }
    }
  }
}
