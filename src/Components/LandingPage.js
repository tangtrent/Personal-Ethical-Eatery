import React, { Component } from 'react';

export default class LandingPage extends Component {
  constructor() {
    super();
    this.state = {
      query: '',
    }
  }

  render() {
    return (
      <div className="">
        <div className="nav-container">
          <div className="landing-page-header">
            <div className="header-button">Log In/Sign Up</div>
          </div>
        </div>

        <div className="main-display-container">
          <div className={this.state.aboutUsClassName}>
            <form>
              <input placeholder="Search Restaurants"></input>
              <button>Search</button>
            </form>
          </div>
        </div>

        <div className="footer-container hidden">
          <footer>

          </footer>
        </div>
      </div>
    )
  }
}