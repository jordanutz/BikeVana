import React, {Component} from 'react';
import axios from 'axios'
import './UserThumbnail.css'
import {Image} from 'react-bootstrap';

class UserThumbnail extends Component {
  constructor() {
    super()
    this.state = {
      user: ''
    }
  }

  componentDidMount() {
    axios.get(`/user/profile/${this.props.user}`).then( res => {
      this.setState({
        user: res.data
      })
    })
  }

  render () {

    return (
      <div className="userthumbnail-container">
        <Image className="thumbnail-image" src={this.state.user ? this.state.user[0].photo : "Loading"} circle />
        <h1>{this.state.user ? this.state.user[0].username : "Loading"}</h1>
      </div>
    )
  }
}

export default UserThumbnail;
