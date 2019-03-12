module.exports = {
  get: (req, res) => {
    const db = req.app.get('db')
    db.get_bikes()
    .then(bike => res.status(200).send(bike))
    .catch(error => console.log('Unexpected error in retrieving bikes', error))
  },

  getSearch: (req, res) => {
    const db = req.app.get('db')
    const {name, brand, category} = req.query
    db.bike_search([name, brand, category])
    .then(bike => res.status(200).send(bike))
    .catch(error => console.log('Unexpected error in retrieving bike in search', error))
  }
}
