import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import throttle from 'lodash.throttle';

import Home from './scenes/Home';
import Missing from './scenes/Missing';
import Portfolio from './scenes/Portfolio';
import Profile from './scenes/Profile';
import Settings from './scenes/Settings';
import Transaction from './scenes/Transaction';

import AppBar from './common/AppBar';

const attach = Page => options => props => <Page {...options} {...props} />;

const initialState = {
	isMobile: false,
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
	const [isMobile, setIsMobile] = useState(false);

	const resetAppBar = () => {
		setUseBackLink(initialState.useBackLink);
		setPageTitle(initialState.pageTitle);
		setPageSubtitle(initialState.pageSubtitle);
		setPageOptions(initialState.pageOptions);
	};

	const appControl = {
		isMobile,
		reset: resetAppBar,
		setBackLink: setUseBackLink,
		setOptions: setPageOptions,
		setSubtitle: setPageSubtitle,
		setTitle: setPageTitle
	};

	const updateDimensions = throttle(() => {
		const currentlyIsMobile = window.innerWidth < 768;
		if (currentlyIsMobile !== isMobile) {
			setIsMobile(currentlyIsMobile);
		}
	}, 800);

	useEffect(() => {
		updateDimensions();
		window.addEventListener('resize', updateDimensions);
		return function cleanup() {
			updateDimensions.flush();
			window.removeEventListener('resize', updateDimensions);
		};
	}, [window, updateDimensions]);

	return (
		<div className="container">
			<AppBar
				options={pageOptions}
				subtitle={pageSubtitle}
				title={pageTitle}
				useBackLink={useBackLink}
			/>
			<Switch>
				<Route exact path={`${match.url}/`} render={attach(Home)(appControl)} />
				<Route
					exact
					path={`${match.url}/profile/:mode?/:item?`}
					render={attach(Profile)(appControl)}
				/>
				<Route
					exact
					path={`${match.url}/settings/:mode?/:item?`}
					render={attach(Settings)(appControl)}
				/>
				<Route
					exact
					path={`${match.url}/portfolio`}
					render={attach(Portfolio)(appControl)}
				/>
				<Route
					exact
					path={`${match.url}/transaction/:id`}
					render={attach(Transaction)(appControl)}
				/>
				<Route render={attach(Missing)(appControl)} />
			</Switch>
		</div>
	);
};

export default Container;
