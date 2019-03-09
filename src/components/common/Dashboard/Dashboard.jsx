import React from 'react';
import clns from 'classnames';

import Currency from '../Currency';

import './_dashboard.scss';

const Section = ({ amount, classLabel, className, code, label }) => (
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
	className,
	code,
	icon: Icon,
	label
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

const Dashboard = ({ className, mainItem, subItems }) => (
	<div className={clns('dashboard', className)}>
		<Section {...mainItem} />
		<div className="dashboard__sub-sections">
			{subItems.map(item => (
				<SubSection {...item} />
			))}
		</div>
	</div>
);

export default Dashboard;
