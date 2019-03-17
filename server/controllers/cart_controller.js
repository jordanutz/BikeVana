module.exports = {
  getOrder: (req, res) => {
    const db = req.app.get('db')
    db.get_order([req.query.user.id])
    .then(order => res.status(200).send(order))
    .catch(error => console.log(error))
  },
  addItem: (req, res) => {
    const db = req.app.get('db')
    const {order, bike, quantity} = req.body
    db.add_cart([order, bike, quantity])
  },
  getCart: (req, res) => {
    const db = req.app.get('db')
    const {user, order} = req.query
    db.get_cart([user, order])
    .then(cart => {

      let cartTotal = cart.reduce( (total, item) => {
        return total + (parseInt(item.price) * item.quantity)
      }, 0)

      let taxTotal = 0.06 * cartTotal

      let userCart = {
        cart,
        cartTotal,
        taxTotal,
        orderTotal: cartTotal += taxTotal
      }

      res.status(200).send(userCart)

    })
    .catch(error => console.log('Unexpected error in getting cart', error))
  }
}
