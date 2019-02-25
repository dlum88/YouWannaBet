import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import UserBetListItem from './UserBetListItem.jsx';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
});

// container to hold users live bets

class UserBetList extends React.Component {

  render() {
    return (
      <Paper className={this.props.classes.root} elevation={1}>
        <Typography component="p">
          {this.props.userBets.map(userBet => <UserBetListItem key={userBet.id} userBet={userBet} />)}
        </Typography>
      </Paper>
    );
  }
}

export default withStyles(styles)(UserBetList);
