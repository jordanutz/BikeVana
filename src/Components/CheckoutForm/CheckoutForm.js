import React, {Component} from 'react';
import {CardElement, injectStripe} from 'react-stripe-elements';
import './CheckoutForm.css';
import axios from 'axios';
import {Button} from 'react-bootstrap'

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
        <p>Would you like to complete your purchase for ${this.props.amount}?</p><br/>
        <CardElement />
        <div className="donatesubmit-button">
        <Button onClick={this.submit}>Submit</Button>
        </div>
      </div>
    );
  }
}

export default injectStripe(CheckoutForm);
