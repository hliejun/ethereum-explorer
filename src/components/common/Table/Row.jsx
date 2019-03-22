import React, { memo } from 'react';
import PropTypes from 'prop-types';
import clns from 'classnames';

import './_row.scss';

const Row = ({ className, fields, item, onClick }) => {
	// Render row cells by categories/fields
	const rowCells = fields.map(field => {
		const { growIndex, maxWidth, minWidth, name, shrinkIndex, width } = field;
		const { model, view: View } = item[name];

		// Enforce grid system to match table header
		const style = {
			display: 'flex',
			flexGrow: growIndex,
			flexShrink: shrinkIndex,
			maxWidth,
			minWidth,
			width
		};

		// Render row cell using render props
		return (
			<div className="table-row__cell" key={name} style={style}>
				<View className="table-row__cell-content" {...model} />
			</div>
		);
	});

	return (
		<button
			className={clns('table-row', className)}
			onClick={onClick}
			type="button"
		>
			{rowCells}
		</button>
	);
};

export const fieldTypes = PropTypes.arrayOf(
	PropTypes.shape({
		growIndex: PropTypes.number,
		maxWidth: PropTypes.string,
		minWidth: PropTypes.string,
		name: PropTypes.string.isRequired,
		shrinkIndex: PropTypes.number,
		width: PropTypes.string
	})
);

Row.propTypes = {
	className: PropTypes.string,
	fields: fieldTypes.isRequired,
	item: PropTypes.objectOf(
		PropTypes.shape({
			model: PropTypes.object.isRequired,
			view: PropTypes.elementType.isRequired
		})
	).isRequired,
	onClick: PropTypes.func
};

Row.defaultProps = {
	className: null,
	onClick: () => {}
};

export default memo(Row);
