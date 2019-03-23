import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import clns from 'classnames';

import {
	getAddress,
	getApiKey,
	getAuthToken,
	getLoadStates,
	getRates,
	getTransaction
} from '../../../redux/selectors';

import {
	getCurrencyRates as fetchCurrencyRates,
	reloadTransactions as fetchTransactions
} from '../../../redux/actions/ethereum';

import BlockSection from './BlockSection';
import Currency from '../../common/Currency';
import GasSection from './GasSection';
import Jumbotron from '../../common/Jumbotron';
import Placeholder from '../../common/Placeholder';
import SourceSection from './SourceSection';

import { copyData, formatObject } from './_helper';

import CopyIcon from '../../../assets/icons/glyphs/copy.svg';
import ErrorIcon from '../../../assets/icons/glyphs/server.svg';

import {
	NOTIFICATION_CLIPBOARD,
	COUNTRY_ICONS,
	CURRENCY_SYMBOLS,
	PLACEHOLDER_ADDRESS_ERROR,
	PLACEHOLDER_KEY_ERROR,
	PLACEHOLDER_TRANSACTION_ERROR,
	PLACEHOLDER_TRANSACTION_LOADING,
	TRANSACTION_JUMBOTRON_SUBTITLE,
	TRANSACTION_TITLE,
	TRANSACTION_USE_BACKLINK,
	TRANSACTION_ZERO_ETH_INFO
} from '../../../constants';

import './_transaction.scss';

const LocalValues = ({ rates, value }) => {
	const { ETH, ...localRates } = rates;
	return Object.keys(localRates).map(code => {
		const rate = rates[code];
		const Icon = COUNTRY_ICONS[code];
		return (
			<div
				className={clns(
					'transaction__local-amount',
					`transaction__local-amount--${code}`
				)}
				key={code}
			>
				{Icon && <Icon className="transaction__glyph" />}
				<Currency
					amount={rate * value}
					className="transaction__local-currency"
					code={code}
				/>
			</div>
		);
	});
};

LocalValues.propTypes = {
	rates: PropTypes.objectOf(PropTypes.number).isRequired,
	value: PropTypes.number.isRequired
};

const Transaction = ({
	address,
	apiKey,
	authToken,
	className,
	history,
	isLoading,
	notify,
	rates,
	reset,
	setBackLink: updateBacklink,
	setOptions: updateOptions,
	setSubtitle: updateSubtitle,
	setTitle: updateTitle,
	transaction,
	updateRates,
	updateTransactions
}) => {
	const onCopyComplete = () => notify(NOTIFICATION_CLIPBOARD);
	const handleCopy = copyData(formatObject, transaction, onCopyComplete);
	const options = [{ handler: handleCopy, icon: CopyIcon, key: 'copy' }];
	const subtitle = transaction ? `ID: ${transaction.id}` : null;

	// Setup AppBar controls
	useEffect(() => {
		updateSubtitle(subtitle);
		updateBacklink(TRANSACTION_USE_BACKLINK);
		updateOptions(options);
		updateTitle(TRANSACTION_TITLE);
		return () => {
			reset();
		};
	}, [subtitle]);

	// Update rates
	useEffect(() => {
		if (!rates && !isLoading.currency) {
			updateRates(authToken, Object.keys(CURRENCY_SYMBOLS));
		}
	}, [authToken]);

	// Scroll to top
	useEffect(() => {
		if (window) {
			window.scroll(0, 0);
		}
	}, [window]);

	// Setup placeholder
	let placeholderState = null;
	let key = 'transaction';
	let actionHandler = () => history.push('/app/settings');
	if (!apiKey) {
		placeholderState = PLACEHOLDER_KEY_ERROR;
		key = 'key';
	} else if (!address) {
		placeholderState = PLACEHOLDER_ADDRESS_ERROR;
		key = 'address';
	} else if (!transaction && isLoading.transactions) {
		placeholderState = PLACEHOLDER_TRANSACTION_LOADING;
	} else if (!transaction) {
		placeholderState = PLACEHOLDER_TRANSACTION_ERROR;
		actionHandler = () => updateTransactions(authToken, address);
	}

	/**
   * NOTE:
   * Error messages for placeholder should be
   * dynamically determined by redux props
   */

	// Use placeholder if cannot load data
	if (placeholderState) {
		return (
			<div className={clns('page', 'transaction', className)}>
				<Placeholder
					className={clns(
						'transaction__placeholder',
						`transaction__placeholder--${key}`
					)}
					errorIcon={ErrorIcon}
					hasError
					isLoading={isLoading.transactions}
					onRefresh={actionHandler}
					{...placeholderState}
				/>
			</div>
		);
	}

	// Prepare render data
	const { block, gas, id, source, status, value } = transaction;
	const parsedValue = parseFloat(value) || 0;

	return (
		<div className={clns('page', 'transaction', className)}>
			<div className="transaction__header">
				<Jumbotron
					className="transaction__values"
					subtitle={TRANSACTION_JUMBOTRON_SUBTITLE}
					title={<Currency amount={parsedValue} code="ETH" />}
				>
					{rates && parsedValue !== 0 && Object.keys(rates).length > 0 && (
						<LocalValues rates={rates} value={parsedValue} />
					)}
					{parsedValue === 0 && (
						<span className="transaction__info-text">
							{TRANSACTION_ZERO_ETH_INFO}
						</span>
					)}
				</Jumbotron>
			</div>
			<div className="transaction__body">
				<SourceSection
					className="transaction__section transaction__section--source"
					id={id}
					status={status}
					{...source}
				/>
				<BlockSection
					className="transaction__section transaction__section--block"
					{...block}
				/>
				<GasSection
					className="transaction__section transaction__section--gas"
					{...gas}
				/>
			</div>
		</div>
	);
};

const transactionType = PropTypes.shape({
	block: PropTypes.shape({
		confirmations: PropTypes.string.isRequired,
		height: PropTypes.string.isRequired,
		id: PropTypes.string.isRequired
	}),
	gas: PropTypes.shape({
		cumulativeUsed: PropTypes.string.isRequired,
		fee: PropTypes.string.isRequired,
		limit: PropTypes.string.isRequired,
		price: PropTypes.string.isRequired,
		used: PropTypes.string.isRequired
	}),
	id: PropTypes.string.isRequired,
	source: PropTypes.shape({
		address: PropTypes.string.isRequired,
		timestamp: PropTypes.string.isRequired,
		type: PropTypes.oneOf(['incoming', 'outgoing']).isRequired
	}).isRequired,
	status: PropTypes.oneOf(['failed', 'pending', 'success']).isRequired,
	value: PropTypes.string.isRequired
});

Transaction.propTypes = {
	address: PropTypes.string,
	apiKey: PropTypes.string,
	authToken: PropTypes.string,
	className: PropTypes.string,
	isLoading: PropTypes.objectOf(PropTypes.bool).isRequired,
	notify: PropTypes.func.isRequired,
	rates: PropTypes.objectOf(PropTypes.number),
	reset: PropTypes.func.isRequired,
	setBackLink: PropTypes.func.isRequired,
	setOptions: PropTypes.func.isRequired,
	setSubtitle: PropTypes.func.isRequired,
	setTitle: PropTypes.func.isRequired,
	transaction: transactionType,
	updateRates: PropTypes.func.isRequired,
	updateTransactions: PropTypes.func.isRequired
};

Transaction.defaultProps = {
	address: null,
	apiKey: null,
	authToken: null,
	className: null,
	rates: {},
	transaction: null
};

const mapStateToProps = (state, props) => ({
	address: getAddress(state),
	apiKey: getApiKey(state),
	authToken: getAuthToken(state),
	isLoading: getLoadStates(state),
	rates: getRates(state),
	transaction: getTransaction(state, props)
});

const mapDispatchToProps = dispatch => ({
	updateRates: (authToken, codes) =>
		dispatch(fetchCurrencyRates(authToken, codes)),
	updateTransactions: (authToken, address) =>
		dispatch(fetchTransactions(authToken, address))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Transaction);
