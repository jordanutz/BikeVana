import React, {Component} from 'react'
import CheckoutForm from '../CheckoutForm/CheckoutForm'
import './Cart.css'

//Redux
import {connect} from 'react-redux'
import {getCart, getOrder} from '../../redux/reducer'

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
      total: null,
      pay: false
    }
  }

  componentDidMount () {
    this.getCart()
  }

  getCart = () => {
    console.log(this.props)
    axios.get(`/user/cart?user=${this.props.user.id}&order=${this.props.order.id}`).then(res => {
      this.props.getCart(res.data.cart)
      // console.log(res.data.total)
      this.setState({
        subtotal: parseInt(res.data.cartTotal),
        tax: parseInt(res.data.taxTotal),
        total: parseInt(res.data.orderTotal)
      })
    })
  }

  deleteCart = (id) => {
    axios.delete(`/user/cart/?cart=${id}&user=${this.props.user.id}&order=${this.props.order.id}`).then(res => {
      this.props.getCart(res.data)
    })
    this.getCart()
  }

  togglePay = () => {
    this.setState({
      pay: !this.state.pay
    })
  }

  closePay = () => {
    this.setState({
      pay: false
    })
  }


  resetOrder = (id) => {

    let date = new Date();
    const day = date.getDate()
    const month = date.getMonth() + 1
    const year = date.getFullYear()
    const formattedDate = month + '/' + day + '/' + year

    let orderStatus = {
      paid: true,
      user: this.props.user.id,
      date: formattedDate
    }

    axios.put(`/user/cart/${this.props.order.id}`, orderStatus).then(res => {
      console.log(res.data)
      this.props.getOrder(res.data)
    })
    this.getCart()
  }


  render () {

    const {cart} = this.props
    const {subtotal, tax, total, pay} = this.state
    // console.log(subtotal, tax, total)

    const displaySubtotal = subtotal ? <span>${subtotal}</span> : null
    const displayTax = tax ? <span>${tax}</span> : null
    const displayTotal = total ? <span>${total}</span> : null

    const paymentButton = pay ? <Button onClick={this.closePay}>Close</Button> :
      <Button onClick={this.togglePay}>Pay Now</Button>

    const displayPay = pay &&
      <StripeProvider apiKey="pk_test_rFjEfqpAptYz9FQkd3jiUqHa00Ixah2mH5">
        <div className="stripe-element">
          <Elements>
            <CheckoutForm amount={this.state.total} resetOrder={this.resetOrder} order={this.props.order.id}/>
          </Elements>
        </div>
      </StripeProvider>

    const displayBike = cart.map(item => {
      // console.log(item)
      return (
        <div className="CartItem" key={item.id}>
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
          <div className="ShoppingCartPay">
            {total ? paymentButton : null}
          </div>
          {displayPay}
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
  getCart,
  getOrder
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
