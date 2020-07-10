
module.exports.initRoutes = (express, sensorsStore, locationStore) => {
  var router = express.Router()

  router.route('/sensors').get(async (req, res) => {
    const devices = await sensorsStore.obtainAllSensors()
    res.json({ devices: devices })
  })

  router.route('/sensors/:sensorId/location/:locationId').put((req, res) => {
    res.json(sensorsStore.changeLocation(+req.params.sensorId, +req.params.locationId))
  })

  router.route('/locations').get(async function (req, res) {
    const locs = await locationStore.obtainAllLocations()
    res.json({ locations: locs })
  })
  router.route('/locations/:name').put(async (req, res) => {
    const loc = await locationStore.add(req.params.name)
    res.json(loc)
  })

  return router
}
