import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { hot } from 'react-hot-loader';

import Home from './scenes/Home';
import Missing from './scenes/Missing';
import Onboarding from './scenes/Onboarding';
import Profile from './scenes/Profile';
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
				<Route exact path="/home" component={Home} />
				<Route exact path="/list/:filter?" component={TransactionList} />
				<Route exact path="/login" component={SignIn} />
				<Route exact path="/onboarding/:step?" component={Onboarding} />
				<Route exact path="/profile" component={Profile} />
				<Route exact path="/settings/:item?" component={Settings} />
				<Route exact path="/signup/:referrer?" component={Register} />
				<Route exact path="/landing" component={Splash} />
				<Route exact path="/transaction/:id?" component={Transaction} />
				<Route exact path="/" component={TransactionList} />

				<Route component={Missing} />
			</Switch>
		</Router>
	</Provider>
);

export default hot(module)(App);
