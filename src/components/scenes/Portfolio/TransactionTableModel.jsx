import React from 'react';
import Day from 'dayjs';

import { symbols } from '../../common/Currency';

import './_transactiontableitem.scss';

const getTableFields = code => [
	{
		description: 'The date (DD/MM/YY) and time of a transaction.',
		isSortable: true,
		label: 'Date',
		minWidth: '12rem',
		name: 'date',
		width: '20%'
	},
	{
		description:
      'Whether a transaction is incoming (receiving) or outgoing (sending).',
		isSortable: false,
		label: 'Type',
		minWidth: '10rem',
		name: 'type',
		width: '15%'
	},
	{
		description:
      'The credit/debit transacted in both currency and ethereum unit.',
		isSortable: true,
		label: 'Amount',
		minWidth: '0',
		name: 'amount',
		shrinkIndex: 0.1,
		unit: code,
		width: '30%'
	},
	{
		description:
      'The other party\'s ethereum address associated with a transaction.',
		isSortable: false,
		label: 'Address',
		minWidth: '0',
		name: 'address',
		shrinkIndex: 1,
		width: '35%'
	}
];

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
						? `${symbols[code] || '$'}${parseFloat(amount) * rate}`
						: `${symbols.ETH}${parseFloat(amount)}`}
				</span>
				{rate && (
					<span className="transaction-table-item__amount-item transaction-table-item__amount-item--ethereum monotype">
						{`${symbols.ETH}${amount}`}
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
			return <span>{date.format('DD/MM/YY h:mmA')}</span>;
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
