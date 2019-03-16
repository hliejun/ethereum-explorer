import React, { memo } from 'react';
import { withRouter } from 'react-router-dom';
import Day from 'dayjs';
import PropTypes from 'prop-types';
import clns from 'classnames';

import Currency, { symbols } from '../../common/Currency';

import Receive from '../../../assets/icons/receive.svg';
import Send from '../../../assets/icons/send.svg';

import './_transactionlistitem.scss';

/* eslint-disable react/no-multi-comp */

const Overline = memo(({ className, type }) => {
	const isOutgoing = type === 'outgoing';
	const Icon = isOutgoing ? Send : Receive;
	return (
		<div className={clns('overline', className)}>
			<Icon className="overline__glyph" />
			<span className="overline__label">{type}</span>
		</div>
	);
});

Overline.propTypes = {
	className: PropTypes.string,
	type: PropTypes.oneOf(['incoming', 'outgoing']).isRequired
};

Overline.defaultProps = {
	className: null
};

const Meta = memo(({ className, timestamp }) => {
	const date = Day(timestamp);
	const isSameYear = Day().isSame(date, 'year');
	const dateFormat = isSameYear ? 'D/M h:mmA' : 'D/M/YY h:mmA';
	return (
		<span className={clns('meta', className)}>{date.format(dateFormat)}</span>
	);
});

Meta.propTypes = {
	className: PropTypes.string,
	timestamp: PropTypes.oneOfType([
		PropTypes.instanceOf(Date),
		PropTypes.number,
		PropTypes.string
	]).isRequired
};

Meta.defaultProps = {
	className: null
};

const SourceSection = memo(({ amount, className }) => {
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
});

SourceSection.propTypes = {
	amount: PropTypes.string.isRequired,
	className: PropTypes.string
};

SourceSection.defaultProps = {
	className: null
};

const AddressSection = memo(({ address, className, type }) => {
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
});

AddressSection.propTypes = {
	address: PropTypes.string.isRequired,
	className: PropTypes.string,
	type: PropTypes.oneOf(['incoming', 'outgoing']).isRequired
};

AddressSection.defaultProps = {
	className: null
};

const TransactionListItem = withRouter(
	({ history, id, ...passthroughProps }) => (
		<ListItem
			{...passthroughProps}
			onClick={() => history.push(`/app/transaction/${id}`)}
		/>
	)
);

TransactionListItem.propTypes = {
	id: PropTypes.string.isRequired
};

const ListItem = memo(
	({
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
					amount={type === 'outgoing' ? `-${cashAmount}` : cashAmount}
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
	)
);

ListItem.propTypes = {
	address: PropTypes.string.isRequired,
	cashAmount: PropTypes.string.isRequired,
	className: PropTypes.string,
	code: PropTypes.oneOf(Object.keys(symbols)).isRequired,
	ethAmount: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
	timestamp: PropTypes.oneOfType([
		PropTypes.number,
		PropTypes.string,
		PropTypes.instanceOf(Date)
	]).isRequired,
	type: PropTypes.oneOf(['incoming', 'outgoing']).isRequired
};

ListItem.defaultProps = {
	className: null
};

/* eslint-enable react/no-multi-comp */

export default memo(TransactionListItem);
