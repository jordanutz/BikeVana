import React, {Component} from 'react';
import './Footer.css'
import {Grid, Row, Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';

class Footer extends Component {
  render () {
    return (
      <div className="footer-container">

        <div className="footer-max">
        <div className='logo-container'>
          <h2>Bikevana</h2>
        </div> 

        <Grid>
          <Row>
            <Col xs={12} sm={4}>
              <div className="column-container">
                <h3>About Bikevana</h3>
                <Link to=''>About Us</Link>
                <Link to=''>Customer Reviews</Link>
                <Link to=''>Bicycle Protection</Link>
              </div>
            </Col>
            <Col xs={12} sm={4}>
              <div className="column-container">
                <h3>How It Works</h3>
                <Link to=''>How Bikevana Works</Link>
                <Link to=''>Certified Bicycles</Link>
                <Link to=''>Referral Program</Link>
              </div>
            </Col>
            <Col xs={12} sm={4}>
              <div className="column-container">
                <h3>Trade/Sell</h3>
                <Link to=''>Get an Appraisal</Link>
              </div>
            </Col>
          </Row>
        </Grid>
        </div>

       

      </div>
    )
  }
}

export default Footer;
