import React, { memo } from 'react';
import { withRouter } from 'react-router-dom';
import Day from 'dayjs';
import PropTypes from 'prop-types';
import clns from 'classnames';

import Currency from '../../common/Currency';

import ReceiveIcon from '../../../assets/icons/glyphs/receive.svg';
import SendIcon from '../../../assets/icons/glyphs/send.svg';

import {
	CURRENCY_SYMBOLS,
	DATE_FORMAT_LONG,
	DATE_FORMAT_SHORT,
	LINK_TRANSACTION,
	LIST_ITEM_LABELS
} from '../../../constants';

import './_transactionlistitem.scss';

/* eslint-disable react/no-multi-comp */

const Overline = memo(({ className, type }) => {
	const isOutgoing = type === 'outgoing';
	const Icon = isOutgoing ? SendIcon : ReceiveIcon;
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
	const date = Day(parseInt(timestamp, 10) * 1000);
	const isSameYear = Day().isSame(date, 'year');
	const dateFormat = isSameYear ? DATE_FORMAT_SHORT : DATE_FORMAT_LONG;
	return (
		<span className={clns('meta', className)}>{date.format(dateFormat)}</span>
	);
});

Meta.propTypes = {
	className: PropTypes.string,
	timestamp: PropTypes.string.isRequired
};

Meta.defaultProps = {
	className: null
};

const SourceSection = memo(({ amount, className }) => (
	<div
		className={clns(
			'transaction-list-item__section',
			'transaction-list-item__section--source',
			className
		)}
	>
		<span className="transaction-list-item__info-label monotype">
			{LIST_ITEM_LABELS.source}
		</span>
		<Currency
			amount={amount}
			className="transaction-list-item__ethereum"
			code="ETH"
		/>
	</div>
));

SourceSection.propTypes = {
	amount: PropTypes.string.isRequired,
	className: PropTypes.string
};

SourceSection.defaultProps = {
	className: null
};

const AddressSection = memo(({ address, className, type }) => (
	<div
		className={clns(
			'transaction-list-item__section',
			'transaction-list-item__section--address',
			className
		)}
	>
		<span className="transaction-list-item__info-label monotype">
			{type === 'outgoing'
				? LIST_ITEM_LABELS.outgoing
				: LIST_ITEM_LABELS.incoming}
		</span>
		<span className="transaction-list-item__address monotype">{address}</span>
	</div>
));

AddressSection.propTypes = {
	address: PropTypes.string.isRequired,
	className: PropTypes.string,
	type: PropTypes.oneOf(['incoming', 'outgoing']).isRequired
};

AddressSection.defaultProps = {
	className: null
};

const ListItem = memo(
	({ className, code, onClick, rate, source, status, value }) => {
		const { address, timestamp, type } = source;
		const displayedAmount = rate ? parseFloat(value) * rate : parseFloat(value);
		return (
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
						amount={
							type === 'outgoing'
								? `-${displayedAmount}`
								: String(displayedAmount)
						}
						className={clns(
							'transaction-list-item__amount',
							`transaction-list-item__amount--${status}`,
							{
								'transaction-list-item__amount--negative': type === 'outgoing'
							}
						)}
						code={rate ? code : 'ETH'}
					/>
				</div>
				<div className="transaction-list-item__description">
					<AddressSection address={address} type={type} />
					{rate && <SourceSection amount={value} />}
				</div>
			</button>
		);
	}
);

ListItem.propTypes = {
	className: PropTypes.string,
	code: PropTypes.oneOf(Object.keys(CURRENCY_SYMBOLS)).isRequired,
	onClick: PropTypes.func.isRequired,
	rate: PropTypes.number,
	source: PropTypes.shape({
		address: PropTypes.string.isRequired,
		timestamp: PropTypes.string.isRequired,
		type: PropTypes.oneOf(['incoming', 'outgoing']).isRequired
	}).isRequired,
	value: PropTypes.string.isRequired
};

ListItem.defaultProps = {
	className: null,
	rate: null
};

const TransactionListItem = withRouter(
	({ history, id, ...passthroughProps }) => (
		<ListItem
			{...passthroughProps}
			onClick={() => history.push(`${LINK_TRANSACTION}/${id}`)}
		/>
	)
);

TransactionListItem.propTypes = {
	id: PropTypes.string.isRequired
};

/* eslint-enable react/no-multi-comp */

export default memo(TransactionListItem);
