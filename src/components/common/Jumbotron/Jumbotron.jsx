import React, { memo } from 'react';
import PropTypes from 'prop-types';
import clns from 'classnames';

import './_jumbotron.scss';

const Jumbotron = ({ children, className, subtitle, title }) => (
	<div className={clns('jumbotron', className)}>
		<div className="jumbotron__body">
			<div className="jumbotron__title">{title}</div>
			{subtitle && <div className="jumbotron__subtitle">{subtitle}</div>}
		</div>
		{children && <div className="jumbotron__content">{children}</div>}
	</div>
);

Jumbotron.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	subtitle: PropTypes.node,
	title: PropTypes.node.isRequired
};

Jumbotron.defaultProps = {
	children: null,
	className: null,
	subtitle: null
};

export default memo(Jumbotron);
