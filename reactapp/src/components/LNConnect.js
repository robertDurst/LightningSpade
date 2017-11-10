import React, { Component } from 'react';
import '../stylesheets/LNConnect.css';
import RaisedButton from 'material-ui/RaisedButton';

class LNConnect extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={'LNConnect_container'}>
        <RaisedButton
          className={'connect_button_connectNode'}
          label="Connect"
          onClick={this.props.clickHandler}
        />
      </div>
    );
  }
}

export default LNConnect;
