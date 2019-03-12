import React from 'react'
import './SingleBikeReview.css'
import UserThumbnail from './UserThumbnail/UserThumbnail'
import StarRatings from 'react-star-ratings'
import {Button} from 'react-bootstrap'
import {connect} from 'react-redux'

const SingleBikeReview = (props) => {

  const rating = parseInt(props.rating)

  return (
    <div className="singlebikereview-container">
      <div className="singlebike-grid">

        <div className="singlebikeprofile-thumbnail">
          <UserThumbnail user={props.user_id} match={props.match}/>
        </div>

          <div className="singlebikereview-stats">
            <div className="singlebikereview-single">
                <span>
                  <StarRatings
                    id="StarRatings"
                    rating={rating}
                    starRatedColor="#00B7E6"
                    numberOfStars={5}
                    name='rating'
                    starDimension="30px"
                    starSpacing="4px"
                  />
                </span>
                <h2>{props.title}</h2>
                <h3>{props.description}</h3>
              </div>

              <div className="flex">
                <div className="singlebikereview-single">
                  <h2> Pros: </h2> <span>{props.pros}</span>
                </div>
                <div className="singlebikereview-single">
                  <h2>Cons: </h2> <span>{props.cons}</span>
                </div>
                <div className="singlebikereview-single">
                  <h2>Best Uses:</h2> <span>{props.best_uses}</span>
                </div>
              </div>
            </div>
      </div>
      <div className="review-options">
        <Button>Edit</Button>
        <Button onClick={() => props.deleteReview(props.id)}>Delete</Button>
      </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default SingleBikeReview
