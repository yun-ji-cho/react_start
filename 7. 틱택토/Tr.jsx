import React, {useRef, useEffect, useMemo} from 'react';
import Td from './Td';


const Tr =  ({ rowData, rowIndex, dispatch }) => {
  console.log('tr rendered');

  return(
    <tr>
      {Array(rowData.length).fill().map((td, i) => (
        useMemo(
          () => <Td key={i} dispatch={dispatch} rowIndex={rowIndex} cellIndex={i} cellData={rowData[i]}>{''}</Td>, [rowData[i]],
          )
        ))}
    </tr>
  );
};

export default Tr;

//useMemo로 컴포넌트 자체도 기억할 수 있다. 최후의 수단으로 최적화 가능, memo 로 해도 계속 리랜더링 될 때
//기억을 해제할 때는 두번째 인자 [] 에 들어간 것이 바뀌었을때