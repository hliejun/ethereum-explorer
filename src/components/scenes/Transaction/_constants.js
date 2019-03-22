import China from '../../../assets/icons/flags/china.svg';
import Japan from '../../../assets/icons/flags/japan.svg';
import Korea from '../../../assets/icons/flags/korea.svg';
import Singapore from '../../../assets/icons/flags/singapore.svg';
import UnitedKingdom from '../../../assets/icons/flags/uk.svg';
import UnitedStates from '../../../assets/icons/flags/us.svg';

export const COUNTRY_ICONS = {
	CNY: China,
	GBP: UnitedKingdom,
	JPY: Japan,
	KRW: Korea,
	SGD: Singapore,
	USD: UnitedStates
};

export const PLACEHOLDER_ADDRESS_ERROR = {
	description: 'You have yet to designate an ethereum address.',
	refreshText: 'Go to Settings',
	status: 'error',
	title: 'No Ethereum Address'
};

export const PLACEHOLDER_KEY_ERROR = {
	description:
    'You will need an API key to explore blocks. Please obtain it from @hliejun.',
	refreshText: 'Go to Settings',
	status: 'error',
	title: 'No API Key'
};

export const PLACEHOLDER_TRANSACTION_ERROR = {
	description:
    'Please ensure that you have provided a valid API key, ethereum address and transaction ID belonging to that address.',
	refreshText: 'Try Again',
	status: 'error',
	title: 'Problem Loading Transaction Details'
};

export const PLACEHOLDER_TRANSACTION_LOADING = {
	description: 'Fetching transaction details, please wait...',
	status: 'loading',
	title: 'Loading Transaction'
};
