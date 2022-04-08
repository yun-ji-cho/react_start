import React, {useState, useRef, useEffect} from 'react';


const rspCoords = {
  바위 : '0',
  가위 : '-142px',
  보 : '-284px',
}
const scores = {
  가위 : 1,
  바위 : 0,
  보 : -1,
};

const computerChoice = (imgCoord) => {
  return Object.entries(rspCoords).find(function(v){
    // console.log(v);
    return v[1] === imgCoord;
  })[0];
};

//                              result, imgCoord, score
//  componentDidMount
//  componentDidUpdate
//  componentWillUnmount

//useEffect 는 세로고, class 에서의 라이프 사이클은 가로다

//componentDidMount () { 클래스에서는 데이터 변경을 아래와 같이 한번에 한다면
  // this.setState({
  //   imgCoord : 3,
  //   score :1,
  //   result: 2
  // })
//}
//훅에서는 useEffect 를 3번 써서 아래와 같이 처리 한다.
//useEffect(()=> {
//  setImgCoord();
//  setScore();
//}, [imgCoord, score]);

//useEffect (() => {
  //setResult();
//}, [result])

const RSP = () => {
  const [result, setResult] = useState('');
  const [imgCoord, setImgCoord] = useState('0');
  const [score, setScore] = useState(0);
  const interval = useRef();

  //useEffect 도 함수 컴포넌트 안에다가 적어줘야 한다.
  useEffect(() => { //componentDidMount, componentDidUpdate 역할(1대 1 대응은 아님)
    interval.current = setInterval (changeHand, 100);
    return () => { //componentWillUnmount 역할
      clearInterval(interval.current);
    }
  }, [imgCoord]); //[] 이 클로저 문제를 해결해준다. 바뀌는 state , 즉useEffect 를 실행하고 싶은 스테이트를(imgCoord) 넣어준다

  // const componentDidMount = () => { 
  //   interval.current = setInterval(changeHand, 100);
  // }
  // const componentWillUnmount =() => { // 컴포넌트가 제거되기 직전, 비동기 요청 정리를 많이 한다.
  //   clearInterval(interval.current);
  // }
  const changeHand = () => {
      if(imgCoord === rspCoords.바위){
        setImgCoord(rspCoords.가위);
      }else if(imgCoord === rspCoords.가위){
        setImgCoord(rspCoords.보);
      }else if(imgCoord === rspCoords.보){
        setImgCoord(rspCoords.바위);
      }
  }

  const onClickBtn = (choice) => () => {
    clearInterval(interval.current);
    const myScore = scores[choice];
    const cpuScore = scores[computerChoice(imgCoord)];
    const diff = myScore - cpuScore;
    if(diff === 0) {
      setResult('비겼습니다.!');
    }else if([-1, 2].includes(diff)){
      setResult('이겼습니다.!');
      setScore((prevState) => prevState + 1);
    } else {
      setResult('졌습니다!');
      setScore((prevState) => prevState - 1);
      // setScore((prevState) => prevState.score - 1);
    }
    setTimeout(()=> {
      interval.current = setInterval(changeHand, 100);
    },2000)
  };

  return (
    <>
      <div id="computer" style={{background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`}}></div>
      <div>
        <button id="rock" className="btn" onClick={onClickBtn('바위')}>바위</button>
        <button id="scissor" className="btn" onClick={onClickBtn('가위')}>가위</button>
        <button id="paper" className="btn" onClick={onClickBtn('보')}>보</button>
      </div>
      <div>{result}</div>
      <div>현재 {score} 점</div>
    </>
  );
  
}

export default RSP;

