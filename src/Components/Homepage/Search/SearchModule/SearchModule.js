import React, {Component} from 'react'
import './SearchModule.css'
import {Tabs, Tab, Button} from 'react-bootstrap'
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import {getBikeSearch} from '../../../../redux/reducer'

class SearchModule extends Component {
  constructor() {
    super()
    this.state = {
      nameInput: '',
      brandInput: '',
      categoryInput: ''
    }
  }

  go = () => {
    axios.get(`/user/search/bikes?name=${this.state.nameInput}&brand=${this.state.brandInput}&category=${this.state.categoryInput}`).then(res => {
      // console.log(res.data)
      this.props.getBikeSearch(res.data)
      this.props.history.push('/bikes', res.data)
        })
      }

  handleNameInput = (e) => {
    this.setState({
      nameInput: e.target.value
    })
  }

  handleBrandInput = (e) => {
    this.setState({
      brandInput: e.target.value
    })
  }

  handleCategoryInput = (e) => {
    this.setState({
      categoryInput: e.target.value
    })
  }

  render () {
    return (
      <div className='search-module'>
        <Tabs id={1} defaultActiveKey={1} >
          <Tab eventKey={1} title="Search Bikes" >
            <form className="search-flex">
              <input
                type="text"
                className="mainsearch-input"
                value={this.state.nameInput}
                placeholder="Search for a bike!"
                onChange={this.handleNameInput} />
                <Button onClick={() => this.go()} className="mainsearch-button">Go!</Button>
            </form>
          </Tab>
          <Tab eventKey={2} title="Sell Your Bike">
            Coming Soon!
          </Tab>
        </Tabs>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SearchModule))
