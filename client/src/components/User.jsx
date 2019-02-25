import React from 'react';
import Grid from '@material-ui/core/Grid';
// import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
// import Radio from '@material-ui/core/Radio';
import Paper from '@material-ui/core/Paper';
import UserBetList from './UserBetList.jsx';
import UserInfo from './UserInfo.jsx';
// import banner from '../../images/Banner-Dark.jpg';
// welcomes user, list points and contains the users bets

const User = ({ userInfo, userBets }) => (
  <div>
    <h1>USER STUFF</h1>
    {/* <h1>{userInfo[0]}</h1> */}
    { userInfo.map(user => <UserInfo key={user.id_user} userInfo={user} />)}
    {/* <UserInfo userInfo={userInfo} /> */}
    {/* <UserBetList userBets={userBets} /> */}
  </div>
);

export default User;
