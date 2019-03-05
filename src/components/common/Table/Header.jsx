import React from 'react';
import clns from 'classnames';

import Ascending from '../../../assets/icons/ascending.svg';
import Sortable from '../../../assets/icons/sortable.svg';

import './_header.scss';

const Header = ({ fields, onSort, sort, className }) => {
	const { fieldName, order } = sort;
	const headerCells = fields.map(field => {
		const { description, icon: Icon, isSortable, label, name, unit } = field;
		const { maxWidth, minWidth, width, shrinkIndex, growIndex } = field;

		let SortIcon = Sortable;
		let isRotated = false;
		if (!isSortable) {
			SortIcon = null;
		} else if (fieldName === name) {
			SortIcon = Ascending;
			isRotated = order === 'DESC';
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
				{Icon && <Icon className="table-header__glyph" />}
				<span className="table-header__label">
					{label}
					{unit && ` (${unit})`}
				</span>
				{SortIcon && (
					<SortIcon
						className={clns(
							'table-header__glyph',
							'table-header__glyph--sort',
							{
								'table-header__glyph--rotated': isRotated,
								'table-header__glyph--passive': fieldName !== name
							}
						)}
					/>
				)}
				<span className="table-header__tooltip">{description}</span>
			</button>
		);
	});

	return <div className={clns('table-header', className)}>{headerCells}</div>;
};

export default Header;
