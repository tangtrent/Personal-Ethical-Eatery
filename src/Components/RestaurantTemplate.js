import React, { Component } from 'react';
import AboutUs from './AboutUs';

export default class RestaurantTemplate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      render: 'About Us',
      aboutUsClassName: '',
      menuClassName: '',
      contactClassName: '',
      checkoutClassName: ''
    }
  }

  render() {
    return (
      <div>
        <div className="nav-container">
          <nav>
            <div className="header-button">About Us</div>
            <div className="header-button">Menu/Order Now</div>
            <div className="header-button">Contact</div>
            <div className="header-button">Save Page</div>
          </nav>
        </div>

        <div className="main-display-container">
          <div className={this.state.aboutUsClassName}>
            <AboutUs />
          </div>
        </div>

        <div className="footer-container">
          <footer>

          </footer>
        </div>
      </div>
    )
  }
}