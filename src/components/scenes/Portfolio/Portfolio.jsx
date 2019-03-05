import React from 'react';
import { Waypoint } from 'react-waypoint';
import throttle from 'lodash.throttle';
import clns from 'classnames';

import { RouterContext } from '../../Router';
import { PortfolioDashboard } from '../../common/Dashboard';

import List from '../../common/List/List';
import TransactionListItem from './TransactionListItem';

import Table from '../../common/Table/Table';
import {
	getTransactionViewModel,
	getTransactionFields
} from './TransactionTableModel';

import {
	stubbedPagination,
	stubbedSummary,
	stubbedTransactions
} from './_stubbedValues';

import Filter from '../../../assets/icons/filter.svg';
import Sort from '../../../assets/icons/sort.svg';

// TODO: Add sort and filter form modals

// TODO: Add filter state
// filters: {
// 	receiving: true,
// 	sending: true
// }

// TODO: Perform local sorting and filtering in action dispatch

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

const bufferSize = 2;

class Portfolio extends React.Component {
  static contextType = RouterContext;

  constructor(props) {
  	super(props);

  	this.toggleFilterModal = this.toggleFilterModal.bind(this);
  	this.toggleSortModal = this.toggleSortModal.bind(this);
  	this.toggleSort = this.toggleSort.bind(this);
  	this.toggleBalance = this.toggleBalance.bind(this);
  	this.updatePage = this.updatePage.bind(this);
  	this.updateDimensions = this.updateDimensions.bind(this);
  	this.throttledUpdateDimensions = throttle(this.updateDimensions, 600);

  	this.state = {
  		title: 'Portfolio',
  		subtitle: null,
  		options: [
  			{ key: 'filter', Icon: Filter, handler: this.toggleFilterModal },
  			{ key: 'sort', Icon: Sort, handler: this.toggleSortModal }
  		],
  		dimensions: {
  			width: window.innerWidth,
  			height: window.innerHeight
  		},
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

  toggleFilterModal() {
  	this.setState(state => ({
  		showFilterModal: !state.showFilterModal
  	}));
  }

  toggleSortModal() {
  	this.setState(state => ({
  		showSortModal: !state.showSortModal
  	}));
  }

  toggleSort(fieldName) {
  	this.setState(state => ({
  		sort: {
  			fieldName,
  			order:
          state.sort.fieldName !== fieldName || state.sort.order !== 'ASC'
          	? 'ASC'
          	: 'DESC'
  		}
  	}));
  }

  toggleBalance(waypoint) {
  	const { setSubtitle } = this.props;
  	const { balance } = stubbedSummary;
  	const balanceDisplay =
      waypoint.currentPosition === Waypoint.inside
      	? null
      	: `Balance: $${balance}`;
  	setSubtitle(balanceDisplay);
  }

  updateDimensions() {
  	this.setState({
  		dimensions: {
  			width: window.innerWidth,
  			height: window.innerHeight
  		}
  	});
  }

  updatePage(page) {
  	this.setState({
  		currentTablePage: page
  	});
  }

  render() {
  	const { history } = this.context;
  	const { className } = this.props;
  	const { currentTablePage, dimensions, sort } = this.state;
  	const { balance, code, receivedEth, sentEth, totalEth } = stubbedSummary;
  	const isMobile = dimensions.width < 768;
  	return (
  		<div className={clns('page', 'portfolio', className)}>
  			{/* ---TOP SIDE--- */}
  			{/* Pull to Refresh */}
  			<div className="portfolio__body">
  				<div className="portfolio__section portfolio__section--left">
  					<Waypoint onPositionChange={this.toggleBalance} />
  					<PortfolioDashboard
  						balance={balance}
  						className="portfolio__dashboard"
  						code={code}
  						receivedEth={receivedEth}
  						sentEth={sentEth}
  						totalEth={totalEth}
  					/>
  					{/* Combined Form (Desktop) */}
  				</div>
  				<div className="portfolio__section portfolio__section--right">
  					<span className="portfolio__section-label">
              Transaction History
  					</span>
  					{isMobile ? (
  						<List
  							bottomOffset={0}
  							className="portfolio__transaction-list"
  							dataMap={stubbedTransactions}
  							itemRenderer={TransactionListItem}
  							key={bufferSize}
  							pageBufferSize={bufferSize}
  							pageMap={stubbedPagination}
  							topOffset={6.25}
  							unit="rem"
  							unitBufferHeight={8.5}
  						/>
  					) : (
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
  					)}
  				</div>
  			</div>
  		</div>
  	);
  }
}

export default Portfolio;
