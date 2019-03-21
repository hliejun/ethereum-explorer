import React from 'react';
import { Provider } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { hot } from 'react-hot-loader';

import { Router } from './Router';
import Container from './Container';
import Missing from './scenes/Missing';

// Provide redux store and catch rogue routes using wild card sink route
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

// Enable hot reload
export default hot(module)(App);
