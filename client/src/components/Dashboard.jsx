/* eslint import/extensions: 0 */
import React from 'react';
import axios from 'axios';
import User from './User.jsx';


class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userBets: [
        {
          date: '2/25/2018',
          wager: 600,
          team_away: 'Portland Trail Blazers',
          team_home: 'Cleveland Cavaliers',
          opponent: 'frank_enstein',
          userWinnerChoice: 'Cleveland Cavaliers',
          abbrev: 'CLE',
        },
        {
          date: '2/25/2018',
          wager: 300,
          team_away: 'Golden State Warriors',
          team_home: 'Charlotte Hornets',
          opponent: 'frank_enstein',
          userWinnerChoice: 'Golden State Warriors',
        },
        {
          date: '2/25/2018',
          wager: 1000,
          team_away: 'Philadelphia 76ers',
          team_home: 'New Orleans Pelicans',
          opponent: 'PollyPocket',
          userWinnerChoice: 'New Orleans Pelicans',
        },
        {
          date: '2/27/2018',
          wager: 700,
          team_away: 'Houston Rockets',
          team_home: 'Charlotte Hornets',
          opponent: 'PollyPocket',
          userWinnerChoice: 'Houston Rockets',
        },
        {
          date: '2/28/2018',
          wager: 500,
          team_away: 'Cleveland Cavaliers',
          team_home: 'New York Knicks',
          opponent: 'frank_enstein',
          userWinnerChoice: 'Cleveland Cavaliers',
        },
      ],
    };
  }

  componentDidMount() {
    const userId = 6;

    // axios.get(`/api/userBets/${userId}`)
    //   .then((userBet) => {
    //     this.setState({
    //       userBets: userBet.data.rows,
    //     });
    //   })
    //   .catch((err) => {
    //     console.log(err, 'unable to get userBets');
    //   });
  }

  render() {
    const { userBets } = this.state;
    return (
      <User userBets={userBets} />
    );
  }
}

export default Dashboard;
