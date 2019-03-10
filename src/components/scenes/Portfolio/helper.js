export const filter = (transactionIds, transactions, fieldName, filters) => {
	const result = [];
	transactionIds.forEach(id => {
		const data = transactions[id];
		if (
			data != null &&
      data[fieldName] != null &&
      String(filters[data[fieldName]]) === 'true'
		) {
			result.push(id);
		}
	});
	return result;
};

export const sort = (transactionIds, transactions, fieldName, order) => {
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

export const paginate = (transactionIds, size) => {
	const result = [];
	let index;
	for (index = 0; index < transactionIds.length; index += size) {
		const pageTransactionIds = transactionIds.slice(index, index + size);
		result.push(pageTransactionIds);
	}
	return result;
};

export const trim = (data, validation) => {
	const result = {};
	Object.keys(data).forEach(key => {
		const value = String(data[key]);
		const definition = validation[key];
		if (definition == null || definition.default === value) {
			return;
		}
		if (value.match(definition.regex)) {
			result[key] = value;
		}
	});
	return result;
};

export const untrim = (data, validation) => {
	const result = {};
	Object.keys(validation).forEach(key => {
		const definition = validation[key];
		const value = String(data[key]);
		if (value != null && value.match(definition.regex)) {
			result[key] = value;
		} else {
			result[key] = definition.default;
		}
	});
	return result;
};
