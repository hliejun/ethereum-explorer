import React from 'react';
import { Waypoint } from 'react-waypoint';
import throttle from 'lodash.throttle';
import clns from 'classnames';

import { RouterContext } from '../../Router';

import {
	bufferSize,
	pageSize,
	stubbedIds,
	stubbedSummary,
	stubbedTransactions
} from './_stubbedValues';
import { filter, paginate, sort } from './helper';

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

const stubbedDashboard = (
	<TransactionDashboard
		balance={stubbedSummary.balance}
		className="portfolio__dashboard"
		code={stubbedSummary.code}
		receivedEth={stubbedSummary.receivedEth}
		sentEth={stubbedSummary.sentEth}
		totalEth={stubbedSummary.totalEth}
	/>
);

const defaultFilterData = {
	ethereum: true,
	filter: 'type',
	incoming: true,
	outgoing: true,
	xcoin: true
};

const defaultSortData = {
	order: 'descending',
	sort: 'date'
};

const defaultFormData = {
	...defaultFilterData,
	...defaultSortData
};

class Portfolio extends React.Component {
  static contextType = RouterContext;

  constructor(props) {
  	super(props);
  	this.throttledUpdateDimensions = throttle(this.updateDimensions, 600);
  	this.state = {
  		currentTablePage: 1,
  		formData: { ...defaultFormData },
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
  	this.setState({
  		formData: values,
  		currentTablePage: 1
  	});
  };

  setSort = (fieldName, order) => {
  	this.setState(({ formData }) => ({
  		currentTablePage: 1,
  		formData: {
  			...formData,
  			sort: fieldName,
  			order:
          order ||
          (formData.sort === fieldName && formData.order === 'ascending'
          	? 'descending'
          	: 'ascending')
  		}
  	}));
  };

  resetFilter = () => {
  	this.setState(({ formData }) => ({
  		formData: {
  			...formData,
  			...defaultFilterData
  		}
  	}));
  };

  resetSort = () => {
  	this.setState(({ formData }) => ({
  		formData: {
  			...formData,
  			...defaultSortData
  		}
  	}));
  };

  resetCombined = () => {
  	this.setState({
  		formData: {
  			...defaultFormData
  		}
  	});
  };

  updatePage = page => {
  	this.setState({
  		currentTablePage: page
  	});
  };

  /* Selector */

  getItems = () => {
  	const { formData } = this.state;
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

  renderStubbedList = () => {
  	const { formData, isMobile } = this.state;
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
  	const { history } = this.context;
  	const { currentTablePage, formData } = this.state;
  	const { code } = stubbedSummary;
  	const paginatedItems = this.getItems();
  	const pageItemIds = paginatedItems[currentTablePage - 1];
  	return (
  		<Table
  			// isLoading={false} // KIV: need to put in state / store
  			// onRefresh={() => {}} // KIV: need to dispatch fetch
  			className="portfolio__transaction-table"
  			currentPage={currentTablePage}
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

  renderFilterModal = () => {
  	const { formData, isSubmitting } = this.state;
  	return (
  		<button
  			className="portfolio__modal-portal portfolio__modal-portal--filter"
  			onClick={this.toggleFilterModal}
  			type="button"
  		>
  			<Modal>
  				<PortfolioModal>
  					<div className="portfolio__modal-header">
  						<span className="portfolio__modal-title">
                Filter Transactions
  						</span>
  						<span className="portfolio__modal-subtitle">
                Select a field category and its relevant tags to selectively
                display transaction results.
  						</span>
  					</div>
  					<FilterForm
  						className="portfolio__modal-form"
  						defaultValues={defaultFilterData}
  						isSubmitting={isSubmitting}
  						onChange={this.setFormData}
  						onReset={this.resetFilter}
  						onSubmit={values => {
  							this.setFormData(values);
  							this.toggleFilterModal();
  						}}
  						values={formData}
  					/>
  				</PortfolioModal>
  			</Modal>
  		</button>
  	);
  };

  renderSortModal = () => {
  	const { formData, isSubmitting } = this.state;
  	return (
  		<button
  			className="portfolio__modal-portal portfolio__modal-portal--sort"
  			onClick={this.toggleSortModal}
  			type="button"
  		>
  			<Modal>
  				<PortfolioModal>
  					<div className="portfolio__modal-header">
  						<span className="portfolio__modal-title">Sort Transactions</span>
  						<span className="portfolio__modal-subtitle">
                Select a sortable field category and sort order to reorder the
                transaction results.
  						</span>
  					</div>
  					<SortForm
  						className="portfolio__modal-form"
  						defaultValues={defaultSortData}
  						isSubmitting={isSubmitting}
  						onChange={this.setFormData}
  						onReset={this.resetSort}
  						onSubmit={values => {
  							this.setFormData(values);
  							this.toggleSortModal();
  						}}
  						values={formData}
  					/>
  				</PortfolioModal>
  			</Modal>
  		</button>
  	);
  };

  render() {
  	const { className } = this.props;
  	const {
  		formData,
  		isMobile,
  		isSubmitting,
  		showFilterModal,
  		showSortModal
  	} = this.state;
  	const transactionsSectionTitle = 'Transaction History';
  	return (
  		<div className={clns('page', 'portfolio', className)}>
  			<div className="portfolio__body">
  				<div className="portfolio__section portfolio__section--left">
  					<Waypoint onPositionChange={this.toggleBalance} />
  					{stubbedDashboard}
  					{!isMobile && (
  						<React.Fragment>
  							<span className="portfolio__section-label">View Options</span>
  							<CombinedForm
  								className="portfolio__combined-form"
  								defaultValues={defaultFormData}
  								isSubmitting={isSubmitting}
  								onChange={this.setFormData}
  								onReset={this.resetCombined}
  								values={formData}
  							/>
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
  			{showFilterModal && this.renderFilterModal()}
  			{showSortModal && this.renderSortModal()}
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
