export const formValidation = {
	filter: { default: 'type', regex: /^(?:type)$/ },
	incoming: { default: 'true', regex: /^(?:true|false)$/ },
	order: { default: 'descending', regex: /^(?:ascending|descending)$/ },
	outgoing: { default: 'true', regex: /^(?:true|false)$/ },
	sort: { default: 'date', regex: /^(?:date|amount)$/ },
	page: { default: '1', regex: /^(?:[0-9]*)$/ }
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
