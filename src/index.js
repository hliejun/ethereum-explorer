import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
import store from './redux/store';

import './assets/styles.scss';

const rootNode = document.getElementById('root');

ReactDOM.render(<App store={store} />, rootNode);
