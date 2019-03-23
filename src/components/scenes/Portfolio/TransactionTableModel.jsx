import React from 'react';
import Day from 'dayjs';

import { CURRENCY_SYMBOLS } from '../../common/Currency';

import './_transactiontableitem.scss';

const DATE_FORMAT_LONG = 'DD/MM/YY h:mmA';

const TABLE_FIELDS_LABEL = {
	address: {
		description:
      'The other party\'s ethereum address associated with a transaction.',
		label: 'Address'
	},
	amount: {
		description:
      'The credit/debit transacted in both currency and ethereum unit.',
		label: 'Amount'
	},
	date: {
		description: 'The date (DD/MM/YY) and time of a transaction.',
		label: 'Date'
	},
	type: {
		description:
      'Whether a transaction is incoming (receiving) or outgoing (sending).',
		label: 'Type'
	}
};

// Table column cell factory descriptor
const getTableFields = code => [
	{
		...TABLE_FIELDS_LABEL.date,
		isSortable: true,
		minWidth: '12rem',
		name: 'date',
		width: '20%'
	},
	{
		...TABLE_FIELDS_LABEL.type,
		isSortable: false,
		minWidth: '10rem',
		name: 'type',
		width: '15%'
	},
	{
		...TABLE_FIELDS_LABEL.amount,
		isSortable: true,
		minWidth: '0',
		name: 'amount',
		shrinkIndex: 0.1,
		unit: code,
		width: '30%'
	},
	{
		...TABLE_FIELDS_LABEL.address,
		isSortable: false,
		minWidth: '0',
		name: 'address',
		shrinkIndex: 1,
		width: '35%'
	}
];

// Table row cell factory descriptor
const getTableViewModel = (code, rate) => ({ id, source, value }) => ({
	address: {
		model: {
			address: source.address
		},
		view: ({ address }) => <span>{address}</span>
	},
	amount: {
		model: {
			value
		},
		view: ({ value: amount }) => (
			<div className="transaction-table-item__amount">
				<span className="transaction-table-item__amount-item">
					{rate
						? `${CURRENCY_SYMBOLS[code] || '$'}${(
							parseFloat(amount) * rate
						).toFixed(2)}`
						: `${CURRENCY_SYMBOLS.ETH}${parseFloat(amount)}`}
				</span>
				{rate && (
					<span className="transaction-table-item__amount-item transaction-table-item__amount-item--ethereum monotype">
						{`${CURRENCY_SYMBOLS.ETH}${amount}`}
					</span>
				)}
			</div>
		)
	},
	date: {
		model: {
			timestamp: source.timestamp
		},
		view: ({ timestamp }) => {
			const date = Day(parseInt(timestamp, 10) * 1000);
			return <span>{date.format(DATE_FORMAT_LONG)}</span>;
		}
	},
	id,
	type: {
		model: {
			type: source.type
		},
		view: ({ type }) => (
			<span className="transaction-table-item__type-item">{type}</span>
		)
	}
});

export { getTableFields, getTableViewModel };
