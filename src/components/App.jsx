import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { hot } from 'react-hot-loader';

import BrowserRouter from './Router';
import Container from './Container';
import Missing from './scenes/Missing';
import Onboarding from './scenes/Onboarding';
import Register from './scenes/Register';
import SignIn from './scenes/SignIn';
import Splash from './scenes/Splash';

const App = ({ store }) => (
	<Provider store={store}>
		<BrowserRouter>
			<Switch>
				<Route exact path="/landing" component={Splash} />
				<Route exact path="/login" component={SignIn} />
				<Route exact path="/signup/:referrer?" component={Register} />
				<Route exact path="/onboarding/:step?" component={Onboarding} />
				<Route path="/app" component={Container} />
				<Route component={Missing} />
			</Switch>
		</BrowserRouter>
	</Provider>
);

export default hot(module)(App);
