const React = require('react');
const { Component } = React;
const {useState, useRef} = React;

const GuGuDan = () => {
  //첫번째 것이 state, 두번째 것이 setState - 약속된 문법이니 기억
  const [first, setFirst] = useState(Math.ceil(Math.random() * 9));
  const [second, setSecond] = useState(Math.ceil(Math.random() * 9));
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');
  const inputRef = useRef(null); //useRef 로 돔에 접근한다. 대신에 current를 붙여줘야함 (inputRef.current.focus();) <- 차이점 기억하기!!

  const onChangeInput = (e) => {
    setValue(e.target.value);
    console.log('랜더링');
  }

  const onSubmitForm = (e) => {
    e.preventDefault();
    if(parseInt(value) === first * second) {
      setFirst(Math.ceil(Math.random() * 9));
      setSecond(Math.ceil(Math.random() * 9));
      setValue('');
      // 옛날state 를 쓰는경우 함수형으로 표현하면 비동기의 문제가 발생하지 않는다.
      setResult('정답')
      inputRef.current.focus();
    } else {
      setResult('땡');
      setValue('');
      inputRef.current.focus();
    }
  }


  return (
    <>
      <div>{first}곱하기 {second}는</div>
      <form onSubmit={onSubmitForm}>
        <input ref={inputRef} onChange={onChangeInput} value={value} />
        <button>입력!</button>
      </form>
      <div id="result">{result}</div>
    </>
  )
}

module.exports = GuGuDan;
