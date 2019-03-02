import React from 'react';
import { Waypoint } from 'react-waypoint';
import clns from 'classnames';

import { PortfolioDashboard } from '../../common/Dashboard';

import Filter from '../../../assets/icons/filter.svg';
import Sort from '../../../assets/icons/sort.svg';

// (props from redux)
// userData
// transactions
// isFetching
// isRefreshing

// (actions from redux)
// fetchBalance
// fetchUser
// fetchTransactions

// SORT and FILTER to be done locally

// Paginate locally (desktop table)

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
			]
			// showFilterModal: false,
			// showSortModal: false,
			// filters: {
			// 	receiving: true,
			// 	sending: true
			// },
			// sort: {
			// 	field: 'DATE',
			// 	order: 'DESC'
			// }
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

	// toggleFilterModal() {
	// 	console.log('toggle filter modal');
	// 	// { Filter Form }
	// }

	// toggleSortModal() {
	// 	console.log('toggle sort modal');
	// 	// { Sort Form }
	// }

	toggleBalance(waypoint) {
		const { setSubtitle } = this.props;
		const balanceDisplay =
      waypoint.currentPosition === Waypoint.inside ? null : 'Balance: $1234.56';
		setSubtitle(balanceDisplay);
	}

	render() {
		const { className } = this.props;
		return (
			<div className={clns('page', 'portfolio', className)}>
				{/* TOP SIDE */}
				{/* Pull to Refresh */}

				<Waypoint onPositionChange={this.toggleBalance} />

				{/* LEFT SIDE */}
				<PortfolioDashboard
					balance="$1234.56"
					code="SGD"
					receivedEth="3123131.3564"
					sentEth="31231230.9745"
					totalEth="31312310.33142"
				/>
				{/* Combined Form (Desktop) */}

				{/* RIGHT SIDE */}

				{/* List (Mobile/Desktop), Table (Desktop) */}
			</div>
		);
	}
}

export default Portfolio;
