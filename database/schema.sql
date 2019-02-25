/* 
// I already added these to AWS RDS, these are just for reference, no action needed
*/

create table app_user (
  id_user serial primary key,
  username VARCHAR (50) UNIQUE NOT NULL,
  password VARCHAR (50) NOT NULL,
  points INTEGER
);

create table team (
  id_team serial primary key,
  team_name VARCHAR (50) UNIQUE NOT NULL,
  nba_id INTERGER UNIQUE NOT NULL,
  tri_code VARCHAR (50)
);

create table game (
  id_game serial primary key,
  game_date DATE NOT NULL,
  id_team_home INTEGER NOT NULL,
  id_team_away INTEGER NOT NULL,
  score_home INTEGER NOT NULL,
  score_away INTEGER NOT NULL,
  FOREIGN KEY (id_team_home) REFERENCES team(id_team),
  FOREIGN KEY (id_team_away) REFERENCES team(id_team)
);


create table bet (
  id_bet serial primary key,
  id_game INTEGER NOT NULL,
  amount INTEGER NOT NULL,
  id_user_acceptor INTEGER NULL,
  id_user_poster INTEGER NOT NULL,
  date_created DATE NOT NULL DEFAULT CURRENT_DATE,
  FOREIGN KEY (id_game) REFERENCES game(id_game),
  FOREIGN KEY (id_user_acceptor) REFERENCES app_user(id_user),
  FOREIGN KEY (id_user_poster) REFERENCES app_user(id_user)
);

INSERT INTO app_user values(1,'testuser', 'testpassword', 10001);

INSERT INTO app_user(username, password, points) values('frank_enstein', '123Password', 150000);
INSERT INTO app_user(username, password, points) values('ella_vader', '123Password', 1000);
INSERT INTO app_user(username, password, points) values('jed_dye', '123Password', 75000);

INSERT INTO game(game_date, id_team_home, id_team_away, score_home, score_away, id_nba_team) 
values('2019-03-06', 273, 277, null, null, '0021800969');

INSERT INTO game(game_date, id_team_home, id_team_away, score_home, score_away, id_nba_team) 
values('2019-03-02', 294, 281, null, null, '0021800938');

INSERT INTO game(game_date, id_team_home, id_team_away, score_home, score_away, id_nba_team) 
values('2019-02-14', 290, 292, 131, 122, '0021800866');

INSERT INTO game(game_date, id_team_home, id_team_away, score_home, score_away, id_nba_team) 
values('2019-02-14', 272, 291, 91, 106, '0021800865');


INSERT INTO bet(id_game, amount, id_user_acceptor, id_user_poster) 
values(3, 500, 2, 3);

INSERT INTO bet(id_game, amount, id_user_acceptor, id_user_poster) 
values(2, 1200, 4, 2);

INSERT INTO bet(id_game, amount, id_user_acceptor, id_user_poster) 
values(2, 200, 4, 2);

