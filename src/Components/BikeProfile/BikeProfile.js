import React, {Component} from 'react'
import './BikeProfile.css'

// Redux
import {connect} from 'react-redux'
import {getBikeSearch, getFavorites, logIn, getReviews} from '../../redux/reducer'

// Components
import SingleBikeReview from '../SingleBikeReview/SingleBikeReview'

// Packages
import NumericInput from 'react-numeric-input'
import StarRatings from 'react-star-ratings'
import {Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import axios from 'axios'

class BikeProfile extends Component {
  constructor() {
    super()
    this.state = {
      bike: {},
      rating: 0,
      userFavorite: '',
      quantity: 1
    }
  }

  componentDidMount(){
    this.getBike()
    this.setReviews()
    this.setFilter()

    axios.get(`/user/my_favorites/${this.props.match.params.id}`).then(res => {
      this.setState({
        userFavorite: res.data
      })
      this.props.getFavorites(res.data)
    }).catch(error => console.log(error))

    window.scrollTo(0, 0)
  }

// ------------ Cart --------------

  inputQuantity = (valueAsNumber) => {
     this.setState({
       quantity: valueAsNumber
     })
   }

  addCart = (order, bike, quantity) => {
    const addedItem = {
      order,
      bike,
      quantity
    }
    axios.post('/user/cart', addedItem).then(res => {
      console.log(res.data)
    })
  }


// ------------ Bikes --------------

  getBike = () => {
    axios.get(`/search/bike/${this.props.match.params.id}`).then(res => {
      // console.log(res.data)
      this.setState({
        bike: res.data.bike[0],
        rating: res.data.rating
      })
    }).catch(error => console.log(error))
  }

// ------------ Filter --------------

  setFilter = () => {
    axios.get(`/bike/filter?brand=${this.state.brand}
      &category=${this.state.category}
      &gender=${this.state.gender}
      &color=${this.state.color}
      &price=${this.state.price}
      &year=${this.state.year}`)
      .then(res => {
        this.setState({
          bike: res.data
        })
      }).catch(error => console.log(error))
  }

  runFilter = () => {
    axios.get(`/bike/filter?brand=${this.state.brand}
      &category=${this.state.category}
      &gender=${this.state.gender}
      &color=${this.state.color}
      &price=${this.state.price}
      &year=${this.state.year}`)
      .then(res => {
        this.setState({
          bike: res.data
        })
        this.props.getBikeSearch(res.data)
      }).catch(error => console.log(error))
  }

// ------------ Reviews --------------

  setReviews = () => {
    // console.log(this.props.match.params.id)
    // console.log('set reviews')
    // console.log(this.props.match.params.id)
    axios.get(`/search/bike/reviews/${this.props.match.params.id}`).then(res => {
      this.props.getReviews(res.data)
    })
  }

  deleteReview = (id, bike) => {
    // console.log(bike)
    axios.delete(`/search/bike/reviews/${id}?bike=${bike}`).then(res => {
      console.log(res.data)
      this.props.getReviews(res.data)
    })
  }


// ------------ User Favorites --------------
// User can add bike to favorites, which will display on their profile.

  createFavorite = (user_id, bike_id, favorite) => {
    // console.log('hit create favorite')
    // console.log(user_id)
    const favoriteInput = {
      user_id,
      bike_id,
      favorite
    }

    axios.post(`/user/favorites/${this.props.match.params.id}`, {favoriteInput}).then(res => {
      // console.log(res.data)
      this.props.getFavorites(res.data)
    }).catch(error => console.log(error))
  }

  deleteFavorite = (user_id) => {
    axios.delete(`/user/favorites/${this.props.match.params.id}?user_id=${user_id}`).then(res => {
      // console.log(res.data)
      this.props.getFavorites(res.data)
    }).catch(error => console.log(error))
  }

  toggleFavorite = () => {
    this.setState({
      toggleFavorite: !this.state.toggleFavorite
    })
  }

  render () {

    const userReview = this.props.reviews.find(review => review.user_id)

    const reviewbutton = this.props.user.auth0_id && !userReview ?
      <Link to = {{
          pathname: `/search/bikes/${this.props.match.params.id}/review`,
          state: {
            bike: this.state.bike
          }
        }}><Button>Write Review</Button></Link> : null

    const addfavorite = this.props.user.auth0_id && <Button onClick={() => this.createFavorite(this.props.user.id, this.props.match.params.id, true)}>Add To Wish List</Button>
    const removefavorite = this.props.user.auth0_id && <Button onClick={() => this.deleteFavorite(this.props.user.id)}>Remove</Button>

    const displayRating = !this.state.rating ?
      <span>There are no reviews yet for this bike</span> :
        <div className="ratings-stats">
          <StarRatings
          rating={this.state.rating}
          starRatedColor="#00B7E6"
          name="rating"
          starSpacing="2px"
          starDimension="20px"
          />
        <span>{this.props.reviews.length}</span>
      </div>

    const addCart = this.props.user.auth0_id ?
      <div className="bikeprofile-purchase">
        <h4>Quantity: <NumericInput min={1} value={this.state.quantity} onChange={this.inputQuantity} /> </h4>
        <div className="addbike-buttons">
          <Button className="cart-button" onClick={() => this.addCart(this.props.order.id, this.props.bikeSearch[0].id, this.state.quantity)}>Add To Cart</Button>
          {this.state.userFavorite.length ? removefavorite : addfavorite }
        </div>
      </div>
    : 'Please sign in to add to your cart!'

    let displayedReviews = this.props.reviews.map( review => {
      return <SingleBikeReview key={review.id}
        match={this.props.match}
        {...review}
        deleteReview={this.deleteReview}
        bike={this.state.bike}
        />
    })

    return (
      <div className="bikeprofile-container">
        <div className="bikeprofile-heading">
          <div className="bikeprofile-grid">

            <div className="bikeprofile-image">
              <img src={this.state.bike && this.state.bike.image} alt="Searched Bike"  />
            </div>

            <div className="bikeprofile-details">
              <h1>{this.state.bike && this.state.bike.brand}</h1>
              <h2>{this.state.bike && this.state.bike.name}</h2>
              <div className="bikeprofile-ratings">
                <p>{displayRating}</p>
                <h3>${this.state.bike && this.state.bike.price}</h3>
                {addCart}
              </div>
            </div>
          </div>
          <div className="bikeprofile-secondary">
            <div className="bikeprofile-additional">
              <h5>Details</h5>
              <p>{this.state.bike ? this.state.bike.details : null}</p><br/>
              <div className="bikereviews-additional">
                <h5>Reviews</h5>
                {reviewbutton}
              </div>
            </div>
            <div className="displayedreviews-container">
              {displayedReviews ? displayedReviews : 'Loading...'}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    bikeSearch: state.bikeSearch,
    user: state.user,
    reviews: state.reviews,
    favorites: state.favorites,
    order: state.order
  }
}

const mapDispatchToProps = {
  getBikeSearch,
  getReviews,
  logIn,
  getFavorites
}

export default connect(mapStateToProps, mapDispatchToProps)(BikeProfile)
