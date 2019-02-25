/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import IconButton from '@material-ui/core/IconButton';
import { AppBar } from 'material-ui';

class App extends Component {
  componentDidMount() {
    const { auth } = this.props;

    if (localStorage.getItem('isLoggedIn') === 'true') {
      auth.renewSession();
    }
  }

  goTo(route) {
    this.props.history.replace(`/${route}`);
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    return (
      <div>
        <MuiThemeProvider>
          <AppBar>
            <IconButton
              type="button"
              className="btn-margin"
              onClick={this.goTo.bind(this, 'home')}
            >
          Home
            </IconButton>
            <IconButton
              type="button"
              className="btn-margin"
              onClick={this.goTo.bind(this, 'search')}
            >
          Search
            </IconButton>
            {
          !isAuthenticated() && (
            <IconButton
              id="qsLoginBtn"
              type="button"
              className="btn-margin"
              onClick={this.login.bind(this)}
            >
              Log In
            </IconButton>
          )
        }
            {/* {
              isAuthenticated() && (
                <IconButton
                  className="btn-margin"
                  onClick={this.goTo.bind(this, 'profile')}
                >
                  Profile
                </IconButton>
              )
            } */}
            {
          isAuthenticated() && (
            <IconButton
              id="qsLogoutBtn"
              type="button"
              className="btn-margin"
              onClick={this.logout.bind(this)}
            >
              Log Out
            </IconButton>
          )
        }
          </AppBar>
        </MuiThemeProvider>
      </div>
    );
  }
}

// App.propTypes = {
//   auth: React.PropTypes.object.isRequired,
// };

export default App;
