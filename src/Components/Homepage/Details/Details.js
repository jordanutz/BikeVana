import React, {Component} from 'react'
import './Details.css'
import {Grid, Row, Col, Image} from 'react-bootstrap'
import {Link} from 'react-router-dom'

class Details extends Component {
  render () {
    return (
      <div className="about-container">
        <div className="introduction-container">
          <h1>Because Bike buying</h1>
          <h2>Shouldn't Suck</h2>
          <h3>That's why our process is 100% online. We give you the power to control
            how you buy a bike. Not the cyclery.</h3>
        </div>

        <div className="introduction-grid">
          <Grid>
            <Row className="introduction-row">
              <Col xs={12} sm={8} className='introductionphoto-column'>
                <Image src='https://www.freeiconspng.com/uploads/cycle-bike-bicycle-png-image-7.png' className='details-photo' />
              </Col>
              <Col xs={12} sm={4} className='introduction-column'>
                <div className="introduction-max">
                  <h2>7-Day Test Own</h2>
                  <p>We give you 7 days to see if your bike truly fits into your life. If it doesn’t, simply return it. Learn more about Bikevana’s <Link to="/about">7-Day Return Policy.</Link></p><br/>
                </div>

                <div className="introduction-max">
                  <h2>Quality Bikes</h2>
                  <p>We pride ourselves on our product. It is also why not every bike has what it takes to be a Bikevana bike. Learn about our <Link to="/certified-program">Bikevana quality standards.</Link></p><br/>
                </div>

                <div className="introduction-max">
                  <h2>Pick Up Or Delivery</h2>
                  <p>It’s your bike, you choose how to get it. Pick it up at any one of our bike vending machines or have it delivered to your door. Learn more about our <Link to="/how-it-works"> Vending Machines and Bikevana Delivery.</Link></p><br/>
                </div>
              </Col>
            </Row>
          </Grid>
        </div>
      </div>
    )
  }
}

export default Details
