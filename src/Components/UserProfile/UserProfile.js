import React, {Component} from 'react';
import './UserProfile.css'
import axios from 'axios'
import {Grid, Row, Col, Image, Tabs, Tab, Button} from 'react-bootstrap'
import {connect} from 'react-redux'
import {getFavorites} from '../../redux/reducer'
import SingleUserReview from '../SingleUserReview/SingleUserReview'
import SingleUserFavorite from '../SingleUserFavorite/SingleUserFavorite'
import Order from '../Order/Order'

class UserProfile extends Component {
  constructor() {
    super()
    this.state = {
      userProfile: null,
      userReviews: [],
      userFavorites: null,
      userOrders: [],
      toggleOrders: false
    }
  }

  componentDidMount() {
    this.getReviews()
    this.getProfile()
    this.setFavorites()
    this.setOrders()
  }


  toggleOrders = () => {
    this.setState({
      toggleOrders: !this.state.toggleOrders
    })
  }

  getProfile = (id) => {
    // console.log('hit getProfile')
    axios.get(`/user/profile/${this.props.match.params.id}`).then(res => {
      // console.log(res.data)
      this.setState({
        userProfile: res.data
      })
    })
  }

  getReviews = (id) => {
    axios.get(`/user/reviews/${this.props.match.params.id}`).then(res => {
      // console.log(res.data)
      this.setState({
        userReviews: res.data
      })
    })
  }

  setFavorites = (id) => {
    axios.get(`/user/favorites/${this.props.match.params.id}`).then(res => {
      console.log(res.data)
      this.setState({
        userFavorites: res.data
      })
      this.props.getFavorites(res.data)
    })
  }

  setOrders = (id) => {
    axios.get(`/user/orders/${this.props.match.params.id}`).then(res => {
      this.setState({
        userOrders: res.data
      })
    })
  }

  render () {
    // console.log(this.state)
    // console.log(this.props)
    // console.log(this.props.reviews)
    // console.log(this.state.userReviews)
    // console.log(this.state.userFavorites)
    // console.log(this.state.userOrders)

    let displayedUserReviews;
    let displayedUserFavorites;

    if (this.state.userReviews) {
      displayedUserReviews = this.state.userReviews.map( (review) => {
        return <SingleUserReview key={review.id} match={this.props.match} {...review} />
        })
    }

    if (this.state.userFavorites) {
      displayedUserFavorites = this.state.userFavorites.map( (favorite) => {
        // console.log(favorite)
        return <SingleUserFavorite key={favorite.id} match={this.props.match} {...favorite} />
      })
    }

    const userOrders = this.state.userOrders.map(order => {
      return (
        <Order key={order.cart_id} {...order}/>
      )
    })

    const displayOrders = this.state.userOrders.length >= 1 ?
    <Button onClick={this.toggleOrders}>{this.state.toggleOrders ? 'Close' : 'View Previous Orders'}</Button> : null

    const displayToggle = this.state.toggleOrders ? userOrders :
      <Col xs={12} md={7}>
        <Tabs defaultActiveKey={1}>
          <Tab eventKey={1} title="Reviews">
            {displayedUserReviews}
          </Tab>
          <Tab eventKey={2} title="Wish List">
            {displayedUserFavorites}
          </Tab>
        </Tabs>
      </Col>

    return (
      <div className="userprofile-container">
        <div className="userprofile-inner">
          <Grid>
            <Row className="userprofile-details">
              <Col xs={12} md={5}>
                  <div className="additionalprofile-details">
                    <Image className="profile-photo" src={this.state.userProfile ? this.state.userProfile[0].photo : "Loading..."} />
                    <h2>{this.state.userProfile ? this.state.userProfile[0].username : "Loading..."}</h2>
                    {displayOrders}
                  </div>
              </Col>
              {displayToggle}
            </Row>
          </Grid>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    reviews: state.reviews,
    bikeSearch: state.bikeSearch,
    favorites: state.favorites
  }
}

const mapDispatchToProps = {
  getFavorites
}

export default connect(mapStateToProps, mapDispatchToProps) (UserProfile)
