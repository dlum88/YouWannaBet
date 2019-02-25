import React, { Component } from 'react';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
});

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profile: {},
    };
  }

  componentWillMount() {
    this.setState({ profile: {} });
    const { auth } = this.props;
    if (!auth.userProfile) {
      auth.getProfile((err, profile) => {
        this.setState({ profile });
      });
    } else {
      this.setState({ profile: auth.userProfile });
    }
    // send request to server to retrieve points by username
    axios.get(`/api/users/${this.state.profile.nickname}`)
      // axios.get(`/api/users/frank_enstein`)
      .then((user) => {
        const { points, id_user } = user.data[0];
        // console.log(points);
        this.setState({
          points,
        });
        this.props.updateCurrentUser(points, id_user);
      })
      .catch((err) => {
        console.log(err, 'unable to get userpoints');
      });
  }

  render() {
    const { profile, points } = this.state;
    return (
      <Paper className={this.props.classes.root} elevation={1}>
        <Typography variant="h5" component="h3">
          <img src={profile.picture} alt="profile" />
          <h2> Welcome {profile.nickname} </h2>
        </Typography>
        <Typography component="p">
          <h3> You currently have {points} points. Go check out some games!</h3>
        </Typography>
      </Paper>
    );
  }
}

export default withStyles(styles)(Profile);