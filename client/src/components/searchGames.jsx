import React from 'react';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import axios from 'axios';
import sampleData from './exampleData.js';
import SearchGamesList from './searchGamesTeamListExisting.jsx';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      selection: 'SEL',
      games: [],
      teams: sampleData,
    };
    this.getTeams = this.getTeams.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getGames = this.getGames.bind(this);
  }

  getGames(teamObject) {
    // console.log(teamObject.team);
    axios.post('/api/games', teamObject)
      .then(({ data }) => data).then((data) => {
        // console.log(data);
        this.setState({ games: data });
        // console.log(this.state);
      });
  }

  getTeams() {
    return axios.get('/api/allTeams')
    // Once we get the Data Back from the APi we need to structure and Save in DB
      .then(({ data }) => { console.log(data); });
  }

  handleChange(event, index, value) {
    this.setState({ selection: value });
    this.getGames({ team: value });
  }

  render() {
    const { games, teams, selection } = this.state;
    return (
      <div>
        <MuiThemeProvider>
          <DropDownMenu
            value={this.state.selection}
            onChange={this.handleChange}
          >
            <MenuItem value="SEL" primaryText="Select Team" />
            <MenuItem value="PHI" primaryText="76ers" />
            <MenuItem value="MIL" primaryText="Bucks" />
            <MenuItem value="CHI" primaryText="Bulls" />
            <MenuItem value="CLE" primaryText="Cavaliers" />
            <MenuItem value="BOS" primaryText="Celtics" />
            <MenuItem value="LAC" primaryText="Clippers" />
            <MenuItem value="MEM" primaryText="Grizzlies" />
            <MenuItem value="ATL" primaryText="Hawks" />
            <MenuItem value="MIA" primaryText="Heat" />
            <MenuItem value="CHA" primaryText="Hornets" />
            <MenuItem value="UTA" primaryText="Jazz" />
            <MenuItem value="SAC" primaryText="Kings" />
            <MenuItem value="NYK" primaryText="Knicks" />
            <MenuItem value="LAL" primaryText="Lakers" />
            <MenuItem value="ORL" primaryText="Magic" />
            <MenuItem value="DAL" primaryText="Maverick" />
            <MenuItem value="BKN" primaryText="Nets" />
            <MenuItem value="DEN" primaryText="Nuggets" />
            <MenuItem value="IND" primaryText="Pacers" />
            <MenuItem value="NOP" primaryText="Pelicans" />
            <MenuItem value="DET" primaryText="Pistons" />
            <MenuItem value="TOR" primaryText="Raptors" />
            <MenuItem value="HOU" primaryText="Rockets" />
            <MenuItem value="SAS" primaryText="Spurs" />
            <MenuItem value="PHX" primaryText="Suns" />
            <MenuItem value="MIN" primaryText="Timberwolves" />
            <MenuItem value="OKC" primaryText="Thunder" />
            <MenuItem value="POR" primaryText="Trail Blazers" />
            <MenuItem value="GSW" primaryText="Warriors" />
            <MenuItem value="WAS" primaryText="Wizards" />
          </DropDownMenu>
        </MuiThemeProvider>
        <SearchGamesList 
          games={games}
          teams={teams}
          selection={selection}
        />
      </div>
    );
  }
}

export default Search;
