import React, { Component } from 'react';
import '../stylesheets/PokerGameRoom.css';
import RaisedButton from 'material-ui/RaisedButton';
import Player from './Player';

class PokerGameRoom extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={'pokergameroom-container'}>
        <RaisedButton
          label="Leave"
          onClick={() => this.props.closeChannel()}
          style={{position: 'absolute', left: 0, top: 0}}
        />
        <div className={'pokergameroom'}>
            <div className={'left_player-container'}>
              <Player player={this.props.players[0]}/>
            </div>
            <div className={'body_pokertable-container'}>
              <div className={'top-player-container'}>
                <Player player={this.props.players[1]}/>
                <Player player={this.props.players[2]}/>
                <Player player={this.props.players[3]}/>
              </div>
              <div className={'pokertable-container'}></div>
              <div className={'bottom-player-container'}>
                <Player player={this.props.players[4]}/>
                <Player player={this.props.players[5]}/>
                <Player player={this.props.players[6]}/>
              </div>
            </div>
            <div className={'right_player-container'}>
              <Player player={this.props.players[7]}/>
            </div>
        </div>

      </div>
    );
  }
}

export default PokerGameRoom;
