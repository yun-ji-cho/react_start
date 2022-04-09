//hooks 아님, 함수 컴포넌트 일뿐, 훅스는 useState, useEffect 같은게 있어야함
//state 를 안쓰면 아래와 같이 만들어도 된다. 
//함수 컴포넌트는 퓨어 컴포넌트가 아니다.
//pure 컴포넌트로 만들고 싶으면 memo 로 감싸주는 것은 가능
//컴포넌트를 다른 컴포넌트로 감싸는것 (memo)을 high order component(고차 컴포넌트, HOC) 라고 한다.
import React, { memo } from 'react';

const Ball = memo(({number}) => {
    let background;
    if( number <= 10){
      background = 'red';
    }else if(number <= 20){
      background = 'orange';
    }else if(number <= 30){
      background = 'yellow';
    }else if(number <= 40){
      background = 'blue';
    }else{
      background = 'green';
    }
    return (
      <div className="ball" style={{background}}>{number}</div>
    );
  
});

export default Ball;