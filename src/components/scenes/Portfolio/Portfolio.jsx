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

import { trim, untrim } from '../../../redux/selectors/helper';

import {
	getBalance as fetchBalance,
	getCurrencyRates as fetchCurrencyRates,
	reloadTransactions as fetchTransactions
} from '../../../redux/actions/ethereum';

import CombinedForm from './CombinedForm';
import FilterForm from './FilterForm';
import Modal from '../../common/Modal';
import Placeholder from '../../common/Placeholder';
import PortfolioModal from './PortfolioModal';
import SortForm from './SortForm';
import TransactionDashboard from './TransactionDashboard';
import TransactionsViewer from './TransactionsViewer';

import ErrorIcon from '../../../assets/icons/glyphs/server.svg';
import FilterIcon from '../../../assets/icons/glyphs/filter.svg';
import SortIcon from '../../../assets/icons/glyphs/sort.svg';

import {
	CURRENCY_SYMBOLS,
	FILTER_DEFAULT,
	COMBINED_DEFAULT,
	SORT_DEFAULT,
	FILTER_FORM_SUBTITLE,
	FILTER_FORM_TITLE,
	FORM_VALIDATION,
	PLACEHOLDER_ADDRESS_ERROR,
	PLACEHOLDER_KEY_ERROR,
	PORTFOLIO_SECTION_LABELS,
	SORT_FORM_SUBTITLE,
	SORT_FORM_TITLE
} from '../../../constants';

import './_portfolio.scss';

class Portfolio extends React.PureComponent {
	constructor(props) {
		super(props);

		// AppBar constants
		this.options = [
			{ handler: this.toggleFilterModal, icon: FilterIcon, key: 'filter' },
			{ handler: this.toggleSortModal, icon: SortIcon, key: 'sort' }
		];
		this.title = 'Portfolio';

		this.state = {
			showFilterModal: false,
			showSortModal: false,
			subtitle: null
		};
	}

	componentDidMount() {
		const { address, authToken } = this.props;
		const { updateBalance, updateRates, updateTransactions } = this.props;
		const { isLoading, rate, setOptions, setSubtitle, setTitle } = this.props;

		// Setup AppBar
		const { subtitle } = this.state;
		setTitle(this.title);
		setSubtitle(subtitle);
		setOptions(this.options);

		// Fetch/update data
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
		// Restore AppBar
		const { reset } = this.props;
		reset();
	}

	// Modal toggles

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

  // AppBar effects

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

  // Transactions query effects

  setFormData = values => {
  	const { history, location } = this.props;

  	// Always return to first page on query change
  	const data = { ...values, page: 1 };

  	// Update url with query string
  	history.push({
  		...location,
  		search: qs.stringify(trim(data, FORM_VALIDATION))
  	});
  };

  setSort = (fieldName, order) => {
  	const { history, location } = this.props;

  	// Get previous query
  	const { page, ...prevData } = untrim(
  		qs.parse(location.search),
  		FORM_VALIDATION
  	);

  	// Update only sort-related changes
  	const data = {
  		...prevData,
  		sort: fieldName,
  		order:
        order ||
        (prevData.sort === fieldName && prevData.order === 'ascending'
        	? 'descending'
        	: 'ascending')
  	};

  	// Update url with query string
  	history.push({
  		...location,
  		search: qs.stringify(trim(data, FORM_VALIDATION))
  	});
  };

  resetData = defaultData => () => {
  	const { history, location } = this.props;

  	// Reset query fields with known defaults
  	const prevData = qs.parse(location.search);
  	const data = { ...prevData, ...defaultData, page: 1 };

  	// Update url with query string
  	history.push({
  		...location,
  		search: qs.stringify(trim(data, FORM_VALIDATION))
  	});
  };

  updatePage = page => {
  	const { history, location } = this.props;

  	// Update page query
  	const prevData = qs.parse(location.search);
  	const data = { ...prevData, page };

  	// Update url with query string
  	history.push({
  		...location,
  		search: qs.stringify(trim(data, FORM_VALIDATION))
  	});
  };

  // Views

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

  renderDashboard = () => {
  	const { code, isLoading, rate } = this.props;
  	const { balance, received, sent, subtotal } = this.props;
  	const { address, authToken, updateBalance, updateRates } = this.props;

  	// Fetch actions if data is stale
  	const updateBalanceAndRates = () => {
  		if (!rate && !isLoading.currency) {
  			updateRates(authToken, Object.keys(CURRENCY_SYMBOLS));
  		}
  		updateBalance(authToken, address);
  	};

  	return (
  		<TransactionDashboard
  			balance={parseFloat(balance)}
  			className="portfolio__dashboard"
  			isLoading={isLoading.balance}
  			localCode={code}
  			onRefresh={updateBalanceAndRates}
  			rate={rate}
  			received={parseFloat(received)}
  			sent={parseFloat(sent)}
  			subtotal={parseFloat(subtotal)}
  		/>
  	);
  };

  renderTransactions = () => {
  	const { history, location } = this.props;
  	const { errors, isLoading, isMobile } = this.props;
  	const { code, rate, pagination, transactions } = this.props;
  	const { address, authToken, updateRates, updateTransactions } = this.props;

  	// Fetch actions if data is stale
  	const updateTransactionsAndRates = () => {
  		if (!rate && !isLoading.currency) {
  			updateRates(authToken, Object.keys(CURRENCY_SYMBOLS));
  		}
  		updateTransactions(authToken, address);
  	};

  	return (
  		<TransactionsViewer
  			code={code}
  			hasError={!!errors.transactions}
  			history={history}
  			isLoading={isLoading.transactions}
  			isMobile={isMobile}
  			location={location}
  			onRefresh={updateTransactionsAndRates}
  			pagination={pagination}
  			setSort={this.setSort}
  			rate={rate}
  			transactions={transactions}
  			updatePage={this.updatePage}
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
  		defaultValues={FILTER_DEFAULT}
  		onChange={this.setFormData}
  		onReset={this.resetData(FILTER_DEFAULT)}
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
  		defaultValues={SORT_DEFAULT}
  		onChange={this.setFormData}
  		onReset={this.resetData(SORT_DEFAULT)}
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
  		defaultValues={COMBINED_DEFAULT}
  		onChange={this.setFormData}
  		onReset={this.resetData(COMBINED_DEFAULT)}
  		values={formData}
  	/>
  );

  render() {
  	const { address, apiKey, className, isMobile, location } = this.props;
  	const { showFilterModal, showSortModal } = this.state;

  	// Get transactions query state
  	const { page, ...formData } = untrim(
  		qs.parse(location.search),
  		FORM_VALIDATION
  	);

  	// Get placeholder state
  	let placeholderState = null;
  	let key = 'key';
  	if (!apiKey) {
  		placeholderState = PLACEHOLDER_KEY_ERROR;
  	} else if (!address) {
  		placeholderState = PLACEHOLDER_ADDRESS_ERROR;
  		key = 'address';
  	}

  	return (
  		<div className={clns('page', 'portfolio', className)}>
  			{placeholderState ? (
  				this.renderErrorPlaceholder(placeholderState, key)
  			) : (
  				<React.Fragment>
  					<div className="portfolio__body">
  						<div className="portfolio__section portfolio__section--left">
  							<Waypoint onPositionChange={this.toggleBalance} />
  							{this.renderDashboard()}
  							{!isMobile && (
  								<React.Fragment>
  									<span className="portfolio__section-label">
  										{PORTFOLIO_SECTION_LABELS.options}
  									</span>
  									{this.renderCombinedForm(formData)}
  								</React.Fragment>
  							)}
  						</div>
  						<div className="portfolio__section portfolio__section--right">
  							<span className="portfolio__section-label">
  								{PORTFOLIO_SECTION_LABELS.history}
  							</span>
  							{this.renderTransactions()}
  						</div>
  					</div>
  					{showFilterModal &&
              this.renderFormModal(
              	FILTER_FORM_TITLE,
              	FILTER_FORM_SUBTITLE,
              	this.renderFilterForm(formData),
              	this.toggleFilterModal
              )}
  					{showSortModal &&
              this.renderFormModal(
              	SORT_FORM_TITLE,
              	SORT_FORM_SUBTITLE,
              	this.renderSortForm(formData),
              	this.toggleSortModal
              )}
  				</React.Fragment>
  			)}
  		</div>
  	);
  }
}

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
	transactions: PropTypes.objectOf(simplifiedTransactionType).isRequired,
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
