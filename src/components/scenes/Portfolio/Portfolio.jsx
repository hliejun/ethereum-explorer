import React from 'react';
import { connect } from 'react-redux';
import { Waypoint } from 'react-waypoint';
import PropTypes from 'prop-types';
import clns from 'classnames';
import qs from 'query-string';

import {
	getAddress,
	getApiKey,
	getAuthToken,
	getBalance,
	getErrorStates,
	getHistoricalSummary,
	getLoadStates,
	getLocalisation,
	getPagination,
	getSimpleTransactions
} from '../../../redux/selectors';

import {
	getBalance as fetchBalance,
	getCurrencyRates as fetchCurrencyRates,
	reloadTransactions as fetchTransactions
} from '../../../redux/actions/ethereum';

import {
	bufferSize,
	defaultFilterData,
	defaultFormData,
	defaultSortData,
	emptyTransactionsHolderState,
	errorAddressHolderState,
	errorBalanceHolderState,
	errorKeyHolderState,
	errorTransactionsHolderState,
	formValidation,
	loadingBalanceHolderState,
	loadingTransactionsHolderState,
	pageSize
} from './_constants';

import { CURRENCY_SYMBOLS } from '../../common/Currency';
import { trim, untrim } from './helper';

import { getTableViewModel, getTableFields } from './TransactionTableModel';
import TransactionListItem from './TransactionListItem';

import CombinedForm from './CombinedForm';
import FilterForm from './FilterForm';
import List from '../../common/List';
import Modal from '../../common/Modal';
import Placeholder from '../../common/Placeholder';
import PortfolioModal from './PortfolioModal';
import SortForm from './SortForm';
import Table from '../../common/Table';
import TransactionDashboard from './TransactionDashboard';

import EmptyIcon from '../../../assets/icons/glyphs/empty.svg';
import ErrorIcon from '../../../assets/icons/glyphs/server.svg';
import Filter from '../../../assets/icons/glyphs/filter.svg';
import Sort from '../../../assets/icons/glyphs/sort.svg';

import './_portfolio.scss';

class Portfolio extends React.PureComponent {
	constructor(props) {
		super(props);
		this.options = [
			{ handler: this.toggleFilterModal, icon: Filter, key: 'filter' },
			{ handler: this.toggleSortModal, icon: Sort, key: 'sort' }
		];
		this.title = 'Portfolio';
		this.state = {
			showFilterModal: false,
			showSortModal: false,
			subtitle: null
		};
	}

	componentDidMount() {
		const {
			address,
			authToken,
			isLoading,
			rate,
			setOptions,
			setSubtitle,
			setTitle,
			updateBalance,
			updateRates,
			updateTransactions
		} = this.props;
		const { subtitle } = this.state;
		setTitle(this.title);
		setSubtitle(subtitle);
		setOptions(this.options);
		if (authToken && !rate && !isLoading.currency) {
			updateRates(authToken, Object.keys(CURRENCY_SYMBOLS));
		}
		if (authToken && address && !isLoading.balance) {
			updateBalance(authToken, address);
		}
		if (authToken && address && !isLoading.transactions) {
			updateTransactions(authToken, address);
		}
	}

	componentWillUnmount() {
		const { reset } = this.props;
		reset();
	}

	/* State Modifiers */

  toggleFilterModal = () => {
  	this.setState(({ showFilterModal, showSortModal }) => ({
  		showFilterModal: !showFilterModal,
  		showSortModal: showFilterModal && showSortModal
  	}));
  };

  toggleSortModal = () => {
  	this.setState(({ showFilterModal, showSortModal }) => ({
  		showFilterModal: showSortModal && showFilterModal,
  		showSortModal: !showSortModal
  	}));
  };

  /* Effects */

  toggleBalance = waypoint => {
  	const { balance, code, setSubtitle } = this.props;
  	if (balance == null) {
  		setSubtitle(null);
  	} else {
  		const symbol = CURRENCY_SYMBOLS[code] || '$';
  		const balanceDisplay =
        waypoint.currentPosition === Waypoint.inside
        	? null
        	: `Balance: ${symbol}${balance}`;
  		setSubtitle(balanceDisplay);
  	}
  };

  setFormData = values => {
  	const { history, location } = this.props;
  	const data = { ...values, page: 1 };
  	history.push({
  		...location,
  		search: qs.stringify(trim(data, formValidation))
  	});
  };

  setSort = (fieldName, order) => {
  	const { history, location } = this.props;
  	const { page, ...prevData } = untrim(
  		qs.parse(location.search),
  		formValidation
  	);
  	const data = {
  		...prevData,
  		sort: fieldName,
  		order:
        order ||
        (prevData.sort === fieldName && prevData.order === 'ascending'
        	? 'descending'
        	: 'ascending')
  	};
  	history.push({
  		...location,
  		search: qs.stringify(trim(data, formValidation))
  	});
  };

  resetData = defaultData => () => {
  	const { history, location } = this.props;
  	const prevData = qs.parse(location.search);
  	const data = { ...prevData, ...defaultData, page: 1 };
  	history.push({
  		...location,
  		search: qs.stringify(trim(data, formValidation))
  	});
  };

  updatePage = page => {
  	const { history, location } = this.props;
  	const prevData = qs.parse(location.search);
  	const data = { ...prevData, page };
  	history.push({
  		...location,
  		search: qs.stringify(trim(data, formValidation))
  	});
  };

  /* Rendering */

  renderErrorPlaceholder = (state, key) => {
  	const { history } = this.props;
  	return (
  		<Placeholder
  			className={`portfolio__placeholder portfolio__placeholder--${key}`}
  			errorIcon={ErrorIcon}
  			hasError
  			onRefresh={() => history.push('/app/settings')}
  			{...state}
  		/>
  	);
  };

  // TODO: Display error message from errors state props object
  renderBalancePlaceholder = () => {
  	const {
  		address,
  		authToken,
  		isLoading: loading,
  		rate,
  		updateBalance,
  		updateRates
  	} = this.props;
  	const isLoading = loading.balance;
  	let state = errorBalanceHolderState;
  	if (isLoading) {
  		state = loadingBalanceHolderState;
  	}
  	return (
  		<Placeholder
  			className="portfolio__placeholder portfolio__placeholder--balance"
  			errorIcon={ErrorIcon}
  			hasError
  			isLoading={isLoading}
  			onRefresh={() => {
  				if (!rate && !isLoading.currency) {
  					updateRates(authToken, Object.keys(CURRENCY_SYMBOLS));
  				}
  				updateBalance(authToken, address);
  			}}
  			{...state}
  		/>
  	);
  };

  renderDashboard = () => {
  	const { balance, code, rate, received, sent, subtotal } = this.props;
  	return (
  		<TransactionDashboard
  			balance={parseFloat(balance)}
  			className="portfolio__dashboard"
  			code={code}
  			placeholder={this.renderBalancePlaceholder()}
  			rate={rate}
  			received={parseFloat(received)}
  			sent={parseFloat(sent)}
  			total={parseFloat(subtotal)}
  		/>
  	);
  };

  // TODO: Display error message from errors state props object
  renderTransactionsPlaceholder = () => {
  	const {
  		address,
  		authToken,
  		errors,
  		isLoading: loading,
  		rate,
  		updateRates,
  		updateTransactions
  	} = this.props;
  	const error = errors.transactions;
  	const hasError = error != null && Object.keys(error).length > 0;
  	const isLoading = loading.transactions;
  	let placeholderState = emptyTransactionsHolderState;
  	if (isLoading) {
  		placeholderState = loadingTransactionsHolderState;
  	} else if (hasError) {
  		placeholderState = errorTransactionsHolderState;
  	}
  	return (
  		<Placeholder
  			className="portfolio__placeholder portfolio__placeholder--transactions"
  			emptyIcon={EmptyIcon}
  			errorIcon={ErrorIcon}
  			hasError={hasError}
  			isLoading={isLoading}
  			onRefresh={() => {
  				if (!rate && !isLoading.currency) {
  					updateRates(authToken, Object.keys(CURRENCY_SYMBOLS));
  				}
  				updateTransactions(authToken, address);
  			}}
  			{...placeholderState}
  		/>
  	);
  };

  renderList = () => {
  	const {
  		code,
  		isMobile,
  		location,
  		pagination,
  		rate,
  		transactions
  	} = this.props;

  	const { page, ...formData } = untrim(
  		qs.parse(location.search),
  		formValidation
  	);

  	const {
  		filter: filterField,
  		incoming,
  		order,
  		outgoing,
  		sort: sortField
  	} = formData;

  	return (
  		<List
  			bottomOffset={0}
  			className="portfolio__transaction-list"
  			code={code}
  			dataMap={transactions}
  			fontSize={isMobile ? 14 : 16}
  			key={`${sortField}-${order}-${filterField}-${incoming}-${outgoing}`}
  			pageBufferSize={bufferSize}
  			pageMap={pagination}
  			pageSize={pageSize}
  			placeholder={this.renderTransactionsPlaceholder()}
  			rate={rate}
  			render={TransactionListItem}
  			topOffset={6.25}
  			unit="rem"
  			unitBufferHeight={8.5}
  		/>
  	);
  };

  renderTable = () => {
  	const {
  		code,
  		history,
  		location,
  		pagination,
  		rate,
  		transactions
  	} = this.props;

  	const { page: currentTablePage, ...formData } = untrim(
  		qs.parse(location.search),
  		formValidation
  	);

  	const pageList = pagination[currentTablePage - 1];
  	const withId = id => ({ id, ...transactions[id] });
  	const pageItems = pageList == null ? [] : pageList.map(withId);

  	return (
  		<Table
  			className="portfolio__transaction-table"
  			currentPage={parseInt(currentTablePage, 10)}
  			fields={getTableFields(code)}
  			lastPage={Math.max(1, pagination.length)}
  			onPageChange={this.updatePage}
  			onSelectRow={id => history.push(`/app/transaction/${id}`)}
  			onSort={this.setSort}
  			pageItems={pageItems}
  			parser={getTableViewModel(code, rate)}
  			placeholder={this.renderTransactionsPlaceholder()}
  			sort={{ fieldName: formData.sort, order: formData.order }}
  		/>
  	);
  };

  renderFormModal = (title, subtitle, form, handleDismiss) => (
  	<button
  		className="portfolio__modal-portal"
  		onClick={handleDismiss}
  		type="button"
  	>
  		<Modal>
  			<PortfolioModal>
  				<div className="portfolio__modal-header">
  					<span className="portfolio__modal-title">{title}</span>
  					<span className="portfolio__modal-subtitle">{subtitle}</span>
  				</div>
  				{form}
  			</PortfolioModal>
  		</Modal>
  	</button>
  );

  renderFilterForm = formData => (
  	<FilterForm
  		className="portfolio__modal-form"
  		defaultValues={defaultFilterData}
  		onChange={this.setFormData}
  		onReset={this.resetData(defaultFilterData)}
  		onSubmit={values => {
  			this.setFormData(values);
  			this.toggleFilterModal();
  		}}
  		values={formData}
  	/>
  );

  renderSortForm = formData => (
  	<SortForm
  		className="portfolio__modal-form"
  		defaultValues={defaultSortData}
  		onChange={this.setFormData}
  		onReset={this.resetData(defaultSortData)}
  		onSubmit={values => {
  			this.setFormData(values);
  			this.toggleSortModal();
  		}}
  		values={formData}
  	/>
  );

  renderCombinedForm = formData => (
  	<CombinedForm
  		className="portfolio__combined-form"
  		defaultValues={defaultFormData}
  		onChange={this.setFormData}
  		onReset={this.resetData(defaultFormData)}
  		values={formData}
  	/>
  );

  render() {
  	const { address, apiKey, className, isMobile, location } = this.props;
  	const { showFilterModal, showSortModal } = this.state;
  	const { page, ...formData } = untrim(
  		qs.parse(location.search),
  		formValidation
  	);

  	if (!apiKey) {
  		return (
  			<div className={clns('page', 'portfolio', className)}>
  				{this.renderErrorPlaceholder(errorKeyHolderState, 'key')}
  			</div>
  		);
  	}

  	if (!address) {
  		return (
  			<div className={clns('page', 'portfolio', className)}>
  				{this.renderErrorPlaceholder(errorAddressHolderState, 'address')}
  			</div>
  		);
  	}

  	return (
  		<div className={clns('page', 'portfolio', className)}>
  			<div className="portfolio__body">
  				<div className="portfolio__section portfolio__section--left">
  					<Waypoint onPositionChange={this.toggleBalance} />
  					{this.renderDashboard()}
  					{!isMobile && (
  						<React.Fragment>
  							<span className="portfolio__section-label">View Options</span>
  							{this.renderCombinedForm(formData)}
  						</React.Fragment>
  					)}
  				</div>
  				<div className="portfolio__section portfolio__section--right">
  					<span className="portfolio__section-label">
              Transaction History
  					</span>
  					{isMobile ? this.renderList() : this.renderTable()}
  				</div>
  			</div>
  			{showFilterModal &&
          this.renderFormModal(
          	'Filter Transactions',
          	'Select a field category and its relevant tags to selectively display transaction results.',
          	this.renderFilterForm(formData),
          	this.toggleFilterModal
          )}
  			{showSortModal &&
          this.renderFormModal(
          	'Sort Transactions',
          	'Select a sortable field category and sort order to reorder the transaction results.',
          	this.renderSortForm(formData),
          	this.toggleSortModal
          )}
  		</div>
  	);
  }
}

Portfolio.propTypes = {
	address: PropTypes.string,
	apiKey: PropTypes.string,
	authToken: PropTypes.string,
	balance: PropTypes.number,
	className: PropTypes.string,
	code: PropTypes.oneOf(Object.keys(CURRENCY_SYMBOLS)).isRequired,
	errors: PropTypes.objectOf(PropTypes.string).isRequired,
	isLoading: PropTypes.objectOf(PropTypes.bool).isRequired,
	isMobile: PropTypes.bool.isRequired,
	pagination: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)).isRequired,
	rate: PropTypes.number,
	received: PropTypes.number.isRequired,
	reset: PropTypes.func.isRequired,
	sent: PropTypes.number.isRequired,
	setOptions: PropTypes.func.isRequired,
	setSubtitle: PropTypes.func.isRequired,
	setTitle: PropTypes.func.isRequired,
	subtotal: PropTypes.number.isRequired,
	transactions: PropTypes.objectOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			source: PropTypes.shape({
				address: PropTypes.string.isRequired,
				timestamp: PropTypes.string.isRequired,
				type: PropTypes.oneOf(['incoming', 'outgoing']).isRequired
			}).isRequired,
			status: PropTypes.oneOf(['failed', 'pending', 'success']).isRequired,
			value: PropTypes.string.isRequired
		})
	).isRequired,
	updateBalance: PropTypes.func.isRequired,
	updateRates: PropTypes.func.isRequired,
	updateTransactions: PropTypes.func.isRequired
};

Portfolio.defaultProps = {
	address: null,
	apiKey: null,
	authToken: null,
	balance: null,
	className: null,
	rate: null
};

const mapStateToProps = (state, props) => {
	const { code, rate } = getLocalisation(state);
	const { received, sent, subtotal } = getHistoricalSummary(state);
	return {
		address: getAddress(state),
		apiKey: getApiKey(state),
		authToken: getAuthToken(state),
		balance: getBalance(state),
		code,
		errors: getErrorStates(state),
		isLoading: getLoadStates(state),
		pagination: getPagination(state, props),
		rate,
		received,
		sent,
		subtotal,
		transactions: getSimpleTransactions(state)
	};
};

const mapDispatchToProps = dispatch => ({
	updateBalance: (authToken, address) =>
		dispatch(fetchBalance(authToken, address)),
	updateRates: (authToken, codes) =>
		dispatch(fetchCurrencyRates(authToken, codes)),
	updateTransactions: (authToken, address) =>
		dispatch(fetchTransactions(authToken, address))
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Portfolio);
