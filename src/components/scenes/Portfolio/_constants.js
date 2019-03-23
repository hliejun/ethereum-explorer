export const PAGE_SIZE = 20;

export const BUFFER_SIZE = 10;

export const FILTER_CATEGORIES = [{ label: 'Type', value: 'type' }];

export const FILTER_TAGS = {
	type: ['incoming', 'outgoing']
};

export const SORT_CATEGORIES = [
	{ label: 'Date', value: 'date' },
	{ label: 'Amount', value: 'amount' }
];

export const FORM_VALIDATION = {
	filter: { default: 'type', regex: /^(?:type)$/ },
	incoming: { default: 'true', regex: /^(?:true|false)$/ },
	order: { default: 'descending', regex: /^(?:ascending|descending)$/ },
	outgoing: { default: 'true', regex: /^(?:true|false)$/ },
	page: { default: '1', regex: /^(?:[0-9]*)$/ },
	sort: { default: 'date', regex: /^(?:date|amount)$/ }
};

export const DEFAULT_FILTERS = {
	filter: FORM_VALIDATION.filter.default,
	incoming: FORM_VALIDATION.incoming.default,
	outgoing: FORM_VALIDATION.outgoing.default
};

export const DEFAULT_SORT = {
	order: FORM_VALIDATION.order.default,
	sort: FORM_VALIDATION.sort.default
};

export const DEFAULT_FILTERS_SORT = {
	...DEFAULT_FILTERS,
	...DEFAULT_SORT
};

export const PLACEHOLDER_ADDRESS_ERROR = {
	description: 'You have yet to designate an ethereum address.',
	refreshText: 'Go to Settings',
	status: 'error',
	title: 'No Ethereum Address'
};

export const PLACEHOLDER_BALANCE_ERROR = {
	description:
    'Please ensure that you have provided a valid ethereum address and API key.',
	refreshText: 'Try Again',
	status: 'error',
	title: 'Problem Loading Balance'
};

export const PLACEHOLDER_KEY_ERROR = {
	description:
    'You will need an API key to explore blocks. Please obtain it from @hliejun.',
	refreshText: 'Go to Settings',
	status: 'error',
	title: 'No API Key'
};

export const PLACEHOLDER_BALANCE_LOADING = {
	description: 'Fetching your balance, please wait...',
	status: 'loading',
	title: 'Loading Balance'
};

export const PLACEHOLDER_TRANSACTIONS_EMPTY = {
	description:
    'You currently do not have any historical transactions in this filter.',
	refreshText: 'Reload',
	status: 'empty',
	title: 'No Transactions Found'
};

export const PLACEHOLDER_TRANSACTIONS_ERROR = {
	description:
    'Please ensure that you have provided a valid ethereum address and API key.',
	refreshText: 'Try Again',
	status: 'error',
	title: 'Problem Loading Transactions'
};

export const PLACEHOLDER_TRANSACTIONS_LOADING = {
	description: 'Fetching your transactions history, please wait...',
	status: 'loading',
	title: 'Loading Transactions'
};
