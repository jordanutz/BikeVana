import React, {Component} from 'react'
import axios from 'axios'
import './BikeThumbnail.css'
import {Link} from 'react-router-dom'

class BikeThumbnail extends Component {
  constructor() {
    super()
    this.state = {
      bike: {}
    }
  }

  componentDidMount () {
    axios.get(`/search/bike/${this.props.id}`).then( res => {
      this.setState({
        bike: res.data.bike[0]
      })
    })
  }

  render () {

    return (
      <div className="bikethumbnail-container">
        <img src={this.state.bike && this.state.bike.image} alt="Bike Icon" />
        <Link to={`/search/bikes/${this.state.bike.id}`}><h2>{this.state.bike && this.state.bike.name}</h2></Link>
      </div>
    )
  }
}

export default BikeThumbnail;
