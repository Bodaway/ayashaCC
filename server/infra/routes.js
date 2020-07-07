
module.exports.initRoutes = (express, sensorsStore, locationStore) => {
  var router = express.Router()

  router.route('/locations').get(function (req, res) {
    res.json(locationStore.obtainAllLocations())
  })

  router.route('/sensors').get((req, res) => {
    res.json(sensorsStore.obtainAllSensors())
  })

  router.route('/sensors/:sensorid/location/:locationid').put((req, res) => {
    res.json(sensorsStore.changeLocation(+req.params.sensorid, +req.params.locationid))
  })

  return router
}
