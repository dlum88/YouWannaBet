/* eslint import/extensions: 0 */
import React from 'react';
import axios from 'axios';
import User from './User.jsx';


class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userBets: [{
        date: '2/25/2018',
        wager: 600,
        team_away: 'Portland Trail Blazers',
        team_home: 'Cleveland Cavaliers',
        opponent: 'frank_enstein',
        userWinnerChoice: 'Cleveland Cavaliers',
      },
      {
        date: '2/25/2018',
        wager: 600,
        team_away: 'Portland Trail Blazers',
        team_home: 'Cleveland Cavaliers',
        opponent: 'frank_enstein',
        userWinnerChoice: 'Cleveland Cavaliers',
      },
      {
        date: '2/25/2018',
        wager: 600,
        team_away: 'Portland Trail Blazers',
        team_home: 'Cleveland Cavaliers',
        opponent: 'frank_enstein',
        userWinnerChoice: 'Cleveland Cavaliers',
      },
      {
        date: '2/25/2018',
        wager: 600,
        team_away: 'Portland Trail Blazers',
        team_home: 'Cleveland Cavaliers',
        opponent: 'frank_enstein',
        userWinnerChoice: 'Cleveland Cavaliers',
      },
      ],
    };
  }

  componentDidMount() {
    const userId = 6;

    axios.get(`/api/userBets/${userId}`)
      .then((userBet) => {
        this.setState({
          userBets: userBet.data.rows,
        });
      })
      .catch((err) => {
        console.log(err, 'unable to get userBets');
      });
  }

  render() {
    const { userBets } = this.state;
    return (
      <User userBets={userBets} />
    );
  }
}

export default Dashboard;
