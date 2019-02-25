require('dotenv').config();
const feathers = require('@feathersjs/feathers');
const express = require('@feathersjs/express');
const axios = require('axios');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('../database');

const app = express(feathers());
const port = process.env.PORT || 3000;
process.env.PWD = process.cwd();

// app.use(express.static(`${__dirname}/../client/dist`));
app.use(express.static(path.join(__dirname, '/../client/dist')));
// app.use(express.static(`${process.env.PWD}../client/dist`));
 
// Set Express to use body-parser as a middleware //
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.use('/callback', express.static(`${process.env.PWD}/../client/dist`));
app.use('/callback', express.static(`${__dirname}/../client/dist`));

// Handles POST requests from Search Games //
app.post('/api/games', (req, res) => {
  const teamName = req.body;
  console.log(req.body);
  db.getIDFromTri(teamName.team, (err, team) => {
    if (err) {
      console.log(err);
      res.send(500);
    } else {
      // Destructure information I need to send to database and NBA
      const nbaId = team[0].nba_id;
      console.log(nbaId);
      const id = team[0].id_team;
      // call get bets to return an array of bets by single team
      // db.getBetsByTeam(id, (error, bets) => {
      //   if (error) {
      //     console.log(error);
      //     res.send(500);
      //   } else {
      //     res.status(200).send(bets);
      //   }
      // });

      // Send Get Request to the API //
      axios.get(`http://data.nba.net//prod/v1/2018/teams/${nbaId}/schedule.json`)
        .then((games, errs) => {
          if (err) {
            console.log(errs);
          }
          // console.log(games.data.vegas);
          res.send(games.data.league.standard);
        });
    }
  });
});


// Sends Get Request to API for Teams
app.get('/api/allTeams', (req, res) => {
  axios.get('http://data.nba.net/prod/v2/2018/teams.json')
    .then(({ data }) => {
      // console.log(data.league.vegas);
      // Have Teams Now Send to Database
      const league = data.league.vegas;
      const sendToDatabase = [];
      // Structure each team's object //
      league.forEach((team) => {
        const teamInfo = {};
        teamInfo.team_name = team.fullName;
        teamInfo.nba_id = team.teamId;
        teamInfo.tri_code = team.tricode;
        sendToDatabase.push(teamInfo);
      });
      // Send the Array of objects containing all teams to the function to save to database //
      db.saveAllTeams(sendToDatabase);
    }).then(() => {
      res.sendStatus(200);
    }).catch((err) => {
      console.log(err);
    });
});


app.get('/api/allTeams', (req, res) => {
  axios.get('http://data.nba.net/prod/v2/2018/teams.json')
    .then(({ data }) => {
      // console.log(data.league.vegas);
      // Have Teams Now Send to Database
      const league = data.league.vegas;
      const sendToDatabase = [];
      // Structure each team's object //
      league.forEach((team) => {
        const teamInfo = {};
        teamInfo.team_name = team.fullName;
        teamInfo.nba_id = team.teamId;
        teamInfo.tri_code = team.tricode;
        sendToDatabase.push(teamInfo);
      });
      // Send the Array of objects containing all teams to the function to save to database //
      db.saveAllTeams(sendToDatabase);
    }).then(() => {
      res.sendStatus(200);
    }).catch((err) => {
      console.log(err);
    });
});

app.get('/games', (req, res) => {
  // getting all games from the DB
  // each game has a unique identifier
  // allows user to see and apply bets to a specific game
  db.getAllGames((err, games) => {
    if (err) {
      console.log(err);
      res.send(500);
    } else {
      res.status(200).send(games);
    }
  });

  // on client side
  // show list of games
  // each game listing has related bets listed
  // each game can have new bets posted
  // each bet listed can be accepted
});

// getting twenty most recent bets from the DB
app.get('/api/bets', (req, res) => {
  // each bet has a unique identifier
  // allows user to see and accept bets to a specific game
  db.getAllBets((err, bets) => {
    if (err) {
      console.log(err);
      res.send(500);
    } else {
      // returns array with bet details sorted by most recent:
      // id_bet, id_game, amount, id_user_acceptor, id_user_poster, date_created
      bets.sort((a, b) => new Date(b.date_created).valueOf() - new Date(a.date_created).valueOf());
      res.status(200).send(bets.splice(0, 20));
    }
  });

  // on client side
  // show list of bets
  // each game listing has related bets listed
  // each game can have new bets posted
  // each bet listed can be accepted
});

// an array of bet objects where the id_team provided is either the id_team_home or id_team_away
// get all bets posted for a single team
app.get('/api/bets/:teamId', (req, res) => {
  // use bet by team method to get bets by single team
  const { teamId } = req.params;
  db.getBetsByTeam(teamId, (err, bets) => {
    if (err) {
      console.log(err);
      res.send(500);
    } else {
      // returns an array of bets by single team
      res.status(200).send(bets);
    }
  });
});

// adds single bet to database (used when user initially posts bet)
app.put('/api/bets/', (req, res) => {
  // save single bet to database
  const { gameId } = req.body;
  const { amount } = req.body;
  const { posterId } = req.body;
  // takes in user id (poster), amount, id_game
  db.saveBet(gameId, amount, posterId, (err, insertedBet) => {
    if (err) {
      console.log(err);
      res.send(500);
    } else {
      // returns confirmation and insertedbet object
      res.status(200).send(insertedBet);
    }
  });
});

// updates single bet in DB (used when user accepts bet)
app.patch('/api/bets/', (req, res) => {
  // takes in user id (acceptor) and bet id
  const acceptorId = req.query.acceptor;
  const betId = req.query.id;
  // updates record in database
  db.updateBet(acceptorId, betId, (err, insertResult) => {
    if (err) {
      console.log(err);
      res.send(500);
    } else {
      // returns confirmation and insertedbet object
      res.status(200).send(insertResult);
    }
  });
});


// server request that will query DB to retrieve userInfo
app.get('/api/userInfo/:userId', (req, res) => {
  const { userId } = req.params;
  // const { id } = req.query;
  db.getUserInfo(userId, (err, user) => {
    if (err) {
      res.status.send('could not retrieve user');
    } else {
      console.log('sending user');
      res.send(user);
    }
  });
});

// server request that will query DB to retrieve usersBets
// TODO gets the correct response in postman, need to make sure it works on client side and make sure getting id correctly
app.get('/api/userBets/:userId', (req, res) => {

  const userBets = [
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
  ];
  res.send(userBets);
  // const { userId } = req.params;
  // db.getUserBets(userId, (err, userBets) => {
  //   const allUserBets = [];
  //   if (err) {
  //     res.status(500).send('unable to ger user bets');
  //   } else {
  //     userBets.rows.forEach((userBet) => {
  //       const bet = {};

  //       bet.date = userBet.date_created;
  //       bet.wager = userBet.amount;

  //       db.getGameById(userBet.id_game, (errr, ress) => {
  //         if (errr) {
  //           console.log(err);
  //         } else {
  //           console.log(ress[0], 'AHHHHHHHH');
  //           db.getTeamById(ress[0].id_team_home, (error, resss) => {
  //             if (error) {
  //               console.log(error);
  //             } else {
  //               bet.homeTeam = resss.team_name;
  //             }
  //           });
  //         }
  //       });
  //       // console.log(bet);
  //       // setTimeout(() => { allUserBets.push(bet); }, 2000);
  //       allUserBets.push(bet);
  //     });
  //     console.log(allUserBets, 'MEOWWWWWWW');

  //     if (res.length === allUserBets.length) {
  //       res.send(allUserBets);
  //     }Z
  //     // console.log(allUserBets);
  //   }
  // });
});

app.get('/api/users', (req, res) => {
  // use db.getallUsers function to get all users
  db.getAllUsers((error, users) => {
    // if error
    if (error) {
      // console.log error
      console.error(error);
      // send 500 status code
      res.sendStatus(500);
    } else {
      // if no error
      // send back query results in res.send
      res.send(users);
    }
  });
});

// get user info by username
app.get('/api/users/:username', (req, res) => {
  const { username } = req.params;
  db.getUserByUsername(username, (err, user) => {
    if (err) {
      console.log(err);
      res.send(500);
    } else if (user.length === 0) {
      db.createUserByUsername(username, (error, newUser) => {
        if (error) {
          console.log(err);
          res.sendStatus(500);
        } else {
          res.status(200).send(newUser);
        }
      });
    } else {
      res.status(200).send(user);
    }
  });
});

app.listen(port, () => console.log(`listening on port ${port}!`));
