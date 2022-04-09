import React, {useState, useEffect, useRef, useMemo, useCallback} from 'react';
import Ball from './Ball';

//state 안쓰는 애들은 컴포넌트에서 꼭 분리하기!!!
//훅스의 특성상 컴포넌트 전체가 다시 실행되기 때문에 getWinNumbers 요부분도 매번 다시실행된다. 그런데 getWinNumbers 가 10초씩 걸리는 함수라고하면 문제가 된다. 랜더링 한번 할 때마다 10초씩 잡아먹게 된다. 
//getWinNumbers는 로또 숫자들을 리턴하므로 이것은 캐싱(기억)할 수 있다. --> useMemo
//useMemo : 다시 실행하지 않고 기억할수 있게 하는것
function getWinNumbers() {
  console.log('getWinNumbers');
  const candidate = Array(45).fill().map((v, i) => i + 1);
  const shuffle = [];
  while (candidate.length > 0) {
    shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length),1)[0]);
  }
  const bonusNumber = shuffle[shuffle.length - 1]; //45개 중 마지막 숫자를 보너스 숫자로 선택
  const winNumbers = shuffle.slice(0,6).sort((p,c) => p - c ); //앞에 6개를 당첨숫자로 선택
  return [...winNumbers, bonusNumber];
};

// useMemo : 복잡한 함수 결과값을 기억
// useRef : 일반 값을 기억
// useCallback : 함수 자체를 기억, 함수 컴포넌트가 재실행되도 해당 함수가 다시 생성되지 않는다.

//usememo, useCallback 이 왜 필요한가?
const Lotto = () => {
  const lottoNumbers = useMemo(() => getWinNumbers(), []); //두번째 인자가 바뀌지 않는한 () => getWinNumbers() 는 다시 실행되지 않는다. 두번째 인자에 들어간 요소가 바뀌면 다시실행됨
  const [winNumbers, setWinNumbers] = useState(lottoNumbers);
  const [winBalls, setWinBalls] = useState([]);
  const [bonus, setBonus] = useState(null);
  const [redo, setRedo] = useState(false);
  const timeouts = useRef([]);

  // useCallback 는 너무 기억을 잘해서 console.log(winNumbers);을 찍어봤을때 업데이트 안되고 첫번째 배열이 계속 유지된다.
  //useCallback 안에서 쓰는 state 는 두번째 인자 [] 에 넣어줘야한다. 그래야 잊어먹고 새로운 값 들어간다.
  //useCallback 를 필수로 적용해야 할 때 : 자식컴포넌트에 함수를 넘길 때, useCallback 이 없으면 매번 새로운 함수가 생성된다. 부모가 자꾸 함수룰 바꿔대니까 자식이 헷갈려서 매번 리랜더링을 한다. 자식컴포넌트에 프롭스로 함수를 넘길 때 useCallback 해주기. 부모로 부터 받은 함수가 같구나 를 알아차릴 수 있도록.
  const onClickRedo = useCallback(() => {
    console.log(winNumbers);
    setWinNumbers(getWinNumbers());
    setWinBalls([]);
    setBonus(null);
    setRedo(false);
    timeouts.current = [];
  }, [winNumbers]);

  useEffect(() => {
    console.log('useEffect');
    for (let i = 0; i < winNumbers.length - 1; i++){
      timeouts.current[i] = setTimeout(() => { //timeouts.current[i] 가 바뀌는 것이아니다. 같은 주소 값을 참조한다. 주소값이 안바뀌므로 감지 못함
        setWinBalls((prevBalls) => [...prevBalls, winNumbers[i]]);
      }, (i + 1) * 1000);
    }
    timeouts.current[6] = setTimeout(() => {
      setBonus(winNumbers[6]);
      setRedo(true);
    }, 7000); 

    return () => {
      timeouts.current.forEach((v) => {
        clearTimeout(v);
      });
    }
    
  }, [timeouts.current]); // input이 빈배열이면 componentDidMount와 동일
  //배열에 요소가 있으면 componentDidMount와 componentDidUpdate 수행

  return (
    <>
      <div>당첨 숫자</div>
      <div id="결과창">
        {winBalls.map((v) => <Ball key={v} number={v}/>)}
      </div>
      <div>보너스!</div>
      {bonus && <Ball number={bonus} />}
      {redo && <button onClick={onClickRedo}>한번 더!</button>}
    </>
  );
  
}

export default Lotto;