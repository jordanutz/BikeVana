module.exports = {
  get: (req, res) => {
    const db = req.app.get('db')
    const {params} = req;
    db.get_favorites(req.session.user.id)
    .then(favorite =>  {
      res.status(200).send(favorite)
    })
    .catch(error => console.log('Unexpected error in retrieving favorites', error))
  },

  getMyFavs(req, res){
    const db = req.app.get('db')
    const {params} = req;
    db.get_my_favorites([req.session.user.id, params.id])
    .then(favorite =>  {
      res.status(200).send(favorite)
    })
    .catch(error => console.log('Unexpected error in retrieving favorites', error))
  },

  post: (req, res) => {
    const db = req.app.get('db')
    const {user_id, bike_id, favorite} = req.body.favoriteInput
    const {params} = req;
    db.create_favorite([user_id, bike_id, favorite, params.id])
    .then(favorite => res.status(200).send(favorite))
    .catch(error => console.log('Unexpected error in creating favorite', error))
  },

  delete: (req, res) => {
    const db = req.app.get('db')
    const {query, params} = req;
    db.delete_favorites([params.id, query.user_id])
    .then(favorite => res.status(200).send(favorite))
    .catch(error => console.log('Unexpected error in deleting favorite', error))
  }
}
