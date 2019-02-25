import React from 'react';
// container to hold users live bets
const SearchGamesList = (props) => {
console.log(props);
  let teams = props.teams;
  let selection = props.selection;
  let currentTeam = 'Team Selected';
  teams.forEach((team) => {
    if (team.tricode === selection) {
      currentTeam = team.fullName;
    }
  });

  let games = props.games;
  let today = new Date().toISOString().slice(0, 10).split('-');
  today = today.join('');
  // console.log(today);
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
        formattedGame.HomeTeam = teams[i].fullName;
      } else if (game.vTeam.teamId === teams[i].teamId) {
        formattedGame.AwayTeam = teams[i].fullName;
      }
    }
    formattedGames.push(formattedGame);
  });
  console.log(formattedGames);

  return (
    <div className="teamBetList">
      <h3>Next Ten Games for the {currentTeam}</h3>
    </div>
  );
};

export default SearchGamesList;
