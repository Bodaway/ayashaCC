
module.exports.locationRepo = (physical) => {
  return {
    obtainAllLocations: async () => { return physical.Locations.getAll() },
    add: async (name) => { return physical.Locations.add(name) }
  }
}
