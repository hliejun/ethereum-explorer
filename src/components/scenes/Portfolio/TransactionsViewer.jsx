import React, { lazy, Suspense } from 'react';
import PropTypes from 'prop-types';
import qs from 'query-string';

import { getTableViewModel, getTableFields } from './TransactionTableModel';
import Placeholder from '../../common/Placeholder';
import TransactionListItem from './TransactionListItem';

import { untrim } from '../../../redux/selectors/helper';

import EmptyIcon from '../../../assets/icons/glyphs/empty.svg';
import ErrorIcon from '../../../assets/icons/glyphs/server.svg';

import {
	LIST_BUFFER_SIZE,
	CURRENCY_SYMBOLS,
	FORM_VALIDATION,
	LIST_DEFAULT_FONT_SIZE,
	LIST_DIMEN_UNIT,
	LIST_OFFSET_BOTTOM,
	LIST_OFFSET_TOP,
	LIST_PLACEHOLDER_TITLE,
	LIST_ROW_HEIGHT,
	VIEWER_PAGE_SIZE,
	PLACEHOLDER_TRANSACTIONS_EMPTY,
	PLACEHOLDER_TRANSACTIONS_ERROR,
	PLACEHOLDER_TRANSACTIONS_LOADING,
	TABLE_PLACEHOLDER_TITLE,
	VIEWER_LOADING_SUBTITLE
} from '../../../constants';

const List = lazy(() => import('../../common/List'));
const Table = lazy(() => import('../../common/Table'));

const loaderProps = {
	className: 'transactions-viewer__placeholder',
	description: VIEWER_LOADING_SUBTITLE,
	isLoading: true
};

/**
 * NOTE:
 * Error messages for placeholder should be
 * dynamically determined by redux props
 */

const TransactionsPlaceholder = ({ hasError, isLoading, onRefresh }) => {
	let placeholderState = PLACEHOLDER_TRANSACTIONS_EMPTY;
	if (isLoading) {
		placeholderState = PLACEHOLDER_TRANSACTIONS_LOADING;
	} else if (hasError) {
		placeholderState = PLACEHOLDER_TRANSACTIONS_ERROR;
	}
	return (
		<Placeholder
			className="portfolio__placeholder portfolio__placeholder--transactions"
			emptyIcon={EmptyIcon}
			errorIcon={ErrorIcon}
			hasError={hasError}
			isLoading={isLoading}
			onRefresh={onRefresh}
			{...placeholderState}
		/>
	);
};

TransactionsPlaceholder.propTypes = {
	hasError: PropTypes.bool.isRequired,
	isLoading: PropTypes.bool.isRequired,
	onRefresh: PropTypes.func.isRequired
};

const TransactionsList = ({
	code,
	listKey,
	pagination,
	placeholder,
	rate,
	transactions
}) => (
	<Suspense
		fallback={<Placeholder title={LIST_PLACEHOLDER_TITLE} {...loaderProps} />}
	>
		<List
			bottomOffset={LIST_OFFSET_BOTTOM}
			className="portfolio__transaction-list"
			code={code}
			dataMap={transactions}
			fontSize={LIST_DEFAULT_FONT_SIZE}
			key={listKey}
			pageBufferSize={LIST_BUFFER_SIZE}
			pageMap={pagination}
			pageSize={VIEWER_PAGE_SIZE}
			placeholder={placeholder}
			rate={rate}
			render={TransactionListItem}
			topOffset={LIST_OFFSET_TOP}
			unit={LIST_DIMEN_UNIT}
			unitBufferHeight={LIST_ROW_HEIGHT}
		/>
	</Suspense>
);

const simplifiedTransactionType = PropTypes.shape({
	id: PropTypes.string.isRequired,
	source: PropTypes.shape({
		address: PropTypes.string.isRequired,
		timestamp: PropTypes.string.isRequired,
		type: PropTypes.oneOf(['incoming', 'outgoing']).isRequired
	}).isRequired,
	status: PropTypes.oneOf(['failed', 'pending', 'success']).isRequired,
	value: PropTypes.string.isRequired
});

TransactionsList.propTypes = {
	code: PropTypes.oneOf(Object.keys(CURRENCY_SYMBOLS)).isRequired,
	listKey: PropTypes.string.isRequired,
	pagination: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
	placeholder: PropTypes.node.isRequired,
	rate: PropTypes.number,
	transactions: PropTypes.objectOf(simplifiedTransactionType).isRequired
};

TransactionsList.defaultProps = {
	rate: null
};

const TransactionsTable = ({
	code,
	formData,
	history,
	page,
	pagination,
	placeholder,
	rate,
	setSort,
	transactions,
	updatePage
}) => {
	// Get visible items for current page
	const pageList = pagination[page - 1];
	const withId = id => ({ id, ...transactions[id] });
	const pageItems = pageList == null ? [] : pageList.map(withId);

	return (
		<Suspense
			fallback={
				<Placeholder title={TABLE_PLACEHOLDER_TITLE} {...loaderProps} />
			}
		>
			<Table
				className="portfolio__transaction-table"
				currentPage={parseInt(page, 10)}
				fields={getTableFields(code)}
				lastPage={Math.max(1, pagination.length)}
				onPageChange={updatePage}
				onSelectRow={id => history.push(`/app/transaction/${id}`)}
				onSort={setSort}
				pageItems={pageItems}
				parser={getTableViewModel(code, rate)}
				placeholder={placeholder}
				sort={{ fieldName: formData.sort, order: formData.order }}
			/>
		</Suspense>
	);
};

TransactionsTable.propTypes = {
	code: PropTypes.oneOf(Object.keys(CURRENCY_SYMBOLS)).isRequired,
	formData: PropTypes.objectOf(
		PropTypes.oneOfType([PropTypes.bool, PropTypes.number, PropTypes.string])
	).isRequired,
	page: PropTypes.string.isRequired,
	pagination: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
	placeholder: PropTypes.node.isRequired,
	rate: PropTypes.number,
	setSort: PropTypes.func.isRequired,
	transactions: PropTypes.objectOf(simplifiedTransactionType).isRequired,
	updatePage: PropTypes.func.isRequired
};

TransactionsTable.defaultProps = {
	rate: null
};

const TransactionsViewer = ({
	code,
	hasError,
	history,
	isLoading,
	isMobile,
	location,
	onRefresh,
	pagination,
	rate,
	setSort,
	transactions,
	updatePage
}) => {
	// Get transactions query state from url
	const { page, ...formData } = untrim(
		qs.parse(location.search),
		FORM_VALIDATION
	);

	// Shared placeholder
	const placeholder = (
		<TransactionsPlaceholder
			hasError={hasError}
			isLoading={isLoading}
			onRefresh={onRefresh}
		/>
	);

	// Shared props
	const commonProps = {
		code,
		pagination,
		placeholder,
		rate,
		transactions
	};

	// We reload the list when the query changes
	const { filter, incoming, order, outgoing, sort } = formData;
	const listKey = `${sort}-${order}-${filter}-${incoming}-${outgoing}`;

	// Render by surface type
	return isMobile ? (
		<TransactionsList {...commonProps} listKey={listKey} />
	) : (
		<TransactionsTable
			{...commonProps}
			formData={formData}
			history={history}
			page={page}
			setSort={setSort}
			updatePage={updatePage}
		/>
	);
};

TransactionsViewer.propTypes = {
	code: PropTypes.oneOf(Object.keys(CURRENCY_SYMBOLS)).isRequired,
	hasError: PropTypes.bool.isRequired,
	isLoading: PropTypes.bool.isRequired,
	isMobile: PropTypes.bool.isRequired,
	onRefresh: PropTypes.func.isRequired,
	pagination: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
	rate: PropTypes.number,
	setSort: PropTypes.func.isRequired,
	transactions: PropTypes.objectOf(simplifiedTransactionType).isRequired,
	updatePage: PropTypes.func.isRequired
};

TransactionsViewer.defaultProps = {
	rate: null
};

export default TransactionsViewer;
