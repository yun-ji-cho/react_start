import React, { useEffect, useCallback, useReducer } from 'react';
import Table from './Table';

//state 를 하나로 모아두고 얘를 action을 통해서만 바꾼다. 
const initialState = {
  winner : '',
  turn : 'O',
  tableData : [
    ['','',''],
    ['','',''],
    ['','','']
  ],
  recentCell : [-1, -1], //처음에는 없는 칸
}

// 액션의 타입은 변수로 빼놓는게 좋다. 액션의 이름은 대문자로!
export const SET_WINNER = 'SET_WINNER';
export const CLICK_CELL = 'CLICK_CELL';
export const CHANGE_TURN = 'CHANGE_TURN';
export const RESET_GAME = 'RESET_GAME';

//액션을 실행할때마다 reducer 가 실행된다. 
//state는 불변성이 항상 중요하다.
const reducer = (state, action) => {
  switch(action.type){ //액션을 실행하면 그 액션이 뭔지 action.type 으로 구별을 하고 
    case 'SET_WINNER': //SET_WINNER 라는 액션이면
    //state.winner = action.winner; -> 이렇게 하면 안됨,
    //항상 새로운 객체를 만들어서 바뀐 값만 아래와 같이 해줘야함
      return {  //state를 어떻게 바꿀지 return 에서 구별을 해줘야한다.
        ...state, //기존 스테이트 얕은 복사
        winner : action.winner
      }
    case 'CLICK_CELL': {
      const tableData = [...state.tableData];
      tableData[action.row] = [...tableData[action.row]]; //immer 라는 라이브러리로 가독성 해결
      tableData[action.row][action.cell] = state.turn;
      return {
        ...state,
        tableData,
        recentCell : [action.row, action.cell],
      }
    }
    case CHANGE_TURN : {
      return {
        ...state,
        turn : state.turn === 'O' ? 'X' :'O',
      }
    }
    case RESET_GAME : {
      return {
        ...state,
        turn : 'O',
        tableData : [
          ['','',''],
          ['','',''],
          ['','','']
        ],
        recentCell : [-1, -1],
      };
    }
    default : 
      return state;
  }
};

//state 가 너무 많으면 복잡하기 때문에
const TicTacToe = () => {
  const [state, dispatch] = useReducer(reducer, initialState); //setState 도 한방에 처리하기 위해 useReducer 사용한다.
  const {tableData, turn, winner, recentCell} = state; //state 를 모아서 한방에 처리, state 가 너무 많아지면 useReducer를 고려해본다.

  const onClickTable = useCallback(() => {
    dispatch({type : SET_WINNER, winner: 'O'}); //{}가 액션 객체가 된다. type 은 액션의 이름이다. 나머지는 데이터다. 액션을 dispatch하면 액션이 실행이 되는데
  }, []);

  useEffect(() => {
    const [row, cell] = recentCell;
    if(row < 0){ //처음에는 실행되지 않도록. 처음에는 승자를 체크하지 않는다.
      return;
    }
    let win = false;
    if(tableData[row][0] === turn && tableData[row][1] === turn && tableData[row][2] === turn){ //가로줄 검사
      win = true;
    }
    if(tableData[0][cell] === turn && tableData[1][cell] === turn && tableData[2][cell] === turn){ //세로줄 검사
      win = true;
    }
    if(tableData[0][0] === turn && tableData[1][1] === turn && tableData[2][2] === turn){ //대각선
      win = true;
    }
    if(tableData[0][2] === turn && tableData[1][1] === turn && tableData[2][0] === turn){ //대각선
      win = true;
    }
    if(win) { //승리시
      dispatch({type:SET_WINNER, winner :turn});
    }else{ 
      let all = true //all 이 true 면 무승부라는 뜻
      tableData.forEach((row) => { //무승부 검사
        row.forEach((cell) => {
          if(!cell){
            all = true;
          }
        })
      });
      if(all) {
        dispatch({type : RESET_GAME});
      }else{
        dispatch({type : CHANGE_TURN});
      }
    }
  }, [recentCell])

  return (
    <>
      <Table onClick={onClickTable} tableData={tableData} dispatch={dispatch}/>
      {winner && <div>{winner}님의 승리 </div>}
    </>
  )
}

export default TicTacToe;