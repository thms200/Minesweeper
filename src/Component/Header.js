import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <header>
        <div className="header-time">{this.props.container_time}</div>
        <div 
          className="header-start"
          style={ {backgroundImage: "url(" + this.props.container_image +")"} }
          onClick={this.props.start}
        >
        </div>
        <div className="header-reminder">{this.props.container_bomb}</div>
      </header>
    )
  }
}

export default Header;
