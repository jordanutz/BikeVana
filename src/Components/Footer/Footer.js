import React, {Component} from 'react';
import './Footer.css'
import {Grid, Row, Col} from 'react-bootstrap';
import {Link} from 'react-router-dom';

class Footer extends Component {
  render () {
    return (
      <div className="footer-container">
        <Grid>
          <Row>
            <Col xs={12} md={4}>
              <div className="column-container">
                <h1>About Bikevana</h1>
                <Link to=''>About Us</Link>
                <Link to=''>Customer Reviews</Link>
                <Link to=''>Bicycle Protection</Link>

              </div>
            </Col>
            <Col xs={12} md={4}>
              <div className="column-container">
                <h1>How It Works</h1>
                <Link to=''>How Bikevana Works</Link>
                <Link to=''>Certified Bicycles</Link>
                <Link to=''>Referral Program</Link><br/>
              </div>
            </Col>
            <Col xs={12} md={4}>
              <div className="column-container">
                <h1>Trade/Sell</h1>
                <Link to=''>Get an Appraisal</Link>
              </div>
            </Col>
          </Row>
        </Grid>

        <div className='span-container'>
          <span>© 2018, Jordan Utz, Front-End Developer | Phone: (859) 304-1476 <br/>
          An Utzipher Production | All Rights Reserved.</span>
        </div>

      </div>
    )
  }
}

export default Footer;
