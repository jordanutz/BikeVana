module.exports = {
  getOrder: (req, res) => {
    const db = req.app.get('db')
    const {user} = req.query
    db.get_order(user)
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
        taxTotal: taxTotal.toFixed(2),
        orderTotal: cartTotal += taxTotal
      }

      res.status(200).send(userCart)

    })
    .catch(error => console.log('Unexpected error in getting cart', error))
  },

  deleteItem: (req, res) => {
    const db = req.app.get('db')
    const {cart, user, order} = req.query
    db.delete_cart([cart, user, order])
    .then(cart => res.status(200).send(cart))
    .catch(error => console.log(error))
  },

  clearOrder: async (req, res) => {
    const db = req.app.get('db')
    const {id} = req.params
    const {paid, user, date} = req.body
    const newDate = new Date();


    try {
      const orderData = await db.update_orders([id, paid, date])
      const newOrder = await db.create_order([user, false, newDate])
      res.status(200).send(newOrder)
    }

    catch(error) {
      console.log(error)
      res.sendStatus(500)
    }
  }
}
