import React, { memo } from 'react';
import PropTypes from 'prop-types';
import clns from 'classnames';

import Currency, { CURRENCY_SYMBOLS } from '../Currency';

import './_dashboard.scss';

/* eslint-disable react/no-multi-comp */

const Section = memo(({ amount, classLabel, className, code, label }) => (
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
));

Section.propTypes = {
	amount: PropTypes.number.isRequired,
	classLabel: PropTypes.string.isRequired,
	className: PropTypes.string,
	code: PropTypes.oneOf(Object.keys(CURRENCY_SYMBOLS)).isRequired,
	label: PropTypes.string.isRequired
};

Section.defaultProps = {
	className: null
};

const SubSection = memo(
	({ amount, classLabel, className, code, icon: Icon, label }) => (
		<div
			className={clns(
				'dashboard__sub-section',
				`dashboard__sub-section--${classLabel}`,
				className
			)}
		>
			<div className="dashboard__sub-section-header">
				{Icon && <Icon className="dashboard__sub-section-glyph" />}
				<span className="dashboard__sub-section-label monotype">{label}</span>
			</div>
			<div className="dashboard__sub-section-separator" />
			<Currency
				amount={amount}
				className="dashboard__sub-section-currency"
				code={code}
			/>
		</div>
	)
);

SubSection.propTypes = {
	amount: PropTypes.number.isRequired,
	classLabel: PropTypes.string.isRequired,
	className: PropTypes.string,
	code: PropTypes.oneOf(Object.keys(CURRENCY_SYMBOLS)).isRequired,
	icon: PropTypes.elementType,
	label: PropTypes.string.isRequired
};

SubSection.defaultProps = {
	className: null,
	icon: null
};

const Dashboard = ({ className, mainItem, footer, separator, subItems }) => (
	<div className={clns('dashboard', className)}>
		<Section {...mainItem} />
		{separator}
		<div className="dashboard__sub-sections">
			{subItems.map(({ key, ...item }) => (
				<SubSection key={key} {...item} />
			))}
		</div>
		{footer}
	</div>
);

Dashboard.propTypes = {
	className: PropTypes.string,
	footer: PropTypes.node,
	mainItem: PropTypes.shape(Section.propTypes).isRequired,
	separator: PropTypes.node,
	subItems: PropTypes.arrayOf(
		PropTypes.shape({
			key: PropTypes.string.isRequired,
			...SubSection.propTypes
		})
	).isRequired
};

Dashboard.defaultProps = {
	className: null,
	footer: null,
	separator: null
};

/* eslint-enable react/no-multi-comp */

export default memo(Dashboard);
