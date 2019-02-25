import React from 'react';
import GameListEntry from './GameListEntry.jsx';
// container to hold users live bets
const SearchGamesList = (props) => {
  let onClick = props.onClick;
  let teams = props.teams;
  let selection = props.selection;
  let currentTeam = 'Team Selected';
  let teamId;
  teams.forEach((team) => {
    if (team.tricode === selection) {
      currentTeam = team.fullName;
      teamId = team.teamId;
    }
  });

  const {games} = props;
  let today = new Date().toISOString().slice(0, 10).split('-');
  today = today.join('');
  const gamesAfterToday = [];
  let count = 0;
  games.forEach((game) => {
    if (game.homeStartDate > today && count < 10) {
      gamesAfterToday.push(game);
      count += 1;
    }
  });
  const formattedGames = [];
  gamesAfterToday.forEach((game) => {
    const formattedGame = {};
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < teams.length; i++) {
      let date = game.homeStartDate;
      date = date.split('');
      date = `${date[0]}${date[1]}${date[2]}${date[3]}-${date[4]}${date[5]}-${date[6]}${date[7]}`;
      formattedGame.Date = date;
      if (game.hTeam.teamId === teams[i].teamId) {
        formattedGame.homeTeam = teams[i].fullName;
      } else if (game.vTeam.teamId === teams[i].teamId) {
        formattedGame.awayTeam = teams[i].fullName;
      }
      formattedGame.currentId = teamId;
    }
    formattedGames.push(formattedGame);
  });

  return (
    <div className="teamBetList" key={'list'}>
      <h3>Next Ten Games for the {currentTeam}</h3>
      { formattedGames.map(game => (
        <GameListEntry 
          game={game}
          id={game.currentId}
          onClick={onClick}
        />
      ), 
      )}
    </div>
  );
};

export default SearchGamesList;
