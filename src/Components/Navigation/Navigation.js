import React, {Component} from 'react';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem, Image} from 'react-bootstrap';
import './Navigation.css'
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {logIn, logOut, getOrder} from '../../redux/reducer'
import axios from 'axios'
import Cart from './assets/shopping-cart.svg'

class Navigation extends Component {
  constructor () {
    super()
    this.state ={
      showWorks: false,
      showAbout: false
    }
  }

  login = () => {
    const redirectUri = encodeURIComponent(`${window.location.origin}/auth/callback`)
    const scope= encodeURIComponent('openid profile email')
    window.location= `https://${process.env.REACT_APP_AUTH0_DOMAIN}/authorize?client_id=${process.env.REACT_APP_AUTH0_CLIENT_ID}&scope=${scope}&redirect_uri=${redirectUri}&response_type=code`
  }

  componentDidMount () {
    this.getUserData()
    this.getOrder()
  }

  getUserData = () => {
    axios.get('/api/user-data').then(response => {
      const user = response.data;
      this.props.logIn(user);
    })
  }

  getOrder = () => {
    axios.get(`/user/order?user=${this.props.user.id}`).then(res => {
      this.props.getOrder(res.data[0])
    })
  }

  logout = () => {
   axios.post('/api/logout').then(res => {
     window.location.href='/'
   })
   .catch(error => console.log(error))
 }

  render () {
     // console.log(this.props)
     const userLinks = this.props.user.auth0_id ?
      <div className="login-container">
        <Link to={`/users/${this.props.user.id}/cart`}><img src={Cart} alt="Cart Icon"/></Link>
        <Link to={`/users/profile/${this.props.user.id}`} id="login-link">My Account</Link>
        <Link to='/' id="login-link" onClick={this.logout}>Logout</Link>
      </div>
      :
      <Link to='/' id="login-link" onClick={this.login}>Login</Link>

    return (
      <div>
        <div className="header-container">
          <div className="header-column">
            <div className="header-links">
            <NavDropdown
              eventKey={1}
              title="How It Works"
              id="basic-nav-dropdown"
              onMouseEnter={(e) => this.setState({ showWorks: true })}
              onMouseLeave={(e) => this.setState({ showWorks: false })}
              defaultOpen={this.state.showWorks}
              >

              <MenuItem eventKey={3.1}>How Bikevana Works</MenuItem>
              <MenuItem eventKey={3.2}>Certified Bikes</MenuItem>
              <MenuItem eventKey={3.3}>Referrals</MenuItem>
            </NavDropdown>

            <NavDropdown
              eventKey={3}
              title="About BikeVana"
              id="basic-nav-dropdown"
              onMouseEnter={(e) => this.setState({ showAbout: true })}
              onMouseLeave={(e) => this.setState({ showAbout: false })}
              defaultOpen={this.state.showAbout}>

              <MenuItem eventKey={3.1}>About Us</MenuItem>
              <MenuItem eventKey={3.2}>Bicycle Protection</MenuItem>
              <MenuItem eventKey={3.3}>Customer Reviews</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey={3.3}>Meet Developer</MenuItem>
            </NavDropdown>
          </div>
        </div>
      </div>

      <div className="navigation-container" >
        <Navbar inverse collapseOnSelect >
          <Navbar.Header className='navheader-container'>
            <Navbar.Brand>
              <div className="navheader-logo">
                <Image className="navigation-logo" src='http://www.fujibikes.com/usa/img/bikes/tech-block/endurance-geo.png' circle />
                <Link to="/">BikeVana</Link>
              </div>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse className="navbar-collapse">
            <Nav>
              <NavItem eventKey={1} componentClass={Link} href='/bikes' to='/bikes'>
                Search Bikes
              </NavItem>
            </Nav>
            <Nav pullRight>
              <NavItem eventKey={1}>
                {userLinks}
              </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </div>
    )
  }
}

const mapStateToProps = (state) => {
  // console.log(state)
  return {
    user: state.user
  }
}

const mapDispatchToProps = {
  logIn,
  logOut,
  getOrder
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
