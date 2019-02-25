/* eslint import/extensions: 0 */
import React from 'react';
import axios from 'axios';

import User from './User.jsx';


class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userBets: [],
      userInfo: [],
    };
  }

  componentDidMount() {
    // send request to server to retrieve users live bets
    // where user is poster and acceptor
    // need to send userId

    const userId = 2; // NEED TO FIX THIS!!!!! how to find userId???

    axios.get(`/api/userBets/${userId}`)
      .then((userBet) => {
        this.setState({
          userBets: userBet.data.rows,
        });
      })
      .catch((err) => {
        console.log(err, 'unable to get userBets');
      });

    // send request to server to retrieve the username and userpoints
    // need to send userId
    axios.get(`/api/userInfo/${userId}`)
      .then((user) => {
        this.setState({
          userInfo: user.data.rows,
        });
      })
      .catch((err) => {
        console.log(err, 'unable to get userInfo');
      });
  }

  render() {
    const { userBets, userInfo } = this.state;
    console.log(userBets);
    return (
      <User
        userBets={userBets}
        userInfo={userInfo}
      />
    );
  }
}

export default Dashboard;
