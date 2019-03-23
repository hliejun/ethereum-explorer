import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Form, Input } from '../../common/Form';
import Dashboard from '../../common/Dashboard';
import Placeholder from '../../common/Placeholder';

import BalanceIcon from '../../../assets/icons/glyphs/balance.svg';
import ReceiveIcon from '../../../assets/icons/glyphs/receive.svg';
import SendIcon from '../../../assets/icons/glyphs/send.svg';

import ErrorIcon from '../../../assets/icons/glyphs/server.svg';

import {
	CURRENCY_SYMBOLS,
	DASHBOARD_LABELS,
	PLACEHOLDER_BALANCE_ERROR,
	PLACEHOLDER_BALANCE_LOADING
} from '../../../constants';

import './_transactiondashboard.scss';

/**
 * NOTE:
 * Error messages for placeholder should be
 * dynamically determined by redux props
 */

const BalancePlaceholder = ({ isLoading, onRefresh }) => {
	let state = PLACEHOLDER_BALANCE_ERROR;
	if (isLoading) {
		state = PLACEHOLDER_BALANCE_LOADING;
	}
	return (
		<Placeholder
			className="portfolio__placeholder portfolio__placeholder--balance"
			errorIcon={ErrorIcon}
			hasError
			isLoading={isLoading}
			onRefresh={onRefresh}
			{...state}
		/>
	);
};

const TransactionDashboard = ({
	balance,
	className,
	isLoading,
	localCode,
	onRefresh,
	rate,
	received,
	sent,
	subtotal
}) => {
	// Setup currency localisation
	const [isLocal, setIsLocal] = useState(false);
	const code = isLocal && rate ? localCode : 'ETH';

	// Calculate and display balance
	const mainItem = {
		amount: isLocal && rate ? balance * rate : balance,
		classLabel: 'balance',
		code,
		label: DASHBOARD_LABELS.balance
	};

	// Calculate and display successful transactions history summary
	const subItems = [
		{
			amount: isLocal && rate ? received * rate : received,
			classLabel: 'received',
			code,
			icon: ReceiveIcon,
			key: 'received',
			label: DASHBOARD_LABELS.received
		},
		{
			amount: isLocal && rate ? sent * rate : sent,
			classLabel: 'sent',
			code,
			icon: SendIcon,
			key: 'sent',
			label: DASHBOARD_LABELS.sent
		},
		{
			amount: isLocal && rate ? subtotal * rate : subtotal,
			classLabel: 'nett',
			code,
			icon: BalanceIcon,
			key: 'nett',
			label: DASHBOARD_LABELS.nett
		}
	];

	// Display localisation toggle
	const overline = (
		<Form
			defaultValues={{ local: false }}
			id="overline-toggle"
			onChange={() => setIsLocal(!isLocal)}
		>
			{() => (
				<Input
					className="transaction-dashboard__toggle monotype"
					disabled={!rate}
					key="local"
					label={DASHBOARD_LABELS.local}
					name="local"
					type="toggle"
				/>
			)}
		</Form>
	);

	// Selectively display dashboard or placeholder based on balance availability
	return balance ? (
		<Dashboard
			className={className}
			footer={overline}
			mainItem={mainItem}
			subItems={subItems}
		/>
	) : (
		<BalancePlaceholder isLoading={isLoading} onRefresh={onRefresh} />
	);
};

TransactionDashboard.propTypes = {
	balance: PropTypes.number.isRequired,
	className: PropTypes.string,
	isLoading: PropTypes.bool.isRequired,
	localCode: PropTypes.oneOf(Object.keys(CURRENCY_SYMBOLS)).isRequired,
	onRefresh: PropTypes.func.isRequired,
	rate: PropTypes.number,
	received: PropTypes.number.isRequired,
	sent: PropTypes.number.isRequired,
	subtotal: PropTypes.number.isRequired
};

TransactionDashboard.defaultProps = {
	className: null,
	rate: null
};

export default TransactionDashboard;
