let React = require('react');

const GameListEntry = ({ game, onClick }) => (
  <div className="game-list-entry">
    <div className="game-body">
      <div className="game-list-detail" key={game.homeTeam} onClick={() => { onClick(game) ;}}><h2>{game.Date} {game.homeTeam} VS {game.awayTeam} </h2></div>
    </div>
  </div>
);

export default GameListEntry;
