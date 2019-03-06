const getStubbedContent = id => ({
	address: `[${id}] ${Math.random()
		.toString(36)
		.substr(2, 16)}-ABCDEFGHIJKLMNOP`,
	cashAmount: (Math.random() * (100000000000000000.0 - 0.01) + 0.01)
		.toFixed(2)
		.toString(),
	code: 'SGD',
	ethAmount: (Math.random() * (1000.0 - 0.01) + 0.01).toFixed(8).toString(),
	timestamp: new Date(Date.now() - id * 864e5),
	type: Math.floor(Math.random() * 2) === 0 ? 'incoming' : 'outgoing'
});

const stubbedPagination = {
	1: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
	2: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
	3: [21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
	4: [31, 32, 33, 34, 35, 36, 37, 38, 39, 40]
};

const stubbedSummary = {
	balance: '1234.56',
	code: 'SGD',
	receivedEth: '27906.1564',
	sentEth: '29285.6347',
	totalEth: '320.3642'
};

const stubbedTransactions = {
	1: getStubbedContent(1),
	2: getStubbedContent(2),
	3: getStubbedContent(3),
	4: getStubbedContent(4),
	5: getStubbedContent(5),
	6: getStubbedContent(6),
	7: getStubbedContent(7),
	8: getStubbedContent(8),
	9: getStubbedContent(9),
	10: getStubbedContent(10),
	11: getStubbedContent(11),
	12: getStubbedContent(12),
	13: getStubbedContent(13),
	14: getStubbedContent(14),
	15: getStubbedContent(15),
	16: getStubbedContent(16),
	17: getStubbedContent(17),
	18: getStubbedContent(18),
	19: getStubbedContent(19),
	20: getStubbedContent(20),
	21: getStubbedContent(21),
	22: getStubbedContent(22),
	23: getStubbedContent(23),
	24: getStubbedContent(24),
	25: getStubbedContent(25),
	26: getStubbedContent(26),
	27: getStubbedContent(27),
	28: getStubbedContent(28),
	29: getStubbedContent(29),
	30: getStubbedContent(30),
	31: getStubbedContent(31),
	32: getStubbedContent(32),
	33: getStubbedContent(33),
	34: getStubbedContent(34),
	35: getStubbedContent(35),
	36: getStubbedContent(36),
	37: getStubbedContent(37),
	38: getStubbedContent(38),
	39: getStubbedContent(39),
	40: getStubbedContent(40)
};

export { stubbedPagination, stubbedSummary, stubbedTransactions };
