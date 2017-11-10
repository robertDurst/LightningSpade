import React, { Component } from 'react';
import '../stylesheets/PokerGameRoom.css';
import RaisedButton from 'material-ui/RaisedButton';

class PokerGameRoom extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <RaisedButton
          label="Leave"
          onClick={() => this.props.closeChannel()}
        />
      </div>
    );
  }
}

export default PokerGameRoom;
