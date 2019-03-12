import React, {Component} from 'react'
import './ServiceReviews.css'
import {Button} from 'react-bootstrap'

class Reviews extends Component {
  render () {
    return (
      <div className="reviews-container">
        <div className="reviews-headers">
          <h2>Don't Take</h2>
          <h1>Our Word For It</h1><br/>
          <h3>We work harder than hard to make our customers happy. That is why we show
            you all of our customer reviews - including the not-so-great ones.</h3><br/>
        </div>
        <div className="reviewsbutton-container">
          <Button className='reviews-button'>Read Customer Reviews</Button>
        </div>

      </div>
    )
  }
}

export default Reviews;
