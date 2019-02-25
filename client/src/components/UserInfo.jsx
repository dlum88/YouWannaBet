import React from 'react';
import UserBetList from './UserBetList.jsx';
import Grid from '@material-ui/core/Grid';
// import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
// import Radio from '@material-ui/core/Radio';
import Paper from '@material-ui/core/Paper';

// welcomes username and displays points

const UserInfo = ({ userInfo }) => (
  <div>
    <h1>UserInfo</h1>
    Welcome { userInfo.username }! <br />
    Current points: { userInfo.points }
  </div>
);

export default UserInfo;
