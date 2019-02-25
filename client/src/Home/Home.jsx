/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import Dashboard from '../components/Dashboard.jsx';
import Profile from '../components/Profile.jsx';

class Home extends Component {
  login() {
    this.auth.login();
  }

  render() {
    const { auth } = this.props;
    return (
      <div className="container">
        {
          auth.isAuthenticated() && (
            <div>
              <h4>
                You are logged in!
              </h4>
              <div className="col-md-6 offset-md-3">
                <Profile auth={this.auth} {...this.props} />
                <Dashboard auth={this.auth} {...this.props} />
              </div>
            </div>
          )
        }
        {
          !auth.isAuthenticated() && (
            <h4>
              You are not logged in! Please{' '}
              <a
                style={{ cursor: 'pointer' }}
                onClick={this.login.bind(this)}
              >
                Log In
              </a>
              {' '}to continue.
            </h4>
          )
        }
      </div>
    );
  }
}

export default Home;
