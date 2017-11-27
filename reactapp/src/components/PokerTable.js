// This file contains the poker table component.
// For now, this just has the cards in the spread.

import React from 'react';
import '../stylesheets/PokerTable.css';
import Card from "./Card";

// Here it seems like I could just use a loop to generate
// all the cards in the spread, however I designed it this
// way to keep the spacing and card placement consistent
// with flexbox.
export default ({spread}) => (
  <div className={'spread-container'}>
    <Card card={spread[0]} />
    <Card card={spread[1]} />
    <Card card={spread[2]} />
    <Card card={spread[3]} />
    <Card card={spread[4]} />
  </div>
);
