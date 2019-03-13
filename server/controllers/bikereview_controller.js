module.exports = {
  get: (req, res) => {
    const db = req.app.get('db')
    const {id} = req.params
    db.get_bikereviews([id])
    .then(reviews => res.status(200).send(reviews))
    .catch(error => console.log('Unable to retrieve reviews for specific bike'))
  },

  post: (req, res) => {
    const db = req.app.get('db')
    const {title, description, rating, pros, cons, best_uses, user_id, bike_id} = req.body.reviewInput
    const {id} = req.params
    let date_posted = new Date();
    console.log(title, description, rating, date_posted, pros, cons, best_uses, user_id, bike_id, id)
    // console.log('hit post')
    db.create_reviews([title, description, rating, date_posted, pros, cons, best_uses, user_id, bike_id, id])
    .then(review => res.status(200).send(review))
    .catch(error => console.log('Unexpected error in posting review', error))
  },

  update: (req, res) => {
    const db = req.app.get('db')
    const {id} = req.params
    const {title, description, rating, pros, cons, uses, user, bike} = req.body.finalEdit
    db.update_reviews([id, title, description, rating, pros, cons, uses, user, bike])
    .then(res.status(200))
    .catch(error => console.log(error))
  },

  delete: (req, res) => {
    const db = req.app.get('db')
    const {id} = req.params
    db.delete_reviews([id, req.query.bike])
    .then(reviews => res.status(200).send(reviews))
    .catch(error => console.log('Unexpected error in deleting review', error))
  }
}
