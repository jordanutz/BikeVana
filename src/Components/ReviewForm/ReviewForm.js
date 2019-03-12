import React, {Component} from 'react';
import './ReviewForm.css'
import {Button} from 'react-bootstrap';
import {getReviews} from '../../redux/reducer'
import {connect} from 'react-redux';
import axios from 'axios';
import {FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import StarRatings from 'react-star-ratings'

class Review extends Component {
  constructor () {
    super()
    this.state = {
      title: '',
      description: '',
      date: '',
      rating: 0,
      pros: '',
      cons: '',
      uses: '',
    }
  }

  componentDidMount () {
    window.scrollTo(0, 0)
  }

  changeRating = (newRating, name) => {
      this.setState({
        rating: newRating
      });
    }


  createReview = (title, description, rating, date_posted, pros, cons, best_uses, user_id, bike_id) => {
    const reviewInput = {
      title,
      description,
      rating,
      date_posted,
      pros,
      cons,
      best_uses,
      user_id,
      bike_id
    }
    axios.post(`/search/bike/reviews/${this.props.match.params.id}`, {reviewInput}).then( res => {
      // console.log(res)
      // this.props.getReviews(res.data)
      this.props.history.push(`/search/bikes/${this.props.match.params.id}`)
    }).catch(error => console.log(error))
  }

  handleTitle = (e) => {
    console.log(e)
    this.setState({
      title: e.target.value
    })
  }

  handleDescription = (e) => {
    console.log(e)
    this.setState({
      description: e.target.value
    })
  }

  handleRating = (e) => {
    this.setState({
      rating: e.target.value
    })
  }

  handlePros = (e) => {
    console.log(e)
    this.setState({
      pros: e.target.value
    })
  }

  handleCons = (e) => {
    this.setState({
      cons: e.target.value
    })
  }

  handleUses = (e) => {
    console.log(e.target.value)
    this.setState({
      uses: e.target.value
    })
  }

  render () {
    console.log(this.state.rating)

    const {title, description, rating, pros, cons, uses, date} = this.state
    const {user} = this.props

    return (
      <div className="writereview-container">
        <div className="itemreview-details">
          <h1>You are reviewing: {this.props.location.state.bike.name}</h1>
        </div>
        <div className="writereview-grid">
        <div className="itemreview-container">
          <img className="itemreview-photo" src={this.props.location.state.bike.image} alt="Review Icon"/>

            <StarRatings
              id="StarRatings"
              rating={this.state.rating}
              starRatedColor="#00B7E6"
              changeRating={this.changeRating}
              numberOfStars={5}
              name='rating'
              starHoverColor="#00B7E6"
            />
        </div>

        <div className="reviewform-container">

          <h2>Headline:</h2>
            <FormGroup
                controlId="formBasicText">
              <FormControl
                type="text"
                value={this.state.title}
                onChange={this.handleTitle}/>
            </FormGroup>

            <FormGroup controlId="formControlsTextarea">
              <ControlLabel>Description:</ControlLabel>
              <FormControl id="description-input" componentClass="textarea" onChange={this.handleDescription} placeholder="What did you like or dislike? What did you use this product for?" />
            </FormGroup>

            <h2>Pros:</h2>
              <FormGroup
                  controlId="formBasicText">
                <FormControl
                  type="text"
                  value={this.state.pros}
                  onChange={this.handlePros}/>
              </FormGroup>

              <h2>Cons:</h2>
                <FormGroup
                    controlId="formBasicText">
                  <FormControl
                    type="text"
                    value={this.state.cons}
                    onChange={this.handleCons}/>
                </FormGroup>

                <h2>Best Uses:</h2>
                  <FormGroup
                      controlId="formBasicText">
                    <FormControl
                      type="text"
                      value={this.state.uses}
                      onChange={this.handleUses}/>
                  </FormGroup>
              </div>
        </div>

        <div className="submitreview-container">

          <Button onClick={() => this.createReview(title, description, rating, date, pros, cons, uses, user.id, this.props.match.params.id)}>Submit Review</Button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    bikeSearch: state.bikeSearch,
    reviews: state.reviews,
    user: state.user
  }
}

const mapDispatchToProps = {
  getReviews
}

export default connect(mapStateToProps, mapDispatchToProps)(Review);
