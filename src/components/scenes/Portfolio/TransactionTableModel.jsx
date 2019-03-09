import React from 'react';
import Day from 'dayjs';

import './_transactiontableitem.scss';

const getTableViewModel = ({
	address,
	cashAmount,
	ethAmount,
	id,
	timestamp,
	type
}) => ({
	id,
	date: {
		model: {
			timestamp
		},
		view: ({ timestamp: dateTime }) => {
			const date = Day(dateTime);
			return <span>{date.format('DD/MM/YY h:mmA')}</span>;
		}
	},
	type: {
		model: {
			type
		},
		view: ({ type: transactionType }) => (
			<span>{transactionType === 'incoming' ? 'Incoming' : 'Outgoing'}</span>
		)
	},
	amount: {
		model: {
			cashAmount,
			ethAmount
		},
		view: ({ cashAmount: cash, ethAmount: ethereum }) => (
			<div className="transaction-table-item__amount">
				<span className="transaction-table-item__amount-item">
					{`$${cash}`}
				</span>
				<span className="transaction-table-item__amount-item transaction-table-item__amount-item--ethereum monotype">
					{`(${ethereum}ETH)`}
				</span>
			</div>
		)
	},
	address: {
		model: {
			address
		},
		view: ({ address: ethAddress }) => <span>{ethAddress}</span>
	}
});

const getTableFields = code => [
	{
		description: 'The date (DD/MM/YY) and time of a transaction.',
		isSortable: true,
		label: 'Date',
		minWidth: '15rem',
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

export { getTableFields, getTableViewModel };
