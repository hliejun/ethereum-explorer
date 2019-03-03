import React from 'react';
import { Waypoint } from 'react-waypoint';
import clns from 'classnames';

import { PortfolioDashboard } from '../../common/Dashboard';
import List from './List';
import TransactionListItem from './ListItem';

import {
	stubbedPagination,
	stubbedSummary,
	stubbedTransactions
} from './_stubbedValues';

import Filter from '../../../assets/icons/filter.svg';
import Sort from '../../../assets/icons/sort.svg';

// TODO: Add Table

// TODO: Local pagination (List and Table)

// TODO: Add sort and filter form modals

// TODO: Add sort, filter state
// filters: {
// 	receiving: true,
// 	sending: true
// },
// sort: {
// 	field: 'DATE',
// 	order: 'DESC'
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

const bufferSize = 2;

class Portfolio extends React.Component {
	constructor(props) {
		super(props);

		this.toggleFilterModal = this.toggleFilterModal.bind(this);
		this.toggleSortModal = this.toggleSortModal.bind(this);
		this.toggleBalance = this.toggleBalance.bind(this);

		this.state = {
			title: 'Portfolio',
			subtitle: null,
			options: [
				{ key: 'filter', Icon: Filter, handler: this.toggleFilterModal },
				{ key: 'sort', Icon: Sort, handler: this.toggleSortModal }
			],
			showFilterModal: false,
			showSortModal: false
		};
	}

	componentDidMount() {
		const { setTitle, setSubtitle, setOptions } = this.props;
		const { title, subtitle, options } = this.state;
		setTitle(title);
		setSubtitle(subtitle);
		setOptions(options);
	}

	componentWillUnmount() {
		const { reset } = this.props;
		reset();
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

	toggleBalance(waypoint) {
		const { setSubtitle } = this.props;
		const { balance } = stubbedSummary;
		const balanceDisplay =
      waypoint.currentPosition === Waypoint.inside
      	? null
      	: `Balance: $${balance}`;
		setSubtitle(balanceDisplay);
	}

	render() {
		const { className } = this.props;
		const { balance, code, receivedEth, sentEth, totalEth } = stubbedSummary;
		return (
			<div className={clns('page', 'portfolio', className)}>
				{/* ---TOP SIDE--- */}
				{/* Pull to Refresh */}
				<Waypoint onPositionChange={this.toggleBalance} />
				{/* ---LEFT SIDE--- */}
				<PortfolioDashboard
					balance={balance}
					className="portfolio__dashboard"
					code={code}
					receivedEth={receivedEth}
					sentEth={sentEth}
					totalEth={totalEth}
				/>
				{/* Combined Form (Desktop) */}
				{/* ---RIGHT SIDE--- */}
				<span className="portfolio__section-label">Transaction History</span>
				<List
					bottomOffset={0}
					className="portfolio__transaction-list"
					dataMap={stubbedTransactions}
					itemRenderer={TransactionListItem}
					key={bufferSize}
					pageBufferSize={bufferSize}
					pageMap={stubbedPagination}
					topOffset={100}
					unit="px"
					unitBufferHeight={140}
				/>
				{/* Table (Desktop) */}
			</div>
		);
	}
}

export default Portfolio;
