import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { hot } from 'react-hot-loader';

import Missing from './scenes/Missing';
import Onboarding from './scenes/Onboarding';
import Register from './scenes/Register';
import Settings from './scenes/Settings';
import SignIn from './scenes/SignIn';
import Splash from './scenes/Splash';
import Transaction from './scenes/Transaction';
import TransactionList from './scenes/TransactionList';

const App = ({ store }) => (
	<Provider store={store}>
		<Router>
			<Switch>
				<Route exact path="/login" component={SignIn} />
				<Route exact path="/signup/:referrer?" component={Register} />
				<Route exact path="/onboarding/:step?" component={Onboarding} />
				<Route exact path="/settings/:item?" component={Settings} />
				<Route exact path="/list/:filter?" component={TransactionList} />
				<Route exact path="/transaction/:id?" component={Transaction} />
				<Route exact path="/" component={Splash} />
				<Route component={Missing} />
			</Switch>
		</Router>
	</Provider>
);

export default hot(module)(App);
