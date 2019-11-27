import React, { Component } from 'react';

class Section extends Component {
  render() {
    return (
      <section>
        <table className="sectionTable">
          <tbody onClick={this.props.show}>
            <tr>
              <td className="1">{this.props.container_clickLocation === [] ? "" : this.props.container_clickLocation[1]}</td>
              <td className="2">{this.props.container_clickLocation === [] ? "" : this.props.container_clickLocation[2]}</td>
              <td className="3">{this.props.container_clickLocation === [] ? "" : this.props.container_clickLocation[3]}</td>
              <td className="4">{this.props.container_clickLocation === [] ? "" : this.props.container_clickLocation[4]}</td>
              <td className="5">{this.props.container_clickLocation === [] ? "" : this.props.container_clickLocation[5]}</td>
            </tr>
            <tr>
              <td className="6">{this.props.container_clickLocation === [] ? "" : this.props.container_clickLocation[6]}</td>
              <td className="7">{this.props.container_clickLocation === [] ? "" : this.props.container_clickLocation[7]}</td>
              <td className="8">{this.props.container_clickLocation === [] ? "" : this.props.container_clickLocation[8]}</td>
              <td className="9">{this.props.container_clickLocation === [] ? "" : this.props.container_clickLocation[9]}</td>
              <td className="10">{this.props.container_clickLocation === [] ? "" : this.props.container_clickLocation[10]}</td>
            </tr>
            <tr>
              <td className="11">{this.props.container_clickLocation === [] ? "" : this.props.container_clickLocation[11]}</td>
              <td className="12">{this.props.container_clickLocation === [] ? "" : this.props.container_clickLocation[12]}</td>
              <td className="13">{this.props.container_clickLocation === [] ? "" : this.props.container_clickLocation[13]}</td>
              <td className="14">{this.props.container_clickLocation === [] ? "" : this.props.container_clickLocation[14]}</td>
              <td className="15">{this.props.container_clickLocation === [] ? "" : this.props.container_clickLocation[15]}</td>
            </tr>
            <tr>
              <td className="16">{this.props.container_clickLocation === [] ? "" : this.props.container_clickLocation[16]}</td>
              <td className="17">{this.props.container_clickLocation === [] ? "" : this.props.container_clickLocation[17]}</td>
              <td className="18">{this.props.container_clickLocation === [] ? "" : this.props.container_clickLocation[18]}</td>
              <td className="19">{this.props.container_clickLocation === [] ? "" : this.props.container_clickLocation[19]}</td>
              <td className="20">{this.props.container_clickLocation === [] ? "" : this.props.container_clickLocation[20]}</td>
            </tr>
            <tr>
              <td className="21">{this.props.container_clickLocation === [] ? "" : this.props.container_clickLocation[21]}</td>
              <td className="22">{this.props.container_clickLocation === [] ? "" : this.props.container_clickLocation[22]}</td>
              <td className="23">{this.props.container_clickLocation === [] ? "" : this.props.container_clickLocation[23]}</td>
              <td className="24">{this.props.container_clickLocation === [] ? "" : this.props.container_clickLocation[24]}</td>
              <td className="25">{this.props.container_clickLocation === [] ? "" : this.props.container_clickLocation[25]}</td>
            </tr>
          </tbody>
        </table>
      </section>
    )
  }
}

export default Section;
