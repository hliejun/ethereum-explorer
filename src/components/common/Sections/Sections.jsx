import React from 'react';
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

export { Section, SubSection };
