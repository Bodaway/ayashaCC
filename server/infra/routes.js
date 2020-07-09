
module.exports.initRoutes = (express, sensorsStore, locationStore) => {
  var router = express.Router()

  router.route('/locations').get(async function (req, res) {
    const locs = await locationStore.obtainAllLocations()
    res.json(locs)
  })

  router.route('/sensors').get(async (req, res) => {
    const devices = await sensorsStore.obtainAllSensors()
    res.json({ devices: devices })
  })

  router.route('/sensors/:sensorid/location/:locationid').put((req, res) => {
    res.json(sensorsStore.changeLocation(+req.params.sensorid, +req.params.locationid))
  })

  return router
}
