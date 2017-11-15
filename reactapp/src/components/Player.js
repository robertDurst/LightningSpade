import React, { Component } from 'react';
import '../stylesheets/Player.css';

class Player extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={this.props.player ? 'individual-player-container': 'individual-player-container-empty'}>

      </div>
    );
  }
}

export default Player;
