import React, { useEffect, useState } from 'react';
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

import {
	countryIcons,
	errorAddressHolderState,
	errorKeyHolderState,
	errorTransactionHolderState,
	loadingTransactionHolderState
} from './_constants';

import { copyData, formatObject } from './_helper';

import BlockSection from './BlockSection';
import Currency, { symbols } from '../../common/Currency';
import GasSection from './GasSection';
import Jumbotron from '../../common/Jumbotron';
import Placeholder from '../../common/Placeholder';
import SourceSection from './SourceSection';

import Copy from '../../../assets/icons/copy.svg';
import ErrorIcon from '../../../assets/icons/server.svg';

import './_transaction.scss';

const LocalValues = ({ rates, value }) => {
	const { ETH, ...localRates } = rates;
	return Object.keys(localRates).map(code => {
		const rate = rates[code];
		const Icon = countryIcons[code];
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
	const [showId /* , setShowId */] = useState(true);
	const onCopyComplete = () =>
		notify(
			'Notification',
			'Copy to Clipboard',
			'The details for this transaction has been copied to your clipboard!',
			'DISMISS'
		);
	const handleCopy = copyData(formatObject, transaction, onCopyComplete);
	const options = [{ handler: handleCopy, icon: Copy, key: 'copy' }];
	const title = 'Transaction Details';
	const subtitle = transaction ? `ID: ${transaction.id}` : null;

	useEffect(() => {
		updateSubtitle(showId ? subtitle : null);
		updateBacklink(true);
		updateOptions(options);
		updateTitle(title);
		if (!rates && !isLoading.currency) {
			updateRates(authToken, Object.keys(symbols));
		}
		return () => {
			reset();
		};
	}, [showId, subtitle]);

	useEffect(() => {
		if (window) {
			window.scroll(0, 0);
		}
	}, [window]);

	// TODO: Display error messages
	const getPlaceholder = (state, key) => (
		<Placeholder
			className={`transaction__placeholder transaction__placeholder--${key}`}
			errorIcon={ErrorIcon}
			hasError
			onRefresh={() => history.push('/app/settings')}
			{...state}
		/>
	);

	if (!apiKey) {
		return (
			<div className={clns('page', 'transaction', className)}>
				{getPlaceholder(errorKeyHolderState, 'key')}
			</div>
		);
	}

	if (!address) {
		return (
			<div className={clns('page', 'transaction', className)}>
				{getPlaceholder(errorAddressHolderState, 'address')}
			</div>
		);
	}

	let state = errorTransactionHolderState;
	if (isLoading.transactions) {
		state = loadingTransactionHolderState;
	}

	if (!transaction) {
		return (
			<div className={clns('page', 'transaction', className)}>
				<Placeholder
					className="transaction__placeholder transaction__placeholder--transaction"
					errorIcon={ErrorIcon}
					hasError
					isLoading={isLoading.transactions}
					onRefresh={() => updateTransactions(authToken, address)}
					{...state}
				/>
			</div>
		);
	}

	const { block, gas, id, source, status, value } = transaction;
	const parsedValue = parseFloat(value) || 0;

	return (
		<div className={clns('page', 'transaction', className)}>
			<div className="transaction__header">
				<Jumbotron
					className="transaction__values"
					subtitle="Transacted Ether"
					title={<Currency amount={parsedValue} code="ETH" />}
				>
					{rates && parsedValue !== 0 && Object.keys(rates).length > 0 && (
						<LocalValues rates={rates} value={parsedValue} />
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
	transaction: PropTypes.shape({
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
	}),
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
