import React, {Component} from 'react';
import axios from 'axios'
import {connect} from 'react-redux'
import {getBikeSearch} from '../../redux/reducer'
import {Link} from 'react-router-dom'
import BikeModule from './BikeModule/BikeModule'
import SearchFilter from './SearchFilter/SearchFilter'
import './BikeSearch.css'
import {Button} from 'react-bootstrap'

class BikeSearch extends Component {
  constructor() {
    super()
    this.state = {
      searchInput: ''
    }
  }

  componentDidMount () {
    this.props.location.state ? this.getSearch() : this.getBikes()
  }

  getSearch = () => {
    // console.log('this is from the bike search',this.props.location.state)
    axios.get(`/search/input/bikes/${this.props.location.state}`).then(res => {
      // console.log(res.data)
      this.props.getBikeSearch(res.data)
    })
  }

  getBikes = () => {
    axios.get('/search/bikes').then( res => {
      console.log(res.data)
      this.props.getBikeSearch(res.data)
    })
  }

  handleSearchInput (e) {
    this.setState ({
      searchInput: e.target.value
    })
  }

  render () {
    const {bikeSearch} = this.props

    const displayedBikes = bikeSearch.map( (bike, id) => {
      // console.log('the bike!', bike.id)
      return <Link to={`/search/bikes/${bike.id}`}><BikeModule key={id} {...bike} /></Link>
    })

    return (
      <div className="bikesearch-main">
        <div className="bikesearch-search">
          <input
            className="bikesearch-input"
            placeholder="Search brands, models, or keywords"
            onChange={(e) => this.handleSearchInput(e)} />
          <Button id="button-width" className="mainsearch-button">Go!</Button>
        </div>

        <div className="bikesearch-flex">
        <div className="bikesearch-filter">
          <SearchFilter />
        </div>
        <div className="bikesearch-container">
          {displayedBikes}
        </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    bikeSearch: state.bikeSearch
  }
}

const mapDispatchToProps = {
  getBikeSearch
}

export default connect(mapStateToProps, mapDispatchToProps)(BikeSearch);
