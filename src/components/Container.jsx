import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import throttle from 'lodash.throttle';

import { getTheme } from '../redux/selectors';
import setTheme from './themes';

import Home from './scenes/Home';
import Missing from './scenes/Missing';
import Profile from './scenes/Profile';

import {
	PortfolioPage,
	SettingsPage,
	TransactionPage
} from './common/PageLoader';

import AppBar from './common/AppBar';
import Notification from './common/Notification';

// Attach passthrough app controls by making pages into render props
const attach = Page => options => props => <Page {...options} {...props} />;

const initialState = {
	isMobile: false,
	notifConfirmText: 'Okay',
	pageOptions: [],
	pageSubtitle: null,
	pageTitle: 'Tx Ethereum Explorer',
	useBackLink: false
};

const Container = ({ isDarkMode, match }) => {
	// App bar controls
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

	// Surface/device flag (callback throttled for performance)
	const [isMobile, setIsMobile] = useState(false);
	const updateDimensions = throttle(() => {
		const currentlyIsMobile = window.innerWidth < 768;
		if (currentlyIsMobile !== isMobile) {
			setIsMobile(currentlyIsMobile);
		}
	}, 500);

	// Notification controls
	const [isNotifying, setIsNotifying] = useState(false);
	const [notifTitle, setNotifTitle] = useState(null);
	const [notifSubtitle, setNotifSubtitle] = useState(null);
	const [notifDescription, setNotifDescription] = useState(null);
	const [notifConfirmText, setNotifConfirmText] = useState(
		initialState.notifConfirmText
	);
	const notify = (title, subtitle, description, confirmText) => {
		setNotifTitle(title || null);
		setNotifSubtitle(subtitle || null);
		setNotifDescription(description || null);
		setNotifConfirmText(confirmText || initialState.notifConfirmText);
		setIsNotifying(true);
	};

	// Aggregated app controls callbacks for children to use
	const appControl = {
		isMobile,
		notify,
		reset: resetAppBar,
		setBackLink: setUseBackLink,
		setOptions: setPageOptions,
		setSubtitle: setPageSubtitle,
		setTitle: setPageTitle
	};

	// Side-effect: Listen to window resizing
	useEffect(() => {
		updateDimensions();
		window.addEventListener('resize', updateDimensions);
		return function cleanup() {
			updateDimensions.flush();
			window.removeEventListener('resize', updateDimensions);
		};
	}, [window, updateDimensions]);

	// Side-effect: Listen to theme props change to edit CSS vars
	useEffect(() => {
		const theme = isDarkMode ? 'dark' : 'light';
		setTheme(theme);
	}, [isDarkMode]);

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
					path={`${match.url}/profile`}
					render={attach(Profile)(appControl)}
				/>
				<Route
					exact
					path={`${match.url}/settings`}
					render={attach(SettingsPage)(appControl)}
				/>
				<Route
					exact
					path={`${match.url}/portfolio`}
					render={attach(PortfolioPage)(appControl)}
				/>
				<Route
					exact
					path={`${match.url}/transaction/:id`}
					render={attach(TransactionPage)(appControl)}
				/>
				<Route render={attach(Missing)(appControl)} />
			</Switch>
			{isNotifying && (
				<Notification
					description={notifDescription}
					dismissText={notifConfirmText}
					onDismiss={() => setIsNotifying(!isNotifying)}
					subtitle={notifSubtitle}
					title={notifTitle}
				/>
			)}
		</div>
	);
};

Container.propTypes = {
	isDarkMode: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
	isDarkMode: getTheme(state)
});

export default connect(mapStateToProps)(Container);
