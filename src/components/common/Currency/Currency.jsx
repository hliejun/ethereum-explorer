import React, { memo } from 'react';
import PropTypes from 'prop-types';
import clns from 'classnames';

import './_currency.scss';

export const symbols = {
	CNY: '¥',
	ETH: 'Ξ',
	GBP: '£',
	JPY: '¥',
	KRW: '₩',
	SGD: '$',
	USD: '$'
};

const Currency = ({ amount, className, code }) => {
	const parsedAmount = parseFloat(amount);
	const isNumber = !Number.isNaN(parsedAmount);
	const absoluteAmount = isNumber ? Math.abs(parsedAmount) : amount;
	const roundedAmount = parseFloat(absoluteAmount).toFixed(2) || absoluteAmount;
	const symbol = symbols[code] || '$';
	const sign = isNumber && parsedAmount < 0 ? '—' : '';
	return (
		<div className={clns('currency', className)}>
			<span className="currency__code monotype">{code}</span>
			<span className="currency__amount">
				{`${sign}${symbol}${code === 'ETH' ? absoluteAmount : roundedAmount}`}
			</span>
		</div>
	);
};

Currency.propTypes = {
	amount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
	className: PropTypes.string,
	code: PropTypes.oneOf(Object.keys(symbols)).isRequired
};

Currency.defaultProps = {
	className: null
};

export default memo(Currency);
