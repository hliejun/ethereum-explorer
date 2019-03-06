import React from 'react';

import Dashboard from '../../common/Dashboard';

import Balance from '../../../assets/icons/balance.svg';
import Receive from '../../../assets/icons/receive.svg';
import Send from '../../../assets/icons/send.svg';

const TransactionDashboard = ({
	balance,
	code,
	receivedEth,
	sentEth,
	totalEth,
	className
}) => {
	const mainItem = {
		amount: `$${balance}`,
		classLabel: 'balance',
		code,
		label: 'Balance'
	};
	const subItems = [
		{
			amount: receivedEth,
			classLabel: 'received',
			code: 'ETH',
			icon: Receive,
			key: 'received',
			label: 'RECEIVED'
		},
		{
			amount: sentEth,
			classLabel: 'sent',
			code: 'ETH',
			icon: Send,
			key: 'sent',
			label: 'SENT'
		},
		{
			amount: totalEth,
			classLabel: 'nett',
			code: 'ETH',
			icon: Balance,
			key: 'nett',
			label: 'NETT'
		}
	];
	return (
		<Dashboard className={className} mainItem={mainItem} subItems={subItems} />
	);
};

export default TransactionDashboard;
