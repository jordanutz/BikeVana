module.exports = {
  get: (req, res) => {
    const db = req.app.get('db')
    const {id} = req.params
    db.get_bike(id)
    .then(bike => {
      // console.log(bike)
      db.get_ratings(bike[0].id).then(rating => {

        let finalRating = !rating[0].average ? 0 : rating[0].average

        let bikeProfile = {
          bike: bike,
          rating: parseInt(finalRating)
        }

        res.status(200).send(bikeProfile)

      })
    })
    .catch(error => console.log('Unexpected error in retreiving bike information', error))
  }
}
