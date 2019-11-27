import React, { Component } from 'react';

class Header extends Component {
  test() {
    console.log("test");
  }

  render() {
    return (
      <header>
        <div className="header-time">01</div>
        <div 
          className="header-start"
          style={ {backgroundImage: "url(" + this.props.container_image +")"} }
          onClick={this.props.start}
        >
        </div>
        <div className="header-reminder">10</div>
      </header>
    )
  }
}

export default Header;
