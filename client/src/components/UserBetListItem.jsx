import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    maxWidth: 340,
    padding: 2,
  },
  media: {
    height: 140,
  },
};

// render each individual bet from UserBetList
class UserBetListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bet: {},
      accepted: false,
    };
  }

  render() {

    const { userBet } = this.props;

    return (
      <Card className={this.props.classes.card}>
        <CardActionArea>
          <CardMedia
            image="/"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {userBet.team_home} vs. {userBet.team_away}
            </Typography>
            <Typography component="p">
              <b>Game Date: {userBet.date} </b>
            </Typography>
            <Typography component="p">
              <b>Opponent: {userBet.opponent} </b> for {userBet.wager}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
          Share
          </Button>
          <Button size="small" color="primary">
          Wanna Double Down?
          </Button>
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(styles)(UserBetListItem);
