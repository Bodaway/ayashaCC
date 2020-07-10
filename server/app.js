const express = require('express')
const routes = require('./infra/routes')
var app = express()
var cors = require('cors')

const phyStore = require('./infra/connection').getPhysicalStore()

const sensorDomain = require('./domain/sensors')
const sensorsRepo = sensorDomain.sensorsRepo(phyStore)

const locationDomain = require('./domain/locations')
const locationRepo = locationDomain.locationRepo(phyStore)

// Set up a whitelist and check against it:
var whitelist = ['http://localhost:3000', 'http://127.0.0.1:3000']
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

app.use(cors(corsOptions))
app.use(routes.initRoutes(express, sensorsRepo, locationRepo))
app.listen(7000, () => console.log('Example app listening on port 7000!'))
