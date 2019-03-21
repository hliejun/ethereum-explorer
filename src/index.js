import React from 'react';
import ReactDOM from 'react-dom';
import WebFont from 'webfontloader';

import App from './components/App';
import store from './redux/store';

import './assets/styles.scss';

// Load font faces
WebFont.load({
	google: {
		families: [
			'Roboto:300,400,500:latin',
			'Roboto Mono:300,400,500:latin',
			'sans-serif'
		]
	}
});

// Flag surface type for hover handling
const isTouchEnabled =
  'ontouchstart' in window ||
  navigator.maxTouchPoints > 0 ||
  navigator.msMaxTouchPoints > 0;
if (!isTouchEnabled) {
	document.documentElement.classList.add('no-touch');
}

const rootNode = document.getElementById('app-root');

ReactDOM.render(<App store={store} />, rootNode);
