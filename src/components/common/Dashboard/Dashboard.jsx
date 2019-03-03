import React from 'react';
import clns from 'classnames';

import Currency from '../Currency';

import Balance from '../../../assets/icons/balance.svg';
import Receive from '../../../assets/icons/receive.svg';
import Send from '../../../assets/icons/send.svg';

// TODO: Add error boundary and async loaders

const Section = ({ amount, classLabel, code, label, className }) => (
	<div
		className={clns(
			'dashboard__section',
			`dashboard__section--${classLabel}`,
			className
		)}
	>
		<span className="dashboard__section-label">{label}</span>
		<Currency
			amount={amount}
			className="dashboard__section-currency"
			code={code}
		/>
	</div>
);

const SubSection = ({
	amount,
	classLabel,
	code,
	icon: Icon,
	label,
	className
}) => (
	<div
		className={clns(
			'dashboard__sub-section',
			`dashboard__sub-section--${classLabel}`,
			className
		)}
	>
		<div className="dashboard__sub-section-header">
			<span className="dashboard__sub-section-label monotype">{label}</span>
			<Icon className="dashboard__sub-section-glyph" />
		</div>
		<Currency
			amount={amount}
			className="dashboard__sub-section-currency"
			code={code}
		/>
	</div>
);

const Dashboard = ({ mainItem, subItems, className }) => (
	<div className={clns('dashboard', className)}>
		<Section {...mainItem} />
		<div className="dashboard__sub-sections">
			{subItems.map(item => (
				<SubSection {...item} />
			))}
		</div>
	</div>
);

const PortfolioDashboard = ({
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

export { Dashboard, PortfolioDashboard };
