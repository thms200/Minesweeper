import React, { Component } from 'react';
import Start from './start.jpg';

class Header extends Component {
  render() {
    return (
      <header>
        <div className="header-time">01</div>
        <div 
          className="header-start"
          style={ {backgroundImage: "url(" + Start +")"} }
          onClick={this.props.start}></div>
        <div className="header-reminder">10</div>
      </header>
    )
  }
}

export default Header;
