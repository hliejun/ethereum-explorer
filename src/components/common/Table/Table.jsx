import React from 'react';
import PropTypes from 'prop-types';
import clns from 'classnames';

import Header, { fieldTypes as headerFieldTypes, sortTypes } from './Header';
import Paginator from './Paginator';
import Row, { fieldTypes as rowFieldTypes } from './Row';

import './_table.scss';

const Body = ({
	className,
	fields,
	onSelectRow,
	pageItems,
	parser,
	placeholder
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
	return (
		<div className={clns('table-body', className)}>
			{rows && rows.length > 0 ? rows : placeholder}
		</div>
	);
};

const itemTypes = PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any));

Body.propTypes = {
	className: PropTypes.string,
	fields: rowFieldTypes.isRequired,
	onSelectRow: PropTypes.func,
	pageItems: itemTypes.isRequired,
	parser: PropTypes.func.isRequired,
	placeholder: PropTypes.node
};

Body.defaultProps = {
	className: null,
	onSelectRow: () => {},
	placeholder: null
};

const Table = ({
	className,
	currentPage,
	fields,
	lastPage,
	onPageChange,
	onSelectRow,
	onSort,
	pageItems,
	parser,
	placeholder,
	sort
}) => (
	<div className={clns('table', className)}>
		<div className="table__frame">
			<Header fields={fields} onSort={onSort} sort={sort} />
			<Body
				fields={fields}
				onSelectRow={onSelectRow}
				pageItems={pageItems}
				parser={parser}
				placeholder={placeholder}
			/>
		</div>
		<Paginator
			currentPage={currentPage}
			lastPage={lastPage}
			onPageChange={onPageChange}
		/>
	</div>
);

Table.propTypes = {
	className: PropTypes.string,
	currentPage: PropTypes.number.isRequired,
	fields: headerFieldTypes.isRequired,
	lastPage: PropTypes.number.isRequired,
	onPageChange: PropTypes.func.isRequired,
	onSelectRow: PropTypes.func,
	onSort: PropTypes.func,
	pageItems: itemTypes.isRequired,
	parser: PropTypes.func.isRequired,
	placeholder: PropTypes.node,
	sort: sortTypes
};

Table.defaultProps = {
	className: null,
	onSelectRow: () => {},
	onSort: () => {},
	placeholder: null,
	sort: null
};

export default Table;
