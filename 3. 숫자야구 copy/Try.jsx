// const React = require('react');

// const Try = ({ tryInfo }) => {
  
//     return (
//       <li>
//         <div>{tryInfo.try}</div>
//         <div>{tryInfo.result}</div>
//       </li>
//     )
  
// }

// module.exports = Try;


//렌더링 최소화 : memo 이용 (프롭스, 스테이트가 바뀌었을 때만 렌더링 해줌)
import React, {memo} from 'react';
const Try = memo(({ tryInfo }) => {
    return (
      <li>
        <div>{tryInfo.try}</div>
        <div>{tryInfo.result}</div>
      </li>
    )
  
});

module.exports = Try;