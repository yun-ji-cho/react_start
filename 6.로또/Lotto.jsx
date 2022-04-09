import React, {Component} from 'react';
import Ball from './Ball';

function getWinNumbers() {
  const candidate = Array(45).fill().map((v, i) => i + 1);
  const shuffle = [];
  while (candidate.length > 0) {
    shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length),1)[0]);
  }
  const bonusNumber = shuffle[shuffle.length - 1]; //45개 중 마지막 숫자를 보너스 숫자로 선택
  const winNumbers = shuffle.slice(0,6).sort((p,c) => p - c ); //앞에 6개를 당첨숫자로 선택
  return [...winNumbers, bonusNumber]
}

class Lotto extends Component {
  state = {
    winNumbers : getWinNumbers(), //당첨 숫자들
    winBalls : [],
    bonus : null, //보너스 공
    redo : false,
  };

  timeouts = [];

  runTimeouts = () => {
    const {winNumbers} = this.state;
    for (let i = 0; i < winNumbers.length - 1; i++){
      setTimeout(() => {
        this.timeouts[i] = this.setState((prevState) => {
          return {
            winBalls : [...prevState.winBalls, winNumbers[i]],
          }
        });
      }, (i + 1) * 1000);
    }
    setTimeout(() => {
      this.timeouts[6] = this.setState({
        bonus : winNumbers[6],
        redo : true,
      })
    }, 7000); 
  }

  //컴포넌트가 랜더링 되고 바로 실행됨
  componentDidMount() {
    this.runTimeouts();
  }
  //어떤 state 가 바뀌었는지 판단할 수 있다.
  //prevState 에는 바뀌기 전 state 에 들어있고
  //바뀐 스테이트는 this.state 에 들어있다.

  //componentDidUpdate 에서는 조건문이 중요하다. 조건문이 없다면 setState 가 될 때마다 componentDidUpdate 이게 실행하기 때문이다.
  //runTimeouts 는 redo 를 눌렀을때 동작해야한다.
  //조건문으로 감싸줘야만 필요할 때만 업데이트가 된다.
  componentDidUpdate(prevProps, prevState){
    if(this.state.winBalls.length === 0){
      this.runTimeouts();
    }
  }

  // 정리해주는 작업 : 부모컴포넌트가 이 컴포넌트를 지워 버릴수 있는데 정리 안해주면 계속 setTimeout / setInterval 등이 발생하므로 메모리 누수가 일어날 수있다.
  componentWillUnmount() {
    this.timeouts.forEach((v) => {
      clearTimeout(v);
    })
  }

  onClickRedo = () => {
    this.setState({
      winNumbers : getWinNumbers(), //당첨 숫자들
      winBalls : [],
      bonus : null, //보너스 공
      redo : false,
    });
    this.timeouts = [];
  }
  //componentWillMount, componentWillReceiveProps, componentWillUpdate 는 곧 사라질 예정이니 쓰지 말것.

  render() {
    const {winBalls, bonus, redo} = this.state;
    return (
      <>
        <div>당첨 숫자</div>
        <div id="결과창">
          {/* 반복문 */}
          {winBalls.map((v) => <Ball key={v} number={v}/>)}
        </div>
        <div>보너스!</div>
        {/* 조건문 */}
        {bonus && <Ball number={bonus} />}
        {redo && <button onClick={this.onClickRedo}>한번 더!</button>}
      </>
    );
  }
}

export default Lotto;