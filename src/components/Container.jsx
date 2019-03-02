import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from './scenes/Home';
import Missing from './scenes/Missing';
import Portfolio from './scenes/Portfolio';
import Profile from './scenes/Profile';
import Settings from './scenes/Settings';
import Transaction from './scenes/Transaction';

import AppBar from './common/AppBar';

const attachOptions = Page => options => props => (
	<Page {...options} {...props} />
);

const Container = ({ match }) => {
	const [backLink, setBackLink] = useState(false);
	const [pageTitle, setPageTitle] = useState('Tx');
	const [pageSubtitle, setPageSubtitle] = useState(null);
	const [pageOptions, setPageOptions] = useState([]);

	const resetAppBar = () => {
		setBackLink(false);
		setPageTitle('Tx');
		setPageSubtitle(null);
		setPageOptions([]);
	};

	const options = {
		setBackLink,
		setTitle: setPageTitle,
		setSubtitle: setPageSubtitle,
		setOptions: setPageOptions,
		reset: resetAppBar
	};

	return (
		<div className="container">
			<AppBar
				useBackLink={backLink}
				options={pageOptions}
				subtitle={pageSubtitle}
				title={pageTitle}
			/>
			<Switch>
				<Route
					exact
					path={`${match.url}/`}
					render={attachOptions(Home)(options)}
				/>
				<Route
					exact
					path={`${match.url}/profile/:mode?/:item?`}
					render={attachOptions(Profile)(options)}
				/>
				<Route
					exact
					path={`${match.url}/settings/:mode?/:item?`}
					render={attachOptions(Settings)(options)}
				/>
				<Route
					exact
					path={`${match.url}/portfolio/:filter?/:sort?`}
					render={attachOptions(Portfolio)(options)}
				/>
				<Route
					exact
					path={`${match.url}/transaction/:id`}
					render={attachOptions(Transaction)(options)}
				/>
				<Route component={Missing} />
			</Switch>
		</div>
	);
};

export default Container;
