import React, {Component} from 'react'
import './Cart.css'

import axios from 'axios'
import {Button} from 'react-bootstrap'

//Redux
import {connect} from 'react-redux'
import {getCart} from '../../redux/reducer'

class Cart extends Component {
  constructor () {
    super()
    this.state = {
      total: null
    }
  }

  componentDidMount () {
    axios.get(`/user/cart?user=${this.props.user.id}&order=${this.props.order.id}`).then(res => {
      this.props.getCart(res.data.cart)
      this.setState({
        total: res.data.total
      })
    })
  }

  render () {

    const {cart} = this.props

    const displayTotal = this.state.total & this.state.total

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
            <h1>${item.price}</h1>
          </div>
          <div className="ItemDetails">
            <Button>Remove</Button>
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
          <div className="ShoppingCartFoooter">
            {displayTotal}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    order: state.order,
    cart: state.cart
  }
}

const mapDispatchToProps = {
  getCart
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
