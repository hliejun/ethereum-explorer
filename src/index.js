import React from 'react';
import ReactDOM from 'react-dom';
import WebFont from 'webfontloader';

import App from './components/App';
import store from './redux/store';

import './assets/styles.scss';

// TODO: Props check

// TODO: Classnames passthrough

// TODO: Jest specs

WebFont.load({
	google: {
		families: [
			'Roboto:300,400,500,700',
			'Roboto Mono:300,400,500,700',
			'sans-serif'
		]
	}
});

const rootNode = document.getElementById('app-root');

ReactDOM.render(<App store={store} />, rootNode);
