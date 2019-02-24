import React, { Component } from 'react';
import axios from 'axios';

class Profile extends Component {
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
    // axios.get(`/api/users/${this.state.profile.nickname}`)
    axios.get(`/api/users/frank_enstein`)
      .then((user) => {
        const { points } = user.data[0];
        // console.log(points);
        this.setState({
          points,
        });
      })
      .catch((err) => {
        console.log(err, 'unable to get userpoints');
      });
  }

  render() {
    const { profile, points } = this.state;
    return (
      <div className="container">
        <div className="profile-area">
          <img src={profile.picture} alt="profile" />
          <div>
            <h2> Welcome {profile.nickname}! </h2>
          </div>
          <div>
            <h3> You currently have { points } points! </h3>
          </div>
          <pre>{JSON.stringify(profile)}</pre>
        </div>
      </div>
    );
  }
}

export default Profile;
