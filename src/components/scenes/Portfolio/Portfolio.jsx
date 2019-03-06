import React from 'react';
import { Waypoint } from 'react-waypoint';
import throttle from 'lodash.throttle';
import clns from 'classnames';

import { RouterContext } from '../../Router';
import TransactionDashboard from './TransactionDashboard';

import {
	stubbedPagination,
	stubbedSummary,
	stubbedTransactions
} from './_stubbedValues';
import {
	getTransactionViewModel,
	getTransactionFields
} from './TransactionTableModel';
import List from '../../common/List';
import Table from '../../common/Table';
import TransactionListItem from './TransactionListItem';

import Filter from '../../../assets/icons/filter.svg';
import Sort from '../../../assets/icons/sort.svg';

// TODO: Add sort and filter form modals

// TODO: Add filter state ({ filters: receiving: true, sending: false })

// TODO: Perform local sorting and filtering in action dispatch

const bufferSize = 2;

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

class Portfolio extends React.Component {
  static contextType = RouterContext;

  constructor(props) {
  	super(props);
  	this.throttledUpdateDimensions = throttle(this.updateDimensions, 600);
  	this.state = {
  		title: 'Portfolio',
  		subtitle: null,
  		options: [
  			{ key: 'filter', Icon: Filter, handler: this.toggleFilterModal },
  			{ key: 'sort', Icon: Sort, handler: this.toggleSortModal }
  		],
  		isMobile: false,
  		showFilterModal: false,
  		showSortModal: false,
  		sort: { fieldName: 'date', order: 'DESC' },
  		currentTablePage: 1
  	};
  }

  componentDidMount() {
  	const { setTitle, setSubtitle, setOptions } = this.props;
  	const { title, subtitle, options } = this.state;
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

  /* Actions */

  toggleFilterModal = () => {
  	this.setState(state => ({
  		showFilterModal: !state.showFilterModal
  	}));
  };

  toggleSortModal = () => {
  	this.setState(state => ({
  		showSortModal: !state.showSortModal
  	}));
  };

  toggleSort = (fieldName, order) => {
  	this.setState(state => ({
  		sort: {
  			fieldName,
  			order:
          order ||
          (state.sort.fieldName !== fieldName || state.sort.order !== 'ASC'
          	? 'ASC'
          	: 'DESC')
  		}
  	}));
  };

  updatePage = page => {
  	this.setState({
  		currentTablePage: page
  	});
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
  	const { isMobile } = this.state;
  	return (
  		<List
  			bottomOffset={0}
  			className="portfolio__transaction-list"
  			dataMap={stubbedTransactions}
  			fontSize={isMobile ? 14 : 16}
  			itemRenderer={TransactionListItem}
  			key={bufferSize}
  			pageBufferSize={bufferSize}
  			pageMap={stubbedPagination}
  			topOffset={6.25}
  			unit="rem"
  			unitBufferHeight={8.5}
  		/>
  	);
  };

  renderStubbedTable = () => {
  	const { history } = this.context;
  	const { currentTablePage, sort } = this.state;
  	const { code } = stubbedSummary;
  	return (
  		<Table
  			className="portfolio__transaction-table"
  			currentPage={currentTablePage}
  			fields={getTransactionFields(code)}
  			isLoading={false} // KIV: need to put in state / store
  			lastPage={Math.max(...Object.keys(stubbedPagination))}
  			onPageChange={this.updatePage}
  			onRefresh={() => {}} // KIV: need to dispatch fetch
  			onSelectRow={id => history.push(`/app/transaction/${id}`)}
  			onSort={this.toggleSort}
  			pageItems={stubbedPagination[currentTablePage].map(id => ({
  				id,
  				...stubbedTransactions[id]
  			}))}
  			parser={getTransactionViewModel}
  			sort={sort}
  		/>
  	);
  };

  render() {
  	const { className } = this.props;
  	const { isMobile } = this.state;
  	const transactionsSectionTitle = 'Transaction History';
  	return (
  		<div className={clns('page', 'portfolio', className)}>
  			{/* ---TOP SIDE--- */}
  			{/* Pull to Refresh */}
  			<div className="portfolio__body">
  				<div className="portfolio__section portfolio__section--left">
  					<Waypoint onPositionChange={this.toggleBalance} />
  					{stubbedDashboard}
  					{/* Combined Form (Desktop) */}
  				</div>
  				<div className="portfolio__section portfolio__section--right">
  					<span className="portfolio__section-label">
  						{transactionsSectionTitle}
  					</span>
  					{isMobile ? this.renderStubbedList() : this.renderStubbedTable()}
  				</div>
  			</div>
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

// TODO: Abstract constants

export default Portfolio;
