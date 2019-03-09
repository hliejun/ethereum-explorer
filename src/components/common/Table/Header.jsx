import React from 'react';
import clns from 'classnames';

import Ascending from '../../../assets/icons/ascending.svg';
import Sortable from '../../../assets/icons/sortable.svg';

import './_header.scss';

const Header = ({ className, fields, onSort, sort }) => {
	const { fieldName, order } = sort;
	const glyphClass = 'table-header__glyph';
	const headerCells = fields.map(field => {
		const { description, icon: Icon, isSortable, label, name, unit } = field;
		const { growIndex, maxWidth, minWidth, shrinkIndex, width } = field;

		let SortIcon = Sortable;
		let isRotated = false;
		if (!isSortable) {
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
				<span className="table-header__tooltip">{description}</span>
			</button>
		);
	});

	return <div className={clns('table-header', className)}>{headerCells}</div>;
};

export default Header;
