import React, { memo } from 'react';
import PropTypes from 'prop-types';
import clns from 'classnames';

import { CURRENCY_SYMBOLS } from '../../../constants';

import './_currency.scss';

const Currency = ({ amount, className, code }) => {
	// Parse amount into numerical formats
	const parsedAmount = parseFloat(amount);
	const isNumber = !Number.isNaN(parsedAmount);
	const absoluteAmount = isNumber ? Math.abs(parsedAmount) : amount;
	const roundedAmount = parseFloat(absoluteAmount).toFixed(2) || absoluteAmount;

	// Decorate amount with currency code and sign
	const symbol = CURRENCY_SYMBOLS[code] || '$';
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
	code: PropTypes.oneOf(Object.keys(CURRENCY_SYMBOLS)).isRequired
};

Currency.defaultProps = {
	className: null
};

export default memo(Currency);
