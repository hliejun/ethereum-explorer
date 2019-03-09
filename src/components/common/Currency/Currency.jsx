import React from 'react';
import clns from 'classnames';

import './_currency.scss';

const Currency = ({ amount, className, code }) => (
	<div className={clns('currency', className)}>
		<span className="currency__code monotype">{code}</span>
		<span className="currency__amount">{amount}</span>
	</div>
);

export default Currency;
