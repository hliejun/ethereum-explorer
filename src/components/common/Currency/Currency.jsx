import React from 'react';
import clns from 'classnames';

const Currency = ({ amount, code, className }) => (
	<div className={clns('currency', className)}>
		<span className="currency__code monotype">{code}</span>
		<span className="currency__amount">{amount}</span>
	</div>
);

export default Currency;
