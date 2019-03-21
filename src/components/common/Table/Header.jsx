import React, { memo } from 'react';
import PropTypes from 'prop-types';
import clns from 'classnames';

import Ascending from '../../../assets/icons/glyphs/ascending.svg';
import Sortable from '../../../assets/icons/glyphs/sortable.svg';

import './_header.scss';

const Header = ({ className, fields, onSort, sort }) => {
	const { fieldName, order } = sort;
	const glyphClass = 'table-header__glyph';
	const headerCells = fields.map(field => {
		const { description, icon: Icon, isSortable, label, name, unit } = field;
		const { growIndex, maxWidth, minWidth, shrinkIndex, width } = field;

		let SortIcon = Sortable;
		let isRotated = false;
		if (!isSortable || !sort) {
			SortIcon = null;
		} else if (fieldName === name) {
			SortIcon = Ascending;
			isRotated = order === 'descending';
		}

		const style = {
			display: 'flex',
			flexGrow: growIndex,
			flexShrink: shrinkIndex,
			maxWidth,
			minWidth,
			width
		};

		return (
			<button
				className="table-header__cell"
				disabled={!isSortable}
				key={name}
				onClick={() => onSort(name)}
				style={style}
				type="button"
			>
				{Icon && <Icon className={glyphClass} />}
				<span className="table-header__label">
					{label}
					{unit && ` (${unit})`}
				</span>
				{SortIcon && (
					<SortIcon
						className={clns(glyphClass, `${glyphClass}--sort`, {
							[`${glyphClass}--rotated`]: isRotated,
							[`${glyphClass}--passive`]: fieldName !== name
						})}
					/>
				)}
				{description && (
					<span className="table-header__tooltip">{description}</span>
				)}
			</button>
		);
	});

	return <div className={clns('table-header', className)}>{headerCells}</div>;
};

export const fieldTypes = PropTypes.arrayOf(
	PropTypes.shape({
		description: PropTypes.string,
		growIndex: PropTypes.number,
		icon: PropTypes.elementType,
		isSortable: PropTypes.bool.isRequired,
		label: PropTypes.string.isRequired,
		maxWidth: PropTypes.string,
		minWidth: PropTypes.string,
		name: PropTypes.string.isRequired,
		shrinkIndex: PropTypes.number,
		unit: PropTypes.string,
		width: PropTypes.string
	})
);

export const sortTypes = PropTypes.shape({
	fieldName: PropTypes.string.isRequired,
	order: PropTypes.oneOf(['ascending', 'descending']).isRequired
});

Header.propTypes = {
	className: PropTypes.string,
	fields: fieldTypes.isRequired,
	onSort: PropTypes.func,
	sort: sortTypes
};

Header.defaultProps = {
	className: null,
	onSort: () => {},
	sort: null
};

export default memo(Header);
