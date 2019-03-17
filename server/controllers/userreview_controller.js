module.exports = {
  get: (req, res) => {
    const db = req.app.get('db')
    const {id} = req.params
    // console.log(id)
    db.get_userreviews(id)
    .then(review => res.status(200).send(review))
    .catch(error => console.log('Unexpected error in retrieving user reviews', error))
  }
}
