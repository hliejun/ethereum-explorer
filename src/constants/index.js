import AddressIcon from '../assets/icons/glyphs/address.svg';
import AppIcon from '../assets/icons/glyphs/application.svg';
import BlockIcon from '../assets/icons/glyphs/block.svg';
import ConfirmationIcon from '../assets/icons/glyphs/confirmation.svg';
import DateTimeIcon from '../assets/icons/glyphs/date.svg';
import FeeIcon from '../assets/icons/glyphs/currency.svg';
import GasIcon from '../assets/icons/glyphs/gas.svg';
import HashIcon from '../assets/icons/glyphs/hash.svg';
import HeightIcon from '../assets/icons/glyphs/height.svg';
import HomeIcon from '../assets/icons/glyphs/home.svg';
import LimitIcon from '../assets/icons/glyphs/limit.svg';
import PortfolioIcon from '../assets/icons/glyphs/balance.svg';
import PriceIcon from '../assets/icons/glyphs/crypto.svg';
import PrivacyIcon from '../assets/icons/glyphs/privacy.svg';
import ProfileIcon from '../assets/icons/glyphs/account.svg';
import RepositoryIcon from '../assets/icons/glyphs/code.svg';
import SettingsIcon from '../assets/icons/glyphs/settings.svg';
import SourceIcon from '../assets/icons/glyphs/source.svg';
import StatusIcon from '../assets/icons/glyphs/status.svg';
import TermsIcon from '../assets/icons/glyphs/terms.svg';
import TotalIcon from '../assets/icons/glyphs/total.svg';
import TxIcon from '../assets/icons/logos/tx.svg';
import TypeIcon from '../assets/icons/glyphs/transaction.svg';
import UsageIcon from '../assets/icons/glyphs/usage.svg';
import UserIcon from '../assets/icons/glyphs/avatar.svg';
import WebIcon from '../assets/icons/glyphs/link.svg';

import China from '../assets/icons/flags/china.svg';
import Japan from '../assets/icons/flags/japan.svg';
import Korea from '../assets/icons/flags/korea.svg';
import Singapore from '../assets/icons/flags/singapore.svg';
import UnitedKingdom from '../assets/icons/flags/uk.svg';
import UnitedStates from '../assets/icons/flags/us.svg';

// App

export const APP_ICON = TxIcon;

export const APP_TITLE = 'Tx Ethereum Explorer';

// App Bar

export const DEFAULT_BACK_LINK = '/app/portfolio';

// Menu

export const MENU_ITEMS = {
	HOME: { icon: HomeIcon, label: 'Home', link: '/app' },
	PORTFOLIO: {
		icon: PortfolioIcon,
		label: 'Portfolio',
		link: '/app/portfolio'
	},
	PRIVACY: { icon: PrivacyIcon, label: 'Privacy', link: '/app/privacy' },
	PROFILE: { icon: ProfileIcon, label: 'Profile', link: '/app/profile' },
	REPOSITORY: {
		icon: RepositoryIcon,
		label: 'Repository',
		link: 'https://github.com/hliejun'
	},
	SETTINGS: { icon: SettingsIcon, label: 'Settings', link: '/app/settings' },
	TERMS: { icon: TermsIcon, label: 'Terms of Service', link: '/app/terms' },
	WEBSITE: {
		icon: WebIcon,
		label: '@hliejun',
		link: 'https://hliejun.github.io'
	}
};

export const MENU_LABELS = {
	app: 'APP',
	legal: 'LEGAL',
	media: 'MEDIA'
};

// Notification

export const NOTIFICATION_DEFAULT_DISMISS = 'Dismiss';

export const NOTIFICATION_DEFAULT_TITLE = 'Notification';

// Forms

export const SELECT_PLACEHOLDER = 'Choose your option';

// List

export const LIST_FOOTER_TITLE = 'End of Transaction History';

export const LIST_FOOTER_SUBTITLE = '* capped at last 1000 entries *';

export const LIST_JUMPER_TEXT = '▲ Back to top ▲';

export const LIST_ITEM_DEFAULT_HEIGHT = 200;

export const LIST_DEFAULT_FONT_SIZE = 14;

// Modal

export const MODAL_ACTIVE_CLASS = 'modal-open';

// Page Loader

export const PAGE_LOADER_TITLES = {
	portfolio: 'Portfolio',
	settings: 'Settings',
	transaction: 'Transaction'
};

export const PAGE_LOADER_DESCRIPTION = 'Loading page, please wait...';

// Placeholder

export const PLACEHOLDER_DEFAULT_BUTTON_TEXT = 'Try Again';

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

// Date

export const DATE_FORMAT_LONG = 'DD/MM/YY h:mmA';

export const DATE_FORMAT_SHORT = 'D/M h:mmA';

// Currency

export const CURRENCY_SYMBOLS = {
	CNY: '¥',
	ETH: 'Ξ',
	GBP: '£',
	JPY: '¥',
	KRW: '₩',
	SGD: '$',
	USD: '$'
};

export const DEFAULT_CURRENCY = 'USD';

// Countries

export const COUNTRY_ICONS = {
	CNY: China,
	GBP: UnitedKingdom,
	JPY: Japan,
	KRW: Korea,
	SGD: Singapore,
	USD: UnitedStates
};

// Construction

export const CONSTRUCTION_DESCRIPTOR =
  'This page is currently under construction. Please check back later.';

// Missing

export const MISSING_REDIRECT_TEXT = 'Go to Portfolio';

export const MISSING_REDIRECT_LINK = '/app/portfolio';

export const MISSING_SUBTITLE = 'The URL you have entered is invalid.';

export const MISSING_TITLE = 'Page Not Found';

// Transaction Details

export const TRANSACTION_TITLE = 'Transaction Details';

export const TRANSACTION_JUMBOTRON_SUBTITLE = 'Transacted Ether';

export const TRANSACTION_ZERO_ETH_INFO =
  'This is a zero-value data transaction.';

export const TRANSACTION_USE_BACKLINK = true;

export const CLIPBOARD_NOTIFICATION = {
	description:
    'The details for this transaction has been copied to your clipboard!',
	subtitle: 'Copy to Clipboard'
};

export const SOURCE_SECTION_DATA = {
	footer: 'Strict gas limits could fail transactions.',
	icon: SourceIcon,
	title: 'Source Summary'
};

export const SOURCE_SUBSECTIONS_DATA = {
	address: {
		description: 'Ethereum account of the receiver/sender',
		icon: AddressIcon,
		title: 'Address'
	},
	id: {
		description: 'Unique transaction identifier',
		icon: HashIcon,
		title: 'Transaction Hash'
	},
	status: {
		description: 'Mining condition',
		icon: StatusIcon,
		title: 'Status'
	},
	timestamp: {
		description: 'Timestamp (DD/MM/YY H:mm)',
		icon: DateTimeIcon,
		title: 'Date/Time'
	},
	type: {
		description: 'Whether the transaction is incoming/outgoing',
		icon: TypeIcon,
		title: 'Type'
	}
};

export const BLOCK_SECTION_DATA = {
	footer: 'More confirmations, better secured transactions.',
	icon: BlockIcon,
	title: 'Block Data'
};

export const BLOCK_SUBSECTIONS_DATA = {
	confirmations: {
		description: 'Number of blocks burying this transaction',
		icon: ConfirmationIcon,
		title: 'Confirmations'
	},
	height: {
		description: 'Number of blocks from genesis block',
		icon: HeightIcon,
		title: 'Number/Height'
	},
	id: {
		description: 'Unique block identifier',
		icon: HashIcon,
		title: 'Block Hash'
	}
};

export const GAS_SECTION_DATA = {
	footer: 'Higher gas price increases mining speed.',
	icon: GasIcon,
	title: 'Gas Details'
};

export const GAS_SUBSECTIONS_DATA = {
	cumulative: {
		description: 'Total accumulated gas used for this block (inclusive)',
		icon: TotalIcon,
		label: 'Cumulative used'
	},
	fee: {
		description: 'Fee for this transaction (ETH)',
		icon: FeeIcon,
		label: 'Fee'
	},
	limit: {
		description: 'Limit placed on gas used',
		icon: LimitIcon,
		label: 'Limit'
	},
	price: {
		description: 'Price per unit gas used (ETH)',
		icon: PriceIcon,
		label: 'Price'
	},
	used: {
		description: 'Gas used for this transaction',
		icon: UsageIcon,
		label: 'Used'
	}
};

// Settings

export const SETTINGS_TITLE = 'Settings';

export const API_KEY_LENGTH = 64;

export const ETH_ADDRESS_LENGTH = 42;

export const ADDRESS_INPUT_PLACEHOLDER = 'Enter your Ethereum address...';

export const API_KEY_INPUT_PLACEHOLDER = 'Enter your API key...';

export const CURRENCY_INPUT_OPTIONS = [
	{ label: 'British Pound', value: 'GBP' },
	{ label: 'Chinese Yuan', value: 'CNY' },
	{ label: 'Japanese Yen', value: 'JPY' },
	{ label: 'Korean Won', value: 'KRW' },
	{ label: 'Singapore Dollars', value: 'SGD' },
	{ label: 'U.S Dollars', value: 'USD' }
];

export const SETTINGS_SECTIONS_DATA = {
	app: {
		description: 'Credentials, view behaviours and customisations, etc.',
		footer: '* Conversion rates are hidden when unavailable',
		icon: AppIcon,
		title: 'Application Settings'
	},
	user: {
		description: 'User account and profile options, etc.',
		icon: UserIcon,
		title: 'User Settings'
	}
};

export const APP_SUBSECTIONS_DATA = {
	currency: {
		description: 'Conversion rate for localising Ethereum',
		title: 'Preferred Currency *'
	},
	key: {
		description: 'Usage key for controlled API endpoint access',
		title: 'API Key'
	},
	theme: {
		description: 'Dark style for low-light environment',
		title: 'Use Dark Mode'
	}
};

export const USER_SUBSECTIONS_DATA = {
	address: {
		description: 'Designated cryptocurrency account hash',
		title: 'Ethereum Address'
	}
};

// Portfolio

export const PAGE_SIZE = 20;

export const BUFFER_SIZE = 10;

export const LIST_DIMEN_UNIT = 'rem';

export const LIST_OFFSET_BOTTOM = 0;

export const LIST_OFFSET_TOP = 6.25;

export const LIST_PLACEHOLDER_TITLE = 'Transactions List';

export const LIST_ROW_HEIGHT = 8.5;

export const LIST_ITEM_LABELS = {
	incoming: 'RECEIVED FROM',
	outgoing: 'SENT TO',
	source: 'SOURCE AMOUNT'
};

export const VIEWER_LOADING_SUBTITLE = 'Loading, please wait...';

export const TABLE_PLACEHOLDER_TITLE = 'Transactions Table';

export const TABLE_FIELDS_LABEL = {
	address: {
		description:
      'The other party\'s ethereum address associated with a transaction.',
		label: 'Address'
	},
	amount: {
		description:
      'The credit/debit transacted in both currency and ethereum unit.',
		label: 'Amount'
	},
	date: {
		description: 'The date (DD/MM/YY) and time of a transaction.',
		label: 'Date'
	},
	type: {
		description:
      'Whether a transaction is incoming (receiving) or outgoing (sending).',
		label: 'Type'
	}
};

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

export const DASHBOARD_LABELS = {
	balance: 'Balance',
	local: 'Localise:',
	nett: 'SUBTOTAL',
	received: 'INCOMING',
	sent: 'OUTGOING'
};

export const SORT_FORM_LABELS = {
	ascending: 'Ascending',
	descending: 'Descending',
	reset: 'Reset',
	sort: 'Sort By:',
	submit: 'Done'
};

export const FILTER_FORM_LABELS = {
	filter: 'Filter By:',
	options: 'Filter Options:',
	reset: 'Reset',
	submit: 'Done'
};

export const COMBINED_FORM_LABELS = {
	reset: 'Reset'
};

export const FILTER_FORM_TITLE = 'Filter Transactions';

export const FILTER_FORM_SUBTITLE =
  'Select a field category and its relevant tags to selectively display transaction results.';

export const SORT_FORM_TITLE = 'Sort Transactions';

export const SORT_FORM_SUBTITLE =
  'Select a sortable field category and sort order to reorder the transaction results.';

export const PORTFOLIO_SECTION_LABELS = {
	history: 'Transaction History',
	options: 'View Options'
};
