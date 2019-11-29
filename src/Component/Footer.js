import React, { Component } from 'react';

class Footer extends Component {
  render() {
    return (
      <footer>
        <ul className="date">
          <li>Date</li>
          {this.props.container_record.map((element) => {
            return (<li key={element[0]}>{element[1]}</li>)
          })}
        </ul>
        <ul className="name">
          <li>Name</li>
          {this.props.container_record.map((element) => {
            return (<li key={element[0]}>{element[2]}</li>)
          })}
        </ul>
        <ul className="time">
          <li>Time</li>
          {this.props.container_record.map((element) => {
            return (<li key={element[0]}>{element[3]}</li>)
          })}
        </ul>
      </footer>
    )
  }
}

export default Footer;
