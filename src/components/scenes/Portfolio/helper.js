const filter = (transactionIds, transactions, fieldName, filters) => {
	const result = [];
	transactionIds.forEach(id => {
		const data = transactions[id];
		if (data != null && data[fieldName] != null && filters[data[fieldName]]) {
			result.push(id);
		}
	});
	return result;
};

const sort = (transactionIds, transactions, fieldName, order) => {
	const result = [...transactionIds];
	const isAscending = order === 'ascending';

	const comparator = (firstId, secondId) => {
		let firstComparable;
		let secondComparable;
		switch (fieldName) {
		case 'amount':
			firstComparable = parseFloat(transactions[firstId].ethAmount);
			secondComparable = parseFloat(transactions[secondId].ethAmount);
			break;
		case 'date':
		default:
			firstComparable = transactions[firstId].timestamp;
			secondComparable = transactions[secondId].timestamp;
		}
		if (firstComparable < secondComparable) {
			return isAscending ? -1 : 1;
		}
		if (firstComparable > secondComparable) {
			return isAscending ? 1 : -1;
		}
		return 0;
	};

	return result.sort(comparator);
};

const paginate = (transactionIds, size) => {
	const result = [];
	let index;
	for (index = 0; index < transactionIds.length; index += size) {
		const pageTransactionIds = transactionIds.slice(index, index + size);
		result.push(pageTransactionIds);
	}
	return result;
};

export { filter, paginate, sort };
