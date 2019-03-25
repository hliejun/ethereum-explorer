import React, { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import throttle from 'lodash.throttle';

import {
	getApiKey,
	getAuthLastUpdated,
	getAuthToken,
	getLoadStates,
	getTheme
} from '../redux/selectors';

import { getAuthToken as fetchAuthToken } from '../redux/actions/auth';

import setTheme from './themes';

import Home from './scenes/Home';
import Missing from './scenes/Missing';
import Profile from './scenes/Profile';

import {
	PortfolioPage,
	PrivacyPage,
	SettingsPage,
	TermsPage,
	TransactionPage
} from './common/PageLoader';

import AppBar from './common/AppBar';
import Notification from './common/Notification';

import {
	APP_TITLE,
	NOTIFICATION_DEFAULT_DISMISS,
	NOTIFICATION_DEFAULT_TITLE,
	DATE_TIME_ONE_HOUR,
	SETTINGS_LENGTH_API_KEY
} from '../constants';

// Attach passthrough app controls by making pages into render props
const attach = Page => options => props => <Page {...options} {...props} />;

const initialState = {
	isMobile: false,
	notifConfirmText: NOTIFICATION_DEFAULT_DISMISS,
	notifTitle: NOTIFICATION_DEFAULT_TITLE,
	pageOptions: [],
	pageSubtitle: null,
	pageTitle: APP_TITLE,
	useBackLink: false
};

const Container = ({
	apiKey,
	authToken,
	isDarkMode,
	isLoading,
	lastUpdated,
	match,
	updateAuthToken
}) => {
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
	const [notifTitle, setNotifTitle] = useState(initialState.notifTitle);
	const [notifSubtitle, setNotifSubtitle] = useState(null);
	const [notifDescription, setNotifDescription] = useState(null);
	const [notifConfirmText, setNotifConfirmText] = useState(
		initialState.notifConfirmText
	);
	const notify = ({ confirmText, description, subtitle, title }) => {
		setNotifTitle(title || initialState.notifTitle);
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
		return () => {
			updateDimensions.flush();
			window.removeEventListener('resize', updateDimensions);
		};
	}, [window, updateDimensions]);

	// Side-effect: Listen to theme props change to edit CSS vars
	useEffect(() => {
		const theme = isDarkMode ? 'dark' : 'light';
		setTheme(theme);
	}, [isDarkMode]);

	// Side-effect: Re-authentication
	useEffect(() => {
		// Do not re-register if already registering or have invalid key
		if (
			isLoading.auth ||
      !apiKey ||
      apiKey.length !== SETTINGS_LENGTH_API_KEY
		) {
			return;
		}

		// Given that we are not registering and have a valid key, check:
		const now = new Date();

		// Attempt to re-auth if no token yet, or if token is expired
		if (
			!authToken ||
      !lastUpdated ||
      now - new Date(parseInt(lastUpdated, 10)) >= DATE_TIME_ONE_HOUR
		) {
			updateAuthToken(apiKey);
		}
	}, [apiKey]);

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
				<Route
					exact
					path={`${match.url}/privacy`}
					render={attach(PrivacyPage)(appControl)}
				/>
				<Route
					exact
					path={`${match.url}/terms`}
					render={attach(TermsPage)(appControl)}
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
	apiKey: PropTypes.string,
	authToken: PropTypes.string,
	isDarkMode: PropTypes.bool.isRequired,
	isLoading: PropTypes.objectOf(PropTypes.bool).isRequired,
	lastUpdated: PropTypes.string,
	updateAuthToken: PropTypes.func.isRequired
};

Container.defaultProps = {
	apiKey: null,
	authToken: null,
	lastUpdated: null
};

const mapStateToProps = state => ({
	apiKey: getApiKey(state),
	authToken: getAuthToken(state),
	isDarkMode: getTheme(state),
	isLoading: getLoadStates(state),
	lastUpdated: getAuthLastUpdated(state)
});

const mapDispatchToProps = dispatch => ({
	updateAuthToken: token => dispatch(fetchAuthToken(token))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Container);
