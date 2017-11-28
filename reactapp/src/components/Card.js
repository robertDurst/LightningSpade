/*
  This file contains the card component. These individual components
  make up the cards that are displayed on the table: PokerTable.js.

  Hands down the shittiest code in the entire project. Unable to find a
  proper way to store and reference SVG's in React, I chose to do a shit
  workaround that involves storing all the SVG files on svgur.com and
  then creating a massive switch statement here referencing each SVG.

  TODO: Fix this garbage.
*/

import React from 'react';
import '../stylesheets/Card.css';

export default ({card}) => {
    let cardUrl;
    switch (card) {
      case "2_Heart":
        cardUrl = "http://svgur.com/s/3xa.svg"
        break;
      case "2_Spade":
        cardUrl = "http://svgur.com/s/3x0.svg"
        break;
      case "2_Club":
        cardUrl = "http://svgur.com/s/3yw.svg"
        break;
      case "2_Diamond":
        cardUrl = "http://svgur.com/s/3w8.svg"
        break;
      case "3_Heart":
        cardUrl = "http://svgur.com/s/3z5.svg"
        break;
      case "3_Spade":
        cardUrl = "http://svgur.com/s/3xw.svg"
        break;
      case "3_Club":
        cardUrl = "http://svgur.com/s/3x1.svg"
        break;
      case "3_Diamond":
        cardUrl = "http://svgur.com/s/3y7.svg"
        break;
      case "4_Heart":
        cardUrl = "http://svgur.com/i/3yo.svg"
        break;
      case "4_Spade":
        cardUrl = "http://svgur.com/i/3yn.svg"
        break;
      case "4_Club":
        cardUrl = "http://svgur.com/i/3x2.svg"
        break;
      case "4_Diamond":
        cardUrl = "http://svgur.com/i/3z6.svg"
        break;
      case "5_Heart":
        cardUrl = "http://svgur.com/i/3yp.svg"
        break;
      case "5_Spade":
        cardUrl = "http://svgur.com/i/3yy.svg"
        break;
      case "5_Club":
        cardUrl = "http://svgur.com/i/3yx.svg"
        break;
      case "5_Diamond":
        cardUrl = "http://svgur.com/i/3xx.svg"
        break;
      case "6_Heart":
        cardUrl = "http://svgur.com/i/3yq.svg"
        break;
      case "6_Spade":
        cardUrl = "http://svgur.com/i/3xb.svg"
        break;
      case "6_Club":
        cardUrl = "http://svgur.com/i/3yR.svg"
        break;
      case "6_Diamond":
        cardUrl = "http://svgur.com/i/3yE.svg"
        break;
      case "7_Heart":
        cardUrl = "http://svgur.com/i/3yS.svg"
        break;
      case "7_Spade":
        cardUrl = "http://svgur.com/i/3wf.svg"
        break;
      case "7_Club":
        cardUrl = "http://svgur.com/i/3xM.svg"
        break;
      case "7_Diamond":
        cardUrl = "http://svgur.com/i/3y8.svg"
        break;
      case "8_Heart":
        cardUrl = "http://svgur.com/i/3zG.svg"
        break;
      case "8_Spade":
        cardUrl = "http://svgur.com/i/3yr.svg"
        break;
      case "8_Club":
        cardUrl = "http://svgur.com/i/3yT.svg"
        break;
      case "8_Diamond":
        cardUrl = "http://svgur.com/i/3xn.svg"
        break;
      case "9_Heart":
        cardUrl = "http://svgur.com/i/3xy.svg"
        break;
      case "9_Spade":
        cardUrl = "http://svgur.com/i/3xN.svg"
        break;
      case "9_Club":
        cardUrl = "http://svgur.com/i/3x3.svg"
        break;
      case "9_Diamond":
        cardUrl = "http://svgur.com/i/3zT.svg"
        break;
      case "10_Heart":
        cardUrl = "http://svgur.com/i/3z7.svg"
        break;
      case "10_Spade":
        cardUrl = "http://svgur.com/i/3zd.svg"
        break;
      case "10_Club":
        cardUrl = "http://svgur.com/i/3zU.svg"
        break;
      case "10_Diamond":
        cardUrl = "http://svgur.com/i/3yz.svg"
        break;
      case "11_Heart":
        cardUrl = "http://svgur.com/i/3ys.svg"
        break;
      case "11_Spade":
        cardUrl = "http://svgur.com/i/3yU.svg"
        break;
      case "11_Club":
        cardUrl = "http://svgur.com/i/3zq.svg"
        break;
      case "11_Diamond":
        cardUrl = "http://svgur.com/i/3xQ.svg"
        break;
      case "12_Heart":
        cardUrl = "http://svgur.com/i/3z8.svg"
        break;
      case "12_Spade":
        cardUrl = "http://svgur.com/i/3xP.svg"
        break;
      case "12_Club":
        cardUrl = "http://svgur.com/i/3zp.svg"
        break;
      case "12_Diamond":
        cardUrl = "http://svgur.com/i/3yF.svg"
        break;
      case "13_Heart":
        cardUrl = "http://svgur.com/i/3yG.svg"
        break;
      case "13_Spade":
        cardUrl = "http://svgur.com/i/3z9.svg"
        break;
      case "13_Club":
        cardUrl = "http://svgur.com/i/400.svg"
        break;
      case "13_Diamond":
        cardUrl = "http://svgur.com/i/3yV.svg"
        break;
      case "1_Heart":
        cardUrl = "http://svgur.com/i/3yX.svg"
        break;
      case "1_Spade":
        cardUrl = "http://svgur.com/i/3yt.svg"
        break;
      case "1_Club":
        cardUrl = "http://svgur.com/i/401.svg"
        break;
      case "1_Diamond":
        cardUrl = "http://svgur.com/i/3yW.svg"
        break;
      default:
        cardUrl = undefined;
    }
    return (
      <div className={'Card__container'}>
        {
          cardUrl ? <img className={'Card'} src={"http://svgur.com/i/" + cardUrl.split("/")[4]} alt={'Card Image'}/> : <div/>
        }
      </div>
    );
}
