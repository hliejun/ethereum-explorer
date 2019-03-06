import React from 'react';
import clns from 'classnames';

import Header from './Header';
import Row from './Row';
import Paginator from './Paginator';

// TODO: Add refresh button, placeholder, loader

// TODO: Add error boundary and async loaders

// TODO: Optimize by page number (if same don't invoke onPageChange)

const Body = ({
	fields,
	// isLoading, // KIV: For loader animation
	// onRefresh, // KIV: For placeholder reload
	onSelectRow,
	pageItems,
	parser,
	className
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
	fields,
	isLoading,
	lastPage,
	currentPage,
	onPageChange,
	onRefresh,
	onSelectRow,
	onSort,
	pageItems,
	parser,
	sort,
	className
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
