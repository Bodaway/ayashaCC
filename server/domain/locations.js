
module.exports.locationStore = () => {
  var locations = {
    locations: [
      { id: 0, name: 'Salon' },
      { id: 1, name: 'Chambre' }
    ]
  }
  return {
    obtainAllLocations: () => { return locations }
  }
}
