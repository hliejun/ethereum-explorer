import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { hot } from 'react-hot-loader';

import { Router } from './Router';
import Container from './Container';
import Missing from './scenes/Missing';

const App = ({ store }) => (
	<Provider store={store}>
		<Router>
			<Switch>
				<Route path="/app" component={Container} />
				<Route component={Missing} />
			</Switch>
		</Router>
	</Provider>
);

export default hot(module)(App);
