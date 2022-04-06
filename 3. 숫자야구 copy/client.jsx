const React = require('react');
const ReactDom = require('react-dom');


//모듈 시스템의 도입으로 필요한 것만 쏙쏙 불러 올 수 있게 되었다.
const NumberBaseball = require('./Baseball');

ReactDom.render(<NumberBaseball/>, document.querySelector('#root'));