/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import Dashboard from '../components/Dashboard.jsx';
import Profile from '../components/Profile.jsx';
import Search from '../components/searchGames.jsx';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: NaN,
      points: NaN,
    };
  }

  login() {
    this.auth.login();
  }

  updateCurrentUser(points, id) {
    this.setState({ userId: id, points });
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
                <Profile auth={this.auth} updateCurrentUser={this.updateCurrentUser.bind(this)} {...this.props} />
                {/* restructure profile to set a state on home and pass to dashboard and search */}
                <Dashboard auth={this.auth} {...this.props} />
                {/* // move search component to here  */}
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
