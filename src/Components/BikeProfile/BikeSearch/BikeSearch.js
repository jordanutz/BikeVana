import React, {Component} from 'react';
import axios from 'axios'
import {connect} from 'react-redux'
import {getBikeSearch} from '../../../redux/reducer'
import {Link} from 'react-router-dom'
import BikeModule from './BikeModule/BikeModule'
import SearchFilter from './SearchFilter/SearchFilter'
import './BikeSearch.css'
import {Button, Grid, Row, Col} from 'react-bootstrap'

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
    this.setState({
      searchInput: this.props.location.state[0].name
    })

    axios.get(`/search/input/bikes/${this.props.location.state}`).then(res => {
      console.log(res.data)
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
    let displayedBikes 

    if (bikeSearch.length) { 
      displayedBikes = bikeSearch.map( bike => {
        // console.log('the bike!', bike.id)
        return (
          <div key={bike.id}>
            <Link to={`/search/bikes/${bike.id}`}><BikeModule {...bike} /></Link>
          </div>
        )
      })
    } else {
      displayedBikes = null
    }

   

    return (
      <div className="bikesearch-main">

        <div className="bikesearch-parent">
          <Grid>
            <Row>
              <Col xs={12}>
                <div className="bikesearch-search">
                  <input
                    className="bikesearch-input"
                    placeholder="Search brands, models, or keywords"
                    onChange={(e) => this.handleSearchInput(e)} 
                    value={this.state.searchInput}
                  />
                  <Button id="button-width" className="mainsearch-button">Go!</Button>
                </div>
              </Col>
            </Row>
          </Grid>
        </div>
        <Grid>
          <Row>
            <Col xs={0} sm={0} md={3} lg={3}>
              <div className="bikesearch-filter">
                <SearchFilter />
              </div>
            </Col>

            <Col xs={12} sm={12} md={9} lg={9} style={{padding: '0'}}>
  
                {
                displayedBikes ? 
                  <div className="bikesearch-container">
                    {displayedBikes} 
                  </div>
                  : 
                  <section className="no-results">
                    <h2>WE'RE SORRY!</h2>
                    <h3>No Matching Bicycles Found.</h3>
                  </section> 
                } 
  
            </Col>
          </Row>
        </Grid>

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
