import React from 'react';
import axios from 'axios';
import GameBetItem from './GameBetItem.jsx';
import IconButton from '@material-ui/core/IconButton';

class GameBetList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bets: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSelection = this.handleSelection.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    this.setupBets();
  }

  getBetsForSingleTeam(teamId) {
    return axios.get(`/api/bets/${teamId}`)
      .then(bets => bets.data)
      .catch(error => console.log(error));
  }

  setupBets() {
    this.getBetsForSingleTeam(277).then((bets) => {
      this.setState({ bets });
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log(event.target.value);
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({ betAmount: event.target.value });
    console.log(this.state.betAmount);
  }

  handleSelection(event) {
    event.preventDefault();
    this.setState({ teamSelection: event.target.value });
    console.log(this.state.teamSelection);
  }

  formatDate(yyyymmdd) {
    const year = yyyymmdd.substring(0, 4);
    const month = yyyymmdd.substring(4, 6);
    const day = yyyymmdd.substring(6, 8);
    return `${year}-${month}-${day}`;
  }


  render() {
    const { gameInfo } = this.props;
    return (
      <div>
        <h3>{gameInfo.homeTeam} vs. {gameInfo.awayTeam} on March 02, 2019</h3>
        {this.state.bets.map((bet, key) => <GameBetItem betInfo={bet} key={key} />)}
        <form onSubmit={this.handleSubmit}>
          <label>
            <select value={this.state.value} onChange={this.handleSelection}>
              <option value="homeTeam">{gameInfo.homeTeam}</option>
              <option value="awayTeam">{gameInfo.awayTeam}</option>
            </select>
            Amount: <input type="text" onChange={this.handleChange} />
          </label>
          <input type="submit" value="Post New Bet" />
        </form>
      </div>
    );
  }
}

export default GameBetList;

