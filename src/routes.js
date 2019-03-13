import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Homepage from './Components/Homepage/Homepage'
import BikeSearch from './Components/BikeProfile/BikeSearch/BikeSearch'
import BikeProfile from './Components/BikeProfile/BikeProfile'
import UserProfile from './Components/UserProfile/UserProfile'
import ReviewForm from './Components/ReviewForm/ReviewForm'
import Cart from './Components/Cart/Cart'

export default (

  <Switch>
    <Route exact path='/' component={Homepage} />
    <Route path='/bikes' component={BikeSearch} />
    <Route path="/search/bikes/:id/review" component={ReviewForm} />
    <Route path='/search/bikes/:id' component={BikeProfile} />
    <Route path='/users/profile/:id' component={UserProfile} />
    <Route path='/users/:id/cart' component={Cart} />
  </Switch>

)
