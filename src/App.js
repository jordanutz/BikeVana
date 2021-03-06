import React, { Component } from 'react';
import './Reset.css';
import Navigation from './Components/Navigation/Navigation';
import Footer from './Components/Footer/Footer';
import routes from './routes';

class App extends Component {
  render() {
    return (
      <div className="main-container">
        <Navigation />
        {routes}
        <Footer />
      </div>
    );
  }
}

export default App;
