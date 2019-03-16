const itemCount = 1000;
const pageSize = 20;
const bufferSize = 10;
// const pageSize = Math.max(10, itemCount / 50);
// const bufferSize = Math.max(5, itemCount / 100);

const getRandomNumber = (max, min, precision) =>
	(Math.random() * (max - min) + min).toFixed(precision).toString();

const getStubbedContent = id => ({
	address: `[${id}] ${Math.random()
		.toString(36)
		.substr(2, 16)}-ABCDEFGHIJKLMNOPQRSTUVWXYZ`,
	cashAmount: getRandomNumber(1000000000.0, 0.01, 2),
	code: 'KRW',
	ethAmount: getRandomNumber(1000000.0, 0.01, 4),
	timestamp: new Date(Date.now() - id * 864e5),
	type: Math.floor(Math.random() * 2) === 0 ? 'incoming' : 'outgoing'
});

const indices = [...Array(itemCount + 1).keys()].slice(1);

const paginate = (array, size) => {
	const result = [];
	let index;
	for (index = 0; index < array.length; index += size) {
		result.push(array.slice(index, index + size));
	}
	return result;
};

const stubbedPagination = paginate(indices, pageSize);

// const stubbedIds = [].concat(...stubbedPagination);
const stubbedIds = indices.map(index => String(index));

const stubbedSummary = {
	balance: getRandomNumber(10000000.0, 0.01, 2),
	code: 'KRW',
	receivedEth: getRandomNumber(1000.0, 0.01, 4),
	sentEth: getRandomNumber(1000.0, 0.01, 4),
	totalEth: getRandomNumber(1000.0, 0.01, 4)
};

const stubbedTransactions = indices.reduce(
	(result, index) => ({ ...result, [String(index)]: getStubbedContent(index) }),
	{}
);

export {
	bufferSize,
	itemCount,
	pageSize,
	stubbedIds,
	stubbedPagination,
	stubbedSummary,
	stubbedTransactions
};
