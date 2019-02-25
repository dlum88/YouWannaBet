import React from 'react';

const GameListEntry = ({ game, onClick }) => (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
  <div className="game-list-entry">
      <div className="game-list-detail" key={game.homeTeamImage} onClick={() => { onClick(game); }}>
        <table is="table">
        <tbody>
        <tr id="row">
          <td id="cell0">
            <img src={game.homeTeamImage} />
          </td>
          <td id="cell5" />
          <td id="cell1">
            <h1>VS</h1>
          </td>
          <td id="cell6" />
          <td id="cell2">
            <img src={game.awayTeamImage} />
          </td>
          <td id="cell7" />
          <td id="cell3">
            <h2> on {game.date}</h2>
          </td>
        </tr>
      </tbody>
      </table>
        </div>
    </div>
  </div>
);

export default GameListEntry;
