import React from 'react';
import { withRouter } from 'react-router-dom';
import Day from 'dayjs';
import clns from 'classnames';

import Currency from '../../common/Currency';

import Receive from '../../../assets/icons/receive.svg';
import Send from '../../../assets/icons/send.svg';

import './_transactionlistitem.scss';

const Overline = ({ className, type }) => {
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

const Meta = ({ className, timestamp }) => {
	const date = Day(timestamp);
	const isSameYear = Day().isSame(date, 'year');
	const dateFormat = isSameYear ? 'D/M h:mmA' : 'D/M/YY h:mmA';
	return (
		<span className={clns('meta monotype', className)}>
			{date.format(dateFormat)}
		</span>
	);
};

const SourceSection = ({ amount, className }) => {
	const label = 'SOURCE AMOUNT';
	return (
		<div
			className={clns(
				'transaction-list-item__section',
				'transaction-list-item__section--source',
				className
			)}
		>
			<span className="transaction-list-item__info-label monotype">
				{label}
			</span>
			<Currency
				amount={amount}
				className="transaction-list-item__ethereum"
				code="ETH"
			/>
		</div>
	);
};

const AddressSection = ({ address, className, type }) => {
	const isOutgoing = type === 'outgoing';
	const label = isOutgoing ? 'SENT TO' : 'RECEIVED FROM';
	return (
		<div
			className={clns(
				'transaction-list-item__section',
				'transaction-list-item__section--address',
				className
			)}
		>
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
	className,
	code,
	ethAmount,
	onClick,
	timestamp,
	type
}) => (
	<button
		className={clns('transaction-list-item', className)}
		onClick={onClick}
		type="button"
	>
		<div className="transaction-list-item__header">
			<Meta className="transaction-list-item__meta" timestamp={timestamp} />
			<Overline className="transaction-list-item__overline" type={type} />
		</div>
		<div className="transaction-list-item__currencies">
			<Currency
				amount={`${type === 'outgoing' ? '–' : ''}$${cashAmount}`}
				className={clns('transaction-list-item__amount', {
					'transaction-list-item__amount--negative': type === 'outgoing'
				})}
				code={code}
			/>
		</div>
		<div className="transaction-list-item__description">
			<SourceSection amount={ethAmount} />
			<AddressSection address={address} type={type} />
		</div>
	</button>
);

export default TransactionListItem;
