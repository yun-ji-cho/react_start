const React = require('react');
import { createRoot } from 'react-dom/client';
const container = document.querySelector('#root');
const root = createRoot(container);

const GuGuDan = require('./GuGuDan');

root.render(<GuGuDan/>);