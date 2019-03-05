import React from 'react';
import ReactDOM from 'react-dom';
import WebFont from 'webfontloader';

import App from './components/App';
import store from './redux/store';

import './assets/styles.scss';

// TODO: Null checks and immutables

// TODO: Move props destructuring for func comp. to param

// TODO: Props check

// TODO: Optimise with pure / memoised components + check for active side effects and see if they can be removed or throttled

// TODO: Use lazy + suspense to split unshared components

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
