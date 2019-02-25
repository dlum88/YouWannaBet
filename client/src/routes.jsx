import React from 'react';
import { Redirect, Route, Router } from 'react-router-dom';
import App from './App.jsx';
import Home from './Home/Home.jsx';
import Profile from './components/Profile.jsx';
import Search from './components/searchGames.jsx';

import Callback from './Callback/Callback.jsx';
import Auth from './Auth/Auth.jsx';
import history from './history.jsx';

const auth = new Auth();

const handleAuthentication = ({ location }) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
};

export const makeMainRoutes = () => (
  <Router history={history}>
    <div>
      <Route
        path="/"
        render={props => <App auth={auth} {...props} />}
      />
      <Route
        path="/home"
        render={props => <Home auth={auth} {...props} />}
      />
      <Route
        path="/search"
        render={props => <Search auth={auth} {...props} />}
      />
      <Route
        path="/callback"
        render={(props) => {
          handleAuthentication(props);
          return <Callback {...props} />;
        }}
      />
    </div>
  </Router>
);

export { makeMainRoutes as default };
