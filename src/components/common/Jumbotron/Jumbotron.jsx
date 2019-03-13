import React from 'react';
import clns from 'classnames';

import './_jumbotron.scss';

const Jumbotron = ({ children, className, subtitle, title }) => (
	<div className={clns('jumbotron', className)}>
		<div className="jumbotron__body">
			<div className="jumbotron__title">{title}</div>
			<div className="jumbotron__subtitle">{subtitle}</div>
		</div>
		{children && <div className="jumbotron__content">{children}</div>}
	</div>
);

export default Jumbotron;
