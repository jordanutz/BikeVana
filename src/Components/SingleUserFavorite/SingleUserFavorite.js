import React from 'react'
import './SingleUserFavorite.css'
import {Link} from 'react-router-dom'

const SingleUserFavorite = (props) => {

  // console.log(props)

  return (
    <div className="singleuserfavorite-container">
      <div className="singleuserfavorite-image">
        <img src={props.image} alt="User Favorite Icon" />
      </div>
      <div className="singleuserfavorite-details">
        <Link to={`/search/bikes/${props.id}`}>{props.name}</Link>
        <h2>{props.brand}</h2>
        <h2>${props.price}</h2>
      </div>
    </div>
  )
}

export default SingleUserFavorite;
