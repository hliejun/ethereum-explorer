import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Dashboard from '../../common/Dashboard';
import { Form, Input } from '../../common/Form';
import { symbols } from '../../common/Currency';

import Balance from '../../../assets/icons/balance.svg';
import Receive from '../../../assets/icons/receive.svg';
import Send from '../../../assets/icons/send.svg';

import './_transactiondashboard.scss';

const TransactionDashboard = ({
	balance,
	className,
	code: localCode,
	rate,
	received,
	sent,
	total
}) => {
	const [isLocal, setIsLocal] = useState(false);

	const code = isLocal ? localCode : 'ETH';

	const mainItem = {
		amount: isLocal ? balance * rate : balance,
		classLabel: 'balance',
		code,
		label: 'Balance'
	};

	const subItems = [
		{
			amount: isLocal ? received * rate : received,
			classLabel: 'received',
			code,
			icon: Receive,
			key: 'received',
			label: 'INCOMING'
		},
		{
			amount: isLocal ? sent * rate : sent,
			classLabel: 'sent',
			code,
			icon: Send,
			key: 'sent',
			label: 'OUTGOING'
		},
		{
			amount: isLocal ? total * rate : total,
			classLabel: 'nett',
			code,
			icon: Balance,
			key: 'nett',
			label: 'SUBTOTAL'
		}
	];

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
					label="Localise:"
					name="local"
					type="toggle"
				/>
			)}
		</Form>
	);

	return (
		<Dashboard
			className={className}
			footer={overline}
			mainItem={mainItem}
			subItems={subItems}
		/>
	);
};

TransactionDashboard.propTypes = {
	balance: PropTypes.number.isRequired,
	className: PropTypes.string,
	code: PropTypes.oneOf(Object.keys(symbols)).isRequired,
	rate: PropTypes.number.isRequired,
	received: PropTypes.number.isRequired,
	sent: PropTypes.number.isRequired,
	total: PropTypes.number.isRequired
};

TransactionDashboard.defaultProps = {
	className: null
};

export default TransactionDashboard;
