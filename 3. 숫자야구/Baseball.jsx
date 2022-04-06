const React = require('react');
const { Component, createRef } = React;
const Try = require('./Try');

//this 안쓰면 밖으로 함수를 뺄 수 있다.
function getNumbers() { //  숫자 4개를 랜덤하게 뽑는 함수
  const candidate = [1,2,3,4,5,6,7,8,9];
  const array = [];
  for(let i = 0; i < 4; i+= 1){
    const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    array.push(chosen);
  }
  return array;
}

class NumberBaseball extends Component {
  state = {
    result : '',
    value : '',
    answer : getNumbers(), //ex) [1,3,5,7]
    tries : [], //react에서는 push 쓰면 안됨!!
  }
  onSubmitForm = (e) => {
    const {result, value, tries, answer} = this.state;
    e.preventDefault();
    if(value === answer.join('')){
      //옛날 state 로 현재 state 를 만들 때는 함수형으로 써줘야 한다.
      this.setState((prevState) => {
        return {
          result : '홈런',
          // 옛날꺼 복사하고 새로운거 넣어주기
          tries : [...prevState.tries, {try : value, result : '홈런!'}],
        }
      });
      alert('게임을 다시 시작합니다');
      this.setState({
        value : '',
        answer : getNumbers(),
        tries : [],
      })
    } else { //답 틀렸으면
      const answerArray = value.split('').map((v) => parseInt(v));
      let strike = 0;
      let ball = 0;
      if(tries.length >= 9){ //10번 이상 틀리면
        this.setState({
          result : `10번 넘게 틀려서 실패, 답은 ${answer.join(',')}였습니다.`,
        });
        alert('게임을 다시 시작합니다');
        this.setState({
          value : '',
          answer : getNumbers(),
          tries : [],
        })
      }else{
        for(let i = 0; i < 4; i += 1){
          if(answerArray[i] === answer[i]){
            strike += 1;
          }else if (answer.includes(answerArray[i])){
            ball += 1;
          }
        }
        this.setState((prevState) => {
          return {
            tries : [...prevState.tries, {try : value, result : `${strike} 스트라이크, ${ball} 볼입니다.`}],
             value : '',
          };
        });
        this.inputRef.current.focus();
      }
    }
  };
  onChangeInput = (e) => {
    this.setState({
      value : e.target.value,
    });
  };

  inputRef = createRef();


  render() {
    const {result, value, tries} = this.state;
    return (
      <>
        <h1>{result}</h1>
        <form onSubmit={this.onSubmitForm}>
          <input ref={this.inputRef} maxLength={4} value={value} onChange={this.onChangeInput}/>
        </form>
        <div>시도 : {tries.length}</div>
        <ul>
          {tries.map((v, i) => {
            return(
              <Try key={`${i + 1}차 시도 : `} tryInfo={v}/>
            );
          })}
        </ul>
      </>
    );
  }

}

module.exports = NumberBaseball;
