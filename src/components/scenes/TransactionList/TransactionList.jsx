import React, { useState } from 'react';
import { Waypoint } from 'react-waypoint';

// import Filter from '../../../assets/icons/filter.svg';
// import Sort from '../../../assets/icons/sort.svg';

const TransactionList = (/* props */) => {
	const [name, setName] = useState('Transaction List');
	// const { setTitle, setSubtitle, setOptions } = props;

	// const toggleFilterModal = () => {};

	// const toggleSortModal = () => {};

	const pinBalance = () => {
		// setSubtitle('Balance: $1234.56 SGD');
	};

	const unpinBalance = () => {
		// setSubtitle(null);
	};

	const toggleBalance = waypoint => {
		if (waypoint.currentPosition === Waypoint.inside) {
			unpinBalance();
		} else {
			pinBalance();
		}
	};

	// useEffect(() => {
	// 	setTitle(name);
	// 	setOptions([
	// 		{ key: 'filter', Icon: Filter, handler: toggleFilterModal },
	// 		{ key: 'sort', Icon: Sort, handler: toggleSortModal }
	// 	]);
	// 	return function cleanup() {
	// 		setTitle('');
	// 		// setSubtitle(null); change this hook component to class
	// 		setOptions([]);
	// 	};
	// });

	return (
		<div className="page transaction-list">
			<Waypoint onPositionChange={toggleBalance} />
			<input
				id="name"
				onChange={event => setName(event.target.value)}
				type="text"
				value={name}
			/>
		</div>
	);
};

export default TransactionList;
