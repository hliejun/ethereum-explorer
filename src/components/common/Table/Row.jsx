import React from 'react';
import clns from 'classnames';

import './_row.scss';

const Row = ({ className, fields, item, onClick }) => {
	const rowCells = fields.map(field => {
		const { name, minWidth, maxWidth, width, shrinkIndex, growIndex } = field;
		const { model, view: View } = item[name];
		const style = {
			display: 'flex',
			flexGrow: growIndex,
			flexShrink: shrinkIndex,
			maxWidth,
			minWidth,
			width
		};
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

export default Row;
