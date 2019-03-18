export const pageSize = 20;

export const bufferSize = 10;

export const filterCategories = [{ label: 'Type', value: 'type' }];

export const filterTags = {
	type: ['incoming', 'outgoing']
};

export const sortCategories = [
	{ label: 'Date', value: 'date' },
	{ label: 'Amount', value: 'amount' }
];

export const formValidation = {
	filter: { default: 'type', regex: /^(?:type)$/ },
	incoming: { default: 'true', regex: /^(?:true|false)$/ },
	order: { default: 'descending', regex: /^(?:ascending|descending)$/ },
	outgoing: { default: 'true', regex: /^(?:true|false)$/ },
	page: { default: '1', regex: /^(?:[0-9]*)$/ },
	sort: { default: 'date', regex: /^(?:date|amount)$/ }
};

export const defaultFilterData = {
	filter: formValidation.filter.default,
	incoming: formValidation.incoming.default,
	outgoing: formValidation.outgoing.default
};

export const defaultSortData = {
	order: formValidation.order.default,
	sort: formValidation.sort.default
};

export const defaultFormData = {
	...defaultFilterData,
	...defaultSortData
};

export const errorAddressHolderState = {
	description: 'You have yet to designate an ethereum address.',
	refreshText: 'Go to Settings',
	status: 'error',
	title: 'No Ethereum Address'
};

export const errorBalanceHolderState = {
	description: 'Something went wrong while fetching your balance.',
	refreshText: 'Try Again',
	status: 'error',
	title: 'Problem Loading'
};

export const loadingBalanceHolderState = {
	description: 'Fetching your balance, please wait...',
	status: 'loading',
	title: 'Loading Balance'
};

export const emptyTransactionsHolderState = {
	description:
    'You currently do not have any historical transactions in this filter.',
	refreshText: 'Reload',
	status: 'empty',
	title: 'No Transactions Found'
};

export const errorTransactionsHolderState = {
	description: 'Something went wrong while fetching your transactions history.',
	refreshText: 'Try Again',
	status: 'error',
	title: 'Problem Loading'
};

export const loadingTransactionsHolderState = {
	description: 'Fetching your transactions history, please wait...',
	status: 'loading',
	title: 'Loading Transactions'
};
