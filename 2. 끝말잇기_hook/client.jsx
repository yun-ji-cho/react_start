//노드의 모듈 시스템을 이용해서 npm에 설치했던 것을 불러올 수 있다.
const React = require('react');
import { createRoot } from 'react-dom/client';
const container = document.querySelector('#root');
const root = createRoot(container);

//모듈 시스템의 도입으로 필요한 것만 쏙쏙 불러 올 수 있게 되었다.
const WordRelay = require('./WordRelay');

root.render(<WordRelay/>);