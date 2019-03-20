const express = require('express')
const bodyParser = require('body-parser')
const massive = require('massive')
require('dotenv').config()
const session = require('express-session')
const app = express();
const axios = require('axios')
const stripe = require("stripe")(process.env.STRIPE_KEY);


/* Controllers */
const bikesearch = require('./controllers/bikesearch_controller')
const bikeprofile = require('./controllers/bikeprofile_controller')
const userprofile = require('./controllers/userprofile_controller')
const reviews = require('./controllers/bikereview_controller')
const userreviews = require('./controllers/userreview_controller')
const favorites = require('./controllers/favorites_controller')
const cart = require('./controllers/cart_controller')

app.use(bodyParser.json())
app.use( express.static( `${__dirname}/../build` ) )

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 14
  }
}))

  massive(process.env.CONNECTION_STRING).then(database => {
      app.set('db', database);
      console.log('Database is kickin')
  }).catch(error => console.log(error, 'Unexpected error connecting to database'))

// Auth0
app.get('/auth/callback', (req, res) => {
  // console.log('herro from auth callback')
    const payload = {
    client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
    client_secret: process.env.AUTH0_CLIENT_SECRET,
    code: req.query.code,
    grant_type: "authorization_code",
    redirect_uri: `http://${req.headers.host}/auth/callback`
  };

  function tradeCodeForAccessToken() {
    // console.log('trade code for access token')
    return axios.post(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/oauth/token`, payload);
    }

  function tradeAccessTokenForUserInfo(accessTokenResponse) {
    // console.log('trade access token for admin')
    const accessToken = accessTokenResponse.data.access_token;
    return axios.get(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/userinfo?access_token=${accessToken}`);
    }

  function storeUserInfoDatabase (response) {
    // console.log('store user info db')
    const auth0Id = response.data.sub;
    console.log(response.data);

  const db = req.app.get('db');
    return db.get_user(auth0Id).then(users => {
      if(users.length) {
        const user = users[0];
        req.session.user = user;
        res.redirect('/');
      } else {
        const userArray = [
          auth0Id,
          response.data.name,
          response.data.email,
          response.data.picture
        ];
        return db.create_user(userArray).then(newUser => {
          let date = new Date();
          req.session.user = newUser[0];
          db.create_order([req.session.user.id, false, date])
          res.redirect('/');
        }).catch(error => {
          // console.log('error in db.get_user', error);
          res.status(500).send('Unexpected error');
        })
        .catch(error => console.log(error))
      }
    }).catch(error => {
      // console.log('error in db.get_user', error);
      res.status(500).send('Unexpected error');
    })
  }

  tradeCodeForAccessToken()
      .then(tradeAccessTokenForUserInfo)
      .then(storeUserInfoDatabase)
      .catch(error => {
        // console.log('Server error', error)
        res.status(500).send('An error occurred on the server. Check terminal')
      });
  });

// Stripe
app.post('/charge', async (req, res) => {
  // console.log(req.body)

  let {amount,id} = req.body
  // console.log(amount)

  try {
    let {status} = await stripe.charges.create({
      amount:  Math.round(amount * 100),
      currency: "usd",
      description: "An example charge",
      source: id
    });

      console.log('hit')


    res.json({status});
  } catch (err) {
    console.log(err)
  }
});


// Bikes in Search Results
app.get('/search/bikes', bikesearch.get)

// Specific Bike Request in Search
app.get('/user/search/bikes', bikesearch.getSearch)

// Favorites For Specific User
app.get('/user/my_favorites/:id', favorites.getMyFavs)
app.get('/user/favorites/:id', favorites.get)
app.post('/user/favorites/:id', favorites.post)
app.delete('/user/favorites/:id', favorites.delete)

// Specific Bike for each Profile
app.get('/search/bike/:id', bikeprofile.get)

// User
app.get('/user/profile/:id', userprofile.get)
app.get('/user/reviews/:id', userreviews.get)
app.get('/user/orders/:id', userprofile.getOrders)

// Reviews For Specific Bike
app.get('/search/bike/reviews/:id', reviews.get)
app.post('/search/bike/reviews', reviews.post)
app.put('/search/bike/reviews/:id', reviews.update)
app.delete('/search/bike/reviews/:id', reviews.delete)

// Shopping Cart
app.get('/user/order', cart.getOrder)
app.post('/user/cart', cart.addItem)
app.get('/user/cart', cart.getCart)
app.delete('/user/cart', cart.deleteItem)
app.put('/user/cart/:id', cart.clearOrder)

// Retrieves User Session
app.get('/api/user-data', (req, res) => {
  res.json(req.session.user);
});

// Logout Endpoint to Destroy Session
app.post('/api/logout', (req, res) => {
  req.session.destroy();
  res.send();
});

const path = require('path')
app.get('*', (req, res)=>{
  res.sendFile(path.join(__dirname, '../build/index.html'));
})

const PORT = 1993;
app.listen (PORT, () => {
  console.log('Soarin on Port 1993 🚀 ')
})
