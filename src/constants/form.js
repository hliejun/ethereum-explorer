// Select Form Input

export const SELECT_PLACEHOLDER = 'Choose your option';

// Validation

export const FORM_VALIDATION = {
	filter: { default: 'type', regex: /^(?:type)$/ },
	incoming: { default: 'true', regex: /^(?:true|false)$/ },
	order: { default: 'descending', regex: /^(?:ascending|descending)$/ },
	outgoing: { default: 'true', regex: /^(?:true|false)$/ },
	page: { default: '1', regex: /^(?:[0-9]*)$/ },
	sort: { default: 'date', regex: /^(?:date|amount)$/ }
};

// Filters

export const FILTER_FORM_TITLE = 'Filter Transactions';

export const FILTER_FORM_SUBTITLE =
  'Select a field category and its relevant tags to selectively display transaction results.';

export const FILTER_DEFAULT = {
	filter: FORM_VALIDATION.filter.default,
	incoming: FORM_VALIDATION.incoming.default,
	outgoing: FORM_VALIDATION.outgoing.default
};

export const FILTER_TAGS = {
	type: ['incoming', 'outgoing']
};

export const FILTER_CATEGORIES = [{ label: 'Type', value: 'type' }];

export const FILTER_FORM_LABELS = {
	filter: 'Filter By:',
	options: 'Filter Options:',
	reset: 'Reset',
	submit: 'Done'
};

// Sort

export const SORT_FORM_TITLE = 'Sort Transactions';

export const SORT_FORM_SUBTITLE =
  'Select a sortable field category and sort order to reorder the transaction results.';

export const SORT_DEFAULT = {
	order: FORM_VALIDATION.order.default,
	sort: FORM_VALIDATION.sort.default
};

export const SORT_CATEGORIES = [
	{ label: 'Date', value: 'date' },
	{ label: 'Amount', value: 'amount' }
];

export const SORT_FORM_LABELS = {
	ascending: 'Ascending',
	descending: 'Descending',
	reset: 'Reset',
	sort: 'Sort By:',
	submit: 'Done'
};

// Combined

export const COMBINED_DEFAULT = {
	...FILTER_DEFAULT,
	...SORT_DEFAULT
};

export const COMBINED_FORM_LABELS = {
	reset: 'Reset'
};
