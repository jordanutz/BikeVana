module.exports = {
  get: (req, res) => {
    const db = req.app.get('db')
    const {params} = req
    db.get_profiles([params.id])
    .then(user => res.status(200).send(user))
    .catch(error => console.log('Unable to retrieve user', error))
  },
  getOrders: (req, res) => {
    const db = req.app.get('db')
    const {id} = req.params
    db.get_orders(id)
    .then(orders => res.status(200).send(orders))
    .catch(error => console.log(error))
  }
}
