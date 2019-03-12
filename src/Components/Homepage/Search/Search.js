import React, {Component} from 'react';
import './Search.css'
import SearchModule from './SearchModule/SearchModule'

class Search extends Component {
  render () {
    return (
      <div>
      <div className="background-search">
        <div className="search-container">
          <div className="search-text">
            <h1>Buy Online. Get it delivered. Love it or return it.</h1>
            <h2>The new way to buy a bike</h2>
          </div>
        </div>
      </div>
      <SearchModule />
      </div>
    )
  }
}

export default Search;
