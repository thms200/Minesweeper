import React, { Component } from 'react';
import Header from "./Header";
import Section from "./Section";
import Footer from "./Footer";
import Start from './start.jpg';
import Ing from './ing.jpg';
import Fail from './fail.jpg';
import Success from './success.jpg';

let timeFunc; //setInterval 함수를 담을 변수
const today = new Date();
const yy = today.getFullYear().toString().slice(2);
const mm = (today.getMonth() + 1).toString();
const dd = today.getDate().toString();

class Container extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isStart: false,
      location: undefined,
      calculateLocation: undefined,
      clickLocation: [],
      bombLocation: undefined,
      image: Start,
      time: 0,
      bomb: 5,
      today: yy + mm + dd,
      count: 1,
      record: [],
    }
  }

  makeMinesweeper() { 
    if(this.state.isStart === false) {
      this.setState({isStart: true});

      const arr = []; //지뢰가 생길 곳 5군데 설정(랜덤 배치)
      let i = 0;
      while (arr.length < 5) {
        let number = Math.floor(Math.random() * (25 - 1)) + 1;
        if(!arr.includes(number)) {
          arr.push(number);
        }
        i++;
      }
  
      const locationArr = [0]; //지뢰 위치를 포함한 총 위치배열 (지뢰가 있는 곳은 *)
      arr.map(function(element){
        locationArr[element] = "✸";
        return locationArr;
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
          if(value[index+arr[i]] === "✸") {
            result++;
          }
        }
        return result;
      }
  
      for(let i = 1; i < 26; i++) {
        if(locationArr[i] === "✸") {
          calculateArr.push("✸");
        } else {
          if(i === 1) {
            calculateArr.push(calculateBomb([1, 6, 5], locationArr, i));
          } else if(i === 5) {
            calculateArr.push(calculateBomb([-1, 4, 5], locationArr, i));
          } else if(i === 21) {
            calculateArr.push(calculateBomb([-5, -4, 1], locationArr, i));
          } else if(i === 25) {
            calculateArr.push(calculateBomb([-5, -6, -1], locationArr, i));
          } else if(i === 2 || i === 3 || i === 4) {
            calculateArr.push(calculateBomb([1, 6, 5, 4, -1], locationArr, i));
          } else if(i === 6 || i === 11 || i === 16) {
            calculateArr.push(calculateBomb([1, 6, 5, -5, -4], locationArr, i));
          } else if(i === 22 || i === 23 || i === 24) {
            calculateArr.push(calculateBomb([-1, 1, -6, -5, -4], locationArr, i));
          } else if(i === 10 || i === 15 || i === 20) {
            calculateArr.push(calculateBomb([5, -5, -1, -6, 4], locationArr, i));
          } else {
            calculateArr.push(calculateBomb([1, -1, 6, -6, 5, -5, 4, -4], locationArr, i));
          }
        }
      }
  
      this.setState({ //게임 시작 시 랜덤 지뢰 위치 state에 저장, 이전 게임 기록/시간 초기화
        location: locationArr,
        calculateLocation: calculateArr,
        clickLocation: [],
        bombLocation: arr,
        image: Ing,
        time: 0,
        bomb: 5
      });
  
      const bombClass = document.querySelectorAll(".bomb"); //게임 재시작 할 때 지뢰 나왔던 부분 class(#배경 빨간색 처리) 제러
      bombClass.forEach(function(element){
        element.classList.remove("bomb");
      })
  
      let ingTime = 1;
      timeFunc = setInterval(() => { //1초마다 시간 증가
        this.setState({
          time: ingTime
        });
        ingTime++;
      }, 1000)
    }
  }

  showNumberBomb(event) {
    const clickValue = Number(event.target.className);

    if(event.target.innerHTML !== "") {
      return false;
    }

    if(this.state.calculateLocation !== undefined) { //클릭 시 근처 위치의 지뢰 숫자 표현
      if(this.state.calculateLocation[clickValue] === 0 || this.state.calculateLocation[clickValue] === 1) {
        this.countZero(clickValue, this.state.calculateLocation);
      }

      this.setState(state => {
        const clickLocation = this.state.clickLocation;
        clickLocation[clickValue] = this.state.calculateLocation[clickValue];
        return {
          clickLocation
        };
      });
      
      if(this.state.calculateLocation[clickValue] === "✸") { //클린한 것이 지뢰 일 경우, 이미지 변경 + 지뢰위치 초기화, 시간 종료
        event.target.classList.add("bomb");
        this.setState({
          location: undefined,
          calculateLocation: undefined,
          bombLocation: undefined,
          image: Fail,
          isStart: false
        });
        clearInterval(timeFunc);
      }
    }
  }

  countZero(clickNumber, totalLocationArr) { //0이나 1을 누르면, 주변의 0,1을 함께 보여주기
    const result = [];
    
    function compareArr(arr, value) {
      for(let i = 0; i < arr.length; i++){
        if(totalLocationArr[value+arr[i]] !== 0 && totalLocationArr[value+arr[i]] !== 1) {
          result[value+arr[i]] = undefined;
        } else if((totalLocationArr[value+arr[i]] === 0 && result[value+arr[i]] !== 1) || (totalLocationArr[value+arr[i]] === 1 && result[value+arr[i]] !== 1)) {
          result[value+arr[i]] = 1;
          findZero(value+arr[i]);
        }
      }
    }

    function findZero(clickNumber) {
      if(clickNumber === 1) {
        compareArr([1,5,6], clickNumber);
      } else if(clickNumber === 5) {
        compareArr([-1, 4, 5], clickNumber);
      } else if(clickNumber === 21) {
        compareArr([-5, -4, 1], clickNumber);
      } else if(clickNumber === 25) {
        compareArr([-5, -6, -1], clickNumber);
      } else if(clickNumber === 2 || clickNumber === 3 || clickNumber === 4) {
        compareArr([1, 6, 5, 4, -1], clickNumber);
      } else if(clickNumber === 6 || clickNumber === 11 || clickNumber === 16) {
        compareArr([1, 6, 5, -5, -4], clickNumber);
      } else if(clickNumber === 22 || clickNumber === 23 || clickNumber === 24) {
        compareArr([-1, 1, -6, -5, -4], clickNumber);
      } else if(clickNumber === 10 || clickNumber === 15 || clickNumber === 20) {
        compareArr([5, -5, -1, -6, 4], clickNumber);
      } else {
        compareArr([1, -1, 6, -6, 5, -5, 4, -4], clickNumber);
      }
    }

    findZero(clickNumber);

    this.setState(state => {
      const clickLocation = this.state.clickLocation;
      for(let i = 0; i < result.length; i++) {
        if(result[i] === 1) {
          clickLocation[i] = this.state.calculateLocation[i];
        }
      }
      return {
        clickLocation
      };
    });
  }

  //클릭할 때 ""면, 
  countBomb(event) { //오른쪽 클릭 시 지뢰를 표시(♖)
    event.preventDefault();
    const clickValue = Number(event.target.className);

    console.log(clickValue)
    console.log(event.target.innerHTML)
    console.log('event.target.innerHTML === ""', event.target.innerHTML === "")

    if(this.state.calculateLocation !== undefined) {
      if(event.target.innerHTML === "") {
        this.setState(state => {
          const clickLocation = this.state.clickLocation;
          clickLocation[clickValue] = "♖";
          this.checkGame();
          return {
            clickLocation, 
            bomb: this.state.bomb - 1
          };
        });
      } else if(event.target.innerHTML === "♖") {
        this.setState(state => {
          const clickLocation = this.state.clickLocation;
          clickLocation[clickValue] = undefined;
          this.checkGame();
          return {
            clickLocation,
            bomb: this.state.bomb + 1
          };
        });
      } else {
        return false;
      }
    }

    // if(this.state.calculateLocation !== undefined) {
    //   if(this.state.clickLocation[clickValue] === "♖") {
    //     this.setState(state => {
    //       const clickLocation = this.state.clickLocation;
    //       clickLocation[clickValue] = undefined;
    //       this.checkGame();
    //       return {
    //         clickLocation,
    //         bomb: this.state.bomb + 1
    //       };
    //     });
    //   } else {
    //     this.setState(state => {
    //       const clickLocation = this.state.clickLocation;
    //       clickLocation[clickValue] = "♖";
    //       this.checkGame();
    //       return {
    //         clickLocation, 
    //         bomb: this.state.bomb - 1
    //       };
    //     });
    //   }
    // }
  }

  checkGame() { //찾은 지뢰가 5개이고, 위치가 동일하다면 게임 종료
    const realBomb = this.state.bombLocation.sort((a,b) => {
      return a - b;
    });

    let clickArr = [];
    this.state.clickLocation.filter(function(element,index){
      if(element === "♖") {
        clickArr.push(index);
      } return clickArr;
    });
    clickArr.sort((a,b) => {
      return a - b;
    })
    
    let check;
    if(clickArr.length === 5) {
      for(let i = 0; i < clickArr.length; i++) {
        if(clickArr[i] === realBomb[i]) {
          check = true;
        } else {
          check = null;
          break;
        }
      }
    }

    if(check === true) {
      this.setState({
        location: undefined,
        calculateLocation: undefined,
        bombLocation: undefined,
        image: Success,
        isStart: false,
      })
      clearInterval(timeFunc);

      setTimeout(() => {
        const user = prompt("Please enter your name."); //게임이 종료하면 username작성, date와 time을 함께 저장함.
        if(user !== null) {
          this.setState(state => {
            const record = this.state.record;
            record.push([this.state.count, this.state.today, user, this.state.time]);
            this.recordSort();
            return {
              record, count: this.state.count + 1
            }
          })
        }
      }, 0)
    }
  }

  recordSort() { //기록은 time 빠른 순서대로 sort
    this.setState(state => {
      this.state.record.sort((a,b) => {
        return a[3] - b[3];
      })
    })
  }

  render() {
    return (
      <div>
        <Header 
          start={this.makeMinesweeper.bind(this)}
          container_image={this.state.image}
          container_time={this.state.time}
          container_bomb={this.state.bomb}
        >
        </Header>
        <Section 
          show={this.showNumberBomb.bind(this)}
          container_clickLocation={this.state.clickLocation}
          count={this.countBomb.bind(this)}
        >
        </Section>
        <Footer container_record={this.state.record}></Footer>
      </div>
    )
  }
}

export default Container;
