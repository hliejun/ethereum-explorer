import React from 'react';
import { Waypoint } from 'react-waypoint';
import throttle from 'lodash.throttle';
import qs from 'query-string';
import clns from 'classnames';

import {
	bufferSize,
	pageSize,
	stubbedIds,
	stubbedSummary,
	stubbedTransactions
} from './_stubbedValues';

import {
	defaultFilterData,
	defaultFormData,
	defaultSortData,
	formValidation
} from './_constants';

import { filter, paginate, sort, trim, untrim } from './helper';

import List from '../../common/List';
import Modal from '../../common/Modal';
import Table from '../../common/Table';

import { getTableViewModel, getTableFields } from './TransactionTableModel';
import CombinedForm from './CombinedForm';
import FilterForm from './FilterForm';
import PortfolioModal from './PortfolioModal';
import SortForm from './SortForm';
import TransactionDashboard from './TransactionDashboard';
import TransactionListItem from './TransactionListItem';

import Filter from '../../../assets/icons/filter.svg';
import Sort from '../../../assets/icons/sort.svg';

import './_portfolio.scss';

class Portfolio extends React.Component {
	constructor(props) {
		super(props);
		this.throttledUpdateDimensions = throttle(this.updateDimensions, 600);
		this.state = {
			isMobile: false,
			isSubmitting: false,
			options: [
				{ key: 'filter', Icon: Filter, handler: this.toggleFilterModal },
				{ key: 'sort', Icon: Sort, handler: this.toggleSortModal }
			],
			showFilterModal: false,
			showSortModal: false,
			subtitle: null,
			title: 'Portfolio'
		};
	}

	componentDidMount() {
		const { setOptions, setSubtitle, setTitle } = this.props;
		const { options, subtitle, title } = this.state;
		setTitle(title);
		setSubtitle(subtitle);
		setOptions(options);
		this.throttledUpdateDimensions();
		window.addEventListener('resize', this.throttledUpdateDimensions);
	}

	componentWillUnmount() {
		const { reset } = this.props;
		reset();
		this.throttledUpdateDimensions.flush();
		window.removeEventListener('resize', this.throttledUpdateDimensions);
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

  /* Selector */

  getItems = () => {
  	const { location } = this.props;
  	const { page, ...formData } = untrim(
  		qs.parse(location.search),
  		formValidation
  	);
  	const {
  		filter: filterField,
  		order: sortOrder,
  		sort: sortField,
  		...filters
  	} = formData;
  	const filteredIds = filter(
  		stubbedIds,
  		stubbedTransactions,
  		filterField,
  		filters
  	);
  	const sortedIds = sort(
  		filteredIds,
  		stubbedTransactions,
  		sortField,
  		sortOrder
  	);
  	return paginate(sortedIds, pageSize);
  };

  /* Position / Dimension Listeners */

  toggleBalance = waypoint => {
  	const { setSubtitle } = this.props;
  	const { balance } = stubbedSummary;
  	const balanceDisplay =
      waypoint.currentPosition === Waypoint.inside
      	? null
      	: `Balance: $${balance}`;
  	setSubtitle(balanceDisplay);
  };

  updateDimensions = () => {
  	const { isMobile } = this.state;
  	const currentlyIsMobile = window.innerWidth < 768;
  	if (currentlyIsMobile !== isMobile) {
  		this.setState({
  			isMobile: currentlyIsMobile
  		});
  	}
  };

  /* Rendering */

  renderDashboard = () => (
  	<TransactionDashboard
  		balance={stubbedSummary.balance}
  		className="portfolio__dashboard"
  		code={stubbedSummary.code}
  		receivedEth={stubbedSummary.receivedEth}
  		sentEth={stubbedSummary.sentEth}
  		totalEth={stubbedSummary.totalEth}
  	/>
  );

  renderStubbedList = () => {
  	const { location } = this.props;
  	const { isMobile } = this.state;
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
  			dataMap={stubbedTransactions}
  			fontSize={isMobile ? 14 : 16}
  			key={`${sortField}-${order}-${filterField}-${incoming}-${outgoing}`}
  			pageBufferSize={bufferSize}
  			pageMap={this.getItems()}
  			pageSize={pageSize}
  			render={TransactionListItem}
  			topOffset={6.25}
  			unit="rem"
  			unitBufferHeight={8.5}
  		/>
  	);
  };

  renderStubbedTable = () => {
  	const { history, location } = this.props;
  	const { page: currentTablePage, ...formData } = untrim(
  		qs.parse(location.search),
  		formValidation
  	);
  	const { code } = stubbedSummary;
  	const paginatedItems = this.getItems();
  	const pageItemIds = paginatedItems[currentTablePage - 1];
  	return (
  		<Table
  			// isLoading={false} // KIV: need to put in state / store
  			// onRefresh={() => {}} // KIV: need to dispatch fetch
  			className="portfolio__transaction-table"
  			currentPage={parseInt(currentTablePage, 10)}
  			fields={getTableFields(code)}
  			lastPage={Math.max(1, paginatedItems.length)}
  			onPageChange={this.updatePage}
  			onSelectRow={id => history.push(`/app/transaction/${id}`)}
  			onSort={this.setSort}
  			pageItems={
  				pageItemIds == null
  					? []
  					: pageItemIds.map(id => ({
  						id,
  						...stubbedTransactions[id]
  					}))
  			}
  			parser={getTableViewModel}
  			sort={{ fieldName: formData.sort, order: formData.order }}
  		/>
  	);
  };

  renderFormModal = (title, subtitle, form) => (
  	<button
  		className="portfolio__modal-portal"
  		onClick={this.toggleFilterModal}
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

  renderFilterForm = (formData, isSubmitting) => (
  	<FilterForm
  		className="portfolio__modal-form"
  		defaultValues={defaultFilterData}
  		isSubmitting={isSubmitting}
  		onChange={this.setFormData}
  		onReset={this.resetData(defaultFilterData)}
  		onSubmit={values => {
  			this.setFormData(values);
  			this.toggleFilterModal();
  		}}
  		values={formData}
  	/>
  );

  renderSortForm = (formData, isSubmitting) => (
  	<SortForm
  		className="portfolio__modal-form"
  		defaultValues={defaultSortData}
  		isSubmitting={isSubmitting}
  		onChange={this.setFormData}
  		onReset={this.resetData(defaultSortData)}
  		onSubmit={values => {
  			this.setFormData(values);
  			this.toggleSortModal();
  		}}
  		values={formData}
  	/>
  );

  renderCombinedForm = (formData, isSubmitting) => (
  	<CombinedForm
  		className="portfolio__combined-form"
  		defaultValues={defaultFormData}
  		isSubmitting={isSubmitting}
  		onChange={this.setFormData}
  		onReset={this.resetData(defaultFormData)}
  		values={formData}
  	/>
  );

  render() {
  	const { className, location } = this.props;
  	const {
  		isMobile,
  		isSubmitting,
  		showFilterModal,
  		showSortModal
  	} = this.state;
  	const transactionsSectionTitle = 'Transaction History';
  	const { page, ...formData } = untrim(
  		qs.parse(location.search),
  		formValidation
  	);

  	return (
  		<div className={clns('page', 'portfolio', className)}>
  			<div className="portfolio__body">
  				<div className="portfolio__section portfolio__section--left">
  					<Waypoint onPositionChange={this.toggleBalance} />
  					{this.renderDashboard()}
  					{!isMobile && (
  						<React.Fragment>
  							<span className="portfolio__section-label">View Options</span>
  							{this.renderCombinedForm(formData, isSubmitting)}
  						</React.Fragment>
  					)}
  				</div>
  				<div className="portfolio__section portfolio__section--right">
  					<span className="portfolio__section-label">
  						{transactionsSectionTitle}
  					</span>
  					{isMobile ? this.renderStubbedList() : this.renderStubbedTable()}
  				</div>
  			</div>
  			{showFilterModal &&
          this.renderFormModal(
          	'Filter Transactions',
          	'Select a field category and its relevant tags to selectively display transaction results.',
          	this.renderFilterForm(formData, isSubmitting)
          )}
  			{showSortModal &&
          this.renderFormModal(
          	'Sort Transactions',
          	'Select a sortable field category and sort order to reorder the transaction results.',
          	this.renderSortForm(formData, isSubmitting)
          )}
  		</div>
  	);
  }
}

// TODO: Get props from Redux
// userData
// transactions
// isFetching
// isRefreshing

// TODO: Get actions from Redux
// fetchBalance
// fetchUser
// fetchTransactions

export default Portfolio;
