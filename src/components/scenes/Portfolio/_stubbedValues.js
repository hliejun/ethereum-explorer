const itemCount = 10;

const getRandomInt = (min, max) =>
	Math.floor(Math.random() * (max - min + 1) + min);

const getRandomNumber = (min, max, precision) =>
	(Math.random() * (max - min) + min).toFixed(precision).toString();

const getStubbedContent = id => {
	const gas = getRandomInt(10000, 100000);
	const gasUsed = gas - getRandomInt(1, 5000);
	const price = getRandomInt(10000, 100000000);
	const statusDraw = getRandomInt(0, 2);
	let status;
	switch (statusDraw) {
	case 0:
		status = 'success';
		break;
	case 1:
		status = 'failed';
		break;
	default:
		status = 'pending';
	}
	return {
		block: {
			confirmations: String(getRandomInt(1000, 1000000)),
			height: String(getRandomInt(100, 100000)),
			id: Math.random()
				.toString(36)
				.substr(2, 16)
		},
		gas: {
			cumulativeUsed: String(gasUsed),
			price: String(price),
			used: String(gasUsed),
			value: String(gas)
		},
		id: String(id),
		source: {
			address: `[${id}]-${Math.random()
				.toString(36)
				.substr(2, 16)}-ABCDEFGHIJKLMNOPQRSTUVWXYZ`,
			timestamp: String(new Date(Date.now() - id * 864e5).getTime() / 1000),
			type: Math.floor(Math.random() * 2) === 0 ? 'incoming' : 'outgoing'
		},
		status,
		value: String(getRandomNumber(0.01, 100, 8))
	};
};

const indices = [...Array(itemCount + 1).keys()].slice(1);

const stubbedIds = indices.map(index => String(index));

const stubbedSummary = {
	balance: getRandomNumber(0.01, 10000000.0, 2),
	code: 'KRW',
	received: getRandomNumber(0.01, 1000.0, 4),
	sent: getRandomNumber(0.01, 1000.0, 4),
	subtotal: getRandomNumber(0.01, 1000.0, 4)
};

const stubbedTransactions = indices.reduce(
	(result, index) => ({ ...result, [String(index)]: getStubbedContent(index) }),
	{}
);

export { itemCount, stubbedIds, stubbedSummary, stubbedTransactions };
