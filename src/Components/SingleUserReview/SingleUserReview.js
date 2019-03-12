import React from 'react'
import './SingleUserReview.css'
import BikeThumbnail from './BikeThumbnail/BikeThumbnail'
import StarRatings from 'react-star-ratings'
import {connect} from 'react-redux'

const SingleUserReview = (props) => {

  const rating = parseInt(props.rating)

  return (
    <div id="border" className="singleuserreview-container">
      <div className="singleuserreview-thumbnail">
        <BikeThumbnail id={props.bike_id} match={props.match}/>
          <h2><StarRatings
                rating={rating}
                starRatedColor="#00B7E6"
                name="rating"
                starSpacing="2px"
                starDimension="20px"
              /></h2>
      </div>
      <div className="singleuserreview-details">
        <h1>{props.title}</h1>
        <h3>Pros: {props.pros}</h3>
        <h3>Cons: {props.cons}</h3>
        <h3>Best Uses: {props.best_uses}</h3><br/>
        <h3>{props.description}</h3>
      </div>
    </div>
  )
}

export default SingleUserReview;
