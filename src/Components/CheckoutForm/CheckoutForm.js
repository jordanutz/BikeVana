import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';
import './CheckoutForm.css';
import axios from 'axios';

class CheckoutForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      complete: false
    };
    this.submit = this.submit.bind(this);
  }

  async submit (ev) {
    let {token} = await this.props.stripe.createToken({name: "Name"});
    let {id} = token;

    axios.post('/charge', {id:id, amount: this.props.amount}).then(res => {
      (res.data.status) && this.setState({complete: true})
    })
  }

  render() {
    if (this.state.complete) return <h1>Thank you for your purchase!</h1>;

    return (
      <div className="checkout">
        <CardElement />
        <div className="donatesubmit-button">
        <button onClick={this.submit}>Pay</button>
        </div>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);
