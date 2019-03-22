import React from 'react';
import PropTypes from 'prop-types';
import clns from 'classnames';

import './_construction.scss';

const Construction = ({ className, children, icon: Icon, subtitle, title }) => (
	<div className={clns('construction', className)}>
		{Icon && <Icon className="construction__glyph" />}
		<div className="construction__header">
			<span className="construction__header-title">{title}</span>
			<span className="construction__header-subtitle">{subtitle}</span>
		</div>
		<div className="construction__content">{children}</div>
	</div>
);

Construction.propTypes = {
	children: PropTypes.node,
	className: PropTypes.string,
	icon: PropTypes.elementType,
	subtitle: PropTypes.node,
	title: PropTypes.string
};

Construction.defaultProps = {
	className: null,
	icon: null,
	children: null,
	subtitle: (
    <>
      This page is under construction. <br />
      Please check back later.
    </>
	),
	title: 'Work In Progress'
};

export default Construction;
