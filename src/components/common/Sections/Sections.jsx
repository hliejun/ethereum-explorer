import React from 'react';
import PropTypes from 'prop-types';
import clns from 'classnames';

import './_sections.scss';

const SubSection = ({
	children,
	className,
	description,
	icon: Icon,
	title
}) => (
	<div className={clns('data-subsection', className)}>
		<div className="data-subsection__header">
			{Icon && <Icon className="data-subsection__glyph" />}
			<div className="data-subsection__text">
				<span className="data-subsection__title">{title}</span>
				{description && (
					<span className="data-subsection__description">{description}</span>
				)}
			</div>
		</div>
		{children && <div className="data-subsection__content">{children}</div>}
	</div>
);

SubSection.propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
	description: PropTypes.string,
	icon: PropTypes.elementType,
	title: PropTypes.string.isRequired
};

SubSection.defaultProps = {
	className: null,
	description: null,
	icon: null
};

const Section = ({ children, className, footer, icon: Icon, image, title }) => (
	<div className={clns('data-section', className)}>
		{image && <div className="data-section__image">{image}</div>}
		<div className="data-section__content">
			<div className="data-section__title">
				{Icon && <Icon className="data-section__glyph" />}
				<span className="data-section__title-label">{title}</span>
			</div>
			{children}
		</div>
		{footer && <div className="data-section__footer">{footer}</div>}
	</div>
);

Section.propTypes = {
	children: PropTypes.node.isRequired,
	className: PropTypes.string,
	footer: PropTypes.node,
	icon: PropTypes.elementType,
	image: PropTypes.elementType,
	title: PropTypes.string.isRequired
};

Section.defaultProps = {
	className: null,
	footer: null,
	icon: null,
	image: null
};

export { Section, SubSection };
