import React, {Component} from 'react'
import CheckoutForm from '../CheckoutForm/CheckoutForm'
import './Cart.css'

//Redux
import {connect} from 'react-redux'
import {getCart} from '../../redux/reducer'

// Packages
import {Elements, StripeProvider} from 'react-stripe-elements'
import axios from 'axios'
import {Button} from 'react-bootstrap'

class Cart extends Component {
  constructor () {
    super()
    this.state = {
      subtotal: null,
      tax: null,
      total: null
    }
  }

  componentDidMount () {
    axios.get(`/user/cart?user=${this.props.user.id}&order=${this.props.order.id}`).then(res => {
      this.props.getCart(res.data.cart)
      console.log(res.data.total)
      this.setState({
        subtotal: res.data.cartTotal,
        tax: res.data.taxTotal,
        total: res.data.orderTotal
      })
    })
  }

  deleteCart = (id) => {
    axios.delete(`/user/cart/${id}`).then(res => {
      console.log(res.data)
    })
  }

  render () {

    const {cart} = this.props
    const {subtotal, tax, total} = this.state

    const displaySubtotal = subtotal && <span>${subtotal}</span>
    const displayTax = tax && <span>${tax}</span>
    const displayTotal = total && <span>${total}</span>

    const displayBike = cart.map(item => {
      console.log(item)
      return (
        <div className="CartItem">
          <div className="ItemImage">
            <img src={item.image} alt="Cart Bike" />
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
            <Button onClick={() => this.deleteCart(item.cart_id)}>Remove</Button>
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
          <div className="ShoppingCartFooter">
            <h2>Subtotal: {displaySubtotal} </h2>
            <h2 id="taxBorder">Estimated Taxes: {displayTax}</h2>
            <h3>{displayTotal}</h3>
          </div>
          <Button>Pay Now</Button>
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
