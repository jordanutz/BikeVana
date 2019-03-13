import React, {Component} from 'react'
import './SingleBikeReview.css'
import UserThumbnail from './UserThumbnail/UserThumbnail'
import StarRatings from 'react-star-ratings'
import {Button} from 'react-bootstrap'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

class SingleBikeReview extends Component {
  constructor() {
    super()
    this.state = {
      editReview: false
    }
  }

  toggleEdit = () => {
    this.setState({
      editReview: !this.state.editReview
    })
  }

  render () {

    const rating = parseInt(this.props.rating)
    const displayEdit = this.state.editReview &&
      <div className="edit-form">
        Edit Form
      </div>

      const displaySubmit = this.state.editReview ?
      <Button id="submit-edit">Save Changes</Button> :
      <Button onClick={this.toggleEdit}>Edit</Button>

    return (
      <div className="singlebikereview-container">
        {displayEdit}
        <div className="singlebike-grid">

          <div className="singlebikeprofile-thumbnail">
            <UserThumbnail user={this.props.user_id} match={this.props.match}/>
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
                  <h2>{this.props.title}</h2>
                  <h3>{this.props.description}</h3>
                </div>

                <div className="flex">
                  <div className="singlebikereview-single">
                    <h2> Pros: </h2> <span>{this.props.pros}</span>
                  </div>
                  <div className="singlebikereview-single">
                    <h2>Cons: </h2> <span>{this.props.cons}</span>
                  </div>
                  <div className="singlebikereview-single">
                    <h2>Best Uses:</h2> <span>{this.props.best_uses}</span>
                  </div>
                </div>
              </div>
        </div>
        <div className="review-options">
          {displaySubmit}
          <Button onClick={() => this.props.deleteReview(this.props.id, this.props.bike_id)}>Delete</Button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default SingleBikeReview
