import React from 'react';
import { withRouter } from 'react-router-dom';
import Day from 'dayjs';
import clns from 'classnames';

import Currency from '../../common/Currency';

import Receive from '../../../assets/icons/receive.svg';
import Send from '../../../assets/icons/send.svg';

import './_transactionlistitem.scss';

const Overline = ({ type, className }) => {
	const isOutgoing = type === 'outgoing';
	const Icon = isOutgoing ? Send : Receive;
	const label = isOutgoing ? 'OUTGOING' : 'INCOMING';
	return (
		<div className={clns('overline', className)}>
			<Icon className="overline__glyph" />
			<span className="overline__label monotype">{label}</span>
		</div>
	);
};

const Meta = ({ timestamp, className }) => {
	const date = Day(timestamp);
	const isSameYear = Day().isSame(date, 'year');
	const dateFormat = isSameYear ? 'D/M h:mmA' : 'D/M/YY h:mmA';
	return (
		<span className={clns('meta monotype', className)}>
			{date.format(dateFormat)}
		</span>
	);
};

const AddressSection = ({ address, type, className }) => {
	const isOutgoing = type === 'outgoing';
	const label = isOutgoing ? 'SENT TO' : 'RECEIVED FROM';

	return (
		<div className={clns('transaction-list-item__section', className)}>
			<span className="transaction-list-item__info-label monotype">
				{label}
			</span>
			<span className="transaction-list-item__address monotype">{address}</span>
		</div>
	);
};

const TransactionListItem = withRouter(
	({ history, id, ...passthroughProps }) => (
		<ListItem
			{...passthroughProps}
			onClick={() => history.push(`/app/transaction/${id}`)}
		/>
	)
);

const ListItem = ({
	address,
	cashAmount,
	code,
	ethAmount,
	onClick,
	timestamp,
	type,
	className
}) => (
	<button
		className={clns('transaction-list-item', className)}
		onClick={onClick}
		type="button"
	>
		<div className="transaction-list-item__header">
			<Overline className="transaction-list-item__overline" type={type} />
			<Meta className="transaction-list-item__meta" timestamp={timestamp} />
		</div>
		<div className="transaction-list-item__currencies">
			<Currency
				amount={`$${cashAmount}`}
				className="transaction-list-item__amount"
				code={code}
			/>
			<span className="transaction-list-item__separator monotype">/</span>
			<Currency
				amount={ethAmount}
				className="transaction-list-item__ethereum"
				code="ETH"
			/>
		</div>
		<div className="transaction-list-item__description">
			<AddressSection type={type} address={address} />
		</div>
	</button>
);

export default TransactionListItem;
