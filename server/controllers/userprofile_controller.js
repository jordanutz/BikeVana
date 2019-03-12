module.exports = {
  get: (req, res) => {
    const db = req.app.get('db')
    const {params} = req
    db.get_profiles([params.id])
    .then(user => res.status(200).send(user))
    .catch(error => console.log('Unable to retrieve user', error))
  }
}
