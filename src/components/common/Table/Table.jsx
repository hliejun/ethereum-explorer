import React from 'react';
import clns from 'classnames';

import Header from './Header';
import Paginator from './Paginator';
import Row from './Row';

import './_table.scss';

const Body = ({
	// isLoading, // KIV: For loader animation
	// onRefresh, // KIV: For placeholder reload
	className,
	fields,
	onSelectRow,
	pageItems,
	parser
}) => {
	const viewModels = pageItems.map(parser);
	const rows = viewModels.map(({ id, ...item }, index) => (
		<Row
			fields={fields}
			item={item}
			key={id}
			onClick={() => onSelectRow(id, index)}
		/>
	));
	return <div className={clns('table-body', className)}>{rows}</div>;
};

const Table = ({
	className,
	currentPage,
	fields,
	isLoading,
	lastPage,
	onPageChange,
	onRefresh,
	onSelectRow,
	onSort,
	pageItems,
	parser,
	sort
}) => (
	<div className={clns('table', className)}>
		<div className="table__frame">
			<Header fields={fields} onSort={onSort} sort={sort} />
			<Body
				fields={fields}
				isLoading={isLoading}
				onRefresh={onRefresh}
				onSelectRow={onSelectRow}
				pageItems={pageItems}
				parser={parser}
			/>
		</div>
		<Paginator
			currentPage={currentPage}
			lastPage={lastPage}
			onPageChange={onPageChange}
		/>
	</div>
);

export default Table;
