import React from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import GameBetItem from './GameBetItem.jsx';

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
            {/* <select value={this.state.value} onChange={this.handleSelection}>
              <option value="homeTeam">{gameInfo.homeTeam}</option>
              <option value="awayTeam">{gameInfo.awayTeam}</option>
            </select> */}
            <Select
              value={this.state.value}
              onChange={this.handleSelection}
              // inputProps={{
              //   name: 'age',
              //   id: 'age-simple',
              // }}
            >
              <MenuItem value="">
                <em>Select Team</em>
              </MenuItem>
              <MenuItem value={"homeTeam"}>{gameInfo.homeTeam}</MenuItem>
              <MenuItem value={"awayTeam"}>{gameInfo.awayTeam}</MenuItem>
            </Select> <br />
            <Input
              placeholder="Amount"
              inputProps={{
                'aria-label': 'Description',
              }}
              onChange={this.handleChange}
            /><br />
          </label>
          <Button size="small" variant="outlined" color="primary" value="Post New Bet"> Post New Bet </Button>
        </form>
      </div>
    );
  }
}

export default GameBetList;

