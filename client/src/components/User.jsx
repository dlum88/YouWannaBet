import React from 'react';
import UserBetList from './UserBetList.jsx';
// import banner from '../../images/Banner-Dark.jpg';
// welcomes user, list points and contains the users bets

const User = ({ userBets }) => (
  <div>
    <h1>Current Bets</h1>
    <UserBetList userBets={userBets} />
  </div>
);

export default User;
