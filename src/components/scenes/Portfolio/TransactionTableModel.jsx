import React from 'react';
import Day from 'dayjs';

import './_transactiontableitem.scss';

// TODO: Theme table row cell view for amount

const getTransactionViewModel = ({
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
			<span>{transactionType.toUpperCase()}</span>
		)
	},
	amount: {
		model: {
			cashAmount,
			ethAmount // KIV: use later
		},
		view: ({ cashAmount: cash, ethAmount: ethereum }) => (
			<span>{`$${cash} (${ethereum}ETH)`}</span>
		)
	},
	address: {
		model: {
			address
		},
		view: ({ address: ethAddress }) => <span>{ethAddress}</span>
	}
});

const getTransactionFields = code => [
	{
		name: 'date',
		label: 'Date',
		description: 'The date (DD/MM/YY) and time of a transaction.',
		isSortable: true,
		minWidth: '12rem',
		width: '20%'
	},
	{
		name: 'type',
		label: 'Type',
		description:
      'Whether a transaction is incoming (receiving) or outgoing (sending).',
		isSortable: false,
		minWidth: '10rem',
		width: '15%'
	},
	{
		name: 'amount',
		label: 'Amount',
		unit: code,
		description:
      'The credit/debit transacted in both currency and ethereum unit.',
		isSortable: true,
		minWidth: '0',
		width: '40%',
		shrinkIndex: 0.1
	},
	{
		name: 'address',
		label: 'Address',
		description:
      'The other party\'s ethereum address associated with a transaction.',
		isSortable: false,
		minWidth: '0',
		width: '25%',
		shrinkIndex: 1
	}
];

export { getTransactionViewModel, getTransactionFields };
