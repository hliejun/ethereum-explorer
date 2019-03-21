import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
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

const attach = Page => options => props => <Page {...options} {...props} />;

const initialState = {
	isMobile: false,
	pageOptions: [],
	pageSubtitle: null,
	pageTitle: 'Tx Ethereum Explorer',
	useBackLink: false,
	notifConfirmText: 'OKAY'
};

const Container = ({ isDarkMode, match }) => {
	const [useBackLink, setUseBackLink] = useState(initialState.useBackLink);
	const [pageTitle, setPageTitle] = useState(initialState.pageTitle);
	const [pageSubtitle, setPageSubtitle] = useState(initialState.pageSubtitle);
	const [pageOptions, setPageOptions] = useState(initialState.pageOptions);

	const [isMobile, setIsMobile] = useState(false);

	const [isNotifying, setIsNotifying] = useState(false);
	const [notifTitle, setNotifTitle] = useState(null);
	const [notifSubtitle, setNotifSubtitle] = useState(null);
	const [notifDescription, setNotifDescription] = useState(null);
	const [notifConfirmText, setNotifConfirmText] = useState(
		initialState.notifConfirmText
	);

	const resetAppBar = () => {
		setUseBackLink(initialState.useBackLink);
		setPageTitle(initialState.pageTitle);
		setPageSubtitle(initialState.pageSubtitle);
		setPageOptions(initialState.pageOptions);
	};

	const notify = (title, subtitle, description, confirmText) => {
		setNotifTitle(title || null);
		setNotifSubtitle(subtitle || null);
		setNotifDescription(description || null);
		setNotifConfirmText(confirmText || initialState.notifConfirmText);
		setIsNotifying(true);
	};

	const appControl = {
		isMobile,
		notify,
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
