import React from 'react';
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
      <div className="userBetListItem">
        <h3>On {userBet.userWinnerChoice} Against {userBet.opponent} for {userBet.team_home} vs. {userBet.team_away} for {userBet.wager}</h3>
      </div>
    );
  }
}


export default UserBetListItem;
