import React, {Component} from 'react'
import './SingleBikeReview.css'
import UserThumbnail from './UserThumbnail/UserThumbnail'
import StarRatings from 'react-star-ratings'
import {Button} from 'react-bootstrap'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import axios from 'axios'

class SingleBikeReview extends Component {
  constructor() {
    super()
    this.state = {
      editReview: false,
      title: '',
      description: '',
      rating: null,
      pros: '',
      cons: '',
      uses: ''
    }
  }

  changeRating = ( newRating, name ) => {
    this.setState({
      rating: newRating
    });
  }

  toggleEdit = (rating) => {
    this.setState({
      editReview: !this.state.editReview,
      title: this.props.title,
      description: this.props.description,
      rating: rating,
      pros: this.props.pros,
      cons: this.props.cons,
      uses: this.props.best_uses
    })
  }

  cancelEdit = () => {
    this.setState({
      editReview: false
    })
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  submitEdit = (id, title, description, rating, pros, cons, uses, user, bike) => {

    let finalEdit = {
      title,
      description,
      rating,
      pros,
      cons,
      uses,
      user,
      bike
    }

    axios.put(`/search/bike/reviews/${id}`, {finalEdit}).then(res => {
      this.props.setReviews()
    })
    this.setState({
      editReview: false,
      title: '',
      description: '',
      rating: '',
      pros: '',
      cons: '',
      uses: ''
    })
  }

  render () {

    console.log(this.props)


    const {editReview, title, description, rating, pros, cons, uses} = this.state
    const originalRating = parseInt(this.props.rating)
    console.log(this.props)


    const displaySubmit = editReview ?
      <div className="review-options">
        <Button id="submit-edit" onClick={() => this.submitEdit(this.props.id, title, description, rating, pros, cons, uses, this.props.user_id, this.props.bike_id)}>Save Changes</Button>
        <Button id="submit-edit" onClick={this.cancelEdit}>Cancel</Button>
      </div> :
      <div className="review-options">
        <Button onClick={() => this.toggleEdit(originalRating)}>Edit</Button>
        <Button onClick={() => this.props.deleteReview(this.props.id, this.props.bike_id)}>Delete</Button>
      </div>

    const displayStars = editReview ?
      <StarRatings
        id="StarRatings"
        rating={editReview ? rating : originalRating}
        starRatedColor="#00B7E6"
        numberOfStars={5}
        name='rating'
        starDimension="30px"
        starSpacing="4px"
        changeRating={this.changeRating}
        starHoverColor="black"
      /> :
      <StarRatings
        id="StarRatings"
        rating={originalRating}
        starRatedColor="#00B7E6"
        numberOfStars={5}
        name='rating'
        starDimension="30px"
        starSpacing="4px"
      />

    return (
      <div className="singlebikereview-container">
        <div className="singlebike-grid">

          <div className="singlebikeprofile-thumbnail">
            <UserThumbnail user={this.props.user_id} match={this.props.match}/>
          </div>

            <div className="singlebikereview-stats">
              <div className="singlebikereview-single">
                  <span>
                    {displayStars}
                  </span>
                  <input className={editReview ? "show-input" : "none"}
                    name="title"
                    type="text"
                    placeholder={editReview && this.props.title}
                    value={editReview ? title : this.props.title}
                    onChange={(e) => this.handleChange(e)}/>

                  <input className={editReview ? "show-input" : "none"}
                    name="description"
                    type="text"
                    placeholder={editReview && this.props.description}
                    value={editReview ? description : this.props.description}
                    onChange={(e) => this.handleChange(e)}/>
                </div>

                <div className="flex">
                  <div className="singlebikereview-single">
                    <h2> Pros: </h2>
                      <input className={editReview ? "show-input" : "none"}
                        name="pros"
                        type="text"
                        placeholder={editReview && this.props.pros}
                        value={editReview ? pros : this.props.pros}
                        onChange={(e) => this.handleChange(e)}/>

                  </div>
                  <div className="singlebikereview-single">
                    <h2>Cons: </h2>
                      <input className={editReview ? "show-input" : "none"}
                        name="cons"
                        type="text"
                        placeholder={editReview && this.props.cons}
                        value={editReview ? cons : this.props.cons}
                        onChange={(e) => this.handleChange(e)}/>

                  <div className="singlebikereview-single">
                    <h2>Best Uses</h2>
                      <input className={editReview ? "show-input" : "none"}
                        name="uses"
                        type="text"
                        placeholder={editReview && this.props.best_uses}
                        value={editReview ? uses : this.props.best_uses}
                        onChange={(e) => this.handleChange(e)}/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        {displaySubmit}
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
