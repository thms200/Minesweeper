import React, { Component } from 'react';
import Header from "./Header";
import Section from "./Section";

class Container extends Component {
  constructor(props) {
    super(props)
    this.state = {
      location: undefined,
      calculateLocation: undefined
    }
  }

  makeMinesweeper() { 
    const arr = []; //지뢰가 생길 곳 5군데 설정(랜덤 배치)
    let i = 0;
    while (arr.length < 5) {
      let number = Math.floor(Math.random() * (25 - 1)) + 1;;
      if(!arr.includes(number)) {
        arr.push(number);
      }
      i++;
    }

    const locationArr = [0]; //지뢰 위치를 포함한 총 위치배열 (지뢰가 있는 곳은 *)
    arr.map(function(element){
      locationArr[element] = "*";
    });

    for(let i = 1; i <= 25; i++) { //지뢰가 없는 곳은 0
      if(locationArr[i] === undefined) {
        locationArr[i] = 0;
      }
    }

    const calculateArr = [0]; //지뢰 위치에 따라서 0~5 점수를 계산

    function calculateBomb (arr, value, index) {
      let result = 0;
      for(let i = 0; i < arr.length; i++) {
        if(value[index+arr[i]] === "*") {
          result++
        }
      }
      return result;
    }

    for(let i = 1; i < 26; i++) {
      if(locationArr[i] === "*") {
        calculateArr.push("*");
      } else {
        if(i === 1) {
          calculateArr.push(calculateBomb([1, 6, 5], locationArr, i))
        } else if(i === 5) {
          calculateArr.push(calculateBomb([-1, 4, 5], locationArr, i))
        } else if(i === 21) {
          calculateArr.push(calculateBomb([-5, -4, 1], locationArr, i))
        } else if(i === 25) {
          calculateArr.push(calculateBomb([-5, -6, -1], locationArr, i))
        } else if(i === 2 || i === 3 || i === 4) {
          calculateArr.push(calculateBomb([1, 6, 5, 4, -1], locationArr, i))
        } else if(i === 6 || i === 11 || i === 16) {
          calculateArr.push(calculateBomb([1, 6, 5, -5, -4], locationArr, i))
        } else if(i === 22 || i === 23 || i === 24) {
          calculateArr.push(calculateBomb([-1, 1, -6, -5, -4], locationArr, i))
        } else if(i === 10 || i === 15 || i === 20) {
          calculateArr.push(calculateBomb([5, -5, -1, -6, 4], locationArr, i))
        } else {
          calculateArr.push(calculateBomb([1, -1, 6, -6, 5, -5, 4, -4], locationArr, i))
        }
      }
    }

    this.setState({
      location: locationArr,
      calculateLocation: calculateArr
    });
    console.log(arr);
  }

  render() {
    return (
      <div>
        <Header start={this.makeMinesweeper.bind(this)}></Header>
        <Section></Section>
      </div>
    )
  }
}

export default Container;