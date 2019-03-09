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

const initialState = {
	pageOptions: [],
	pageSubtitle: null,
	pageTitle: 'Tx Ethereum Explorer',
	useBackLink: false
};

const Container = ({ match }) => {
	const [useBackLink, setUseBackLink] = useState(initialState.useBackLink);
	const [pageTitle, setPageTitle] = useState(initialState.pageTitle);
	const [pageSubtitle, setPageSubtitle] = useState(initialState.pageSubtitle);
	const [pageOptions, setPageOptions] = useState(initialState.pageOptions);

	const resetAppBar = () => {
		setUseBackLink(initialState.useBackLink);
		setPageTitle(initialState.pageTitle);
		setPageSubtitle(initialState.pageSubtitle);
		setPageOptions(initialState.pageOptions);
	};

	const options = {
		reset: resetAppBar,
		setBackLink: setUseBackLink,
		setOptions: setPageOptions,
		setSubtitle: setPageSubtitle,
		setTitle: setPageTitle
	};

	return (
		<div className="container">
			<AppBar
				options={pageOptions}
				subtitle={pageSubtitle}
				title={pageTitle}
				useBackLink={useBackLink}
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
