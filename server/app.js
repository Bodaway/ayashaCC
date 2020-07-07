const express = require('express')
const routes = require('./infra/routes')
var app = express()
var cors = require('cors')

const sensorDomain = require('./domain/sensors')
const sensorsStore = sensorDomain.sensorsStore()

const locationDomain = require('./domain/locations')
const locationStore = locationDomain.locationStore()

// Set up a whitelist and check against it:
var whitelist = ['http://localhost:3000', 'http://127.0.0.1:3000', 'http://ayashacc_client:3000', 'http://ayashacc:3000']
var corsOptions = {
  origin: function (origin, callback) {
    console.log('request orign : ' + origin)
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error(`Not allowed by CORS for ${origin}`))
    }
  }
}

// getting-started.js
const mongoose = require('mongoose')
mongoose.connect('mongodb://mongo', { dbName: 'AyashaCC', useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
  console.log('we r connected')
  const kittySchema = new mongoose.Schema({
    name: String
  })
  const Kitten = mongoose.model('Kitten', kittySchema)
  const silence = new Kitten({ name: 'Silence' })
  console.log('finish')

  silence.save(function (err, fluffy) {
    if (err) return console.error(err)
  })
})
console.log('fuck you')

app.use(cors(corsOptions))
app.use(routes.initRoutes(express, sensorsStore, locationStore))
app.listen(7000, () => console.log('Example app listening on port 7000!'))
