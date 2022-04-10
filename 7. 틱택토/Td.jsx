import React, {useCallback, useEffect, useRef, memo} from 'react';
import {CLICK_CELL, CHANGE_TURN} from './TicTacToe';
//실제로 클릭하는 부분은 Td 이다. 두번 거쳐서 데이터 전달이 필요함
const Td = memo(({ rowIndex, cellIndex, dispatch, cellData}) => {
  console.log('td rendered');

  // 뭐가 렌더링을 유발하는지 모르겠을 때 이 방식을 이용한다.
  const ref = useRef([]);
  useEffect(() => {
    console.log(rowIndex ===ref.current[0], cellIndex ===ref.current[1], dispatch ===ref.current[2], cellData ===ref.current[3]);
    ref.current = [rowIndex, cellIndex, dispatch, cellData];
  }, [rowIndex, cellIndex, dispatch, cellData])


  const onClickTd = useCallback(() => {
    console.log(rowIndex, cellIndex);
    if(cellData) { //이미 셀이 값이 있으면 return
      return;
    }
    dispatch({type : CLICK_CELL, row : rowIndex, cell: cellIndex}); //dispatch 가 state 를 바꾸는게 비동기다
    //바뀔 여지가 있는걸 []에 넣어주기
  }, [cellData]);
  return(
    <td onClick={onClickTd}>{cellData}</td>
    //props 로 넣어두는 데이터는 왠만하면 useCallback 으로 감싸주는게 좋다.
  )
});

export default Td;

//context API를 쓰면 틱택토-> table-> td -> tr 로 데이터를 넘기는 과정을 안해도 되고 틱택토-> td 로 바로 넘길 수 있다.

//useReducer는 state 가 비동기적으로 바뀐다.
//비동기 state 에 따라서 뭔가를 처리할 때는 useEffect 를 쓴다.

//칸 하나만 클릭했는데 모든 칸들이 리랜더링 되고 있는 현상을 해결해야한다.
//useEffect, useRef 로 확인해본다.

