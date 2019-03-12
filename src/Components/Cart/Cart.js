import React, {Component} from 'react'
import './Cart.css'

import {connect} from 'react-redux'
import axios from 'axios'


class Cart extends Component {
  constructor () {
    super()
    this.state = {
      cart: []
    }
  }

  componentDidMount () {
    axios.get(`/user/cart?user=${this.props.user.id}&order=${this.props.order.id}`).then(res => {
      this.setState({
        cart: res.data
      })
    })
  }


  render () {



    console.log(this.state.cart)
    const {cart} = this.state

    const displayBike = cart.map(item => {
      console.log(item)
      return (
        <div className="CartItem">
          <div className="ItemImage">
            <img src={item.image} />
          </div>
          <div className="ItemDetails">
            <h1>{item.name}</h1>
          </div>
          <div className="ItemDetails">
            <h1>{item.brand}</h1>
          </div>
          <div className="ItemDetails">
            <h1>{item.color}</h1>
          </div>
          <div className="ItemDetails">
            <h1>{item.quantity}</h1>
          </div>
          <div className="ItemDetails">
            <h1>{item.price}</h1>
          </div>
          <div className="ItemDetails">
            <button>Remove</button>
          </div>
        </div>
      )
    })

    return (
      <div className='ShoppingCart'>
        <div className='ShoppingCartSecondary'>
          <div className="ShoppingCartHeader">
            <h1>Shopping Cart</h1>
          </div>
          <div className="ShoppingCartSub">
            <h2>Bike</h2>
            <h2>Name</h2>
            <h2>Brand</h2>
            <h2>Color</h2>
            <h2>Quantity</h2>
            <h2 id="Margin">Price</h2>
          </div>
          <div className="ShoppingCartBody">
            {displayBike}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    order: state.order
  }
}

export default connect(mapStateToProps)(Cart)
