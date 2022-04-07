//hooks

import React, {useState, useRef} from 'react';

const ResponseCheck = () => {
  const [state, setState] = useState('waiting');
  const [message, setMessage] = useState('클릭해서 시작하세요.');
  const [result, setResult] = useState([]);

  //클래스에서 프로퍼티 처럼 쓰는 애들은  hooks 에서는 ref를 써서 바꿔준다.
  //useRef 이기 때문에 current 써줘야함

  const timeout = useRef(null);
  const startTime = useRef();
  const endTime = useRef();

  //돔에 접근할 때 빼고 state 와 ref 의 차이가 무엇이냐? state는 변하면 return 부분이 다시 실행된다. ref 의 값들은 변해도 return 부분이 실행되지 않는다. 불필요한 렌더링을 막기 위해 ref(변하는값을 잠시 기록하는 용도) 를 사용한다.
  //useRef는 화면에는 영향을 주지 않는 것을 넣으면 된다.

  const onClickScreen = () => {
    if(state === 'waiting') {
      setState('ready');
      setMessage('초록색이 되면 클릭하세요');
      timeout.current = setTimeout(() => {
        setState('now');
        setMessage('지금 클릭');
        startTime.current = new Date(); 
      }, Math.floor(Math.random() * 1000) + 2000); //2초 ~ 3초 랜덤
    } else if (state === 'ready') { //성급하게 클릭
      clearTimeout(timeout.current);
      setState('waiting');
      setMessage('너무 성급하시군요! 초록색이 된 후 에 클릭하세요!');
    } else if (state === 'now'){ //반응속도 체크
      endTime.current = new Date();
      setState('waiting');
      setMessage('클릭해서 시작하세요');
      setResult((prevResult) => { return [...prevResult, endTime.current - startTime.current]});
    }
  };

  const onReset = () => {
    setResult([]);
  };

  const renderAverage = () => {
    return result.length === 0 ? null 
    : <>
        <div>평균 시간: {result.reduce((a, c) => a + c) / result.length}ms</div>
        <button onClick={onReset}>리셋</button>
      </>
  };


  //jsx 는 render의 return 안에서는 for과 if 를 못쓴다.
  return (
    <>
      <div
        id="screen"
        className={state}
        onClick={onClickScreen}
      >
        {message}
      </div>
      {renderAverage()}
    </>
  );
  
}

export default ResponseCheck;