import React from 'react';
import Search from './Search/Search';
import Details from './Details/Details';

const Homepage = (props) => {
  return (
    <div className="homepage-container">
      <Search />
      <Details />
    </div>
  )
}

export default Homepage;
