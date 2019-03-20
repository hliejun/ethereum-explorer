import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import clns from 'classnames';

import {
	getAddress,
	getLoadStates,
	getRates,
	getTransaction
} from '../../../redux/selectors';

import {
	countryIcons,
	errorAddressHolderState,
	errorTransactionHolderState,
	loadingTransactionHolderState
} from './_constants';
import { copyData, formatTransaction } from './_helper';

import BlockSection from './BlockSection';
import Currency from '../../common/Currency';
import GasSection from './GasSection';
import Jumbotron from '../../common/Jumbotron';
import Placeholder from '../../common/Placeholder';
import SourceSection from './SourceSection';

import Copy from '../../../assets/icons/copy.svg';
import ErrorIcon from '../../../assets/icons/server.svg';

import './_transaction.scss';

// TODO: Add flags
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
	className,
	history,
	isLoading,
	rates,
	reset,
	setBackLink: updateBacklink,
	setOptions: updateOptions,
	setSubtitle: updateSubtitle,
	setTitle: updateTitle,
	transaction
}) => {
	const [showId /* , setShowId */] = useState(true);

	const handleCopy = copyData(formatTransaction(transaction));
	const options = [{ handler: handleCopy, icon: Copy, key: 'copy' }];
	const title = 'Transaction Details';
	const subtitle = transaction ? `ID: ${transaction.id}` : null;

	useEffect(() => {
		updateSubtitle(showId ? subtitle : null);
		updateBacklink(true);
		updateOptions(options);
		updateTitle(title);
		return () => {
			reset();
		};
	}, [showId, subtitle]);

	useEffect(() => {
		if (window) {
			window.scroll(0, 0);
		}
	}, [window]);

	if (!address) {
		return (
			<div className={clns('page', 'transaction', className)}>
				<Placeholder
					className="transaction__placeholder transaction__placeholder--address"
					errorIcon={ErrorIcon}
					hasError
					onRefresh={() => history.push('/app/settings')}
					{...errorAddressHolderState}
				/>
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
					// TODO: Get fetch transaction from dispatch props
					onRefresh={() => {}}
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
					{rates && Object.keys(rates).length > 0 && (
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
	className: PropTypes.string,
	isLoading: PropTypes.objectOf(PropTypes.bool).isRequired,
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
	})
};

Transaction.defaultProps = {
	address: null,
	className: null,
	rates: {},
	transaction: null
};

const mapStateToProps = (state, props) => ({
	address: getAddress(state),
	isLoading: getLoadStates(state),
	rates: getRates(state),
	transaction: getTransaction(state, props)
});

// const mapDispatchToProps = dispatch => {};

export default connect(
	mapStateToProps
	// mapDispatchToProps
)(Transaction);
