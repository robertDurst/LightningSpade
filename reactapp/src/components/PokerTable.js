import React, { Component } from 'react';
import '../stylesheets/PokerTable.css';
import Card from "./Card";

class PokerTable extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={'spread-container'}>
        <Card card={this.props.spread[0]} />
        <Card card={this.props.spread[1]} />
        <Card card={this.props.spread[2]} />
        <Card card={this.props.spread[3]} />
        <Card card={this.props.spread[4]} />
      </div>
    );
  }
}

export default PokerTable;
