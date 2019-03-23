export const filter = (list, items, category, filters) => {
	const result = [];

	list.forEach(id => {
		const data = items[id];
		if (
			data != null &&
      data.source[category] != null &&
      String(filters[data.source[category]]) === 'true'
		) {
			result.push(id);
		}
	});

	return result;
};

export const sort = (list, items, category, order) => {
	const result = [...list];
	const isAscending = order === 'ascending';

	const comparator = (firstId, secondId) => {
		let firstComparable;
		let secondComparable;

		switch (category) {
		case 'amount':
			firstComparable = parseFloat(items[firstId].value);
			secondComparable = parseFloat(items[secondId].value);
			break;
		case 'date':
		default:
			firstComparable = items[firstId].source.timestamp;
			secondComparable = items[secondId].source.timestamp;
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
