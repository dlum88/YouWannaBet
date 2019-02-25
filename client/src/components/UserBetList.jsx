import React from 'react';
import UserBetListItem from './UserBetListItem.jsx';

// container to hold users live bets
function UserBetList({ userBets }) {
  return (
    <div className="userBetList">
      {userBets.map(userBet => <UserBetListItem key={userBet.id} userBet={userBet} />)}
    </div>
  );
}

export default UserBetList;