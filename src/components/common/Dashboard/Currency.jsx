import React from 'react';
import clns from 'classnames';

const Currency = props => {
	const { amount, code, className } = props;
	return (
		<div className={clns('currency', className)}>
			<span className="currency__code">{code}</span>
			<span className="currency__amount">{amount}</span>
		</div>
	);
};

export default Currency;
