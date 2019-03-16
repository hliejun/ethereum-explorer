import React from 'react';
import PropTypes from 'prop-types';
import clns from 'classnames';

import About from '../../../assets/icons/about.svg';

import './_itemrow.scss';

const ItemRow = ({ className, description, icon: Icon, label, value }) => (
	<div className={clns('item-row', className)}>
		<div className="item-row__info">
			{Icon && <Icon className="item-row__glyph item-row__glyph--label" />}
			<span className="item-row__label">{label}</span>
			<hr className="item-row__separator" />
			<span className="item-row__value">{value}</span>
		</div>
		{description && (
			<div className="item-row__description">
				<About className="item-row__glyph item-row__glyph--description" />
				<span className="item-row__description-text">{description}</span>
			</div>
		)}
	</div>
);

ItemRow.propTypes = {
	className: PropTypes.string,
	description: PropTypes.string,
	icon: PropTypes.elementType,
	label: PropTypes.string.isRequired,
	value: PropTypes.oneOfType([
		PropTypes.bool,
		PropTypes.number,
		PropTypes.string
	]).isRequired
};

ItemRow.defaultProps = {
	className: null,
	description: null,
	icon: null
};

export default ItemRow;
